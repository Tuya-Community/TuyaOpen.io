import { useEffect, useRef } from 'react'

/**
 * Renders an image as a field of drifting particles on a <canvas>.
 * Inspired by the particle hero on evermind.ai — each visible pixel of the
 * source image becomes a particle that assembles into the image on load,
 * gently sways while idle, and is repelled by the cursor before springing back.
 *
 * The source image is drawn to an offscreen canvas, downsampled, and its pixels
 * are read to seed particles. Near-white pixels are treated as studio background
 * and dropped (set `dropWhite={false}` when using a transparent PNG).
 */
export default function ImageParticles({
  src,
  className,
  style,
  gap = 4, // sampling step in source px (smaller = denser, heavier)
  size = 2, // particle square side in px
  mouseRadius = 90,
  spring = 0.075,
  friction = 0.85,
  drift = 1.6, // idle sway amplitude in px
  dropWhite = true,
  whiteThreshold = 232,
  brightness = 1.14, // >1 lifts the photo so particles pop over the bg
  saturation = 1.35, // >1 makes the colors richer / more "fitting"
  contrast = 1, // >1 pushes tones away from mid-gray for punchier lights/darks
  hueShift = 0, // degrees to rotate every particle's hue (color shift)
  scale = 1, // >1 enlarges the image within the canvas (may crop at edges)
  scatter = 0, // random px offset applied to each particle's home for a dispersed look
  // --- letter-glitch fusion: render each particle as a scrambling character ---
  chars = '', // when set, particles are drawn as glitching letters instead of squares
  fontSize = 14, // letter size in px (letter mode)
  glitchSpeed = 60, // ms between character-scramble ticks
  glitchFraction = 0.08, // portion of particles rescrambled each tick
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !src) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

    let particles = []
    let width = 0
    let height = 0
    let frame = 0
    let raf = 0
    let disposed = false
    const mouse = { x: -9999, y: -9999 }
    const charset = chars ? Array.from(chars) : null
    const randomChar = () => charset[(Math.random() * charset.length) | 0]
    let lastGlitch = 0

    const clamp = v => (v < 0 ? 0 : v > 255 ? 255 : Math.round(v))
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    function rotateHue(r, g, b, deg) {
      r /= 255
      g /= 255
      b /= 255
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h
      let s
      const l = (max + min) / 2
      if (max === min) {
        return [r * 255, g * 255, b * 255] // gray — nothing to rotate
      }
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
      else if (max === g) h = (b - r) / d + 2
      else h = (r - g) / d + 4
      h /= 6
      h = (h + deg / 360) % 1
      if (h < 0) h += 1
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      return [hue2rgb(p, q, h + 1 / 3) * 255, hue2rgb(p, q, h) * 255, hue2rgb(p, q, h - 1 / 3) * 255]
    }
    function enhance(r, g, b) {
      r *= brightness
      g *= brightness
      b *= brightness
      // contrast around mid-gray
      r = (r - 128) * contrast + 128
      g = (g - 128) * contrast + 128
      b = (b - 128) * contrast + 128
      const luma = 0.299 * r + 0.587 * g + 0.114 * b
      r = luma + (r - luma) * saturation
      g = luma + (g - luma) * saturation
      b = luma + (b - luma) * saturation
      if (hueShift) [r, g, b] = rotateHue(clamp(r), clamp(g), clamp(b), hueShift)
      return `rgb(${clamp(r)},${clamp(g)},${clamp(b)})`
    }

    function fit() {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function buildParticles(img) {
      if (!img.naturalWidth || !width || !height) return
      // "contain" fit of the image inside the canvas box, then scaled up
      const baseScale = Math.min(width / img.naturalWidth, height / img.naturalHeight) * scale
      const drawW = Math.max(1, Math.floor(img.naturalWidth * baseScale))
      const drawH = Math.max(1, Math.floor(img.naturalHeight * baseScale))
      const offX = (width - drawW) / 2
      const offY = (height - drawH) / 2

      const tmp = document.createElement('canvas')
      tmp.width = drawW
      tmp.height = drawH
      const tctx = tmp.getContext('2d', { willReadFrequently: true })
      tctx.drawImage(img, 0, 0, drawW, drawH)
      const data = tctx.getImageData(0, 0, drawW, drawH).data

      const next = []
      for (let y = 0; y < drawH; y += gap) {
        for (let x = 0; x < drawW; x += gap) {
          const idx = (y * drawW + x) * 4
          const r = data[idx]
          const g = data[idx + 1]
          const b = data[idx + 2]
          const a = data[idx + 3]
          if (a < 128) continue
          if (dropWhite && r > whiteThreshold && g > whiteThreshold && b > whiteThreshold) continue
          const hx = offX + x + (scatter ? (Math.random() - 0.5) * 2 * scatter : 0)
          const hy = offY + y + (scatter ? (Math.random() - 0.5) * 2 * scatter : 0)
          next.push({
            hx,
            hy,
            x: reduce ? hx : Math.random() * width,
            y: reduce ? hy : Math.random() * height,
            vx: 0,
            vy: 0,
            c: enhance(r, g, b),
            ch: charset ? randomChar() : null,
            ph: Math.random() * Math.PI * 2,
          })
        }
      }
      particles = next
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      if (charset) {
        ctx.font = `${fontSize}px monospace`
        ctx.textBaseline = 'top'
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          ctx.fillStyle = p.c
          ctx.fillText(p.ch, p.x, p.y)
        }
      } else {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          ctx.fillStyle = p.c
          ctx.fillRect(p.x, p.y, size, size)
        }
      }
    }

    function step() {
      frame++
      // periodically scramble a fraction of the characters (letter-glitch)
      if (charset && particles.length) {
        const now = Date.now()
        if (now - lastGlitch >= glitchSpeed) {
          const n = Math.max(1, Math.floor(particles.length * glitchFraction))
          for (let k = 0; k < n; k++) {
            const p = particles[(Math.random() * particles.length) | 0]
            if (p) p.ch = randomChar()
          }
          lastGlitch = now
        }
      }
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        // gentle idle sway around the home position
        const tx = p.hx + Math.sin(frame * 0.015 + p.ph) * drift
        const ty = p.hy + Math.cos(frame * 0.017 + p.ph) * drift
        p.vx += (tx - p.x) * spring
        p.vy += (ty - p.y) * spring
        // cursor repel
        const mdx = p.x - mouse.x
        const mdy = p.y - mouse.y
        const d2 = mdx * mdx + mdy * mdy
        if (d2 < mouseRadius * mouseRadius) {
          const dist = Math.sqrt(d2) || 1
          const force = (1 - dist / mouseRadius) * 6
          p.vx += (mdx / dist) * force
          p.vy += (mdy / dist) * force
        }
        p.vx *= friction
        p.vy *= friction
        p.x += p.vx
        p.y += p.vy
      }
      draw()
      if (!disposed) raf = requestAnimationFrame(step)
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function onPointerLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }
    function onResize() {
      fit()
      if (imgRef.complete && imgRef.naturalWidth) {
        buildParticles(imgRef)
        if (reduce) draw()
      }
    }

    fit()
    const imgRef = new Image()
    imgRef.decoding = 'async'
    imgRef.onload = () => {
      if (disposed) return
      buildParticles(imgRef)
      if (reduce) {
        draw()
      } else {
        raf = requestAnimationFrame(step)
      }
    }
    imgRef.src = src

    window.addEventListener('resize', onResize)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, gap, size, mouseRadius, spring, friction, drift, dropWhite, whiteThreshold, brightness, saturation, contrast, hueShift, scale, scatter, chars, fontSize, glitchSpeed, glitchFraction])

  return <canvas ref={canvasRef} className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }} />
}
