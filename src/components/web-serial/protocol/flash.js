/**
 * Unified flash dispatcher. Hides the per-family differences behind one
 * {done, stop} job:
 *  - ESP32 family  → clean esptool-js port (protocol/espFlasher.js)
 *  - T5AI/T3/T2    → vendored T5Downloader
 *  - BK7231N/LN882H→ vendored downloaders
 *
 * Progress is normalized to a single shape the UI can render:
 *    onProgress(percent | null, {written?, total?, message?, error?})
 * T5AI calls onProgress({stage,message,progress,total}); BK7231N/LN882H call
 * onProgress(step, total, message). Both are mapped to the normalized form.
 */
import { COPY, fmt } from '../i18n'
import { flashEsp32 } from './espFlasher'
import { createVendorDownloader } from './vendorLoader'

/**
 * Per-chip defaults — ported from tyutool's chip-manifests.ts (the canonical
 * source of truth). flashBaud is the *target* post-handshake baud; every family
 * opens the port at 115200 first, then the downloader/esptool switches up.
 * authBaud is always 115200 (the firmware's text console). bridge is the
 * recommended USB-to-UART guidance surfaced in the UI ("recommended port").
 */
export const CHIPS = [
  {
    id: 'T5AI',
    label: 'T5AI',
    family: 't5ai',
    vendor: 'T5Downloader',
    desc: 'Tuya SoC',
    flashBaud: 921600,
    authBaud: 115200,
    flashSize: 0x800000,
    bridge: 'CP2102 / CH340',
  },
  {
    id: 'T3',
    label: 'T3',
    family: 't5ai',
    vendor: 'T5Downloader',
    desc: 'Tuya Wi-Fi + BLE',
    flashBaud: 921600,
    authBaud: 115200,
    flashSize: 0x400000,
    bridge: 'CP2102 / CH340',
  },
  {
    id: 'T2',
    label: 'T2',
    family: 't5ai',
    vendor: 'T5Downloader',
    desc: 'Tuya Wi-Fi',
    flashBaud: 921600,
    authBaud: 115200,
    flashSize: 0x200000,
    bridge: 'CP2102 / CH340',
  },
  {
    id: 'ESP32-Series',
    label: 'ESP32-Series',
    family: 'esp32',
    desc: 'ESP32 / S2 / S3 / C3 / C6 (auto-detected)',
    flashBaud: 460800,
    authBaud: 115200,
    flashSize: 0x400000,
    bridge: 'CP2102 / CH340 · DTR/RTS auto-reset',
  },
  {
    id: 'BK7231N',
    label: 'BK7231N',
    family: 'bk7231n',
    vendor: 'BK7231NDownloader',
    desc: 'Beken',
    flashBaud: 921600,
    authBaud: 115200,
    flashSize: 0x200000,
    bridge: 'CP2102 / CH340',
  },
  {
    id: 'LN882H',
    label: 'LN882H',
    family: 'ln882h',
    vendor: 'LN882HDownloader',
    desc: 'LinkDev',
    flashBaud: 115200,
    authBaud: 115200,
    flashSize: 0x200000,
    bridge: 'CP2102 / CH340',
  },
]

/** Baud options offered in the flash UI (aligned to tyutool). */
export const FLASH_BAUDS = [115200, 460800, 921600, 1000000, 1500000, 2000000]

function chipById(id) {
  return CHIPS.find((c) => c.id === id) || CHIPS[0]
}

/**
 * Best-effort EN translation for the few Chinese strings that still surface
 * (errors/warnings). Most downloader chatter (comm/info/main) is filtered out
 * in debugCb / the progress adapter, so this only needs to cover errors.
 */
const ZH_EN = [
  [/设备连接已断开[，,]请检查USB连接后重试/g, 'Device disconnected — check the USB connection and retry'],
  [/T5AI设备连接失败[:：]\s*/g, 'T5AI connection failed: '],
  [/连接失败[:：]\s*/g, 'Connection failed: '],
  [/设备未连接[，,]请先调用connect\(\)/g, 'Device not connected'],
  [/握手失败[，,]请检查设备连接/g, 'Handshake failed — check the device connection'],
  [/校验失败[:：]\s*/g, 'Verification failed: '],
  [/Flash解保护后通信异常/g, 'Communication failed after flash unprotect'],
  [/未知Flash ID/g, 'Unknown flash ID'],
  [/操作已被用户取消/g, 'Operation cancelled by user'],
  [/发送(\S+?)失败[:：]\s*/g, 'Send $1 failed: '],
]
function toEnglish(msg) {
  let s = String(msg ?? '')
  for (const [re, rep] of ZH_EN) s = s.replace(re, rep)
  return s
}

