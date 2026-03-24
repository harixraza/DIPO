'use client'

import { useState } from 'react'
import type { User } from '@/lib/store'

const APIS = [
  { name: 'NADRA Identity Verification', endpoint: '/api/nadra/verify', method: 'POST', status: 'online', latency: 142, uptime: 99.8, calls24h: 1240, lastCheck: '09:42' },
  { name: 'FIA Border Control Integration', endpoint: '/api/fia/border', method: 'POST', status: 'online', latency: 218, uptime: 98.2, calls24h: 340, lastCheck: '09:42' },
  { name: 'PEMRA Media Accreditation', endpoint: '/api/pemra/accredit', method: 'GET', status: 'online', latency: 95, uptime: 99.9, calls24h: 88, lastCheck: '09:42' },
  { name: 'Biometric Scanner SDK', endpoint: '/sdk/biometric/scan', method: 'POST', status: 'degraded', latency: 890, uptime: 94.1, calls24h: 620, lastCheck: '09:40' },
  { name: 'SMS Gateway (PTCL)', endpoint: '/api/sms/send', method: 'POST', status: 'online', latency: 310, uptime: 97.5, calls24h: 2180, lastCheck: '09:42' },
  { name: 'Email Notification Service', endpoint: '/api/email/send', method: 'POST', status: 'online', latency: 275, uptime: 99.1, calls24h: 845, lastCheck: '09:42' },
  { name: 'Payment Gateway (1LINK)', endpoint: '/api/payment/process', method: 'POST', status: 'offline', latency: 0, uptime: 81.4, calls24h: 0, lastCheck: '08:15' },
  { name: 'GIS Mapping Service', endpoint: '/api/gis/location', method: 'GET', status: 'online', latency: 188, uptime: 99.3, calls24h: 412, lastCheck: '09:42' },
]

const LOGS = [
  { time: '09:42:11', endpoint: '/api/nadra/verify', method: 'POST', status: 200, latency: 142, ip: '10.0.1.45' },
  { time: '09:42:08', endpoint: '/api/sms/send', method: 'POST', status: 200, latency: 310, ip: '10.0.1.12' },
  { time: '09:41:55', endpoint: '/sdk/biometric/scan', method: 'POST', status: 503, latency: 890, ip: '10.0.1.33' },
  { time: '09:41:30', endpoint: '/api/email/send', method: 'POST', status: 200, latency: 275, ip: '10.0.1.20' },
  { time: '09:40:12', endpoint: '/api/payment/process', method: 'POST', status: 502, latency: 0, ip: '10.0.1.8' },
  { time: '09:39:45', endpoint: '/api/fia/border', method: 'POST', status: 200, latency: 218, ip: '10.0.1.45' },
  { time: '09:38:20', endpoint: '/api/gis/location', method: 'GET', status: 200, latency: 188, ip: '10.0.1.55' },
  { time: '09:37:00', endpoint: '/api/pemra/accredit', method: 'GET', status: 200, latency: 95, ip: '10.0.1.9' },
]

const statusDot = (s: string) => s === 'online' ? 'bg-green-500' : s === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
const statusText = (s: string) => s === 'online' ? 'text-green-600' : s === 'degraded' ? 'text-yellow-600' : 'text-red-600'
const statusBg = (s: string) => s === 'online' ? 'bg-green-100 text-green-700' : s === 'degraded' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'

