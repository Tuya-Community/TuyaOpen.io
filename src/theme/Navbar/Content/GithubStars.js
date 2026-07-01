import React, { useEffect, useState } from 'react'

const REPO = 'tuya/TuyaOpen'
const MASCOT_URL = 'https://images.tuyacn.com/fe-static/docs/img/7e618945-0ae2-4290-8844-6c33153e228a.png'
// Shown on first paint (SSR + before the API responds) to avoid layout shift.
const FALLBACK = '1.6k'
const CACHE_KEY = 'tuyaopen-gh-stars'
const CACHE_TTL = 6 * 60 * 60 * 1000 // 6h — avoid hammering the unauthenticated API

function formatStars(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}

/**
 * GitHub link in the navbar, rendered as a bordered pill showing the live star
 * count. Rendering our own <a> (instead of a Docusaurus navbar item) keeps the
 * external-link icon off and lets us update the count client-side.
 */
export default function GithubStars() {
  const [stars, setStars] = useState(FALLBACK)
  const href = `https://github.com/${REPO}`

  useEffect(() => {
    let cancelled = false

    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
      if (cached && typeof cached.n === 'number' && Date.now() - cached.t < CACHE_TTL) {
        setStars(formatStars(cached.n))
        return undefined
      }
    } catch {
      // ignore malformed cache
    }

    fetch(`https://api.github.com/repos/${REPO}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled || typeof data.stargazers_count !== 'number') return
        setStars(formatStars(data.stargazers_count))
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ n: data.stargazers_count, t: Date.now() }))
        } catch {
          // storage may be unavailable (private mode) — the count still shows this session
        }
      })
      .catch(() => {
        // network / rate-limit failure: keep the fallback value
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="header-github">
      {/* Decorative mascot — nudges people toward the star button. Duplicate of
          the link below, so it's hidden from a11y/keyboard to avoid repetition. */}
      <a
        className="header-github__mascot"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={MASCOT_URL} alt="" width={40} />
      </a>
      <a
        className="header-github-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`TuyaOpen on GitHub — ${stars} stars`}
      >
        {stars}
      </a>
    </div>
  )
}
