'use client'

import { useState } from 'react'
import type { User } from '@/lib/store'

const INCIDENTS = [
  { id: 'INC-001', title: 'Brute-force login attempt detected', severity: 'high', category: 'Authentication', time: '09:38', status: 'investigating', ip: '203.0.113.45', source: 'WAF' },
  { id: 'INC-002', title: 'Unauthorized API access attempt (NADRA endpoint)', severity: 'critical', category: 'API', time: '09:25', status: 'mitigated', ip: '198.51.100.12', source: 'API Gateway' },
  { id: 'INC-003', title: 'Multiple failed badge scan attempts — Zone VVIP', severity: 'medium', category: 'Access Control', time: '09:15', status: 'resolved', ip: 'Physical', source: 'BIO-007' },
  { id: 'INC-004', title: 'SQL injection attempt in registration form', severity: 'high', category: 'Web', time: '08:50', status: 'mitigated', ip: '192.0.2.99', source: 'WAF' },
  { id: 'INC-005', title: 'Anomalous data export by user ID u-1042', severity: 'medium', category: 'Data', time: '08:30', status: 'investigating', ip: '10.0.1.88', source: 'SIEM' },
  { id: 'INC-006', title: 'DDoS attempt on registration portal — mitigated', severity: 'critical', category: 'Network', time: '07:45', status: 'resolved', ip: 'Multiple', source: 'CDN' },
]

const POLICIES = [
  { name: 'Password Policy', desc: 'Min 12 chars, complexity + 90-day rotation', enabled: true },
  { name: 'MFA Enforcement', desc: 'All admin accounts require 2-factor auth', enabled: true },
  { name: 'Session Timeout', desc: 'Auto-logout after 30 min inactivity', enabled: true },
  { name: 'IP Allowlisting', desc: 'Admin access only from approved IPs', enabled: true },
  { name: 'Badge Scan Rate Limiting', desc: 'Max 5 scan attempts per minute per device', enabled: true },
  { name: 'API Key Rotation', desc: 'Automated key rotation every 30 days', enabled: false },
  { name: 'Data Export Logging', desc: 'Log and alert on bulk data downloads', enabled: true },
]

const sev = (s: string) =>
  s === 'critical' ? 'bg-red-600 text-white' :
  s === 'high' ? 'bg-red-100 text-red-700' :
  s === 'medium' ? 'bg-yellow-100 text-yellow-700' :
  'bg-blue-100 text-blue-700'

const statusC = (s: string) =>
  s === 'resolved' ? 'bg-green-100 text-green-700' :
  s === 'mitigated' ? 'bg-blue-100 text-blue-700' :
  'bg-yellow-100 text-yellow-700'

