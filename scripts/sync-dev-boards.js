#!/usr/bin/env node
/**
 * sync-dev-boards.js — prebuild data sync for the /dev-boards catalog.
 *
 * Reads the tuyaopen-ide-manifests git submodule and emits the data the
 * dev-boards page consumes:
 *
 *   src/data/devBoards.js              — small catalog (boards per locale,
 *                                        platforms, variants, tags) imported by
 *                                        the page.
 *   static/dev-boards-data/<id>.json   — full per-board detail, lazy-fetched
 *                                        when a visitor opens a board.
 *   static/dev-boards-data/platforms/  — full per-chip spec, lazy-fetched when
 *                                        a visitor opens a platform detail.
 *   static/img/boards/...              — board + chip images from the manifest.
 *
 * Source: external/tuyaopen-ide-manifests (git submodule, pinned in .gitmodules).
 * The submodule is auto-initialized by ensureSubmodule() below if missing, so
 * `npm run build` / `start` / `deploy` work on a fresh clone. In CI it is also
 * fetched via `actions/checkout` with `submodules: true`.
 *
 * This script is idempotent; run it via `npm run build` / `npm run start` /
 * `npm run sync:dev-boards`.
 */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ROOT = path.resolve(__dirname, '..')
const MANIFEST_DIR = path.join(ROOT, 'external/tuyaopen-ide-manifests')
const BOARDS_DIR = path.join(MANIFEST_DIR, 'boards-and-chips')

const OUT_DATA = path.join(ROOT, 'src/data/devBoards.js')
const OUT_DETAIL_DIR = path.join(ROOT, 'static/dev-boards-data')
const OUT_IMAGES_DIR = path.join(ROOT, 'static/img/boards')

// Site locales. The manifest localizes with `zh-CN`; the site uses `zh`.
const LOCALES = ['en', 'zh']

/** Resolve a LocalizedString (string | {locale: string}) for a site locale. */
function pick(field, locale) {
  if (field == null) return undefined
  if (typeof field === 'string') return field
  if (locale === 'zh') {
    return field['zh-CN'] || field['zh'] || field['en'] || firstVal(field)
  }
  return field['en'] || firstVal(field)
}
function firstVal(obj) {
  for (const k of Object.keys(obj)) if (obj[k]) return obj[k]
  return undefined
}

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}
function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}
function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true })
}

/**
 * Ensure the tuyaopen-ide-manifests submodule is checked out. In CI it is
 * fetched by `actions/checkout` with `submodules: true`; locally it may be
 * missing after a fresh clone. Auto-init so `npm run build`/`start`/`deploy`
 * work without a manual `git submodule update --init`.
 */
function ensureSubmodule() {
  const marker = path.join(MANIFEST_DIR, 'registry.json')
  if (fs.existsSync(marker)) return
  console.log('[dev-boards] manifest submodule not checked out — initializing...')
  try {
    execSync('git submodule update --init -- external/tuyaopen-ide-manifests', {
      stdio: 'inherit',
    })
  } catch (e) {
    console.error(`[dev-boards] manifest submodule not found at ${MANIFEST_DIR}`)
    console.error('[dev-boards] run: git submodule update --init external/tuyaopen-ide-manifests')
    process.exit(1)
  }
  if (!fs.existsSync(marker)) {
    console.error(`[dev-boards] manifest submodule still missing at ${MANIFEST_DIR}`)
    console.error('[dev-boards] run: git submodule update --init external/tuyaopen-ide-manifests')
    process.exit(1)
  }
}

