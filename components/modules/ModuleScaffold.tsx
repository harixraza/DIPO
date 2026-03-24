'use client'

import { useMemo, useState } from 'react'

interface Kpi {
  label: string
  value: string
  trend?: string
  tone?: 'neutral' | 'good' | 'warn' | 'bad'
}

interface TableColumn {
  key: string
  label: string
}

interface TableRow {
  id: string
  [key: string]: string | number
}

interface ActivityItem {
  id: string
  title: string
  detail: string
  time: string
  tone?: 'neutral' | 'good' | 'warn' | 'bad'
}

interface ActionItem {
  id: string
  label: string
  detail: string
}

interface ConnectionItem {
  id: string
  label: string
  status: 'connected' | 'degraded' | 'offline'
  detail: string
}

export interface ModuleScaffoldProps {
  title: string
  subtitle: string
  owner: string
  kpis: Kpi[]
  queueTitle: string
  queueColumns: TableColumn[]
  queueRows: TableRow[]
  activity: ActivityItem[]
  actions: ActionItem[]
  analytics: { label: string; value: string; note: string }[]
  connections?: ConnectionItem[]
}

const toneBadge = (tone: Kpi['tone']) => {
  if (tone === 'good') return 'bg-green-100 text-green-700'
  if (tone === 'warn') return 'bg-amber-100 text-amber-700'
  if (tone === 'bad') return 'bg-red-100 text-red-700'
  return 'bg-secondary text-muted-foreground'
}

const activityDot = (tone: ActivityItem['tone']) => {
  if (tone === 'good') return 'bg-green-500'
  if (tone === 'warn') return 'bg-amber-500'
  if (tone === 'bad') return 'bg-red-500'
  return 'bg-slate-400'
}

