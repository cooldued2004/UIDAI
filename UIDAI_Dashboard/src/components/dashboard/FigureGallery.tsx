import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2, Sparkles } from 'lucide-react'
import { reportFigures } from '../../content/report'
import { Card, CardBody, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'

export function FigureGallery() {
  const [active, setActive] = useState<string>(reportFigures[0]?.id ?? 'fig1')
  const current = useMemo(() => reportFigures.find((f) => f.id === active) ?? reportFigures[0], [active])

  if (!current) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold tracking-tight text-white">Key visuals (from analysis)</div>
            <p className="mt-1 text-xs leading-relaxed text-white/60">
              Select a figure to view it full-size with its report caption. Click the image to zoom.
            </p>
          </div>
          <Badge tone="info" className="gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            Interactive viewer
          </Badge>
        </div>
      </CardHeader>

      <CardBody className="pt-4">
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="space-y-2">
            {reportFigures.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={cn(
                  'w-full rounded-xl border px-3 py-2 text-left text-sm transition',
                  f.id === active
                    ? 'border-white/15 bg-white/8 text-white'
                    : 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/5 hover:text-white',
                )}
              >
                <div className="text-xs font-medium text-white/60">{f.id.toUpperCase()}</div>
                <div className="mt-1 text-sm font-medium">{f.title}</div>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <ZoomImage src={current.src} alt={current.title} />
            <div className="mt-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold tracking-tight text-white">{current.title}</div>
                <Badge tone="neutral" className="gap-1 text-white/70">
                  <Maximize2 className="h-3.5 w-3.5" />
                  Click to zoom
                </Badge>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/60">{current.caption}</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-black/20"
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} className="w-full select-none object-contain" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="max-h-[90vh] w-full max-w-[1200px] overflow-hidden rounded-2xl border border-white/10 bg-[#070A12]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-3">
              <div className="text-sm font-medium text-white/80">{alt}</div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/70 ring-1 ring-white/10 hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="max-h-[calc(90vh-48px)] overflow-auto p-3">
              <img src={src} alt={alt} className="mx-auto w-full select-none object-contain" />
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  )
}

