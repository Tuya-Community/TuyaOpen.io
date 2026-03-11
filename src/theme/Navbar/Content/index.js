/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
  const items = useNavbarItems()
  const [leftItems, rightItems] = splitNavbarItems(items)
  const searchBarItem = items.find((item) => item.type === 'search')
  const showEventRegistration = i18n.currentLocale === 'zh'

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
          {showEventRegistration && <NavbarItem to="/event-registration" label="活动报名" />}
        </>
      }
      right={
        <>
          <NavbarItems items={rightItems} />
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
