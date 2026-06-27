/**
 * TOC reading rail + active-item highlight.
 *
 * Two effects on the docs table-of-contents, both styled in custom.css:
 *  1. A vertical progress bar — the left border becomes a faint track with a
 *     primary-colored fill whose height tracks how far the reader has scrolled
 *     (via the --toc-progress custom property on the list).
 *  2. A solid background box that slides to the active link as the active
 *     section changes (via --toc-hl-* on an injected .toc-active-hl element),
 *     animated by a CSS transition so it glides up and down.
 *
 * Implemented as a client module so it can attach to the theme-owned TOC DOM
 * and re-bind on every client-side route change.
 */

let cleanup = null

function readingLineOffset() {
  // Reference line a little below the sticky navbar — the point in the
  // document we treat as "currently being read".
  const navbar = document.querySelector('.navbar')
  const navH = navbar ? navbar.offsetHeight : 60
  return navH + 48
}

function setup() {
  if (typeof window === 'undefined') {
    return
  }
  if (cleanup) {
    cleanup()
    cleanup = null
  }

  const ul = document.querySelector('.table-of-contents')
  if (!ul) {
    return
  }

  // Sliding highlight box (a real element so it can animate independently of
  // the rail pseudo-elements).
  let hl = ul.querySelector(':scope > .toc-active-hl')
  if (!hl) {
    hl = document.createElement('div')
    hl.className = 'toc-active-hl'
    ul.insertBefore(hl, ul.firstChild)
  }

  const collect = () =>
    Array.from(ul.querySelectorAll('a.table-of-contents__link'))
      .map((link) => {
        const id = decodeURIComponent((link.hash || '').slice(1))
        const heading = id ? document.getElementById(id) : null
        return { link, heading }
      })
      .filter((e) => e.heading)

  let entries = collect()

  function updateHighlight() {
    const active = ul.querySelector('.table-of-contents__link--active')
    if (!active) {
      ul.style.setProperty('--toc-hl-opacity', '0')
      return
    }
    // Pad the box a little taller than the link so the highlight breathes.
    const pad = 5
    ul.style.setProperty('--toc-hl-top', `${active.offsetTop - pad}px`)
    ul.style.setProperty('--toc-hl-height', `${active.offsetHeight + pad * 2}px`)
    ul.style.setProperty('--toc-hl-opacity', '1')
  }

  function updateProgress() {
    if (!entries.length) {
      return
    }
    const scrollY = window.scrollY || window.pageYOffset || 0
    const readingPos = scrollY + readingLineOffset()
    const tops = entries.map((e) => e.heading.getBoundingClientRect().top + scrollY)

    let current = -1
    for (let i = 0; i < tops.length; i += 1) {
      if (tops[i] <= readingPos) {
        current = i
      } else {
        break
      }
    }

    const article = document.querySelector('article') || document.body
    const contentBottom = article.getBoundingClientRect().bottom + scrollY

    let fillPx = 0
    if (current >= 0) {
      const linkTop = entries[current].link.offsetTop
      const nextLinkTop = current + 1 < entries.length ? entries[current + 1].link.offsetTop : ul.scrollHeight
      const secStart = tops[current]
      const secEnd = current + 1 < tops.length ? tops[current + 1] : contentBottom
      let frac = secEnd > secStart ? (readingPos - secStart) / (secEnd - secStart) : 1
      frac = Math.max(0, Math.min(1, frac))
      fillPx = linkTop + frac * (nextLinkTop - linkTop)
    }

    const atBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2
    if (atBottom) {
      fillPx = ul.scrollHeight
    }

    ul.style.setProperty('--toc-progress', `${Math.round(fillPx)}px`)
  }

  function update() {
    updateHighlight()
    updateProgress()
  }

  let ticking = false
  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        update()
      })
    }
  }

  const refresh = () => {
    entries = collect()
    update()
  }

  // The active class is toggled by the theme on scroll; observe it so the
  // highlight reacts even outside our own scroll handler.
  const observer = new MutationObserver(updateHighlight)
  observer.observe(ul, { subtree: true, attributes: true, attributeFilter: ['class'] })

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })

  // Recompute once content/images settle (their height shifts heading positions).
  const timers = [setTimeout(refresh, 250), setTimeout(refresh, 1000)]

  update()

  cleanup = () => {
    observer.disconnect()
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    timers.forEach(clearTimeout)
    ul.style.removeProperty('--toc-progress')
    ul.style.removeProperty('--toc-hl-top')
    ul.style.removeProperty('--toc-hl-height')
    ul.style.removeProperty('--toc-hl-opacity')
  }
}

export function onRouteDidUpdate() {
  // Defer so the new route's TOC DOM is mounted before we bind to it.
  setTimeout(setup, 0)
}
