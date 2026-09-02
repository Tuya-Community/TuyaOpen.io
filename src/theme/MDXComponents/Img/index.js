import Img from '@theme-original/MDXComponents/Img'
import React from 'react'

/* Screenshots are most of the page weight on the tutorial pages and nearly all
   of them sit below the fold, so defer them by default. Spreading props after
   the defaults lets a caller opt out — a hero image at the top of a page should
   pass loading="eager" so it is not held back. */
export default function ImgWrapper(props) {
  return (
    <figure>
      <Img loading="lazy" decoding="async" {...props} />
      <figcaption
        className="text--italic text--center"
        style={{
          color: 'var(--ifm-color-content-secondary)',
          fontSize: '0.875rem',
        }}
      >
        {props.alt}
      </figcaption>
    </figure>
  )
}
