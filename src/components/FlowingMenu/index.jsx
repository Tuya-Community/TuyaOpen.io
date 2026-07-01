import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { clsx } from 'clsx';
import './FlowingMenu.css';

/* =========================================================================
 * FlowingMenu (React Bits) — adapted for category FILTERING.
 * -------------------------------------------------------------------------
 * Instead of navigating (<a href>), each item is a <button> that calls
 * onSelect(key). Keeps the signature GSAP marquee-sweep on hover, adds an
 * active state + count badge, and is theme-aware (light/dark) via site tokens.
 *
 * items: [{ key, text, count }]
 * ========================================================================= */
export default function FlowingMenu({
  items = [],
  activeKey,
  onSelect,
  speed = 12,
  textColor = 'var(--ifm-color-emphasis-800)',
  marqueeBgColor = '#7c5cff',
  marqueeTextColor = '#ffffff',
  borderColor = 'var(--ifm-toc-border-color)',
}) {
  return (
    <nav className="flowmenu" style={{ '--flow-border': borderColor }}>
      {items.map((item) => (
        <MenuItem
          key={item.key}
          itemKey={item.key}
          text={item.text}
          count={item.count}
          active={item.key === activeKey}
          onSelect={onSelect}
          speed={speed}
          textColor={textColor}
          marqueeBgColor={marqueeBgColor}
          marqueeTextColor={marqueeTextColor}
        />
      ))}
    </nav>
  );
}

function MenuItem({ itemKey, text, count, active, onSelect, speed, textColor, marqueeBgColor, marqueeTextColor }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(6);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  // Enough copies of the label to fill the row width for a seamless loop.
  useEffect(() => {
    const calc = () => {
      const part = marqueeInnerRef.current?.querySelector('.flowmarquee__part');
      const row = itemRef.current;
      if (!part || !row) return;
      const contentWidth = part.offsetWidth || 1;
      const needed = Math.ceil((row.offsetWidth || window.innerWidth) / contentWidth) + 2;
      setRepetitions(Math.max(6, needed));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [text]);

  useEffect(() => {
    const setup = () => {
      const inner = marqueeInnerRef.current;
      const part = inner?.querySelector('.flowmarquee__part');
      if (!inner || !part) return;
      const contentWidth = part.offsetWidth;
      if (!contentWidth) return;
      if (animationRef.current) animationRef.current.kill();
      animationRef.current = gsap.to(inner, { x: -contentWidth, duration: speed, ease: 'none', repeat: -1 });
    };
    const timer = setTimeout(setup, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) animationRef.current.kill();
    };
  }, [text, repetitions, speed]);

  const sweep = (ev, entering) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    const tl = gsap.timeline({ defaults: animationDefaults });
    if (entering) {
      tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
        .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    } else {
      tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    }
  };

  return (
    <div className={clsx('flowmenu__item', active && 'flowmenu__item--active')} ref={itemRef}>
      <button
        type="button"
        className="flowmenu__link"
        onClick={() => onSelect(itemKey)}
        onMouseEnter={(e) => sweep(e, true)}
        onMouseLeave={(e) => sweep(e, false)}
        aria-pressed={active}
        style={{ color: textColor }}
      >
        <span className="flowmenu__label">{text}</span>
        {typeof count === 'number' && <span className="flowmenu__count">{count}</span>}
      </button>
      <div className="flowmarquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="flowmarquee__wrap">
          <div className="flowmarquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="flowmarquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <span className="flowmarquee__dot" style={{ background: marqueeTextColor }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
