import React from 'react'

export default function Avatar({ initials, size = 'md', color = 'primary', className = '' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' }
  const colors = {
    primary:   'bg-[#e9ddff] text-[#4f378a]',
    secondary: 'bg-[#e8def9] text-[#625b71]',
    tertiary:  'bg-[#ffd9e3] text-[#633b48]',
    teal:      'bg-[#c2e7d0] text-[#00531b]',
  }

  const colorList = Object.values(colors)
  const autoColor = initials
    ? colorList[initials.charCodeAt(0) % colorList.length]
    : colors.primary

  return (
    <div
      className={[
        'rounded-full flex items-center justify-center font-semibold shrink-0 select-none',
        sizes[size] ?? sizes.md,
        color === 'auto' ? autoColor : (colors[color] ?? colors.primary),
        className,
      ].join(' ')}
    >
      {initials}
    </div>
  )
}
