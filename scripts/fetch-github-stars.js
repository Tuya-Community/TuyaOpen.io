#!/usr/bin/env node
/**
 * fetch-github-stars.js — bake the current GitHub star count at build time.
 *
 * Writes src/data/github-stars.json, which the navbar badge imports as its
 * initial value. The badge still refreshes live in the browser, but visitors
 * whose network can't reach api.github.com (rate limiting, mainland-China
 * egress, corporate proxies) would otherwise fall back to a permanently stale
 * hardcoded number. Baking at build time means the fallback is never older
 * than the last deploy.
 *
 * Sources are tried in order:
 *   1. api.github.com   (exact; authenticated when GITHUB_TOKEN is set)
 *   2. ungh.cc          (GitHub API mirror, exact, CORS-enabled)
 *   3. img.shields.io   (rounded, e.g. "2k")
 *
 * Failure is non-fatal by design: the existing JSON is kept and the build
 * continues, so an unavailable network never breaks a deploy.
 *
 * Usage: node scripts/fetch-github-stars.js
 */
const fs = require('fs')
const path = require('path')

const REPO = 'tuya/TuyaOpen'
const OUT = path.join(__dirname, '..', 'src', 'data', 'github-stars.json')
const TIMEOUT_MS = 10_000

/** Parse GitHub's abbreviated counts ("1.9k", "2k", "1,954") into an integer. */
function parseAbbrev(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value !== 'string') return null
  const m = value
    .replace(/,/g, '')
    .trim()
    .match(/^(\d+(?:\.\d+)?)\s*([km])?$/i)
  if (!m) return null
  const n = parseFloat(m[1]) * (m[2] ? (m[2].toLowerCase() === 'k' ? 1e3 : 1e6) : 1)
  return Math.round(n)
}

// Only sent to api.github.com — never to the third-party mirrors below, since
// the token must not leave GitHub.
const GITHUB_HEADERS = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'tuyaopen-io-build',
}
// Authenticated requests get 5000/hr instead of 60/hr.
if (process.env.GITHUB_TOKEN) GITHUB_HEADERS.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

const SOURCES = [
  {
    name: 'github-api',
    url: `https://api.github.com/repos/${REPO}`,
    headers: GITHUB_HEADERS,
    pick: (d) => d.stargazers_count,
  },
  {
    name: 'ungh',
    url: `https://ungh.cc/repos/${REPO}`,
    headers: { Accept: 'application/json' },
    pick: (d) => d?.repo?.stars,
  },
  {
    name: 'shields',
    url: `https://img.shields.io/github/stars/${REPO}.json`,
    headers: { Accept: 'application/json' },
    pick: (d) => parseAbbrev(d?.value),
  },
]

async function fetchStars() {
  for (const source of SOURCES) {
    try {
      const res = await fetch(source.url, {
        headers: source.headers,
        signal: AbortSignal.timeout(TIMEOUT_MS),
      })
      if (!res.ok) {
        console.warn(`[github-stars] ${source.name}: HTTP ${res.status}`)
        continue
      }
      const n = parseAbbrev(source.pick(await res.json()))
      if (Number.isFinite(n) && n > 0) {
        console.log(`[github-stars] ${source.name}: ${n}`)
        return { count: n, source: source.name }
      }
      console.warn(`[github-stars] ${source.name}: no usable star count`)
    } catch (error) {
      console.warn(`[github-stars] ${source.name}: ${error.message}`)
    }
  }
  return null
}

function readExisting() {
  try {
    const data = JSON.parse(fs.readFileSync(OUT, 'utf8'))
    return Number.isFinite(data.count) ? data : null
  } catch {
    return null
  }
}

async function main() {
  const existing = readExisting()
  const result = await fetchStars()
  if (!result) {
    console.warn(
      `[github-stars] all sources failed — keeping baked value${
        existing ? ` (${existing.count} from ${existing.updatedAt})` : ' (none yet)'
      }`,
    )
    return
  }

  // Only rewrite on an actual change: the JSON is tracked, so rewriting it on
  // every build would leave a dirty tree behind each deploy.
  if (existing?.count === result.count) {
    console.log(`[github-stars] unchanged at ${result.count}`)
    return
  }

  const payload = {
    count: result.count,
    updatedAt: new Date().toISOString(),
    source: result.source,
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(`[github-stars] wrote ${path.relative(process.cwd(), OUT)} (${result.count})`)
}

main().catch((error) => {
  // Never fail the build over a decorative badge.
  console.warn(`[github-stars] unexpected error: ${error.message}`)
})
