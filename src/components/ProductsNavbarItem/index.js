import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import clsx from 'clsx'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { productsMenu } from '../../data/productsMenu'
import styles from './styles.module.css'

const ICONS = {
  ide: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="m8 9-2 2 2 2M13 9l2 2-2 2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  sdk: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  arduino: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="8" width="16" height="8" rx="4" />
      <path d="M8 12h2M14 12h2M15 11v2" />
      <path d="M2 12h2M20 12h2" />
    </svg>
  ),
  ducky: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="15" cy="13" r="1" />
      <path d="M12 3v3M9 19v2M15 19v2" />
    </svg>
  ),
  chip: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  wifi: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    </svg>
  ),
  pi: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <path d="M14 10h4M14 14h4" />
    </svg>
  ),
  terminal: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m6 9 3 3-3 3M13 15h4" />
    </svg>
  ),
  web: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  license: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  ),
}

function ItemLink({ item, className, tabIndex, children }) {
  const { i18n } = useDocusaurusContext()
  // Internal links aren't locale-prefixed automatically; prepend the active locale.
  const localePrefix = i18n.currentLocale === i18n.defaultLocale ? '' : `/${i18n.currentLocale}`
  const href = item.external || !item.href.startsWith('/') ? item.href : `${localePrefix}${item.href}`
  const extra = item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <Link to={href} className={className} tabIndex={tabIndex} {...extra}>
      {children}
    </Link>
  )
}

// Mobile sidebar: flattened, collapsible-free list grouped by heading.
function MobileMenu({ menu }) {
  return (
    <li className="menu__list-item">
      <div className={styles.mobileLabel}>{menu.label}</div>
      <ul className="menu__list">
        {menu.groups.map((group) => (
          <li key={group.heading} className={styles.mobileGroup}>
            <div className={styles.mobileGroupHeading}>{group.heading}</div>
            {group.items.map((item) => (
              <ItemLink key={item.title} item={item} className="menu__link">
                {item.title}
              </ItemLink>
            ))}
          </li>
        ))}
      </ul>
    </li>
  )
}

export default function ProductsNavbarItem({ mobile }) {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en'
  const menu = productsMenu[locale]

  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)
  const wrapRef = useRef(null)

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const openMenu = useCallback(() => {
    cancelClose()
    setOpen(true)
  }, [cancelClose])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 140)
  }, [cancelClose])

  useEffect(() => () => cancelClose(), [cancelClose])

  const handleBlur = useCallback((e) => {
    if (!wrapRef.current?.contains(e.relatedTarget)) setOpen(false)
  }, [])

  if (mobile) return <MobileMenu menu={menu} />

  return (
    <div
      ref={wrapRef}
      className={styles.navItem}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={handleBlur}
    >
      <button
        type="button"
        className={clsx('navbar__item', 'navbar__link', styles.trigger, open && styles.triggerOpen)}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onFocus={openMenu}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false)
        }}
      >
        {menu.label}
        <svg
          className={styles.chevron}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div className={clsx(styles.mega, open && styles.megaOpen)}>
        <div className={styles.megaInner} role="menu">
          {menu.groups.map((group) => (
            <div key={group.heading} className={styles.group}>
              <span className={styles.groupHeading}>{group.heading}</span>
              <div className={styles.groupItems}>
                {group.items.map((item) => (
                  <ItemLink key={item.title} item={item} className={styles.item} tabIndex={open ? 0 : -1}>
                    <span className={styles.itemIcon}>{ICONS[item.icon]}</span>
                    <span className={styles.itemText}>
                      <span className={styles.itemTitleRow}>
                        <span className={styles.itemTitle}>{item.title}</span>
                        {item.badge && <span className={styles.itemBadge}>{item.badge}</span>}
                      </span>
                      <span className={styles.itemSub}>{item.subtitle}</span>
                    </span>
                  </ItemLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
