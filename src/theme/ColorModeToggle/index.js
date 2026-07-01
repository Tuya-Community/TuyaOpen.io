/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { translate } from '@docusaurus/Translate'
import useIsBrowser from '@docusaurus/useIsBrowser'
import IconDarkMode from '@theme/Icon/DarkMode'
import IconLightMode from '@theme/Icon/LightMode'
import clsx from 'clsx'
import React from 'react'

import styles from './styles.module.css'

// Swizzled from the default theme so this is a simple 2-state light/dark
// toggle: the icon always reflects the *current* theme (sun in light, moon in
// dark — never the ambiguous "system" monitor icon), hovering surfaces the
// current theme via the title tooltip, and a single click switches to the
// opposite theme. The wrapper (Navbar/ColorModeToggle) feeds us the effective
// color mode as `value`.
function getColorModeLabel(colorMode) {
  return colorMode === 'dark'
    ? translate({
        message: 'dark mode',
        id: 'theme.colorToggle.ariaLabel.mode.dark',
        description: 'The name for the dark color mode',
      })
    : translate({
        message: 'light mode',
        id: 'theme.colorToggle.ariaLabel.mode.light',
        description: 'The name for the light color mode',
      })
}
function getColorModeAriaLabel(colorMode) {
  return translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the color mode toggle',
    },
    {
      mode: getColorModeLabel(colorMode),
    },
  )
}
function ColorModeToggle({ className, buttonClassName, value, onChange }) {
  const isBrowser = useIsBrowser()
  const nextColorMode = value === 'dark' ? 'light' : 'dark'
  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        className={clsx('clean-btn', styles.toggleButton, !isBrowser && styles.toggleButtonDisabled, buttonClassName)}
        type="button"
        onClick={() => onChange(nextColorMode)}
        disabled={!isBrowser}
        title={getColorModeLabel(value)}
        aria-label={getColorModeAriaLabel(value)}
      >
        <IconLightMode aria-hidden className={clsx(styles.toggleIcon, styles.lightToggleIcon)} />
        <IconDarkMode aria-hidden className={clsx(styles.toggleIcon, styles.darkToggleIcon)} />
      </button>
    </div>
  )
}
export default React.memo(ColorModeToggle)
