import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'

const nav = [
  { id: 'overview', label: 'Overview' },
  { id: 'datasets', label: 'Datasets' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'risk-score', label: 'Risk Score Playground' },
  { id: 'figures', label: 'Key Visuals' },
  { id: 'actions', label: 'Operational Actions' },
]

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[280px_1fr]">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] md:block">
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold tracking-tight">UIDAI Dashboard</div>
                  <div className="mt-1 text-xs text-white/60">
                    Predictive biometric failure risk (18+)
                  </div>
                </div>
                <Badge tone="info">Live</Badge>
              </div>

              <div className="mt-6 space-y-1">
                {nav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      'block rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 p-5">
              <div className="text-xs font-medium text-white/60">Judge view tips</div>
              <ul className="mt-2 space-y-1 text-xs leading-relaxed text-white/55">
                <li>• Scroll top-to-bottom to follow the story.</li>
                <li>• Use the Risk Score Playground to see how signals combine.</li>
                <li>• Open figures to zoom and read annotations.</li>
              </ul>
            </div>
          </div>
        </aside>

        <main>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-10"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