export default function ModuleScaffold({
  title,
  subtitle,
  owner,
  kpis,
  queueTitle,
  queueColumns,
  queueRows,
  activity,
  actions,
  analytics,
  connections = [],
}: ModuleScaffoldProps) {
  const [tab, setTab] = useState<'overview' | 'queue' | 'analytics'>('overview')
  const [rows, setRows] = useState<TableRow[]>(queueRows)
  const [query, setQuery] = useState('')
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
  const [modal, setModal] = useState<'create' | 'view' | 'connections' | null>(null)
  const [draft, setDraft] = useState<Record<string, string>>(
    Object.fromEntries(queueColumns.map(col => [col.key, '']))
  )

  const filteredRows = useMemo(() => {
    if (!query.trim()) return rows
    const q = query.toLowerCase()
    return rows.filter(row =>
      queueColumns.some(col => String(row[col.key]).toLowerCase().includes(q))
    )
  }, [query, queueColumns, rows])

  const selectedRow = useMemo(
    () => rows.find(r => r.id === selectedRowId) || null,
    [rows, selectedRowId]
  )

  const handleAddRow = () => {
    const values = queueColumns.map(col => draft[col.key].trim())
    if (values.some(v => !v)) return
    const newRow: TableRow = { id: `row-${Date.now()}` }
    queueColumns.forEach(col => {
      newRow[col.key] = draft[col.key].trim()
    })
    setRows(prev => [newRow, ...prev])
    setDraft(Object.fromEntries(queueColumns.map(col => [col.key, ''])))
  }

  const handleDeleteRow = (id: string) => {
    setRows(prev => prev.filter(row => row.id !== id))
    setSelectedRowId(prev => (prev === id ? null : prev))
  }

  const handleOpenView = (id: string) => {
    setSelectedRowId(id)
    setModal('view')
  }

  const connectionTone = (status: ConnectionItem['status']) => {
    if (status === 'connected') return 'bg-green-100 text-green-700'
    if (status === 'degraded') return 'bg-amber-100 text-amber-700'
    return 'bg-red-100 text-red-700'
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          <p className="text-xs text-muted-foreground">Owner: {owner}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setModal('create')}
            className="text-xs px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            New Request
          </button>
          <button
            onClick={() => setModal('connections')}
            className="text-xs px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Connections
          </button>
          <button
            onClick={() => setTab('queue')}
            className="text-xs px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Review Queue
          </button>
          <button
            onClick={() => setModal('create')}
            className="text-xs px-3 py-2 rounded-md border border-border hover:bg-accent hover:text-accent-foreground"
          >
            Bulk Import
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              {kpi.trend && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${toneBadge(kpi.tone)}`}>
                  {kpi.trend}
                </span>
              )}
            </div>
            <p className="text-xl font-semibold text-foreground mt-2">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="border-b border-border px-4 flex gap-4">
          {['overview', 'queue', 'analytics'].map(key => (
            <button
              key={key}
              onClick={() => setTab(key as typeof tab)}
              className={`py-3 text-xs font-medium uppercase tracking-wide border-b-2 transition-colors ${
                tab === key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="text-sm font-semibold">{queueTitle}</h3>
                <div className="flex items-center gap-2">
                  <div className="text-[11px] text-muted-foreground">
                    {filteredRows.length} items
                  </div>
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search queue..."
                    className="text-xs px-2 py-1.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-secondary">
                    <tr>
                      {queueColumns.map(col => (
                        <th key={col.key} className="px-3 py-2 text-left font-semibold text-muted-foreground">{col.label}</th>
                      ))}
                      <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.slice(0, 6).map(row => (
                      <tr key={row.id} className="border-t border-border">
                        {queueColumns.map(col => (
                          <td key={col.key} className="px-3 py-2 text-foreground">
                            {String(row[col.key])}
                          </td>
                        ))}
                        <td className="px-3 py-2 text-foreground">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenView(row.id)}
                              className="text-xs px-2 py-1 rounded-md bg-secondary hover:bg-accent hover:text-accent-foreground"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteRow(row.id)}
                              className="text-xs px-2 py-1 rounded-md bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Operational Actions</h3>
              <div className="space-y-2">
                {actions.map(action => (
                  <div key={action.id} className="border border-border rounded-lg p-3 bg-secondary/40">
                    <p className="text-xs font-semibold text-foreground">{action.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{action.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'queue' && (
          <div className="p-4 space-y-4">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {queueColumns.map(col => (
                <div key={col.key} className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{col.label}</label>
                  <input
                    value={draft[col.key]}
                    onChange={e => setDraft(prev => ({ ...prev, [col.key]: e.target.value }))}
                    placeholder={`Enter ${col.label.toLowerCase()}`}
                    className="text-xs px-2 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleAddRow}
                className="text-xs px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Add to Queue
              </button>
              <button
                onClick={() => setDraft(Object.fromEntries(queueColumns.map(col => [col.key, ''])))}
                className="text-xs px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Clear
              </button>
              <button
                onClick={() => setModal('create')}
                className="text-xs px-3 py-2 rounded-md border border-border hover:bg-accent hover:text-accent-foreground"
              >
                Open Form
              </button>
              <div className="text-[11px] text-muted-foreground">
                {filteredRows.length} items
              </div>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search queue..."
                className="text-xs px-2 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {selectedRow && (
              <div className="border border-border rounded-lg p-3 bg-secondary/40">
                <p className="text-xs font-semibold text-foreground">Selected Entry</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs text-muted-foreground">
                  {queueColumns.map(col => (
                    <div key={col.key}>
                      <span className="font-semibold text-foreground">{col.label}: </span>
                      {String(selectedRow[col.key])}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-secondary">
                  <tr>
                    {queueColumns.map(col => (
                      <th key={col.key} className="px-3 py-2 text-left font-semibold text-muted-foreground">{col.label}</th>
                    ))}
                    <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map(row => (
                    <tr key={row.id} className="border-t border-border">
                      {queueColumns.map(col => (
                        <td key={col.key} className="px-3 py-2 text-foreground">
                          {String(row[col.key])}
                        </td>
                      ))}
                      <td className="px-3 py-2 text-foreground">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenView(row.id)}
                            className="text-xs px-2 py-1 rounded-md bg-secondary hover:bg-accent hover:text-accent-foreground"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteRow(row.id)}
                            className="text-xs px-2 py-1 rounded-md bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'analytics' && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {analytics.map(item => (
              <div key={item.label} className="border border-border rounded-lg p-4 bg-secondary/40">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-lg font-semibold text-foreground mt-1">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-3">Recent Activity</h3>
        <div className="space-y-2">
          {activity.map(item => (
            <div key={item.id} className="flex items-start gap-3 text-xs border-b border-border pb-2 last:border-0 last:pb-0">
              <span className={`w-2 h-2 rounded-full mt-1 ${activityDot(item.tone)}`} />
              <div className="flex-1">
                <p className="text-foreground font-semibold">{item.title}</p>
                <p className="text-muted-foreground">{item.detail}</p>
              </div>
              <span className="text-muted-foreground font-mono">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-card border border-border shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {modal === 'create' ? 'New Request' : modal === 'view' ? 'Queue Entry' : 'Connections'}
                </p>
                <h4 className="text-lg font-semibold text-foreground">{title}</h4>
              </div>
              <button
                onClick={() => setModal(null)}
                className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Close
              </button>
            </div>

            {modal === 'create' && (
              <div className="p-5 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {queueColumns.map(col => (
                    <div key={col.key} className="flex flex-col gap-1">
                      <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{col.label}</label>
                      <input
                        value={draft[col.key]}
                        onChange={e => setDraft(prev => ({ ...prev, [col.key]: e.target.value }))}
                        placeholder={`Enter ${col.label.toLowerCase()}`}
                        className="text-xs px-2 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddRow}
                    className="text-xs px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Submit Request
                  </button>
                  <button
                    onClick={() => setDraft(Object.fromEntries(queueColumns.map(col => [col.key, ''])))}
                    className="text-xs px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {modal === 'view' && selectedRow && (
              <div className="p-5 space-y-3">
                <div className="grid gap-2 sm:grid-cols-2 text-xs">
                  {queueColumns.map(col => (
                    <div key={col.key} className="border border-border rounded-lg p-3 bg-secondary/40">
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{col.label}</p>
                      <p className="text-sm font-semibold text-foreground mt-1">{String(selectedRow[col.key])}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModal('create')}
                    className="text-xs px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => selectedRow && handleDeleteRow(selectedRow.id)}
                    className="text-xs px-3 py-2 rounded-md bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}

            {modal === 'connections' && (
              <div className="p-5 space-y-3">
                {connections.length === 0 && (
                  <p className="text-sm text-muted-foreground">No connections configured for this module.</p>
                )}
                {connections.map(conn => (
                  <div key={conn.id} className="flex items-center justify-between border border-border rounded-lg p-3 bg-secondary/40">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{conn.label}</p>
                      <p className="text-xs text-muted-foreground">{conn.detail}</p>
                    </div>
                    <span className={`text-[11px] px-2 py-1 rounded-full ${connectionTone(conn.status)}`}>
                      {conn.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
