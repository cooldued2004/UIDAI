import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Activity, ShieldAlert, ShieldCheck, ShieldHalf, Timer } from 'lucide-react'
import { Card, CardBody } from '../ui/Card'
import { cn } from '../../lib/cn'

function useNow(tickMs = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), tickMs)
    return () => window.clearInterval(id)
  }, [tickMs])
  return now
}

function useJitter(base: number, amplitude: number, tickMs = 1400) {
  const [val, setVal] = useState(base)
  useEffect(() => {
    const id = window.setInterval(() => {
      const n = base + (Math.random() * 2 - 1) * amplitude
      setVal(Math.max(0, n))
    }, tickMs)
    return () => window.clearInterval(id)
  }, [amplitude, base, tickMs])
  return val
}

export function LiveKpis() {
  const now = useNow()
  const authPerSec = useJitter(1240, 140)
  const retryIndex = useJitter(1.42, 0.18)

  // Demo distribution — the real distribution is shown in Fig.1; this strip is a live “at-a-glance” indicator.
  const dist = useMemo(() => {
    const low = 0.18 + (Math.random() * 0.06 - 0.03)
    const high = 0.22 + (Math.random() * 0.06 - 0.03)
    const medium = 1 - low - high
    return { low, medium, high }
  }, [now])

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Kpi
        icon={<Timer className="h-4 w-4" />}
        label="Live time"
        value={now.toLocaleString()}
        sub="Hackathon demo mode"
      />
      <Kpi
        icon={<Activity className="h-4 w-4" />}
        label="Auth throughput"
        value={`${Math.round(authPerSec).toLocaleString()}/sec`}
        sub="Simulated ticker"
      />
      <Kpi
        icon={<ShieldHalf className="h-4 w-4" />}
        label="Retry friction index"
        value={retryIndex.toFixed(2)}
        sub="Higher ⇒ more retries"
      />
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-medium text-white/60">Risk mix (live)</div>
            <div className="flex items-center gap-1 text-xs text-white/60">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-300/80" />
              <ShieldHalf className="h-3.5 w-3.5 text-amber-300/80" />
              <ShieldAlert className="h-3.5 w-3.5 text-rose-300/80" />
            </div>
          </div>
        </div>
        <div className="px-5 pb-5 pt-3">
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-emerald-400/70"
              initial={{ width: '0%' }}
              animate={{ width: `${dist.low * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <motion.div
              className="-mt-2 h-2 bg-amber-400/70"
              initial={{ width: '0%' }}
              animate={{ width: `${dist.medium * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ marginLeft: `${dist.low * 100}%` }}
            />
            <motion.div
              className="-mt-2 h-2 bg-rose-400/70"
              initial={{ width: '0%' }}
              animate={{ width: `${dist.high * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ marginLeft: `${(dist.low + dist.medium) * 100}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-white/55">
            <span>Low {(dist.low * 100).toFixed(0)}%</span>
            <span>Medium {(dist.medium * 100).toFixed(0)}%</span>
            <span>High {(dist.high * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Kpi({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardBody className="pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-white/60">{label}</div>
            <div className={cn('mt-2 text-sm font-semibold tracking-tight text-white')}>{value}</div>
            {sub ? <div className="mt-1 text-xs text-white/55">{sub}</div> : null}
          </div>
          <div className="rounded-xl bg-white/5 p-2 text-white/70 ring-1 ring-white/10">{icon}</div>
        </div>
      </CardBody>
    </Card>
  )
}

