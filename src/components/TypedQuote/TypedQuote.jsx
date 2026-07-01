import React, { useEffect, useRef, useState } from 'react'

import TextType from '@site/src/components/TextType/TextType'

import './TypedQuote.css'

// Small pause between segments so the caret hands off cleanly.
const SEG_BUFFER = 160

/**
 * Types a pull quote once (no loop) as three sequential segments —
 * pre → em → post — so the emphasized middle keeps its gradient highlight
 * (via the page's `.quoteText em` rule) while the rest inherits the theme
 * heading color. A single caret travels through the segments and rests at the
 * end. Typing starts when the quote scrolls into view.
 */
export default function TypedQuote({ pre, em, post, speed = 35, cursorCharacter = '|' }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const [stage, setStage] = useState(0) // 0: pre, 1: em, 2: post (+done)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return undefined
    const preMs = pre.length * speed + SEG_BUFFER
    const emMs = em.length * speed + SEG_BUFFER
    const timers = [setTimeout(() => setStage(1), preMs), setTimeout(() => setStage(2), preMs + emMs)]
    return () => timers.forEach(clearTimeout)
  }, [started, pre, em, speed])

  return (
    <span ref={ref} className="typed-quote" aria-hidden="true">
      {/* Reserves the full wrapped height so content below never shifts. */}
      <span className="typed-quote__ghost">
        {pre}
        <em>{em}</em>
        {post}
        {/* Mirror the trailing caret's width so wrapping matches the live text. */}
        <span className="text-type__cursor">{cursorCharacter}</span>
      </span>
      <span className="typed-quote__live">
        {started && (
          <>
            <TextType
              as="span"
              text={[pre]}
              typingSpeed={speed}
              loop={false}
              showCursor={stage === 0}
              cursorCharacter={cursorCharacter}
            />
            {stage >= 1 && (
              <TextType
                as="em"
                text={[em]}
                typingSpeed={speed}
                loop={false}
                showCursor={stage === 1}
                cursorCharacter={cursorCharacter}
              />
            )}
            {stage >= 2 && (
              <TextType
                as="span"
                text={[post]}
                typingSpeed={speed}
                loop={false}
                showCursor
                cursorCharacter={cursorCharacter}
              />
            )}
          </>
        )}
      </span>
    </span>
  )
}
