/**
 * Prefix an internal site path with the active Docusaurus locale.
 *
 * Content is currently available in English and Chinese only, but the route
 * must still stay inside the active locale when a user is browsing Korean.
 */
export function localePath(locale, path) {
  if (path === '') return locale === 'en' ? '' : `/${locale}`
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  if (path.startsWith(`/${locale}/`) || path === `/${locale}`) return path
  return locale === 'en' ? path : `/${locale}${path}`
}
