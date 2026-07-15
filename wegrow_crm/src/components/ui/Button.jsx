import React from 'react'

const variants = {
  filled:
    'bg-[#21467a] text-white hover:bg-[#4f378a] active:bg-[#5959ab] shadow-sm hover:shadow-md',
  tonal:
    'bg-[#e8def9] text-[#4f378a] hover:bg-[#d8cef0] active:bg-[#ccc2dc]',
  outlined:
    'border border-[#7a7582] text-[#4f378a] hover:bg-[#6750a4]/8 active:bg-[#6750a4]/12',
  ghost:
    'text-[#6750a4] hover:bg-[#6750a4]/8 active:bg-[#6750a4]/12',
  danger:
    'bg-[#ba1a1a] text-white hover:bg-[#93000a] active:bg-[#93000a] shadow-sm',
  'danger-tonal':
    'bg-[#ffdad6] text-[#93000a] hover:bg-[#ffb4ab] active:bg-[#ff897d]',
}

const sizes = {
  sm: 'h-8 px-4 text-xs gap-1.5',
  md: 'h-10 px-6 text-sm gap-2',
  lg: 'h-12 px-8 text-base gap-2',
}

export default function Button({
  children,
  variant = 'filled',
  size = 'md',
  icon,
  iconRight,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center font-medium rounded-full',
        'transition-all duration-200 ease-out select-none cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6750a4]',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant] ?? variants.filled,
        sizes[size] ?? sizes.md,
        className,
      ].join(' ')}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  )
}
