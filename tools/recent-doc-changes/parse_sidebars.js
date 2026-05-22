/**
 * Outputs doc id -> sidebar path (category hierarchy) from sidebars.js.
 * Run from repo root: node tools/recent-doc-changes/parse_sidebars.js
 * Output: one JSON object per line: {"id": "doc/id", "path": "Category / Subcategory"}
 */
const path = require('path')
const sidebars = require(path.join(process.cwd(), 'sidebars.js'))

function walk(items, breadcrumb) {
  if (!breadcrumb) breadcrumb = []
  for (const item of items) {
    if (typeof item === 'string') {
      const p = breadcrumb.length ? breadcrumb.join(' / ') : ''
      console.log(JSON.stringify({ id: item, path: p }))
    } else if (item && item.items) {
      const next = item.label ? [...breadcrumb, item.label] : breadcrumb
      if (item.link && item.link.type === 'doc' && item.link.id) {
        const p = next.length ? next.join(' / ') : ''
        console.log(JSON.stringify({ id: item.link.id, path: p }))
      }
      walk(item.items, next)
    }
  }
}
walk(sidebars.docs)
