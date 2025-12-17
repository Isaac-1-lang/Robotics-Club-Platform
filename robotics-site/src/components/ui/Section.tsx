import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SectionProps {
  id?: string
  title?: string
  eyebrow?: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({
  id,
  title,
  eyebrow,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-14 sm:py-16 md:py-20', className)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || description) && (
          <div className="max-w-3xl space-y-3 pb-10">
            {eyebrow && (
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-base text-text-muted leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

