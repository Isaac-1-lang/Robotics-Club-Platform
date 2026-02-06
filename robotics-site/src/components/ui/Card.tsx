import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-surface shadow-soft border border-slate-200/70',
        'transition-all duration-300',
        hover && 'hover:-translate-y-1 hover:shadow-lg hover:border-slate-300/50',
        className,
      )}
    >
      {children}
    </div>
  )
}

