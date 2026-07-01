import clsx from 'clsx'
import { motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'

// Adapted from React Bits (https://reactbits.dev) — JavaScript + CSS variant.
// Local adaptations for this Docusaurus + Tailwind (`tw-` prefix) codebase:
//   - `as` prop so the root can be a phrasing element (e.g. a <span> inside an <h1>).
//   - `segmentClassName` to style each animated word/letter (used to carry the
//     hero gradient per-segment so the blur/opacity animation applies to it).
//   - React Bits' unprefixed Tailwind classes replaced with inline styles.
const NBSP = '\u00A0'

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))])

  const keyframes = {}
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])]
  })
  return keyframes
}

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  segmentClassName = '',
  renderSegment,
  style,
  as: Tag = 'p',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(ref.current)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction],
  )

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)))

  return (
    <Tag ref={ref} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
        }
        spanTransition.ease = easing

        return (
          <motion.span
            className={clsx(segmentClassName)}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {renderSegment ? renderSegment(segment, index) : segment === ' ' ? NBSP : segment}
            {animateBy === 'words' && index < elements.length - 1 && NBSP}
          </motion.span>
        )
      })}
    </Tag>
  )
}

export default BlurText
