import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-surface shadow-soft border border-slate-200/70',
        className,
      )}
    >
      {children}
    </div>
  )
}

