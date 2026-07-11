import React from 'react'

const STATUS_STYLES = {
  new:        'bg-[#e8def9] text-[#4f378a]',
  contacted:  'bg-[#dce2f7] text-[#002f62]',
  qualified:  'bg-[#c2e7d0] text-[#00531b]',
  proposal:   'bg-[#ffefd6] text-[#7a3a00]',
  won:        'bg-[#c2e7d0] text-[#00531b]',
  lost:       'bg-[#ffdad6] text-[#93000a]',
  active:     'bg-[#c2e7d0] text-[#00531b]',
  'renewal due': 'bg-[#ffefd6] text-[#7a3a00]',
  inactive:   'bg-[#e6e0e9] text-[#49454f]',
}

const DOTS = {
  won:    'bg-[#00531b]',
  active: 'bg-[#00531b]',
  lost:   'bg-[#93000a]',
}

export default function Badge({ label, showDot = false, className = '' }) {
  const style = STATUS_STYLES[label.toLowerCase()] ?? 'bg-[#e6e0e9] text-[#49454f]'
  const dotColor = DOTS[label.toLowerCase()] ?? ''

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
        'text-[11px] font-semibold tracking-[0.5px] uppercase whitespace-nowrap',
        style,
        className,
      ].join(' ')}
    >
      {showDot && dotColor && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      )}
      {label}
    </span>
  )
}
