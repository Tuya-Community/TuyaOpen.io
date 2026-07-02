import React from 'react';

/* =========================================================================
 * RichText — renders a string with **bold** and `code` spans.
 * -------------------------------------------------------------------------
 * TutorialShell's helper classes render raw text nodes, not markdown, so
 * `**Add Device**` and `tos.py` would otherwise show literally with their
 * marker characters. Use this to wrap any content-string that contains
 * `**bold**` or `` `inline code` `` spans (steps, points, leads, answers).
 *
 * Stays out of the way of <pre>/<code> code blocks — those are still authored
 * as their own elements; RichText only handles inline spans inside prose.
 * ========================================================================= */

const TOKEN_RE = /(\*\*[^*]+\*\*|`[^`]+`)/g;

const inlineCodeStyle = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: '0.85em',
  background: 'rgba(124, 92, 255, 0.08)',
  color: 'var(--brand-primary-dark, #5b3fd6)',
  padding: '0.15rem 0.4rem',
  borderRadius: '6px',
};

export default function RichText({ text, component: Comp = 'span' }) {
  const parts = String(text).split(TOKEN_RE);
  return (
    <Comp>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return (
            <code key={i} style={inlineCodeStyle}>
              {part.slice(1, -1)}
            </code>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </Comp>
  );
}
