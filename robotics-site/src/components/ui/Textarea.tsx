import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Textarea({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-semibold text-text-primary mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm',
          'transition-all duration-200',
          'placeholder:text-text-muted/60',
          'focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none',
          'hover:border-slate-300',
          'resize-none',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-text-muted">{helperText}</p>
      )}
    </div>
  )
}
