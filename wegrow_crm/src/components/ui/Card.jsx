import React from 'react'

const elevations = {
  0: 'bg-[#fdf7ff]',
  1: 'bg-[#f8f2fa] elevation-1',
  2: 'bg-[#f2ecf4] elevation-2',
  3: 'bg-[#ece6ee] elevation-3',
}

export default function Card({
  children,
  elevation = 1,
  className = '',
  onClick,
  hoverable = false,
  padding = 'p-6',
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={[
        'rounded-2xl transition-all duration-200',
        elevations[elevation] ?? elevations[1],
        hoverable
          ? 'cursor-pointer hover:elevation-2 hover:-translate-y-0.5 active:translate-y-0'
          : '',
        padding,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-4 mb-4 ${className}`}>
      <div>
        {title && (
          <h3 className="text-[16px] font-semibold text-[#1d1b20] leading-6 tracking-[0.15px]">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-[12px] text-[#7a7582] mt-0.5 tracking-[0.5px]">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
