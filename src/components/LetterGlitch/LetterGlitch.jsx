import { useEffect, useRef } from 'react'

/**
 * LetterGlitch — integrated from React Bits (https://reactbits.dev), JS + CSS
 * variant. Renders a canvas grid of characters that continuously scramble.
 *
 * Local extension: pass `imageSrc` to mask the glitch to an image — only grid
 * cells covering opaque (non-white) image pixels render a letter, and each
 * letter is colored from the sampled pixel. This turns the effect into an
 * image "made of" glitching letters (used for the hero device visual). With no
 * `imageSrc` it behaves exactly like the upstream component.
 */
const LetterGlitch = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  className = '',
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
  // --- local extensions ---
  imageSrc,
  background = '#000000',
  fontSize = 16,
  charWidth = 10,
  charHeight = 20,
  dropWhite = true,
  whiteThreshold = 232,
  brightness = 1.14,
  saturation = 1.4,
  contrast = 1.3,
}) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const letters = useRef([])
  const grid = useRef({ columns: 0, rows: 0 })
  const context = useRef(null)
  const lastGlitchTime = useRef(Date.now())
  const imageRef = useRef(null)
  const cellMeta = useRef(null)

  const lettersAndSymbols = Array.from(characters)

  const getRandomChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]

  const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)]

  const hexToRgb = hex => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : null
  }

  const interpolateColor = (start, end, factor) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    }
    return `rgb(${result.r}, ${result.g}, ${result.b})`
  }

  const clamp = v => (v < 0 ? 0 : v > 255 ? 255 : Math.round(v))
  const enhance = (r, g, b) => {
    r *= brightness
    g *= brightness
    b *= brightness
    r = (r - 128) * contrast + 128
    g = (g - 128) * contrast + 128
    b = (b - 128) * contrast + 128
    const luma = 0.299 * r + 0.587 * g + 0.114 * b
    r = luma + (r - luma) * saturation
    g = luma + (g - luma) * saturation
    b = luma + (b - luma) * saturation
    return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`
  }

  const calculateGrid = (width, height) => ({
    columns: Math.ceil(width / charWidth),
    rows: Math.ceil(height / charHeight),
  })

  // Sample the image into a per-cell {color} map (or null for empty cells).
  const buildImageMeta = (columns, rows) => {
    const img = imageRef.current
    if (!img || !img.naturalWidth) return null
    const panelW = columns * charWidth
    const panelH = rows * charHeight
    const bs = Math.min(panelW / img.naturalWidth, panelH / img.naturalHeight)
    const dw = Math.max(1, Math.floor(img.naturalWidth * bs))
    const dh = Math.max(1, Math.floor(img.naturalHeight * bs))
    const ox = (panelW - dw) / 2
    const oy = (panelH - dh) / 2
    const tmp = document.createElement('canvas')
    tmp.width = panelW
    tmp.height = panelH
    const tctx = tmp.getContext('2d', { willReadFrequently: true })
    tctx.drawImage(img, ox, oy, dw, dh)
    const data = tctx.getImageData(0, 0, panelW, panelH).data
    const meta = new Array(columns * rows)
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const px = Math.min(panelW - 1, Math.floor(col * charWidth + charWidth / 2))
        const py = Math.min(panelH - 1, Math.floor(row * charHeight + charHeight / 2))
        const i4 = (py * panelW + px) * 4
        const r = data[i4]
        const g = data[i4 + 1]
        const b = data[i4 + 2]
        const a = data[i4 + 3]
        const included = a >= 128 && !(dropWhite && r > whiteThreshold && g > whiteThreshold && b > whiteThreshold)
        meta[row * columns + col] = included ? { color: enhance(r, g, b) } : null
      }
    }
    return meta
  }

  const initializeLetters = (columns, rows) => {
    grid.current = { columns, rows }
    const total = columns * rows
    const meta = imageSrc ? buildImageMeta(columns, rows) : null
    cellMeta.current = meta
    letters.current = Array.from({ length: total }, (_, i) => {
      const m = meta ? meta[i] : null
      if (meta && !m) return { empty: true, char: '', color: '' }
      return {
        char: getRandomChar(),
        color: m ? m.color : getRandomColor(),
        targetColor: m ? m.color : getRandomColor(),
        colorProgress: 1,
        empty: false,
      }
    })
  }

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const rect = parent.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height)
    initializeLetters(columns, rows)
    drawLetters()
  }

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return
    const ctx = context.current
    const { width, height } = canvasRef.current.getBoundingClientRect()
    ctx.clearRect(0, 0, width, height)
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = 'top'

    letters.current.forEach((letter, index) => {
      if (letter.empty) return
      const x = (index % grid.current.columns) * charWidth
      const y = Math.floor(index / grid.current.columns) * charHeight
      ctx.fillStyle = letter.color
      ctx.fillText(letter.char, x, y)
    })
  }

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05))
    const imageMode = !!cellMeta.current

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length)
      const letter = letters.current[index]
      if (!letter || letter.empty) continue

      letter.char = getRandomChar()

      if (imageMode) {
        // keep the image-derived color; only the character glitches
        continue
      }

      letter.targetColor = getRandomColor()
      if (!smooth) {
        letter.color = letter.targetColor
        letter.colorProgress = 1
      } else {
        letter.colorProgress = 0
      }
    }
  }

  const handleSmoothTransitions = () => {
    let needsRedraw = false
    letters.current.forEach(letter => {
      if (letter.empty) return
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05
        if (letter.colorProgress > 1) letter.colorProgress = 1

        const startRgb = hexToRgb(letter.color)
        const endRgb = hexToRgb(letter.targetColor)
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress)
          needsRedraw = true
        }
      }
    })

    if (needsRedraw) {
      drawLetters()
    }
  }

  const animate = () => {
    const now = Date.now()
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters()
      drawLetters()
      lastGlitchTime.current = now
    }

    if (smooth) {
      handleSmoothTransitions()
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    context.current = canvas.getContext('2d')

    let disposed = false
    let resizeTimeout

    const start = () => {
      if (disposed) return
      resizeCanvas()
      animate()
    }

    if (imageSrc) {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        if (disposed) return
        imageRef.current = img
        start()
      }
      img.onerror = start
      img.src = imageSrc
    } else {
      imageRef.current = null
      start()
    }

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current)
        resizeCanvas()
        animate()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      disposed = true
      clearTimeout(resizeTimeout)
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth, imageSrc, fontSize, charWidth, charHeight, brightness, saturation, contrast])

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: background,
    overflow: 'hidden',
  }

  const canvasStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
  }

  const outerVignetteStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)',
  }

  const centerVignetteStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
  }

  return (
    <div style={containerStyle} className={className}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && <div style={outerVignetteStyle}></div>}
      {centerVignette && <div style={centerVignetteStyle}></div>}
    </div>
  )
}

export default LetterGlitch
