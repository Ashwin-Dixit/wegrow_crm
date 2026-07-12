import React, { forwardRef } from 'react'

const Input = forwardRef(function Input(
  {
    label,
    id,
    type = 'text',
    variant = 'outlined',
    error,
    helperText,
    icon,
    iconRight,
    className = '',
    wrapperClassName = '',
    required,
    ...props
  },
  ref
) {
  const isOutlined = variant === 'outlined'

  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-[12px] font-medium text-[#49454f] tracking-[0.5px] uppercase"
        >
          {label}
          {required && <span className="text-[#ba1a1a] ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7582] pointer-events-none">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          required={required}
          className={[
            'w-full h-12 text-[14px] text-[#1d1b20] transition-all duration-200 outline-none',
            'placeholder:text-[#7a7582]',
            icon ? 'pl-10' : 'pl-4',
            iconRight ? 'pr-10' : 'pr-4',
            isOutlined
              ? [
                  'rounded-lg border bg-transparent',
                  error
                    ? 'border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-2 focus:ring-[#ba1a1a]/20'
                    : 'border-[#cbc4d2] focus:border-[#6750a4] focus:ring-2 focus:ring-[#6750a4]/20',
                ].join(' ')
              : [
                  'rounded-t-lg border-b-2 bg-[#f2ecf4]',
                  error
                    ? 'border-[#ba1a1a]'
                    : 'border-[#7a7582] focus:border-[#6750a4] focus:bg-[#e8def9]/40',
                ].join(' '),
            className,
          ].join(' ')}
          {...props}
        />

        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7582]">
            {iconRight}
          </span>
        )}
      </div>

      {(error || helperText) && (
        <p className={`text-[11px] ${error ? 'text-[#ba1a1a]' : 'text-[#7a7582]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

export default Input

export function Select({ label, id, options, error, helperText, className = '', wrapperClassName = '', required, ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={id} className="text-[12px] font-medium text-[#49454f] tracking-[0.5px] uppercase">
          {label}
          {required && <span className="text-[#ba1a1a] ml-0.5">*</span>}
        </label>
      )}
      <select
        id={id}
        required={required}
        className={[
          'w-full h-12 px-4 text-[14px] text-[#1d1b20] rounded-lg border bg-transparent transition-all duration-200 outline-none cursor-pointer',
          error
            ? 'border-[#ba1a1a] focus:ring-2 focus:ring-[#ba1a1a]/20'
            : 'border-[#cbc4d2] focus:border-[#6750a4] focus:ring-2 focus:ring-[#6750a4]/20',
          className,
        ].join(' ')}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <p className={`text-[11px] ${error ? 'text-[#ba1a1a]' : 'text-[#7a7582]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
}

export function Textarea({ label, id, error, helperText, className = '', wrapperClassName = '', required, ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={id} className="text-[12px] font-medium text-[#49454f] tracking-[0.5px] uppercase">
          {label}
          {required && <span className="text-[#ba1a1a] ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={id}
        required={required}
        className={[
          'w-full px-4 py-3 text-[14px] text-[#1d1b20] rounded-lg border bg-transparent',
          'transition-all duration-200 outline-none resize-none placeholder:text-[#7a7582]',
          error
            ? 'border-[#ba1a1a] focus:ring-2 focus:ring-[#ba1a1a]/20'
            : 'border-[#cbc4d2] focus:border-[#6750a4] focus:ring-2 focus:ring-[#6750a4]/20',
          className,
        ].join(' ')}
        {...props}
      />
      {(error || helperText) && (
        <p className={`text-[11px] ${error ? 'text-[#ba1a1a]' : 'text-[#7a7582]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
}
