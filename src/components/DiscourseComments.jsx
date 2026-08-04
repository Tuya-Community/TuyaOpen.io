import React, { useEffect, useRef } from 'react'

/**
 * Embeds Discourse comments for the current page.
 *
 * @param {Object} props
 * @param {string} [props.discourseUrl='https://forum-tuyaopen.discourse.group/'] - Discourse forum URL.
 * @param {string} [props.discourseUsername] - Discourse username of the topic author.
 * @param {string} [props.embedUrl] - Canonical URL for the embedding page (defaults to current page URL).
 * @param {string} [props.embedHeight='800px'] - Height of the embedded iframe.
 * @param {boolean} [props.fullApp=false] - Enable full app mode (true = nav stays in iframe).
 */
export default function DiscourseComments({
  discourseUrl = 'https://forum-tuyaopen.discourse.group/',
  discourseUsername,
  embedUrl,
  embedHeight = '800px',
  fullApp = false,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any previous embed state to force fresh validation
    delete window.DiscourseEmbed
    const existingIframe = containerRef.current.querySelector('iframe')
    if (existingIframe) existingIframe.remove()

    const canonicalUrl = embedUrl || window.location.href
    const config = {
      discourseUrl,
      discourseEmbedUrl: canonicalUrl,
      fullApp,
      embedHeight,
    }

    // Expose config globally for the embed script
    window.DiscourseEmbed = config

    // Set discourse-username meta tag if provided
    let metaTag = null
    if (discourseUsername) {
      // Remove any existing meta tag first
      document.querySelector('meta[name="discourse-username"]')?.remove()
      metaTag = document.createElement('meta')
      metaTag.name = 'discourse-username'
      metaTag.content = discourseUsername
      document.head.appendChild(metaTag)
    }

    // Load the embed script with cache-busting to force fresh validation
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = discourseUrl + 'javascripts/embed.js?v=' + Date.now()
    ;(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script)

    return () => {
      if (metaTag) {
        document.head.removeChild(metaTag)
      }
      // Cleanup: remove the script and iframe
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      const iframe = containerRef.current?.querySelector('iframe')
      if (iframe) {
        iframe.remove()
      }
    }
  }, [discourseUrl, discourseUsername, embedUrl, embedHeight, fullApp])

  return (
    <>
      <style>{`
        #discourse-comments {
          overflow: hidden !important;
        }
        #discourse-comments iframe {
          margin-top: -60px !important;
          height: calc(100% + 60px) !important;
        }
      `}</style>
      <div id="discourse-comments" ref={containerRef} />
    </>
  )
}
