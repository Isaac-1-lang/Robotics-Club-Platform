import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-text-primary mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm',
          'transition-all duration-200',
          'placeholder:text-text-muted/60',
          'focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none',
          'hover:border-slate-300',
          error && 'border-black focus:border-black focus:ring-black',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs font-medium text-text-primary">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-text-muted">{helperText}</p>
      )}
    </div>
  )
}
