/**
 * Impeccable live mode script loader
 * Only loads in development environment
 */
export default function clientModule() {
  if (typeof window === 'undefined') return;

  // Only load in dev mode
  if (process.env.NODE_ENV !== 'development') return;

  // Don't load twice
  if (document.querySelector('script[src*="localhost:8400/live.js"]')) return;

  const script = document.createElement('script');
  script.src = 'http://localhost:8400/live.js?token=edf4b949-34d2-439f-894f-983c71c7ce40';
  script.defer = true;
  document.head.appendChild(script);
}
