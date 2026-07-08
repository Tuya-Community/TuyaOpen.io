/**
 * ESP32-family flashing via the `esptool-js` npm package (clean port).
 *
 * Mirrors the upstream ESP32EsptoolJSWrapper's API usage (initialize → main →
 * writeFlash → after) but without the 836-line wrapper's shared-port lock
 * juggling — we own the port exclusively, so we hand it straight to Transport.
 *
 * The port must already be open at 115200 (romBaudrate); esptool-js switches
 * the chip to `baudrate` itself during main().
 */
import CryptoJS from 'crypto-js'
import { ESPLoader, Transport } from 'esptool-js'

export async function flashEsp32({ port, baudrate, fileData, address, onLog, onProgress }) {
  const transport = new Transport(port, true)

  const terminal = {
    writeLine: (s) => {
      if (s) onLog(s)
    },
    write: () => {},
    clean: () => {},
  }

  const espLoader = new ESPLoader({
    transport,
    baudrate,
    terminal,
    debugLogging: false,
  })
  // ROM talks at 115200; esptool-js reads this to decide whether to change baud.
  espLoader.romBaudrate = 115200

  try {
    await espLoader.main()
  } catch (e) {
    throw new Error(`Handshake failed: ${e?.message || e}`)
  }

  const chipName = espLoader.chip?.CHIP_NAME || 'ESP32'
  onLog(`${chipName}${espLoader.IS_STUB ? ' (stub)' : ''}`)

  const data = espLoader.ui8ToBstr(fileData)
  await espLoader.writeFlash({
    fileArray: [{ data, address }],
    flashSize: 'keep',
    eraseAll: address === 0,
    compress: true,
    reportProgress: (_fileIndex, written, total) => {
      if (total) onProgress((written / total) * 100, { written, total })
    },
    calculateMD5Hash: (img) => CryptoJS.MD5(CryptoJS.enc.Latin1.parse(img)).toString(),
  })

  await espLoader.after()
}
