import { useEffect, useMemo, useRef } from 'react'
import type { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import { ensureIndiaMapRegistered } from '../lib/indiaMap'
import { riskLevelFromScore } from '../lib/dashboardData'

export function IndiaChoropleth({
  title,
  date,
  rows,
  selectedState,
  onSelectState,
  height = 420,
}: {
  title: string
  date: string
  rows: Array<{ state: string; risk_score_mean: number; pincodes: number }>
  selectedState: string
  onSelectState: (state: string) => void
  height?: number
}) {
  const chartRef = useRef<ReactECharts>(null)

  useEffect(() => {
    ensureIndiaMapRegistered()
  }, [])

  const option = useMemo<EChartsOption>(() => {
    const data = rows.map((r) => ({
      name: r.state,
      value: r.risk_score_mean,
      pincodes: r.pincodes,
      level: riskLevelFromScore(r.risk_score_mean),
    }))

    const bg = 'rgba(0,0,0,0)'
    const border = 'rgb(var(--border) / 0.9)'
    const fg = 'rgb(var(--fg-0))'
    const fg2 = 'rgb(var(--fg-2))'

    return {
      backgroundColor: bg,
      title: {
        text: title,
        left: 0,
        top: 0,
        textStyle: { color: fg, fontSize: 12, fontWeight: 600 },
        subtext: `Date: ${date}  •  Hover / click a state`,
        subtextStyle: { color: fg2, fontSize: 11 },
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgb(var(--bg-1) / 0.95)',
        borderColor: border,
        textStyle: { color: fg },
        formatter: (p: any) => {
          const v = typeof p.value === 'number' ? p.value : null
          const level = v == null ? null : riskLevelFromScore(v)
          const action =
            level === 'High'
              ? 'Proactively enable OTP/Iris'
              : level === 'Medium'
                ? 'Prepare & prioritize fallback'
                : 'Normal biometric flow'
          return [
            `<div style="font-weight:700;margin-bottom:4px">${p.name}</div>`,
            v == null
              ? `<div style="color:rgb(var(--fg-2))">No data</div>`
              : `<div><span style="color:rgb(var(--fg-2))">Risk score</span>: <b>${v.toFixed(3)}</b>  <span style="color:rgb(var(--fg-2))">(${level})</span></div>`,
            p.data?.pincodes != null
              ? `<div><span style="color:rgb(var(--fg-2))">Pincodes</span>: <b>${p.data.pincodes}</b></div>`
              : '',
            `<div style="margin-top:6px;color:rgb(var(--fg-2))">UIDAI action: <b style="color:${level === 'High' ? 'rgb(var(--risk-high))' : level === 'Medium' ? 'rgb(var(--risk-med))' : 'rgb(var(--risk-low))'}">${action}</b></div>`,
          ].join('')
        },
      },
      visualMap: {
        min: 0,
        max: 1,
        orient: 'horizontal',
        left: 0,
        bottom: 0,
        text: ['High', 'Low'],
        textStyle: { color: fg2 },
        inRange: {
          color: ['rgb(var(--risk-low))', 'rgb(var(--risk-med))', 'rgb(var(--risk-high))'],
        },
        calculable: false,
      },
      series: [
        {
          name: 'Risk score (mean)',
          type: 'map',
          map: 'IndiaStates',
          roam: true,
          selectedMode: 'single',
          emphasis: { label: { show: false } },
          select: {
            itemStyle: { borderColor: 'rgb(var(--brand-500))', borderWidth: 2 },
          },
          itemStyle: {
            borderColor: border,
            borderWidth: 1,
          },
          data,
        },
      ],
    }
  }, [date, rows, title])

  useEffect(() => {
    const inst = chartRef.current?.getEchartsInstance()
    if (!inst) return
    inst.off('click')
    inst.on('click', (params: any) => {
      if (params?.name) onSelectState(String(params.name))
    })
  }, [onSelectState])

  useEffect(() => {
    const inst = chartRef.current?.getEchartsInstance()
    if (!inst || !selectedState) return
    inst.dispatchAction({ type: 'downplay' })
    inst.dispatchAction({ type: 'highlight', name: selectedState })
  }, [selectedState])

  return <ReactECharts ref={chartRef} option={option} style={{ height, width: '100%' }} />
}

