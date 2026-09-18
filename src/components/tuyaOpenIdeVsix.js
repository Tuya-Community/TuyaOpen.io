import { useEffect, useState } from 'react'

export const OPEN_VSX_LATEST_API = 'https://open-vsx.org/api/TuyaOpen/TuyaOpenIDE/latest'
export const OPEN_VSX_FALLBACK_VERSION = '0.1.1'
export const OPEN_VSX_FALLBACK_DOWNLOAD_URL =
  'https://open-vsx.org/api/TuyaOpen/TuyaOpenIDE/0.1.1/file/TuyaOpen.TuyaOpenIDE-0.1.1.vsix'

export function useLatestVsix() {
  const [version, setVersion] = useState(null)
  const [downloadUrl, setDownloadUrl] = useState(OPEN_VSX_FALLBACK_DOWNLOAD_URL)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetch(OPEN_VSX_LATEST_API, { headers: { Accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (cancelled || !data) return

        const url = data?.files?.download
        const latestVersion = data?.version
        if (url && latestVersion) {
          setDownloadUrl(url)
          setVersion(latestVersion)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return {
    version: version || OPEN_VSX_FALLBACK_VERSION,
    downloadUrl,
    loading,
  }
}
