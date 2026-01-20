import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Section({
  id,
  title,
  subtitle,
  right,
  children,
  className,
}: {
  id?: string
  title: string
  subtitle?: string
  right?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-24', className)}>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
          {subtitle ? (
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-white/60">{subtitle}</p>
          ) : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      {children}
    </section>
  )
}

