import { cn } from '../../lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 active:shadow-md',
  secondary:
    'bg-accent text-primary shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-accent/90 active:translate-y-0 active:shadow-md',
  ghost:
    'border border-slate-200 bg-white text-text-primary hover:border-accent hover:bg-slate-50 hover:text-primary hover:-translate-y-0.5 active:translate-y-0',
}

export function buttonClasses({
  variant = 'primary',
  className,
}: {
  variant?: ButtonVariant
  className?: string
}) {
  return cn(
    'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
    variantClasses[variant],
    className,
  )
}

