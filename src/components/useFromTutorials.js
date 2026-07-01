import { useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useEffect, useState } from 'react'

/* =========================================================================
 * useFromTutorials — detect arrival from the /tutorials hub.
 * -------------------------------------------------------------------------
 * The hub tags its outbound internal links with `?from=tutorials`. A landing
 * page can call this hook to swap its "back" button so it returns to the hub
 * the visitor actually came from, instead of that page's default parent.
 *
 * The flag starts false so the server render and the first client render match
 * (no hydration mismatch); it flips to true in an effect once the URL is read.
 *
 * Returns { fromTutorials, href, label } — href/label are already localized.
 * ========================================================================= */
export default function useFromTutorials() {
  const location = useLocation()
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en'

  const [fromTutorials, setFromTutorials] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams(location.search || '')
    setFromTutorials(params.get('from') === 'tutorials')
  }, [location.search])

  return {
    fromTutorials,
    href: locale === 'zh' ? '/zh/tutorials' : '/tutorials',
    label: locale === 'zh' ? '← 返回教程' : '← Back to tutorials',
  }
}
