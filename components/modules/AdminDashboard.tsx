'use client'

import { useState, useEffect } from 'react'
import { getUsers, getEvents, getBadges, getVehicles, getDelegations, getAttendance, type User } from '@/lib/store'
import type { Module } from '../Dashboard'
import { allowedModulesForRole } from '../Sidebar'

interface Props {
  user: User
  onNavigate: (m: Module) => void
}

export default function AdminDashboard({ user, onNavigate }: Props) {
  const [stats, setStats] = useState({ users: 0, events: 0, badges: 0, vehicles: 0, delegations: 0, attendance: 0 })
  const allowed = allowedModulesForRole(user.role)

  useEffect(() => {
    setStats({
      users: getUsers().length,
      events: getEvents().length,
      badges: getBadges().length,
      vehicles: getVehicles().length,
      delegations: getDelegations().length,
      attendance: getAttendance().length,
    })
  }, [])

  const modules: { id: Module; label: string; desc: string; color: string }[] = [
    { id: 'users', label: 'User Management', desc: 'All stakeholders, roles & permissions', color: 'bg-primary' },
    { id: 'events', label: 'Event Management', desc: 'Gala, Tri-Services, Golf, Seminar', color: 'bg-amber-600' },
    { id: 'badges', label: 'Badge & Accreditation', desc: 'Print, manage & verify badges', color: 'bg-blue-600' },
    { id: 'vehicles', label: 'Vehicle & Parking', desc: 'Vehicle passes & zone management', color: 'bg-orange-600' },
    { id: 'delegations', label: 'Delegations', desc: 'Foreign delegations & protocol', color: 'bg-purple-600' },
    { id: 'attendance', label: 'Attendance', desc: 'Entry logs & zone tracking', color: 'bg-green-700' },
    { id: 'cms', label: 'Content Management', desc: 'Website CMS & announcements', color: 'bg-teal-600' },
    { id: 'api', label: 'API Monitor', desc: 'System integrations & API status', color: 'bg-slate-600' },
    { id: 'biometric', label: 'Biometric System', desc: 'Fingerprint & face verification', color: 'bg-rose-600' },
    { id: 'cyber', label: 'Cyber Security', desc: 'Threats, logs & system alerts', color: 'bg-gray-700' },
    { id: 'exhibitor_floor', label: 'Exhibitor Floor', desc: 'Hall zoning & stall allocation', color: 'bg-indigo-600' },
    { id: 'registration', label: 'Registration', desc: 'Verify and approve registrations', color: 'bg-cyan-600' },
    { id: 'auto_email', label: 'Auto Email', desc: 'Automated mail workflows', color: 'bg-emerald-600' },
    { id: 'stall_builder', label: 'Stall Builder', desc: 'Exhibitor stall configuration', color: 'bg-lime-600' },
    { id: 'ai_chatbot', label: 'AI Chatbot', desc: 'Guided support & deflection', color: 'bg-fuchsia-600' },
    { id: 'logistics', label: 'Logistics', desc: 'Shipment & vendor tracking', color: 'bg-amber-500' },
    { id: 'media', label: 'Media Management', desc: 'Accreditation & press briefings', color: 'bg-sky-600' },
    { id: 'security_incident', label: 'Security & Incident', desc: 'Live security posture', color: 'bg-red-600' },
    { id: 'pass_management', label: 'Pass Management', desc: 'Temporary & emergency passes', color: 'bg-orange-500' },
    { id: 'incident_management', label: 'Incident Management', desc: 'Lifecycle & RCA tracking', color: 'bg-rose-500' },
    { id: 'communication_log', label: 'Communication Logs', desc: 'Operational comms archive', color: 'bg-slate-500' },
    { id: 'emergency_response', label: 'Emergency Response', desc: 'Response teams & drills', color: 'bg-red-500' },
    { id: 'social_monitoring', label: 'Social Monitoring', desc: 'Sentiment & risk signals', color: 'bg-violet-600' },
    { id: 'meetings_mou', label: 'Meetings & MOU', desc: 'Delegation meetings & MOUs', color: 'bg-blue-500' },
    { id: 'mobile_android', label: 'Android App', desc: 'Mobile operations client', color: 'bg-green-600' },
    { id: 'mobile_ios', label: 'iOS App', desc: 'Executive mobile experience', color: 'bg-gray-600' },
    { id: 'mobile_harmony', label: 'Harmony App', desc: 'HarmonyOS deployment', color: 'bg-teal-500' },
    { id: 'whatsapp', label: 'WhatsApp', desc: 'Messaging integration', color: 'bg-green-500' },
    { id: 'wechat', label: 'WeChat', desc: 'International messaging', color: 'bg-emerald-500' },
    { id: 'post_expo', label: 'Post Expo Reporting', desc: 'Final reports & sign-off', color: 'bg-stone-600' },
    { id: 'integrated_dashboard', label: 'Integrated Dashboard', desc: 'Tiered executive view', color: 'bg-neutral-700' },
    { id: 'kpi_dashboard', label: 'KPI Dashboard', desc: 'Module KPI scorecards', color: 'bg-zinc-700' },
    { id: 'cctv', label: 'CCTV Monitoring', desc: 'Camera status & playback', color: 'bg-red-700' },
  ]
  const quickLinks = modules.filter(m => allowed.includes(m.id)).slice(0, 6)
  const rfpModules = [
    'Exhibitor Floor', 'Registration', 'Auto Email', 'Stall Builder', 'AI Chatbot',
    'Event Management', 'Logistics', 'Vehicle Access & Smart Parking', 'Delegation Handling',
    'Media Management', 'Security & Incident', 'Badge Printing & Code Gen', 'Pass Management',
    'Attendance Tracking', 'Content Management', 'API Integration', 'Biometric Verification',
    'CCTV Surveillance', 'Cyber Security', 'Incident Management', 'Communication Log',
    'Emergency Response', 'Social Monitoring', 'Meetings & MOU', 'Android App', 'iOS App',
    'Harmony App', 'WhatsApp Module'
  ]
  const moduleCoverage = Math.round((allowed.length / rfpModules.length) * 100)

  const quickAlerts = [
    { label: 'Customs holds', value: 3, tone: 'bg-amber-100 text-amber-800 border-amber-200' },
    { label: 'Critical incidents', value: 1, tone: 'bg-red-100 text-red-800 border-red-200' },
    { label: 'SLA risk (badges)', value: '12 min', tone: 'bg-blue-100 text-blue-800 border-blue-200' },
  ]

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.35),transparent_40%)]" />
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300">IDEAS 2026 Command</p>
            <h1 className="text-2xl font-bold mt-2">Welcome, {user.name.split(' ').slice(-1)[0]}</h1>
            <p className="text-slate-300 text-sm mt-1">International Defence Exhibition &amp; Seminar • 19–22 Nov 2026 • Islamabad</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-[11px] px-3 py-1 rounded-full bg-white/10 text-white capitalize border border-white/20">{user.role.replace(/_/g, ' ')}</span>
              <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-100 border border-emerald-400/30">Live ops</span>
              <span className="text-[11px] px-3 py-1 rounded-full bg-blue-500/20 text-blue-100 border border-blue-400/30">SLA 99.4%</span>
            </div>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-xl p-4 min-w-[240px]">
            <p className="text-xs text-slate-200">Today</p>
            <p className="text-3xl font-semibold text-white mt-1">20 Mar 2026</p>
            <p className="text-xs text-slate-300 mt-1">Operational windows • GMT+5</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {quickAlerts.map(a => (
                <div key={a.label} className={`rounded-lg border text-[11px] px-2 py-1 ${a.tone}`}>
                  <p className="font-semibold">{a.value}</p>
                  <p className="opacity-80">{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ops health tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card/80 backdrop-blur p-4">
          <p className="text-xs text-muted-foreground">Ops Health</p>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-3xl font-semibold text-green-600">99.4%</p>
            <span className="text-[11px] text-muted-foreground mb-1">uptime</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">All modules nominal. 2 minor alerts under watch.</p>
        </div>
        <div className="rounded-xl border border-border bg-card/80 backdrop-blur p-4">
          <p className="text-xs text-muted-foreground">Access Control</p>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-3xl font-semibold text-blue-600">18.2k</p>
            <span className="text-[11px] text-muted-foreground mb-1">scans today</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Gate A peak at 09:30. No anti-passback violations.</p>
        </div>
        <div className="rounded-xl border border-border bg-card/80 backdrop-blur p-4">
          <p className="text-xs text-muted-foreground">Comms Snapshot</p>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-3xl font-semibold text-amber-600">42</p>
            <span className="text-[11px] text-muted-foreground mb-1">open tickets</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">12 SLA-watch, 3 critical (security). WhatsApp bot deflected 63%.</p>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Registered Users', value: stats.users, color: 'text-primary' },
          { label: 'Events', value: stats.events, color: 'text-amber-600' },
          { label: 'Badges Issued', value: stats.badges, color: 'text-blue-600' },
          { label: 'Vehicles', value: stats.vehicles, color: 'text-orange-600' },
          { label: 'Delegations', value: stats.delegations, color: 'text-purple-600' },
          { label: 'Attendance', value: stats.attendance, color: 'text-green-700' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* RFP alignment & milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">RFP Module Coverage</h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{moduleCoverage}%</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{allowed.length} / {rfpModules.length} modules exposed to your role.</p>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${moduleCoverage}%` }} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
            <p>Mobility stack: Android, iOS, Harmony, WhatsApp</p>
            <p>Security stack: CCTV, Cyber, Biometric, Incident</p>
            <p>Ops stack: Logistics, Vehicles, Event, Registration</p>
            <p>Engagement: AI Chatbot, Auto Email, Social Monitoring</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-sm mb-3">Procurement Timeline (RFP)</h3>
          <div className="space-y-2 text-xs">
            {[
              { label: 'Pre-bid meeting', date: '16 Mar 2026', status: 'Done' },
              { label: 'Bid submission (EPADS)', date: '26 Mar 2026', status: 'Due' },
              { label: 'Tech opening', date: '26 Mar 2026', status: 'Due' },
              { label: 'Contract start', date: '07 days post-award', status: 'Planned' },
              { label: 'Contract end', date: '31 Dec 2026 (+2y extendable)', status: 'Planned' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between border-b border-border last:border-0 pb-1">
                <span className="text-foreground">{item.label}</span>
                <span className="text-muted-foreground">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-sm mb-3">Compliance & Risk</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span>Bid Security</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">PKR 1,000,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Performance Guarantee</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">10% of contract</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Advance Payment</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">Not allowed</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Blacklisting checks</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">PPRA Rule 19</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Grievance window</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">GRC + PPRA appeal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two column live data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Event fill rates */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Event Fill Rates
          </h3>
          {[
            { event: 'Gala Dinner', date: '19 Nov', reg: 387, cap: 500, color: 'bg-amber-500' },
            { event: 'Tri-Services Show', date: '20 Nov', reg: 4215, cap: 5000, color: 'bg-primary' },
            { event: 'Golf Tournament', date: '18 Nov', reg: 62, cap: 80, color: 'bg-blue-600' },
            { event: 'Seminar', date: '21 Nov', reg: 934, cap: 1200, color: 'bg-purple-600' },
          ].map(e => (
            <div key={e.event} className="mb-3 last:mb-0">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium">{e.event} <span className="text-muted-foreground font-normal">({e.date})</span></span>
                <span className="text-muted-foreground">{e.reg.toLocaleString()} / {e.cap.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${e.color} rounded-full transition-all`} style={{ width: `${Math.round(e.reg / e.cap * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Delegation status */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-sm mb-4">Delegation Status</h3>
          <div className="space-y-2">
            {[
              { country: 'China', head: 'Gen Li Wei', status: 'arrived', members: 20, cat: 'Military' },
              { country: 'UAE', head: 'Brig Al-Mazrouei', status: 'arrived', members: 15, cat: 'Military' },
              { country: 'Egypt', head: 'Air Marshal Said', status: 'arrived', members: 7, cat: 'Military' },
              { country: 'Saudi Arabia', head: 'Lt Gen Al-Harbi', status: 'confirmed', members: 12, cat: 'Military' },
              { country: 'Turkey', head: 'Dr. Yilmaz', status: 'confirmed', members: 6, cat: 'Diplomatic' },
              { country: 'Germany', head: 'Ms. Braun', status: 'pending', members: 5, cat: 'Commercial' },
            ].map(d => (
              <div key={d.country} className="flex items-center justify-between text-xs py-1 border-b border-border last:border-0">
                <div>
                  <span className="font-semibold">{d.country}</span>
                  <span className="text-muted-foreground ml-2">{d.head}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{d.members} pax</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    d.status === 'arrived' ? 'bg-green-100 text-green-700' :
                    d.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{d.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parking zones */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-sm mb-4">Parking Zones — Live Occupancy</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { zone: 'P-VVIP', total: 20, used: 14, color: 'text-red-600' },
            { zone: 'P-VIP', total: 60, used: 41, color: 'text-orange-600' },
            { zone: 'P-Exhibitor', total: 200, used: 156, color: 'text-blue-600' },
            { zone: 'P-Visitor', total: 500, used: 312, color: 'text-green-700' },
            { zone: 'P-Staff', total: 150, used: 98, color: 'text-purple-600' },
          ].map(z => (
            <div key={z.zone} className="bg-secondary rounded-lg p-3 text-center">
              <p className="text-xs font-semibold text-muted-foreground">{z.zone}</p>
              <p className={`text-2xl font-bold ${z.color} mt-1`}>{z.used}</p>
              <p className="text-xs text-muted-foreground">/ {z.total} slots</p>
              <div className="h-1.5 bg-border rounded-full mt-2 overflow-hidden">
                <div className={`h-full rounded-full bg-current ${z.color}`} style={{ width: `${Math.round(z.used / z.total * 100)}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{Math.round(z.used / z.total * 100)}% full</p>
            </div>
          ))}
        </div>
      </div>

      {/* Badge & access mix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Badge mix', value: 'VVIP 12% • VIP 24% • Exhibitor 28% • Visitor 30% • Media 6%', color: 'bg-blue-50 border-blue-100 text-blue-800' },
          { label: 'Access scans today', value: '18,240', color: 'bg-emerald-50 border-emerald-100 text-emerald-800' },
          { label: 'Avg gate wait', value: '2m 40s', color: 'bg-amber-50 border-amber-100 text-amber-800' },
          { label: 'Overstay alerts', value: '5 vehicles flagged', color: 'bg-rose-50 border-rose-100 text-rose-800' },
        ].map(c => (
          <div key={c.label} className={`rounded-lg border ${c.color} p-3 text-xs`}>
            <p className="font-semibold text-foreground">{c.label}</p>
            <p className="mt-1 text-sm">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Quick Actions</h3>
          <p className="text-[11px] text-muted-foreground">Jump into the most-used modules</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickLinks.map(link => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-border hover:border-primary hover:text-primary transition-colors bg-secondary/60"
            >
              <span className={`w-2 h-2 rounded-full ${link.color} opacity-80`} />
              <span className="font-semibold">{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick access modules (respect role visibility) */}
      <div>
        <h3 className="font-semibold text-sm mb-3">All Modules</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {modules.filter(m => allowed.includes(m.id)).map(m => (
            <button
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className="bg-card border border-border rounded-lg p-4 text-left hover:border-primary hover:shadow-sm transition-all group"
            >
              <div className={`w-8 h-8 rounded-md ${m.color} flex items-center justify-center mb-2`}>
                <span className="w-4 h-4 text-white opacity-90">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                  </svg>
                </span>
              </div>
              <p className="text-xs font-semibold text-foreground group-hover:text-primary leading-tight">{m.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-sm mb-3">Recent System Activity</h3>
        <div className="space-y-0">
          {[
            { action: 'Badge Printed', detail: 'VVIP-2026-0001 — Maj Gen (R) Farrukh Ali', time: '09:15', dot: 'bg-blue-500' },
            { action: 'Vehicle Entry', detail: 'ISD-001 entered Zone P-VVIP', time: '08:15', dot: 'bg-orange-500' },
            { action: 'Delegation Arrived', detail: 'Chinese delegation (20 pax) — Gen Li Wei', time: '08:00', dot: 'bg-purple-500' },
            { action: 'Attendance Scan', detail: 'MED-2026-0501 scanned at Press Area', time: '09:00', dot: 'bg-green-500' },
            { action: 'User Login', detail: 'admin@depo.gov.pk authenticated', time: '07:45', dot: 'bg-primary' },
            { action: 'Badge Lost Report', detail: 'VIS-2026-0401 — reported lost', time: '10:30', dot: 'bg-red-500' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 text-xs py-2 border-b border-border last:border-0">
              <span className={`w-2 h-2 rounded-full shrink-0 ${a.dot}`} />
              <span className="font-semibold text-foreground w-32 shrink-0">{a.action}</span>
              <span className="text-muted-foreground flex-1 truncate">{a.detail}</span>
              <span className="text-muted-foreground shrink-0 font-mono">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
