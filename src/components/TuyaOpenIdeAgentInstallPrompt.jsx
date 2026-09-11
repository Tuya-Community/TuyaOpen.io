import React from 'react'

import { useLatestVsix } from './tuyaOpenIdeVsix'

const copy = {
  en: {
    loading: 'Checking the latest Open VSX version…',
    latest: 'Latest version',
    prompt: (url) =>
      `Install the TuyaOpen IDE extension. Download the latest .vsix from ${url}, then install it with code --install-extension <path-to-vsix> (VS Code) or cursor --install-extension <path-to-vsix> (Cursor), and reload the editor window so the extension activates.`,
  },
  zh: {
    loading: '正在获取 Open VSX 最新版本…',
    latest: '最新版本',
    prompt: (url) =>
      `安装 TuyaOpen IDE 扩展。从 ${url} 下载最新 .vsix，然后用 code --install-extension <路径.vsix>（VS Code）或 cursor --install-extension <路径.vsix>（Cursor）安装，并重新加载编辑器窗口让扩展生效。`,
  },
}

export default function TuyaOpenIdeAgentInstallPrompt({ locale = 'en' }) {
  const { version, downloadUrl, loading } = useLatestVsix()
  const text = copy[locale] || copy.en

  return (
    <>
      <p>
        {loading && `${text.loading} `}
        <strong>{text.latest}: v{version}</strong>
      </p>
      <pre>
        <code>{text.prompt(downloadUrl)}</code>
      </pre>
    </>
  )
}
