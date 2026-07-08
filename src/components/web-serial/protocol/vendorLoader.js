/**
 * Loader for the vendored Tuya/Beken/LinkDev binary-protocol downloaders.
 *
 * These files (base-downloader.js, t5ai/bk7231n/ln882h) are reused verbatim
 * from tools/TuyaOpen-WebTools — they're pure Web Serial (BaseDownloader uses
 * only `this.port`), so re-using them is far safer than hand-porting ~4,000
 * lines of proprietary protocol. They're plain (non-module) scripts that
 * register classes on `window` and share global scope, exactly as the upstream
 * app loads them. We inject them on demand inside <BrowserOnly>.
 *
 * Two shims satisfy their only external coupling:
 *  - window.i18n.t(key)         — T5Downloader logs a few strings via i18n.t().
 *  - window.serialTerminal.flashBaudRateSelect.value — T5Downloader reads the
 *    user-chosen flash baud from the (absent) SerialTerminal UI. We provide it.
 */
import { COPY, fmt } from '../i18n'

const BASE = '/web-serial-vendor/base-downloader.js'
const SCRIPTS = {
  t5ai: ['/web-serial-vendor/t5ai-downloader.js'],
  bk7231n: ['/web-serial-vendor/bk7231n-downloader.js'],
  ln882h: ['/web-serial-vendor/ln882h-ram-bin.js', '/web-serial-vendor/ln882h-downloader.js'],
}

const loaded = new Set()

function loadScript(src) {
  if (loaded.has(src)) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const el = document.createElement('script')
    el.src = src
    el.async = false
    el.onload = () => {
      loaded.add(src)
      resolve()
    }
    el.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(el)
  })
}

function setShims(localeProp, baud) {
  // Downloader log strings default to English (the vendored source is zh; the
  // React side filters most of it, and the few i18n.t() lookups stay English).
  const t = COPY.en
  window.i18n = window.i18n || {}
  // The downloaders only ever call i18n.t(key, ...args).
  window.i18n.t = (k, ...args) => fmt(t[k] ?? COPY.en[k] ?? k, ...args)
  window.serialTerminal = window.serialTerminal || {}
  window.serialTerminal.flashBaudRateSelect = { value: String(baud) }
}

/**
 * Inject (once) and instantiate the vendored downloader for a chip family.
 * @returns the downloader instance (T5Downloader / BK7231NDownloader / …).
 */
export async function createVendorDownloader(chip, port, debugCallback, locale, baud) {
  setShims(locale, baud)
  await loadScript(BASE)
  for (const src of SCRIPTS[chip.family]) await loadScript(src)

  const Cls = window[chip.vendor]
  if (!Cls) throw new Error(`Downloader class unavailable: ${chip.vendor}`)
  return new Cls(port, debugCallback)
}
