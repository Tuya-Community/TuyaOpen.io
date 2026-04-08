/**
 * Ensures window.gtag is the standard dataLayer stub when the HTML inline
 * bootstrap from plugin-google-gtag did not run (CSP, blockers, or ordering).
 * Prevents TypeError on client-side navigations from the plugin's gtag client module.
 */
if (typeof window !== 'undefined' && typeof window.gtag !== 'function') {
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
}
