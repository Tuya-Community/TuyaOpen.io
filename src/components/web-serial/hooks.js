import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

import { pickLocale } from './i18n'

/** Resolve the active locale ("en" | "zh") from Docusaurus context. */
export function useLocale() {
  const { i18n } = useDocusaurusContext()
  return pickLocale(i18n?.currentLocale)
}
