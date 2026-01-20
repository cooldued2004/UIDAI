import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, ChevronRight, ShieldAlert, ShieldCheck, ShieldHalf } from 'lucide-react'
import { Card, CardBody, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

export function RiskScorePlayground() {
  const wFallback = 0.5
  const wLoss = 0.3
  const wIntensity = 0.2

  const [fallbackRatio, setFallbackRatio] = useState(0.28)
  const [biometricShare, setBiometricShare] = useState(0.62)
  const [normIntensity, setNormIntensity] = useState(0.35)

  const weights = useMemo(() => {
    const sum = wFallback + wLoss + wIntensity
    if (sum === 0) return { wf: 0.5, wl: 0.3, wi: 0.2 }
    return { wf: wFallback / sum, wl: wLoss / sum, wi: wIntensity / sum }
  }, [wFallback, wIntensity, wLoss])

  const score = useMemo(() => {
    const v = weights.wf * fallbackRatio + weights.wl * (1 - biometricShare) + weights.wi * normIntensity
    return clamp01(v)
  }, [biometricShare, fallbackRatio, normIntensity, weights])

  const level = score < 0.3 ? 'Low' : score < 0.6 ? 'Medium' : 'High'
  const levelTone = level === 'Low' ? 'success' : level === 'Medium' ? 'warning' : 'danger'
  const levelIcon =
    level === 'Low' ? (
      <ShieldCheck className="h-4 w-4" />
    ) : level === 'Medium' ? (
      <ShieldHalf className="h-4 w-4" />
    ) : (
      <ShieldAlert className="h-4 w-4" />
    )

  const action =
    level === 'Low'
      ? 'Normal biometric authentication flow'
      : level === 'Medium'
        ? 'Prepare and prioritize fallback mechanisms'
        : 'Proactively enable OTP or Iris to prevent service denial'

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold tracking-tight text-white">Risk score simulator</div>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                Adjust signals and weights to see how the composite risk score behaves (weak supervision).
              </p>
            </div>
            <Badge tone="info">Interactive</Badge>
          </div>
        </CardHeader>
        <CardBody className="pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Slider
              label="Fallback Dependency Ratio"
              value={fallbackRatio}
              onChange={setFallbackRatio}
              hint="D18+ / T18+"
            />
            <Slider
              label="Biometric Share"
              value={biometricShare}
              onChange={setBiometricShare}
              hint="B18+ / T18+"
            />
            <Slider
              label="Normalized Auth Intensity"
              value={normIntensity}
              onChange={setNormIntensity}
              hint="normalized (T18+ / E18+)"
            />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StaticSlider
              label="Weight: fallback"
              value={wFallback}
              hint="default 0.5"
              tone="info"
            />
            <StaticSlider
              label="Weight: (1 - biometric share)"
              value={wLoss}
              hint="default 0.3"
              tone="info"
            />
            <StaticSlider
              label="Weight: intensity"
              value={wIntensity}
              hint="default 0.2"
              tone="info"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xs font-medium text-white/60">Composite Risk Score</div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="text-2xl font-semibold tracking-tight">{score.toFixed(3)}</div>
                  <Badge tone={levelTone as any} className="gap-1">
                    {levelIcon}
                    {level} risk
                  </Badge>
                </div>
                <div className="mt-2 text-xs text-white/55">
                  Weights are normalized to sum to 1.00: fallback {weights.wf.toFixed(2)} · loss {weights.wl.toFixed(2)}
                  · intensity {weights.wi.toFixed(2)}
                </div>
              </div>

              <div className="min-w-[220px] grow md:max-w-[320px]">
                <div className="text-xs font-medium text-white/60">Score bar</div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className={cn(
                      'h-full',
                      level === 'Low'
                        ? 'bg-emerald-400/70'
                        : level === 'Medium'
                          ? 'bg-amber-400/70'
                          : 'bg-rose-400/70',
                    )}
                    initial={{ width: '0%' }}
                    animate={{ width: `${score * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-white/55">
                  <span>0.0</span>
                  <span>0.3</span>
                  <span>0.6</span>
                  <span>1.0</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              {level === 'High' ? (
                <AlertTriangle className="mt-0.5 h-4 w-4 text-rose-200" />
              ) : level === 'Medium' ? (
                <ChevronRight className="mt-0.5 h-4 w-4 text-amber-200" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-200" />
              )}
              <div>
                <div className="text-xs font-medium text-white/70">Recommended UIDAI action</div>
                <div className="mt-1 text-xs leading-relaxed text-white/60">{action}</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="text-sm font-semibold tracking-tight text-white">Formula (from report)</div>
          <p className="mt-1 text-xs leading-relaxed text-white/60">
            Risk Score = {weights.wf.toFixed(2)}×Fallback + {weights.wl.toFixed(2)}×(1−BiometricShare) +{' '}
            {weights.wi.toFixed(2)}×NormIntensity
          </p>
          <p className="mt-1 text-[11px] text-white/45">
            Report default: 0.50, 0.30, 0.20 — you can adjust them with the sliders on the left.
          </p>
        </CardHeader>
        <CardBody className="pt-4">
          <div className="space-y-3 text-sm text-white/75">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-xs font-medium text-white/60">Interpretation</div>
              <ul className="mt-2 space-y-1 text-xs leading-relaxed text-white/60">
                <li>
                  - <span className="text-white/75">Fallback dependency</span> rises when biometrics fail or are avoided.
                </li>
                <li>
                  - <span className="text-white/75">Biometric share</span> drops when biometric dominance degrades.
                </li>
                <li>
                  - <span className="text-white/75">Intensity</span> rises with retry loops and friction (population-normalized).
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="text-xs font-medium text-white/60">Operational thresholds</div>
              <div className="mt-2 space-y-2 text-xs text-white/60">
                <Row label="Low" value="< 0.3" tone="success" />
                <Row label="Medium" value="0.3 – 0.6" tone="warning" />
                <Row label="High" value="≥ 0.6" tone="danger" />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function Row({ label, value, tone }: { label: string; value: string; tone: 'success' | 'warning' | 'danger' }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2 ring-1 ring-white/10">
      <div className="flex items-center gap-2">
        <Badge tone={tone as any}>{label}</Badge>
      </div>
      <div className="font-medium text-white/75">{value}</div>
    </div>
  )
}

function Slider({
  label,
  value,
  onChange,
  hint,
  tone,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  hint?: string
  tone?: 'info'
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-white/70">{label}</div>
          {hint ? <div className="mt-1 text-[11px] text-white/55">{hint}</div> : null}
        </div>
        <Badge tone={tone === 'info' ? 'info' : 'neutral'}>{value.toFixed(2)}</Badge>
      </div>
      <input
        aria-label={label}
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-sky-400"
      />
    </div>
  )
}

function StaticSlider({
  label,
  value,
  hint,
  tone,
}: {
  label: string
  value: number
  hint?: string
  tone?: 'info'
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-white/70">{label}</div>
          {hint ? <div className="mt-1 text-[11px] text-white/55">{hint}</div> : null}
        </div>
        <Badge tone={tone === 'info' ? 'info' : 'neutral'}>{value.toFixed(2)}</Badge>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-sky-400"
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  )
}