/**
 * Derive a UI phase from a human log message (en + zh). Used to tint the
 * progress bar and label the status line. Returns null when unknown.
 */
function phaseFromMessage(msg) {
  const m = String(msg || '').toLowerCase()
  if (/handshake|握手|connecting|连接|baud|波特|init|初始化/.test(m)) return 'handshake'
  if (/erase|擦除/.test(m)) return 'erase'
  if (/writ|写入/.test(m)) return 'write'
  if (/verif|校验|crc/.test(m)) return 'verify'
  if (/reboot|重启|restart/.test(m)) return 'reboot'
  return null
}

/** Normalize the three progress call shapes into one. Only errors are logged;
 *  phase is still derived for the status line / progress bar tint. */
function makeProgressAdapter(fileSize, onProgress, onLog) {
  return (...args) => {
    const a = args[0]
    if (a && typeof a === 'object') {
      // T5Downloader: {stage, message, progress, total}
      const phase = phaseFromMessage(a.message)
      if (a.stage === 'error') {
        onLog(toEnglish(a.message), true)
        onProgress(null, { error: true, phase })
        return
      }
      if (typeof a.progress === 'number' && a.total) {
        onProgress((a.progress / a.total) * 100, { written: a.progress, total: a.total, phase })
      } else if (a.stage === 'connected') {
        onProgress(null, { phase: phase || 'handshake' })
      }
      return
    }
    // BK7231N / LN882H: (step, total, message)
    const [step, total, message] = args
    const phase = phaseFromMessage(message)
    if (typeof total === 'number' && total > 0) {
      onProgress((step / total) * 100, { written: step, total, phase })
    } else {
      onProgress(null, { phase })
    }
  }
}

/**
 * @param {object} opts
 * @param {string} opts.chipId
 * @param {SerialPort} opts.port  already open at 115200
 * @param {Uint8Array} opts.file
 * @param {number} opts.address
 * @param {number} opts.baud
 * @param {string} opts.locale
 * @param {(msg:string, isError?:boolean)=>void} opts.onLog
 * @param {(percent:number|null, info:object)=>void} opts.onProgress
 * @returns {{done: Promise<void>, stop: ()=>void}}
 */
export function flash({ chipId, port, file, address, baud, locale, onLog, onProgress }) {
  const chip = chipById(chipId)
  // Flash process logs default to English (the vendored downloaders are zh;
  // the React side filters most of that chatter).
  const t = COPY.en
  let stopFn = () => {}

  const done = (async () => {
    onLog(fmt(t.starting_device_download, chip.label, file.byteLength))

    if (chip.family === 'esp32') {
      stopFn = () => {
        try {
          port.close()
        } catch {
          /* noop */
        }
      }
      await flashEsp32({
        port,
        baudrate: baud,
        fileData: file,
        address,
        onLog: (m) => onLog(m),
        onProgress: (pct, info) => onProgress(pct, info),
      })
      return
    }

    const debugCb = (level, message) => {
      // Only surface errors/warnings; drop the noisy comm/info/main chatter.
      if (level === 'error' || level === 'warning') onLog(toEnglish(message), level === 'error')
    }
    const downloader = await createVendorDownloader(chip, port, debugCb, locale, baud)
    stopFn = () => downloader.stop()

    downloader.setProgressCallback(makeProgressAdapter(file.byteLength, onProgress, onLog))

    onLog(fmt(t.initializing_downloader, chip.label))
    onLog(fmt(t.connecting_device, chip.label))
    const ok = await downloader.connect()
    if (!ok) throw new Error(fmt(t.cannot_connect_device, chip.label))

    onLog(fmt(t.downloading_firmware_to_device, chip.label))
    await downloader.downloadFirmware(file, address)

    try {
      await downloader.disconnect()
    } catch {
      /* best-effort */
    }
  })()

  return { done, stop: () => stopFn() }
}
