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

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-primary rounded-xl p-6 text-primary-foreground flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-balance">Welcome, {user.name.split(' ').slice(-1)[0]}</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">IDEAS 2026 — International Defence Exhibition & Seminar</p>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="text-xs bg-primary-foreground/20 px-3 py-1 rounded-full capitalize">{user.role.replace(/_/g, ' ')}</span>
            <span className="text-xs text-primary-foreground/60">19 Nov — 22 Nov 2026 • Islamabad, Pakistan</span>
          </div>
        </div>
        <img src="https://ideaspakistan.gov.pk/static/images/IDEAS.png" alt="IDEAS Logo" className="h-16 object-contain opacity-80 hidden md:block" crossOrigin="anonymous" />
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
