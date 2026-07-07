import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children, footer, size = 'md' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={[
          'relative w-full bg-[#ece6ee] rounded-3xl shadow-2xl z-10',
          'animate-[fadeIn_0.2s_ease-out]',
          sizes[size] ?? sizes.md,
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          {title && (
            <h2 id="modal-title" className="text-[22px] font-semibold text-[#1d1b20] leading-7">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#49454f] hover:bg-[#6750a4]/8 transition-colors ml-auto"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 px-6 pb-6 pt-2">{footer}</div>
        )}
      </div>
    </div>
  )
}