export default function ApiMonitor({ user }: { user: User }) {
  const [tab, setTab] = useState<'endpoints' | 'logs' | 'webhooks'>('endpoints')
  const [selected, setSelected] = useState<typeof APIS[0] | null>(null)

  const online = APIS.filter(a => a.status === 'online').length
  const degraded = APIS.filter(a => a.status === 'degraded').length
  const offline = APIS.filter(a => a.status === 'offline').length
  const avgLatency = Math.round(APIS.filter(a => a.latency > 0).reduce((s, a) => s + a.latency, 0) / APIS.filter(a => a.latency > 0).length)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">API Integration Monitor</h2>
        <p className="text-sm text-muted-foreground">Real-time monitoring of all external system integrations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Online', value: online, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
          { label: 'Degraded', value: degraded, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
          { label: 'Offline', value: offline, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
          { label: 'Avg Latency', value: `${avgLatency}ms`, color: 'text-primary', bg: 'bg-card border-border' },
        ].map(s => (
          <div key={s.label} className={`border rounded-lg p-4 text-center ${s.bg}`}>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-1">
        {(['endpoints', 'logs', 'webhooks'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 ${tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>{t}</button>
        ))}
      </div>

      {tab === 'endpoints' && (
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            {APIS.map(api => (
              <div key={api.name} onClick={() => setSelected(api)}
                className={`bg-card border rounded-lg p-4 cursor-pointer hover:shadow-sm transition-all ${selected?.name === api.name ? 'border-primary' : 'border-border'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${statusDot(api.status)} ${api.status === 'online' ? 'animate-pulse' : ''}`} />
                    <div>
                      <p className="text-sm font-semibold">{api.name}</p>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">{api.method} {api.endpoint}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <p className="text-xs font-medium">{api.latency > 0 ? `${api.latency}ms` : '—'}</p>
                      <p className="text-xs text-muted-foreground">latency</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium">{api.uptime}%</p>
                      <p className="text-xs text-muted-foreground">uptime</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBg(api.status)}`}>{api.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <div className="w-64 shrink-0">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full ${statusDot(selected.status)}`} />
                  <h4 className="font-semibold text-sm">{selected.name}</h4>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Endpoint', value: selected.endpoint },
                    { label: 'Method', value: selected.method },
                    { label: 'Status', value: selected.status },
                    { label: 'Latency', value: `${selected.latency}ms` },
                    { label: 'Uptime', value: `${selected.uptime}%` },
                    { label: 'Calls (24h)', value: selected.calls24h.toLocaleString() },
                    { label: 'Last Check', value: selected.lastCheck },
                  ].map(i => (
                    <div key={i.label} className="flex justify-between border-b border-border pb-1.5 last:border-0">
                      <span className="text-muted-foreground">{i.label}</span>
                      <span className={`font-medium font-mono ${i.label === 'Status' ? statusText(selected.status) : ''}`}>{i.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold mb-2">Latency gauge</p>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${selected.latency < 200 ? 'bg-green-500' : selected.latency < 500 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(100, (selected.latency / 1000) * 100)}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{selected.latency < 200 ? 'Excellent' : selected.latency < 500 ? 'Acceptable' : 'Slow'}</p>
                </div>
                <button className="mt-4 w-full text-xs py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Test Endpoint</button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'logs' && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-sm">Recent API Calls</h3>
            <span className="text-xs text-muted-foreground">Live — last 15 minutes</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-secondary border-b border-border">
                <tr>{['Time', 'Endpoint', 'Method', 'Status', 'Latency', 'Client IP'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {LOGS.map((log, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/40">
                    <td className="px-4 py-2.5 font-mono">{log.time}</td>
                    <td className="px-4 py-2.5 font-mono text-muted-foreground">{log.endpoint}</td>
                    <td className="px-4 py-2.5"><span className="px-1.5 py-0.5 bg-secondary rounded text-xs font-mono">{log.method}</span></td>
                    <td className="px-4 py-2.5"><span className={`px-2 py-0.5 rounded-full font-mono ${log.status === 200 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{log.status}</span></td>
                    <td className="px-4 py-2.5 font-mono">{log.latency > 0 ? `${log.latency}ms` : '—'}</td>
                    <td className="px-4 py-2.5 font-mono text-muted-foreground">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'webhooks' && (
        <div className="space-y-3">
          {[
            { name: 'Badge Printed Webhook', url: 'https://notify.depo.gov.pk/badge-print', events: ['badge.printed', 'badge.lost'], status: 'active', lastFired: '09:15' },
            { name: 'Delegation Arrival Alert', url: 'https://notify.depo.gov.pk/delegation', events: ['delegation.arrived'], status: 'active', lastFired: '08:00' },
            { name: 'Security Incident Alert', url: 'https://security.depo.gov.pk/incident', events: ['security.violation', 'badge.blacklisted'], status: 'active', lastFired: '10:30' },
            { name: 'Admin Notifications', url: 'https://admin.depo.gov.pk/notify', events: ['user.created', 'vehicle.violation'], status: 'inactive', lastFired: 'Never' },
          ].map(wh => (
            <div key={wh.name} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{wh.name}</p>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">{wh.url}</p>
                <div className="flex gap-1.5 mt-2">
                  {wh.events.map(e => <span key={e} className="text-xs bg-secondary px-2 py-0.5 rounded font-mono">{e}</span>)}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right text-xs">
                  <p className="text-muted-foreground">Last fired</p>
                  <p className="font-medium">{wh.lastFired}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${wh.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{wh.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
