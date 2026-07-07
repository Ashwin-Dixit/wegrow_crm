import React from 'react'

const STATUS_STYLES = {
  New:        'bg-[#e8def9] text-[#4f378a]',
  Contacted:  'bg-[#dce2f7] text-[#002f62]',
  Qualified:  'bg-[#c2e7d0] text-[#00531b]',
  Proposal:   'bg-[#ffefd6] text-[#7a3a00]',
  Won:        'bg-[#c2e7d0] text-[#00531b]',
  Lost:       'bg-[#ffdad6] text-[#93000a]',
  Active:     'bg-[#c2e7d0] text-[#00531b]',
  'Renewal Due': 'bg-[#ffefd6] text-[#7a3a00]',
  Inactive:   'bg-[#e6e0e9] text-[#49454f]',
}

const DOTS = {
  Won:    'bg-[#00531b]',
  Active: 'bg-[#00531b]',
  Lost:   'bg-[#93000a]',
}

export default function Badge({ label, showDot = false, className = '' }) {
  const style = STATUS_STYLES[label] ?? 'bg-[#e6e0e9] text-[#49454f]'
  const dotColor = DOTS[label] ?? ''

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
