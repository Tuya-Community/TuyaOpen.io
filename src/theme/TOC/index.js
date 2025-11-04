import BrowserOnly from '@docusaurus/BrowserOnly'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import TOC from '@theme-original/TOC'
import React from 'react'

// Component that uses useDoc hook - must be called unconditionally
function GitpodButton() {
  const { metadata } = useDoc()
  const { editUrl } = metadata

  if (!editUrl) {
    return null
  }

  return (
    <a
      style={{
        display: 'block',
        marginBottom: '1rem',
      }}
      href={`https://gitpod.io/#${editUrl.replace('edit', 'blob')}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      <img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" />
    </a>
  )
}

export default function TOCWrapper(props) {
  return (
    <>
      <BrowserOnly fallback={null}>
        {() => {
          if (typeof window === 'undefined') {
            return null
          }

          const pathname = window.location.pathname

          // Check for locale-aware docs paths: /docs/, /en/docs/, /zh/docs/
          // Match patterns like /docs, /docs/, /docs/..., /en/docs, /en/docs/, /en/docs/..., /zh/docs, /zh/docs/, /zh/docs/...
          const isDocsPage = /^\/(en\/docs|zh\/docs|docs)(\/|$)/.test(pathname)

          // Only render GitpodButton (which uses useDoc) when we're on a docs page
          // This ensures the hook is only called when DocProvider is available
          if (!isDocsPage) {
            return null
          }

          // GitpodButton will call useDoc() unconditionally, but we only render it on docs pages
          // return <GitpodButton />
        }}
      </BrowserOnly>
      <TOC {...props} />
    </>
  )
}
