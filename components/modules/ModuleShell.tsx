'use client'

interface Metric {
  label: string
  value: string
}

export interface ModuleShellProps {
  title: string
  summary: string
  highlights: string[]
  metrics?: Metric[]
  timeline?: string
  footnote?: string
  focus?: string
}

export default function ModuleShell({
  title,
  summary,
  highlights,
  metrics,
  timeline,
  footnote = 'IDEAS 2026 RFP',
  focus,
}: ModuleShellProps) {
  return (
    <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground/80">{footnote}</p>
          <h1 className="text-2xl font-semibold text-foreground leading-tight">{title}</h1>
          {focus && <p className="text-sm text-muted-foreground mt-1">{focus}</p>}
        </div>
        {timeline && (
          <div className="text-right text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Delivery</p>
            <p>{timeline}</p>
          </div>
        )}
      </header>

      <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>

      <div className="space-y-2">
        {highlights.map(point => (
          <p key={point} className="text-sm text-foreground/75 leading-snug border-l-2 pl-3 border-primary/60">
            {point}
          </p>
        ))}
      </div>

      {metrics && metrics.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {metrics.map(metric => (
            <div key={metric.label} className="bg-secondary/50 rounded-xl p-3 border border-border">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{metric.label}</p>
              <p className="text-sm font-semibold text-foreground mt-1">{metric.value}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
