import clsx from 'clsx'
import React from 'react'

import styles from './PartnersShowcase.module.css'

/**
 * Reusable "collaborate with global partners" band — a full-bleed dark showcase
 * of partner-logo grids (AI models, cloud providers, community/ecosystem).
 *
 * The data ({ sectionTag, title, subtitle, colabSections }) is passed in so both
 * the landing page and the /partners page render the identical section without
 * duplicating markup. Source: homepageCopy[locale].partners.
 */
export default function PartnersShowcase({ sectionTag, title, subtitle, colabSections }) {
  return (
    <div className={styles.partnersShowcase}>
      <div className={styles.partnersShowcaseHeader}>
        <span className={styles.partnersShowcaseTag}>{sectionTag}</span>
        <h2 className={styles.partnersShowcaseTitle}>{title}</h2>
        <p className={styles.partnersShowcaseSubtitle}>{subtitle}</p>
      </div>
      {colabSections?.length > 0 ? (
        <div className={styles.partnersColabBlock}>
          {colabSections.map((section, secIdx) => (
            <div key={secIdx} className={styles.partnersColabSection}>
              <h3 className={styles.partnersColabTitle}>{section.title}</h3>
              <div className={styles.partnersColabGrid}>
                {section.items.map((item) => (
                  <div key={`${secIdx}-${item.alt}-${item.src}`} className={styles.partnersColabCell}>
                    <img
                      className={clsx(
                        styles.partnersColabImg,
                        item.invertForLightBg && styles.partnersColabImgInvertLight,
                      )}
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
