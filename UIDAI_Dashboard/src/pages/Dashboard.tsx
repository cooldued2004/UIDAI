import { BookOpen, Database, FlaskConical, Shield, Sparkles } from 'lucide-react'
import { Shell } from '../components/layout/Shell'
import { Card, CardBody, CardHeader } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Section } from '../components/ui/Section'
import { reportMeta, reportMetrics, reportNarrative } from '../content/report'
import { LiveKpis } from '../components/dashboard/LiveKpis'
import { RiskScorePlayground } from '../components/dashboard/RiskScorePlayground'
import { FigureGallery } from '../components/dashboard/FigureGallery'

export function Dashboard() {
  return (
    <Shell>
      <Hero />

      <div className="space-y-10">
        <div className="-mt-2">
          <LiveKpis />
        </div>

        <Section
          id="overview"
          title="Problem statement & approach"
          subtitle="A story-first view of the report: why failures matter, what we can observe, and how we turn signals into an operational risk score."
          right={<Badge tone="info">Report-driven</Badge>}
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
                  <BookOpen className="h-4 w-4 text-sky-200" />
                  Problem
                </div>
              </CardHeader>
              <CardBody className="pt-2">
                <ul className="space-y-2 text-sm leading-relaxed text-white/70">
                  {reportNarrative.problem.map((p) => (
                    <li key={p} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                      {p}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
                  <Sparkles className="h-4 w-4 text-violet-200" />
                  Approach (weak supervision)
                </div>
              </CardHeader>
              <CardBody className="pt-2">
                <ul className="space-y-2 text-sm leading-relaxed text-white/70">
                  {reportNarrative.approach.map((p) => (
                    <li key={p} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                      {p}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>
        </Section>

        <Section
          id="datasets"
          title="Datasets used (UIDAI only)"
          subtitle="All datasets are aggregated by date, state, district, and pincode; age-group alignment ensures comparable segments."
          right={<Badge tone="success">Compliant</Badge>}
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {reportNarrative.datasets.map((ds) => (
              <Card key={ds.name}>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
                    <Database className="h-4 w-4 text-emerald-200" />
                    {ds.name}
                  </div>
                </CardHeader>
                <CardBody className="pt-2">
                  <p className="text-sm leading-relaxed text-white/70">{ds.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
            <span className="font-semibold text-white">Focus:</span> {reportNarrative.focus}
          </div>
        </Section>

        <Section
          id="methodology"
          title="Methodology (core metrics)"
          subtitle="The report constructs three interpretable indicators and combines them into a composite score."
          right={<Badge tone="neutral">Interpretable</Badge>}
        >
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
                  <FlaskConical className="h-4 w-4 text-amber-200" />
                  Definitions
                </div>
              </CardHeader>
              <CardBody className="pt-2">
                <div className="grid gap-2 md:grid-cols-2">
                  {reportMetrics.definitions.map((d) => (
                    <div
                      key={d.symbol}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                    >
                      <div className="text-xs font-medium text-white/60">{d.symbol}</div>
                      <div className="mt-1 text-sm text-white/75">{d.meaning}</div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
                  <Shield className="h-4 w-4 text-rose-200" />
                  Formulas
                </div>
              </CardHeader>
              <CardBody className="pt-2">
                <div className="space-y-2">
                  {reportMetrics.formulas.map((f) => (
                    <div key={f.name} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                      <div className="text-xs font-medium text-white/60">{f.name}</div>
                      <div className="mt-1 font-mono text-sm text-white/80">{f.formula}</div>
                    </div>
                  ))}
                  <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                    <div className="text-xs font-medium text-white/60">Composite Risk Score</div>
                    <div className="mt-1 font-mono text-xs leading-relaxed text-white/80">
                      {reportMetrics.riskScore.formula}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Section>

        <Section
          id="risk-score"
          title="Risk Score Playground"
          subtitle="This is the judge-friendly interactive part: the same score as the report, but explorable."
          right={<Badge tone="info">Hands-on</Badge>}
        >
          <RiskScorePlayground />
        </Section>

        <Section
          id="figures"
          title="Key visuals"
          subtitle="Your analysis outputs are embedded as interactive figures with zoom + captions."
          right={<Badge tone="neutral">Figures 1–5</Badge>}
        >
          <FigureGallery />
        </Section>

        <Section
          id="actions"
          title="Operational playbook (what UIDAI does next)"
          subtitle="The score is only useful if it maps to clear interventions."
          right={<Badge tone="warning">Actionable</Badge>}
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {reportMetrics.riskScore.categories.map((c) => (
              <Card key={c.label}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold tracking-tight text-white">{c.label} risk</div>
                    <Badge
                      tone={c.label === 'Low' ? 'success' : c.label === 'Medium' ? 'warning' : 'danger'}
                    >
                      {c.range}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody className="pt-2">
                  <div className="rounded-xl bg-white/5 p-3 text-sm leading-relaxed text-white/70 ring-1 ring-white/10">
                    {c.action}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    </Shell>
  )
}

function Hero() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="info">UIDAI Data Hackathon 2026</Badge>
            <Badge tone="neutral">18+ focus</Badge>
            <Badge tone="neutral">{reportMeta.date}</Badge>
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {reportMeta.title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/60">
            Premium, interactive judge view of the report: understand the motivation, the weakly-supervised risk score,
            and the evidence from the analysis visuals.
          </p>
          <div className="mt-4 text-xs text-white/55">
            <span className="font-medium text-white/70">Team:</span> {reportMeta.authors.join(' · ')}
          </div>
        </div>
      </div>
    </div>
  )
}

