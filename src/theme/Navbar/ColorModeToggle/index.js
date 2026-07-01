/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common'
import ColorModeToggle from '@theme/ColorModeToggle'
import React from 'react'

import styles from './styles.module.css'

// Swizzled: drive the toggle off the *effective* color mode (always 'light' or
// 'dark') and force a 2-state flip, so a single click always switches the
// visible theme. The default 3-state cycle (system → light → dark) meant that
// starting from "system" the first click could land on the same-looking theme,
// forcing an extra click. Hovering the button still surfaces the current theme
// via the native title tooltip handled inside <ColorModeToggle>.
export default function NavbarColorModeToggle({ className }) {
  const navbarStyle = useThemeConfig().navbar.style
  const { disableSwitch } = useThemeConfig().colorMode
  const { colorMode, setColorMode } = useColorMode()
  if (disableSwitch) {
    return null
  }
  return (
    <ColorModeToggle
      className={className}
      buttonClassName={navbarStyle === 'dark' ? styles.darkNavbarColorModeToggle : undefined}
      value={colorMode}
      onChange={setColorMode}
    />
  )
}
