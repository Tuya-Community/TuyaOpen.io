// Swizzled (wrap) @theme/DocItem to emit a per-doc robots noindex meta when
// the doc's frontmatter sets `noindex: true`. Docusaurus 3.10 has no native
// noindex frontmatter field, so this reads props.content.frontMatter.noindex
// (available at the DocItem level — no useDoc needed) and injects a <Head>
// meta on the doc page only. /learn and other routes don't go through DocItem,
// so they are unaffected. See tuyaopen-seo-geo skill.
import Head from '@docusaurus/Head'
import DocItem from '@theme-original/DocItem'
import React from 'react'

export default function DocItemWrapper(props) {
  const noindex = props.content?.frontMatter?.noindex
  return (
    <>
      {noindex && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      <DocItem {...props} />
    </>
  )
}
