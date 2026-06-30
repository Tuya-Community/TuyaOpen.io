/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useLocation } from '@docusaurus/router'
import { ErrorCauseBoundary, ThemeClassNames, useThemeConfig } from '@docusaurus/theme-common'
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle'
import NavbarLogo from '@theme/Navbar/Logo'
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle'
import NavbarSearch from '@theme/Navbar/Search'
import NavbarItem from '@theme/NavbarItem'
import SearchBar from '@theme/SearchBar'
import clsx from 'clsx'
import React from 'react'

import GithubStars from '../../../components/GithubStars/GithubStars'
import styles from './styles.module.css'

function useNavbarItems() {
  return useThemeConfig().navbar.items
}

function NavbarItems({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              { cause: error },
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  )
}

function NavbarContentLayout({ left, right }) {
  return (
    <div className="navbar__inner">
      <div className={clsx(ThemeClassNames.layout.navbar.containerLeft, 'navbar__items')}>{left}</div>
      <div className={clsx(ThemeClassNames.layout.navbar.containerRight, 'navbar__items navbar__items--right')}>
        {right}
      </div>
    </div>
  )
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar()
  const { i18n } = useDocusaurusContext()
  const { pathname } = useLocation()
  const rawItems = useNavbarItems()
  const showEventRegistration = i18n.currentLocale === 'zh'
  // The zh-only "活动报名" link lives inside the Ecosystem (生态) dropdown.
  const items = showEventRegistration
    ? rawItems.map((item) =>
        // In zh, useNavbarItems() returns the translated label (生态), so match both.
        item.label === 'Ecosystem' || item.label === '生态'
          ? {
              ...item,
              items: [
                {
                  href: 'https://images.tuyacn.com/rms-static/fe11d250-54e9-11f1-8d53-258e63d3fe0e-1779349939189.html?tyName=event-registration.html',
                  label: '活动报名',
                  target: '_blank',
                  rel: 'noopener noreferrer',
                },
                ...item.items,
              ],
            }
          : item,
      )
    : rawItems
  const [leftItems, rightItems] = splitNavbarItems(items)
  const searchBarItem = items.find((item) => item.type === 'search')
  // Append an "IDE" wordmark after the logo on the TuyaOpen IDE product page.
  const isIdePage = pathname.replace(/\/$/, '').endsWith('/tuyaopen-ide')

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          {isIdePage && <span className={styles.productTag}>IDE</span>}
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <>
          <NavbarItems items={rightItems} />
          <GithubStars />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  )
}