function main() {
  ensureSubmodule()

  const index = readJSON(path.join(BOARDS_DIR, 'index.json'))
  const tagsReg = readJSON(path.join(BOARDS_DIR, 'tags.json'))
  const platformsIdx = readJSON(path.join(MANIFEST_DIR, 'platforms/index.json'))

  // --- tags: flatten the registry into tagId -> {en, zh, category} ---
  const tags = {}
  for (const cat of tagsReg.categories || []) {
    for (const t of cat.tags || []) {
      tags[t.id] = { en: t.en || t.id, zh: t['zh-CN'] || t.en || t.id, category: cat.id }
    }
  }

  // --- platforms: a board's platformId may be a *variant* id (e.g. "esp32s3")
  //     rather than its group id ("esp32"). Use the platforms domain to map
  //     variant → group, then derive one display name per group. ---
  const variantToGroup = {} // variant id -> group id
  const platformGroups = {} // group id -> {id, name:{en,zh}, variants:[]}
  for (const v of platformsIdx.items || []) {
    const gid = v.platformId || v.id
    variantToGroup[v.id] = gid
    if (!platformGroups[gid]) {
      platformGroups[gid] = { id: gid, name: { en: gid, zh: gid }, variants: [] }
    }
    platformGroups[gid].variants.push(v.id)
    // Prefer the rep variant (id === group) for the name; else first variant.
    if (v.id === gid && v.name) {
      platformGroups[gid].name = { en: pick(v.name, 'en'), zh: pick(v.name, 'zh') }
    } else if (platformGroups[gid].name.en === gid && v.name) {
      platformGroups[gid].name = { en: pick(v.name, 'en'), zh: pick(v.name, 'zh') }
    }
  }

  // --- variant info: per-chip display data (name, summary, hero image,
  //     detailUrl) for the platform cards + chip detail view. Includes
  //     unpublished variants (e.g. ESP32-S3) because their boards are
  //     published and we still want to group + describe the chip. ---
  const variantInfo = {} // variant id -> {platformId, name, summary, image, detailUrl}
  for (const v of platformsIdx.items || []) {
    variantInfo[v.id] = {
      platformId: v.platformId || v.id,
      name: v.name ? { en: pick(v.name, 'en'), zh: pick(v.name, 'zh') } : { en: v.id, zh: v.id },
      summary: v.summary ? { en: pick(v.summary, 'en'), zh: pick(v.summary, 'zh') } : null,
      image: v.image && v.image.url ? v.image.url.replace(/^images\//, '/img/boards/platforms/') : null,
      detailUrl: v.detailUrl || null,
    }
  }

  // --- ensure output dirs exist. We deliberately do NOT wipe them first:
  //     deleting static/img/boards/ while `docusaurus start` is running
  //     orphans the dev server's static-file watch and it starts returning the
  //     SPA fallback for every asset. Overwriting in place is dev-safe; the
  //     only cost is orphaned files for boards since removed from the manifest
  //     (harmless — the catalog never references them). ---
  ensureDir(OUT_DETAIL_DIR)
  ensureDir(path.join(OUT_DETAIL_DIR, 'platforms'))
  ensureDir(OUT_IMAGES_DIR)

  // --- copy board images wholesale (image urls are rewritten below) ---
  const imagesSrc = path.join(BOARDS_DIR, 'images')
  if (fs.existsSync(imagesSrc)) {
    fs.cpSync(imagesSrc, OUT_IMAGES_DIR, { recursive: true })
  }

  // --- copy chip platform hero images wholesale (variant image urls above
  //     are rewritten to /img/boards/platforms/<variant>/<file>). ---
  const platformImagesSrc = path.join(MANIFEST_DIR, 'platforms/images')
  if (fs.existsSync(platformImagesSrc)) {
    fs.cpSync(platformImagesSrc, path.join(OUT_IMAGES_DIR, 'platforms'), { recursive: true })
  }

  // --- per board: catalog summary (per locale) + lazy detail JSON ---
  const boardsByLocale = { en: [], zh: [] }
  const platformCounts = {}
  const variantCounts = {} // variant id -> board count

  // TuyaOpen site shows TuyaOpen boards (omitted sdks defaults to ['tuyaopen']).
  const items = (index.items || []).filter(
    (b) => b.published !== false && (b.sdks || ['tuyaopen']).includes('tuyaopen'),
  )

  for (const item of items) {
    const id = item.id
    // Normalize a variant platformId (e.g. "esp32s3") to its group ("esp32").
    const platformId = variantToGroup[item.platformId] || item.platformId
    const groupName = platformGroups[platformId]?.name
    // The chip variant (falls back to the group id for boards without variantId).
    const variantId = item.variantId || platformId

    platformCounts[platformId] = (platformCounts[platformId] || 0) + 1
    variantCounts[variantId] = (variantCounts[variantId] || 0) + 1

    // Rewrite image url (manifest-relative "images/<board>/<file>") to the
    // copied static path served at /img/boards/<board>/<file>.
    let image = undefined
    if (item.image && item.image.url) {
      const rel = item.image.url.replace(/^images\//, '')
      image = `/img/boards/${rel}`
    }

    // Emit the full detail JSON (pass-through; client resolves locales).
    let hasDetail = false
    if (item.detailUrl) {
      const detailPath = path.join(MANIFEST_DIR, item.detailUrl)
      if (fs.existsSync(detailPath)) {
        const detail = readJSON(detailPath)
        if (!detail.id) detail.id = id
        fs.writeFileSync(path.join(OUT_DETAIL_DIR, `${id}.json`), JSON.stringify(detail, null, 2))
        hasDetail = true
      }
    }

    for (const locale of LOCALES) {
      boardsByLocale[locale].push({
        id,
        name: pick(item.name, locale) || id,
        manufacturer: pick(item.manufacturer, locale) || undefined,
        platformId,
        platform: groupName ? pick(groupName, locale) : platformId,
        variantId,
        summary: pick(item.summary, locale),
        image,
        tags: item.tags || [],
        sdks: item.sdks || ['tuyaopen'],
        detailUrl: hasDetail ? `/dev-boards-data/${id}.json` : undefined,
      })
    }
  }

  // --- platforms list: only those with boards, sorted by count then name ---
  const platforms = Object.values(platformGroups)
    .map((p) => ({ id: p.id, name: p.name, count: platformCounts[p.id] || 0 }))
    .filter((p) => p.count > 0)
    .sort((a, b) => b.count - a.count || String(a.name.en).localeCompare(String(b.name.en)))

  // --- variants: per-chip catalog entries for the platform cards + chip
  //     detail view. One entry per variant that has at least one board. ---
  const variants = Object.keys(variantCounts)
    .map((vid) => {
      const info = variantInfo[vid] || {
        platformId: variantToGroup[vid] || vid,
        name: { en: vid, zh: vid },
        summary: null,
        image: null,
        detailUrl: null,
      }
      // Copy the platform detail JSON (full chip spec) for the lazy detail view.
      let detailAvailable = false
      if (info.detailUrl) {
        const detailPath = path.join(MANIFEST_DIR, info.detailUrl)
        if (fs.existsSync(detailPath)) {
          let detail = null
          try {
            detail = readJSON(detailPath)
          } catch {
            detail = null
          }
          if (detail) {
            if (!detail.id) detail.id = vid
            fs.writeFileSync(path.join(OUT_DETAIL_DIR, 'platforms', `${vid}.json`), JSON.stringify(detail, null, 2))
            detailAvailable = true
          }
        }
      }
      return {
        id: vid,
        platformId: info.platformId,
        name: info.name,
        summary: info.summary,
        image: info.image,
        detailUrl: detailAvailable ? `/dev-boards-data/platforms/${vid}.json` : null,
        count: variantCounts[vid] || 0,
      }
    })
    .sort((a, b) => b.count - a.count || String(a.name.en).localeCompare(String(b.name.en)))

  // --- emit the catalog module ---
  const payload = {
    boards: boardsByLocale,
    platforms,
    variants,
    tags,
    count: items.length,
    manifestVersion: index.version || `v${index.schemaVersion}`,
    generatedAt: new Date().toISOString(),
  }
  ensureDir(path.dirname(OUT_DATA))
  fs.writeFileSync(
    OUT_DATA,
    `// AUTO-GENERATED by scripts/sync-dev-boards.js — do not edit by hand.\n` +
      `// Source: external/tuyaopen-ide-manifests (git submodule)\n\n` +
      `module.exports = ${JSON.stringify(payload, null, 2)}\n`,
  )

  console.log(
    `[dev-boards] synced ${items.length} boards across ${platforms.length} platforms (${variants.length} chip variants)`,
  )
  console.log(`[dev-boards]   → ${path.relative(ROOT, OUT_DATA)}`)
  console.log(`[dev-boards]   → ${path.relative(ROOT, OUT_DETAIL_DIR)}/*.json`)
  console.log(`[dev-boards]   → ${path.relative(ROOT, OUT_IMAGES_DIR)}/`)
}

main()
