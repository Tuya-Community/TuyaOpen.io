/**
 * Inline Lucide-style icons for the web-serial tool. currentColor, 24-grid,
 * stroke-based. The site uses no icon library — this matches the convention in
 * src/pages/learn.jsx. Keep the set small and purposeful.
 */
import React from 'react'

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({size = 18, className, children, ...rest}) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...base}
      {...rest}
    >
      {children}
    </svg>
  )
}

export const UsbIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="19" r="2" />
    <path d="M12 17V7m0 0 4 3m-4-3-4 3" />
    <path d="M9 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm6 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </Svg>
)

export const PlugZapIcon = (p) => (
  <Svg {...p}>
    <path d="M12 2v6m0 0 3-3m-3 3L9 5" />
    <path d="M6 12h12l-1 4a5 5 0 0 1-4.9 4H8.9A5 5 0 0 1 4 16Z" />
    <path d="M7 20H5m0 0v-2m14 2h2m0-2v2" />
  </Svg>
)

export const PowerIcon = (p) => (
  <Svg {...p}>
    <path d="M12 2v10" />
    <path d="M18.4 6.6a9 9 0 1 1-12.8 0" />
  </Svg>
)

export const KeyRoundIcon = (p) => (
  <Svg {...p}>
    <circle cx="7.5" cy="15.5" r="3.5" />
    <path d="m10 13 8.5-8.5" />
    <path d="m15 5 3 3M18 3l3 3" />
  </Svg>
)

export const CpuIcon = (p) => (
  <Svg {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M9 2v2m6-2v2M9 20v2m6-2v2M2 9h2m-2 6h2m16-6h2m-2 6h2" />
  </Svg>
)

export const TerminalIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m7 9 3 3-3 3M13 15h4" />
  </Svg>
)

export const UploadIcon = (p) => (
  <Svg {...p}>
    <path d="M12 16V4m0 0 4 4m-4-4-4 4" />
    <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </Svg>
)

export const FileIcon = (p) => (
  <Svg {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
  </Svg>
)

export const PlayIcon = (p) => (
  <Svg {...p}>
    <path d="M6 4.5v15l13-7.5z" fill="currentColor" stroke="none" />
  </Svg>
)

export const SquareIcon = (p) => (
  <Svg {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none" />
  </Svg>
)

export const TrashIcon = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13" />
    <path d="M10 11v6M14 11v6" />
  </Svg>
)

export const CopyIcon = (p) => (
  <Svg {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </Svg>
)

export const CheckIcon = (p) => (
  <Svg {...p}>
    <path d="m4 12 5 5L20 6" />
  </Svg>
)

export const ChevronDownIcon = (p) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
)

export const AlertIcon = (p) => (
  <Svg {...p}>
    <path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4m0 4h.01" />
  </Svg>
)

export const InfoIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5m0-8h.01" />
  </Svg>
)

export const XIcon = (p) => (
  <Svg {...p}>
    <path d="M6 6 18 18M18 6 6 18" />
  </Svg>
)

export const DownloadIcon = (p) => (
  <Svg {...p}>
    <path d="M12 4v12m0 0 4-4m-4 4-4-4" />
    <path d="M4 18h16" />
  </Svg>
)

export const ShieldIcon = (p) => (
  <Svg {...p}>
    <path d="M12 3 5 6v6c0 4.4 3 7.5 7 9 4-1.5 7-4.6 7-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
)

export const SendIcon = (p) => (
  <Svg {...p}>
    <path d="M14 4 21 12l-7 8" />
    <path d="M3 12h17" />
  </Svg>
)

export const EraserIcon = (p) => (
  <Svg {...p}>
    <path d="M8 3h8l5 5a2 2 0 0 1 0 2.8l-7.6 7.6a2 2 0 0 1-2.8 0L4 12.8a2 2 0 0 1 0-2.8z" />
    <path d="M8 8 4 12l4 4h12" />
  </Svg>
)

export const RotateIcon = (p) => (
  <Svg {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 4v4h4" />
  </Svg>
)

export const BookIcon = (p) => (
  <Svg {...p}>
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
    <path d="M4 5v14" />
  </Svg>
)