export default function CyberSecurity({ user }: { user: User }) {
  const [tab, setTab] = useState<'incidents' | 'policies' | 'monitor'>('incidents')
  const [policies, setPolicies] = useState(POLICIES)
  const [selected, setSelected] = useState<typeof INCIDENTS[0] | null>(null)

  const critical = INCIDENTS.filter(i => i.severity === 'critical').length
  const unresolved = INCIDENTS.filter(i => i.status !== 'resolved').length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold">Cyber Security & Threat Management</h2>
          <p className="text-sm text-muted-foreground">IDEAS 2026 Security Operations Centre (SOC)</p>
        </div>
        {(critical > 0 || unresolved > 0) && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            {critical} critical · {unresolved} unresolved
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Incidents', value: INCIDENTS.length, color: 'text-foreground' },
          { label: 'Critical', value: critical, color: 'text-red-600' },
          { label: 'Unresolved', value: unresolved, color: 'text-yellow-600' },
          { label: 'Policies Active', value: policies.filter(p => p.enabled).length, color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-1">
        {(['incidents', 'policies', 'monitor'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 ${tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>{t}</button>
        ))}
      </div>

      {tab === 'incidents' && (
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            {INCIDENTS.map(inc => (
              <div key={inc.id} onClick={() => setSelected(inc)}
                className={`bg-card border rounded-lg p-4 cursor-pointer hover:shadow-sm transition-all ${selected?.id === inc.id ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${sev(inc.severity)}`}>{inc.severity.toUpperCase()}</span>
                    <p className="text-sm font-medium">{inc.title}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusC(inc.status)}`}>{inc.status}</span>
                </div>
                <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                  <span>{inc.id}</span>
                  <span>{inc.category}</span>
                  <span>IP: {inc.ip}</span>
                  <span>Source: {inc.source}</span>
                  <span className="ml-auto">{inc.time}</span>
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <div className="w-72 shrink-0">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className={`px-4 py-3 flex items-center justify-between ${selected.severity === 'critical' ? 'bg-red-600' : 'bg-primary'}`}>
                  <span className="text-white font-semibold text-sm">{selected.id}</span>
                  <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white text-xs">Close</button>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm font-semibold">{selected.title}</p>
                  <div className="space-y-2 text-xs">
                    {[
                      { label: 'Severity', value: selected.severity, color: true },
                      { label: 'Category', value: selected.category },
                      { label: 'Time', value: selected.time },
                      { label: 'Source', value: selected.source },
                      { label: 'IP Address', value: selected.ip },
                      { label: 'Status', value: selected.status },
                    ].map(i => (
                      <div key={i.label} className="flex justify-between border-b border-border pb-1.5 last:border-0">
                        <span className="text-muted-foreground">{i.label}</span>
                        {i.label === 'Severity' ? (
                          <span className={`px-2 py-0.5 rounded-full text-xs ${sev(selected.severity)}`}>{selected.severity}</span>
                        ) : i.label === 'Status' ? (
                          <span className={`px-2 py-0.5 rounded-full text-xs ${statusC(selected.status)}`}>{selected.status}</span>
                        ) : (
                          <span className="font-medium">{i.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 space-y-1.5">
                    {selected.status !== 'resolved' && (
                      <button className="w-full text-xs py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Mark Resolved</button>
                    )}
                    <button className="w-full text-xs py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Escalate to SOC</button>
                    <button className="w-full text-xs py-2 border border-border rounded-md hover:bg-secondary transition-colors">Block IP</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'policies' && (
        <div className="space-y-2">
          {policies.map((p, i) => (
            <div key={p.name} className="bg-card border border-border rounded-lg px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
              </div>
              <button
                onClick={() => setPolicies(prev => prev.map((pp, j) => j === i ? { ...pp, enabled: !pp.enabled } : pp))}
                className={`relative inline-flex w-10 h-5 rounded-full transition-colors ${p.enabled ? 'bg-primary' : 'bg-muted'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${p.enabled ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'monitor' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Threat Level Gauge */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold text-sm mb-4">Current Threat Level</h3>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <svg viewBox="0 0 120 80" className="w-48 h-32">
                    <path d="M 10 70 A 50 50 0 0 1 110 70" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
                    <path d="M 10 70 A 50 50 0 0 1 110 70" fill="none" stroke="hsl(var(--primary))" strokeWidth="12" strokeLinecap="round" strokeDasharray="157" strokeDashoffset="60" />
                    <text x="60" y="72" textAnchor="middle" fontSize="11" fill="currentColor" className="fill-foreground font-bold">ELEVATED</text>
                    <text x="60" y="83" textAnchor="middle" fontSize="7" fill="currentColor" className="fill-muted-foreground">Threat Level</text>
                  </svg>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>LOW</span><span>MEDIUM</span><span>HIGH</span><span>CRITICAL</span>
              </div>
            </div>

            {/* Recent IPs */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold text-sm mb-3">Blocked IPs</h3>
              <div className="space-y-2">
                {[
                  { ip: '203.0.113.45', reason: 'Brute-force', blocked: '09:40' },
                  { ip: '198.51.100.12', reason: 'API abuse', blocked: '09:26' },
                  { ip: '192.0.2.99', reason: 'SQL injection', blocked: '08:52' },
                ].map(b => (
                  <div key={b.ip} className="flex items-center justify-between bg-red-50 border border-red-100 rounded px-3 py-2 text-xs">
                    <span className="font-mono font-medium">{b.ip}</span>
                    <span className="text-muted-foreground">{b.reason}</span>
                    <span className="text-red-600 font-medium">{b.blocked}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold text-sm mb-3">System Security Health</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Firewall', status: 'Active', ok: true },
                { label: 'WAF', status: 'Active', ok: true },
                { label: 'SIEM', status: 'Active', ok: true },
                { label: 'IDS/IPS', status: 'Active', ok: true },
                { label: 'AV Scan', status: 'Last 6h ago', ok: true },
                { label: 'Backup', status: 'Last 12h ago', ok: true },
                { label: 'SSL Cert', status: '180 days left', ok: true },
                { label: 'Patch Level', status: 'Up to date', ok: true },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2 bg-secondary rounded-md px-3 py-2 text-xs">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${s.ok ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="font-medium">{s.label}</p>
                    <p className="text-muted-foreground text-xs">{s.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
