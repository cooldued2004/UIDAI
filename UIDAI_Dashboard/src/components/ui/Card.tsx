import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Card({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn('px-5 pt-5', className)}>{children}</div>
}

export function CardBody({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={cn('px-5 pb-5', className)}>{children}</div>
}

