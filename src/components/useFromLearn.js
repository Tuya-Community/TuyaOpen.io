import { useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { localePath } from '@site/src/utils/localePath'
import { useEffect, useState } from 'react'

/* =========================================================================
 * useFromLearn — detect arrival from the /learn hub.
 * -------------------------------------------------------------------------
 * The hub tags its outbound internal links with `?from=learn`. A landing
 * page can call this hook to swap its "back" button so it returns to the hub
 * the visitor actually came from, instead of that page's default parent.
 *
 * The flag starts false so the server render and the first client render match
 * (no hydration mismatch); it flips to true in an effect once the URL is read.
 *
 * Returns { fromLearn, href, label } — href/label are already localized.
 * ========================================================================= */
export default function useFromLearn() {
  const location = useLocation()
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale
  const contentLocale = locale === 'zh' || locale === 'ko' ? locale : 'en'

  const [fromLearn, setFromLearn] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams(location.search || '')
    setFromLearn(params.get('from') === 'learn')
  }, [location.search])

  return {
    fromLearn,
    href: localePath(locale, '/learn'),
    label:
      contentLocale === 'zh' ? '← 返回学习中心' : contentLocale === 'ko' ? '← 학습 센터로 돌아가기' : '← Back to Learn',
  }
}
