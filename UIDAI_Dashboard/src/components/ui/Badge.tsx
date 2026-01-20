import { cn } from '../../lib/cn'

export function Badge({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
  children: React.ReactNode
}) {
  const tones: Record<string, string> = {
    neutral: 'bg-white/10 text-white/80 ring-white/10',
    info: 'bg-sky-500/15 text-sky-200 ring-sky-400/20',
    success: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/20',
    warning: 'bg-amber-500/15 text-amber-200 ring-amber-400/20',
    danger: 'bg-rose-500/15 text-rose-200 ring-rose-400/20',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

