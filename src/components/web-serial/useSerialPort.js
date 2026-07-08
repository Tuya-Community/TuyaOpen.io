/**
 * Web Serial port lifecycle for the web-serial tool.
 *
 * Two surfaces:
 *  - useSerialPort({ onReceive })  → read-stream consumers (Serial console, DeviceAuth).
 *    Owns the port, runs a robust read loop (re-acquires the reader across
 *    transient errors / device replugs), exposes connect/disconnect/write.
 *  - requestAndOpenPort(opts)      → exclusive-use consumers (FirmwareFlasher).
 *    Opens the port WITHOUT a read loop so a downloader (esptool-js /
 *    T5Downloader) can take it over raw. Caller owns closing it.
 *
 * All of this is browser-only; callers live inside <BrowserOnly>.
 */
import { useCallback, useEffect, useRef, useState } from 'react'

export function useWebSerialSupport() {
  return typeof navigator !== 'undefined' && 'serial' in navigator
}

/**
 * @param {(uint8: Uint8Array, text: string) => void} [opts.onReceive]
 *   Called for every chunk. Gets the raw bytes AND the decoded text (stream=true
 *   so multi-byte UTF-8 spanning chunks is handled).
 * @param {(err: Error) => void} [opts.onError]
 */
export function useSerialPort({ onReceive, onError } = {}) {
  const [state, setState] = useState('idle') // idle | connecting | connected | error
  const [error, setError] = useState(null)

  const portRef = useRef(null)
  const readerRef = useRef(null)
  const keepReadingRef = useRef(false)
  const readPromiseRef = useRef(null)
  const onReceiveRef = useRef(onReceive)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onReceiveRef.current = onReceive
  }, [onReceive])
  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  const supported = useWebSerialSupport()

  const readLoop = useCallback(async () => {
    const port = portRef.current
    if (!port) return
    const decoder = new TextDecoder()
    // Outer loop re-acquires the reader if the device errors out but the port
    // is still readable (transient glitch / replug). Exits on clean disconnect.
    while (keepReadingRef.current && port.readable) {
      let reader
      try {
        reader = port.readable.getReader()
        readerRef.current = reader
        while (keepReadingRef.current) {
          const { value, done } = await reader.read()
          if (done) break
          if (value && value.byteLength) {
            const text = decoder.decode(value, { stream: true })
            onReceiveRef.current?.(value, text)
          }
        }
      } catch (err) {
        if (keepReadingRef.current) {
          // Unexpected — report; the outer loop will retry if still readable.
          onErrorRef.current?.(err)
        }
      } finally {
        try {
          reader?.releaseLock()
        } catch {
          /* already released */
        }
        readerRef.current = null
      }
      if (!keepReadingRef.current || !port.readable) break
    }
    try {
      decoder.decode() // flush
    } catch {
      /* noop */
    }
  }, [])

  const connect = useCallback(
    async (opts = {}) => {
      if (portRef.current) return
      if (!supported) {
        const e = new Error('Web Serial not supported')
        setState('error')
        setError(e)
        onErrorRef.current?.(e)
        return
      }
      setState('connecting')
      setError(null)
      try {
        const port = await navigator.serial.requestPort()
        await port.open({
          baudRate: opts.baudRate ?? 115200,
          dataBits: opts.dataBits ?? 8,
          stopBits: opts.stopBits ?? 1,
          parity: opts.parity ?? 'none',
        })
        portRef.current = port
        keepReadingRef.current = true
        setState('connected')
        readPromiseRef.current = readLoop()
      } catch (err) {
        // user cancelling the OS picker throws "NotFoundError" / "AbortError" —
        // treat as a quiet return to idle, not a hard error.
        const quiet = err && (err.name === 'NotFoundError' || err.name === 'AbortError')
        setState(quiet ? 'idle' : 'error')
        if (!quiet) {
          setError(err)
          onErrorRef.current?.(err)
        }
        portRef.current = null
      }
    },
    [readLoop, supported],
  )

  const disconnect = useCallback(async () => {
    keepReadingRef.current = false
    const port = portRef.current
    if (!port) {
      setState('idle')
      return
    }
    try {
      await readerRef.current?.cancel()
    } catch {
      /* noop */
    }
    try {
      await readPromiseRef.current
    } catch {
      /* noop */
    }
    // A stray writer lock from a concurrent write could block close; release.
    try {
      if (port.writable?.locked) {
        // best-effort: nothing to release without the writer handle
      }
    } catch {
      /* noop */
    }
    try {
      await port.close()
    } catch {
      /* port may already be gone */
    }
    portRef.current = null
    readerRef.current = null
    readPromiseRef.current = null
    setState('idle')
  }, [])

  const write = useCallback(async (data) => {
    const port = portRef.current
    if (!port || !port.writable) {
      throw new Error('serial not connected')
    }
    const writer = port.writable.getWriter()
    try {
      await writer.write(data)
    } finally {
      try {
        writer.releaseLock()
      } catch {
        /* noop */
      }
    }
  }, [])

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      keepReadingRef.current = false
      const port = portRef.current
      if (port) {
        readerRef.current?.cancel().catch(() => {})
        port.close().catch(() => {})
        portRef.current = null
      }
    }
  }, [])

  return { state, error, supported, connect, disconnect, write, getPort: () => portRef.current }
}

/**
 * Open a serial port for exclusive use (no read loop). Used by the flasher,
 * which hands the port to a chip downloader. Caller must close the port when
 * the downloader is done (the downloader releases its own reader/writer locks).
 */
export async function requestAndOpenPort(opts = {}) {
  if (!(typeof navigator !== 'undefined' && 'serial' in navigator)) {
    throw new Error('Web Serial not supported')
  }
  const port = await navigator.serial.requestPort()
  await port.open({
    baudRate: opts.baudRate ?? 115200,
    dataBits: opts.dataBits ?? 8,
    stopBits: opts.stopBits ?? 1,
    parity: opts.parity ?? 'none',
  })
  return port
}
