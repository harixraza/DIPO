'use client'

import { useState, useEffect } from 'react'
import { login, getCurrentUser, logout, initStore, type User } from '@/lib/store'
import Dashboard from '@/components/Dashboard'

type MobileStage = 'role' | 'login' | 'home'
type MobileSection = 'home' | 'passes' | 'checkin' | 'support' | 'more'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const [mobileDemo, setMobileDemo] = useState(false)
  const [mobileStage, setMobileStage] = useState<MobileStage>('role')
  const [mobileRole, setMobileRole] = useState<string | null>(null)
  const [mobileEmail, setMobileEmail] = useState('')
  const [mobilePass, setMobilePass] = useState('')
  const [mobileError, setMobileError] = useState('')
  const [mobileSection, setMobileSection] = useState<MobileSection>('home')
  const [mobileTaskOpen, setMobileTaskOpen] = useState<string | null>(null)
  const [mobileEventOpen, setMobileEventOpen] = useState<string | null>(null)
  const [mobileTasks, setMobileTasks] = useState<
    { id: string; text: string; due: string; status: string; detail: string }[]
  >([])
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')
  const [newTaskDue, setNewTaskDue] = useState('')
  const [mobileMoreOpen, setMobileMoreOpen] = useState<string | null>(null)

  const roleNav = (role: string | null): { key: MobileSection; label: string; icon: string }[] => {
    if (role === 'Security') {
      return [
        { key: 'home', label: 'Home', icon: 'M3 12h18M3 6h18M3 18h18' },
        { key: 'checkin', label: 'Check', icon: 'M5 13l4 4L19 7' },
        { key: 'support', label: 'Support', icon: 'M12 20v-2M9 9a3 3 0 1 1 6 0c0 2-3 2-3 5' },
        { key: 'more', label: 'More', icon: 'M12 5v14M5 12h14' },
      ]
    }
    if (role === 'VIP') {
      return [
        { key: 'home', label: 'Home', icon: 'M3 12h18M3 6h18M3 18h18' },
        { key: 'passes', label: 'Passes', icon: 'M4 6h16v12H4zM9 10h6M9 14h4' },
        { key: 'support', label: 'Support', icon: 'M12 20v-2M9 9a3 3 0 1 1 6 0c0 2-3 2-3 5' },
        { key: 'more', label: 'More', icon: 'M12 5v14M5 12h14' },
      ]
    }
    return [
      { key: 'home', label: 'Home', icon: 'M3 12h18M3 6h18M3 18h18' },
      { key: 'passes', label: 'Passes', icon: 'M4 6h16v12H4zM9 10h6M9 14h4' },
      { key: 'checkin', label: 'Check', icon: 'M5 13l4 4L19 7' },
      { key: 'support', label: 'Support', icon: 'M12 20v-2M9 9a3 3 0 1 1 6 0c0 2-3 2-3 5' },
      { key: 'more', label: 'More', icon: 'M12 5v14M5 12h14' },
    ]
  }

  const roleTasks = (role: string | null) => {
    if (role === 'Security') {
      return [
        { id: 't-sec-1', text: 'Patrol Zone B cameras', due: 'Now', status: 'in_progress', detail: 'Check CCTV feed for blind spots.' },
        { id: 't-sec-2', text: 'Clear VIP convoy lane', due: '10:10', status: 'pending', detail: 'Lane B, 6 vehicles.' },
        { id: 't-sec-3', text: 'Badge spot-check', due: '10:30', status: 'pending', detail: 'Random sweep at Gate A.' },
      ]
    }
    if (role === 'VIP') {
      return [
        { id: 't-vip-1', text: 'Review agenda', due: '11:00', status: 'pending', detail: 'Seminar Hall A, 14:00 slot.' },
        { id: 't-vip-2', text: 'Arrange escort', due: '12:00', status: 'pending', detail: 'To Tri-Services Show, 08:45 tomorrow.' },
      ]
    }
    if (role === 'Exhibitor') {
      return [
        { id: 't-exh-1', text: 'Confirm booth logistics', due: '10:00', status: 'in_progress', detail: 'Hall C Dock 2 delivery at 10:15.' },
        { id: 't-exh-2', text: 'Upload marketing collateral', due: '11:30', status: 'pending', detail: 'Media module / CMS.' },
        { id: 't-exh-3', text: 'Schedule demo slot', due: '13:00', status: 'pending', detail: 'Demo stage Hall B.' },
      ]
    }
    return [
      { id: 't-vis-1', text: 'Badge ready at Gate A', due: '09:45', status: 'pending', detail: 'Carry photo ID.' },
      { id: 't-vis-2', text: 'Plan walk-through', due: '11:00', status: 'pending', detail: 'Start with Hall C then Hall B.' },
    ]
  }
  const resetMobile = () => {
    setMobileStage('role')
    setMobileRole(null)
    setMobileEmail('')
    setMobilePass('')
    setMobileError('')
    setMobileSection('home')
  }

  useEffect(() => {
    initStore()
    const u = getCurrentUser()
    setUser(u)
    setInitialized(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      const u = login(email, password)
      if (u) {
        setUser(u)
      } else {
        setError('Invalid credentials. Please try again.')
      }
      setLoading(false)
    }, 400)
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    setEmail('')
    setPassword('')
  }

  if (!initialized) return null

  if (!user) {
    return (
      <>
      <div
        className="min-h-screen w-full text-white"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(0,128,80,0.14), transparent 32%), radial-gradient(circle at 80% 18%, rgba(0,128,80,0.16), transparent 30%), linear-gradient(135deg, #0d1514 0%, #0a1814 46%, #0f1f19 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-white space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs tracking-wide uppercase">Official • DEPO</div>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">IDEAS 2026<br />Management Portal</h1>
            <p className="text-white/75 max-w-xl text-sm lg:text-base">Role-based access for admin, logistics, security, exhibitors, VIPs and visitors. Local-storage only demo that mirrors the RFP modules.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-white/85">
              {['Logistics', 'Parking', 'Delegations', 'Badging', 'Media', 'Support'].map(item => (
                <div key={item} className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 shadow-sm shadow-black/20">{item}</div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border/70">
              <div className="bg-primary px-8 pt-8 pb-6 text-center">
                <div className="flex justify-center mb-4">
                  <img src="https://ideaspakistan.gov.pk/static/images/IDEAS.png" alt="IDEAS Logo" className="h-16 object-contain" crossOrigin="anonymous" />
                </div>
                <h2 className="text-primary-foreground text-xl font-bold tracking-wide">Secure Login</h2>
                <p className="text-primary-foreground/70 text-sm mt-1">International Defence Exhibition &amp; Seminar</p>
                <p className="text-primary-foreground/60 text-xs mt-1">DEPO Management Portal</p>
              </div>

              <div className="px-8 py-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="user@depo.gov.pk"
                      className="w-full px-3 py-2 border border-input rounded-md text-sm bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 border border-input rounded-md text-sm bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                  {error && <p className="text-destructive text-sm bg-destructive/10 px-3 py-2 rounded-md">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
                  >
                    {loading ? 'Authenticating...' : 'Login to Portal'}
                  </button>
                </form>

                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground font-semibold mb-2">Quick test accounts</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { label: 'Admin', email: 'admin@depo.gov.pk', pw: 'admin123' },
                      { label: 'Event Mgr', email: 'events@depo.gov.pk', pw: 'events123' },
                      { label: 'Badge Officer', email: 'badges@depo.gov.pk', pw: 'badge123' },
                      { label: 'Parking', email: 'parking@depo.gov.pk', pw: 'park123' },
                      { label: 'Delegation', email: 'delegation@depo.gov.pk', pw: 'deleg123' },
                      { label: 'VIP Guest', email: 'vip001@ideas2026.pk', pw: 'vip123' },
                      { label: 'Exhibitor', email: 'uk.exhibitor@ideas2026.pk', pw: 'uk123' },
                      { label: 'Security', email: 'security@depo.gov.pk', pw: 'sec123' },
                    ].map(u => (
                      <button
                        key={u.email}
                        onClick={() => { setEmail(u.email); setPassword(u.pw) }}
                        className="text-xs px-2 py-1.5 bg-secondary text-secondary-foreground rounded hover:bg-accent hover:text-accent-foreground transition-colors text-left truncate"
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 pb-8">
          <button
            onClick={() => { setMobileDemo(true); resetMobile() }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/30 text-white/80 text-xs hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M12 17h.01"/></svg>
            View Mobile App Demo
          </button>
          <p className="text-white/40 text-xs">Defence Export Promotion Organization &copy; 2026</p>
        </div>
      </div>

        {mobileDemo && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-card w-full max-w-5xl rounded-2xl border border-border shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Mobile App Demo</p>
                  <p className="text-sm text-foreground">Minimal front-end for exhibitors / visitors / security</p>
                </div>
                <button onClick={() => { setMobileDemo(false); resetMobile() }} className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground">
                  Close
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Preview the handheld experience end-to-end:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Pick a persona, enter credentials, land on mobile home</li>
                    <li>Pass preview with QR, check-in, support entry points</li>
                    <li>Pure front-end; doesn’t affect portal data</li>
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Exhibitor', 'Visitor', 'Security', 'VIP'].map(r => (
                      <span key={r} className="text-[11px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">{r} flow</span>
                    ))}
                  </div>
                  {mobileError && <p className="text-destructive text-xs bg-destructive/10 px-3 py-2 rounded-md">{mobileError}</p>}
                </div>

                <div className="flex justify-center">
                  <div className="relative w-[320px] h-[640px] rounded-[24px] bg-gradient-to-b from-[#e9f5ec] via-[#e1f0e6] to-[#d8e8df] text-slate-900 shadow-2xl overflow-hidden border border-[#c9dfd0]">
                    <div className="absolute inset-x-16 top-3 h-1.5 bg-slate-300/60 rounded-full" />
                    <div className="flex-1 flex flex-col h-full">
                      <div className="px-5 pt-6 pb-3 flex items-center justify-between bg-[#075e54] text-white">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/80">IDEAS 2026</p>
                          <p className="text-lg font-semibold">Mobile Portal</p>
                        </div>
                        <span className="px-2 py-1 text-[11px] rounded-full bg-white/20 text-white">Online</span>
                      </div>

                      <div className="px-5 pb-6 flex-1 overflow-auto space-y-4 text-slate-800">
                        {mobileStage === 'role' && (
                          <div className="h-full flex items-center justify-center">
                            <div className="rounded-xl bg-white border border-slate-200 p-4 w-full space-y-2 text-center">
                              <p className="text-xs text-slate-700 font-semibold">Select Login</p>
                              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-800">
                                {[
                                  { label: 'Exhibitor', color: 'bg-blue-100 text-blue-800', email: 'uk.exhibitor@ideas2026.pk' },
                                  { label: 'Visitor', color: 'bg-emerald-100 text-emerald-800', email: 'vip001@ideas2026.pk' },
                                  { label: 'Security', color: 'bg-amber-100 text-amber-800', email: 'security@depo.gov.pk' },
                                  { label: 'VIP', color: 'bg-purple-100 text-purple-800', email: 'vip001@ideas2026.pk' },
                                ].map(card => (
                                  <button
                                    key={card.label}
                                  onClick={() => {
                                    setMobileRole(card.label)
                                    setMobileStage('login')
                                    setMobileEmail(card.email)
                                    setMobilePass('')
                                    setMobileError('')
                                    setMobileTasks(roleTasks(card.label))
                                    setMobileSection('home')
                                  }}
                                    className={`rounded-lg border border-slate-200 px-2 py-3 text-center ${card.color}`}
                                  >
                                    <p className="font-semibold">{card.label}</p>
                                    <p className="text-[10px] opacity-80 text-slate-700">Tap to continue</p>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {mobileStage === 'login' && (
                          <div className="h-full flex items-center justify-center">
                            <div className="rounded-xl bg-white border border-slate-200 p-4 w-full space-y-3">
                              <p className="text-xs text-slate-700 flex items-center justify-between">
                                Login as <span className="font-semibold text-slate-900">{mobileRole}</span>
                              </p>
                              <div className="space-y-2 text-[11px] text-slate-800">
                                <input
                                  value={mobileEmail}
                                  onChange={e => setMobileEmail(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                  placeholder="email"
                                />
                                <input
                                  type="password"
                                  value={mobilePass}
                                  onChange={e => setMobilePass(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                  placeholder="password"
                                />
                              </div>
                            <div className="flex gap-2 text-[11px]">
                              <button
                                onClick={() => {
                                  if (!mobileEmail || !mobilePass) { setMobileError('Enter email & password to continue.'); return }
                                  setMobileStage('home')
                                  setMobileError('')
                                  setMobileSection('home')
                                  setMobileTasks(roleTasks(mobileRole))
                                }}
                                className="flex-1 px-3 py-2 rounded-lg bg-[#075e54] text-white font-semibold hover:bg-[#064d44] transition-colors"
                              >
                                Continue
                              </button>
                                <button
                                  onClick={() => { setMobileStage('role'); setMobileRole(null); setMobileError('') }}
                                  className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                  Back
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {mobileStage === 'home' && (
                          <div className="space-y-3 text-[11px] pb-2">
                            <div className="rounded-xl bg-white border border-slate-200 p-3 text-slate-800">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs text-slate-600">Welcome</p>
                                  <p className="text-sm font-semibold text-slate-900">{mobileRole}</p>
                                </div>
                                <button onClick={() => resetMobile()} className="px-2 py-1 rounded-md border border-slate-300 text-slate-700">
                                  Switch
                                </button>
                              </div>
                            </div>

                            {mobileSection === 'home' && (
                              <div className="space-y-3">
                                <div className="rounded-xl bg-white border border-slate-200 text-slate-900 p-3">
                                  <p className="text-xs font-semibold">PASS • {mobileRole || 'User'}</p>
                                  <p className="text-[11px] text-slate-600">Valid • Exhibition Hall / Zone B</p>
                                  <div className="h-20 bg-slate-200 mt-2 rounded flex items-center justify-center text-slate-500 text-[11px]">
                                    <img
                                      alt="QR"
                                      src={'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="white"/><path d="M10 10h30v30H10zM20 20h10v10H20zM80 10h30v30H80zM90 20h10v10H90zM10 80h30v30H10zM20 90h10v10H20zM55 55h10v10H55zM70 70h20v10H70zM70 50h10v10H70zM50 70h10v10H50z" fill="black"/></svg>'}
                                      className="h-16 w-16"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  {[
                                    { label: 'Visits today', value: '1,284' },
                                    { label: 'Active passes', value: '842' },
                                    { label: 'Alerts', value: '3' },
                                  ].map(card => (
                                    <div key={card.label} className="rounded-lg bg-white border border-slate-200 p-3 text-center text-slate-900">
                                      <p className="text-sm font-semibold">{card.value}</p>
                                      <p className="text-[10px] text-slate-500 mt-1">{card.label}</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-2">
                                  <p className="text-slate-900 font-semibold text-xs">Upcoming</p>
                                  {[
                                    { id: 'gala', title: 'Gala Dinner', time: 'Today 19:00', place: 'Marriott Islamabad', detail: 'Seating & protocol final check at 18:15.' },
                                    { id: 'tri', title: 'Tri-Services Show', time: 'Tomorrow 09:00', place: 'Parade Ground', detail: 'Convoy muster 08:15. Media pit brief 08:40.' },
                                  ].map(item => (
                                    <div key={item.id} className="text-[11px]">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className="text-slate-900">{item.title}</p>
                                          <p className="text-slate-600">{item.place}</p>
                                        </div>
                                        <button
                                          onClick={() => setMobileEventOpen(prev => prev === item.id ? null : item.id)}
                                          className="text-slate-700 underline decoration-dashed"
                                        >
                                          {item.time}
                                        </button>
                                      </div>
                                      {mobileEventOpen === item.id && (
                                        <div className="mt-1 rounded-md bg-slate-50 border border-slate-200 p-2 text-slate-700">
                                          {item.detail}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-2">
                                  <p className="text-slate-900 font-semibold text-xs">Tasks</p>
                                  {mobileTasks.map(t => (
                                    <div key={t.id} className="flex flex-col gap-1 text-[11px] text-slate-800">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <input type="checkbox" className="h-4 w-4 rounded border-slate-400 accent-[#075e54]" />
                                          <span>{t.text}</span>
                                        </div>
                                        <button
                                          onClick={() => setMobileTaskOpen(prev => prev === t.id ? null : t.id)}
                                          className="text-slate-500 underline decoration-dashed"
                                        >
                                          {t.due}
                                        </button>
                                      </div>
                                      {mobileTaskOpen === t.id && (
                                        <div className="rounded-md bg-slate-50 border border-slate-200 p-2 text-slate-700">
                                          {t.detail}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                  {showAddTask && (
                                    <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
                                      <input
                                        value={newTaskText}
                                        onChange={e => setNewTaskText(e.target.value)}
                                        placeholder="Task detail"
                                        className="col-span-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                                      />
                                      <input
                                        value={newTaskDue}
                                        onChange={e => setNewTaskDue(e.target.value)}
                                        placeholder="Due (e.g., 12:30)"
                                        className="col-span-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                                      />
                                      <button
                                        onClick={() => {
                                          if (!newTaskText.trim()) return
                                          setMobileTasks(prev => [...prev, {
                                            id: 't' + Date.now(),
                                            text: newTaskText.trim(),
                                            due: newTaskDue || 'TBD',
                                            status: 'pending',
                                            detail: 'New task added.',
                                          }])
                                          setNewTaskText('')
                                          setNewTaskDue('')
                                          setShowAddTask(false)
                                        }}
                                        className="px-3 py-2 rounded-lg bg-[#075e54] text-white text-[11px]"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => { setShowAddTask(false); setNewTaskText(''); setNewTaskDue('') }}
                                        className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-[11px]"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  )}
                                  {!showAddTask && (
                                    <button
                                      onClick={() => setShowAddTask(true)}
                                      className="w-full mt-1 px-3 py-2 rounded-lg border border-dashed border-slate-300 text-slate-600 text-[11px] hover:bg-slate-50"
                                    >
                                      + Add task
                                    </button>
                                  )}
                                </div>
                                <div className="rounded-lg bg-white border border-slate-200 p-3">
                                  <p className="text-slate-900">Notifications</p>
                                  <p className="text-slate-600 mt-1">Gate A peak at 09:30. Parking P-VIP at 82%.</p>
                                </div>
                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-1">
                                  <p className="text-slate-900 font-semibold text-xs">Ops Highlights</p>
                                  <p className="text-slate-700">Logistics: 3 pickups due in next hour.</p>
                                  <p className="text-slate-700">Vehicles: P-VIP at 78% capacity.</p>
                                  <p className="text-slate-700">Delegations: KSA convoy ETA 14:20.</p>
                                  <p className="text-slate-700">Cyber: 0 critical, 2 medium alerts.</p>
                                </div>
                              </div>
                            )}

                            {mobileSection === 'passes' && (
                              <div className="space-y-3">
                                {[
                                  { code: 'EXH-2026-0301', label: 'Exhibitor', zones: 'Hall C / Zone B', status: 'Active' },
                                  { code: 'VIP-2026-0201', label: 'VIP', zones: 'VIP Lounge / Zone A', status: 'Active' },
                                  { code: 'VIS-2026-0401', label: 'Visitor', zones: 'Exhibition Hall', status: 'Pending' },
                                ].map(pass => (
                                  <div key={pass.code} className="rounded-xl bg-white border border-slate-200 p-3">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="text-slate-900 font-semibold">{pass.code}</p>
                                        <p className="text-slate-600 text-[11px]">{pass.label}</p>
                                      </div>
                                      <span className={`px-2 py-1 rounded-full text-[10px] ${pass.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                        {pass.status}
                                      </span>
                                    </div>
                                    <p className="text-slate-600 text-[11px] mt-1">{pass.zones}</p>
                                    <div className="mt-2 h-14 bg-slate-100 rounded-lg flex items-center justify-center">
                                      <span className="text-slate-700 text-[10px]">QR • {pass.code}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {mobileSection === 'checkin' && (
                              <div className="space-y-3">
                                <div className="rounded-xl bg-white border border-slate-200 p-3 text-center">
                                  <p className="text-slate-800 text-xs mb-2">Scan QR / Badge</p>
                                  <div className="h-32 w-full bg-slate-100 rounded-lg flex items-center justify-center">
                                    <p className="text-slate-500">Camera feed placeholder</p>
                                  </div>
                                  <p className="text-slate-600 mt-2 text-[11px]">Auto-capture & validate against pass.</p>
                                </div>
                                <div className="rounded-lg bg-white border border-slate-200 p-3 text-[11px] space-y-1">
                                  <p className="text-slate-900 font-semibold text-xs">Last scans</p>
                                  {[
                                    'VIS-0401 • Zone B • 09:35',
                                    'EXH-0302 • Hall C • 09:32',
                                    'VIP-0201 • VIP Lounge • 09:30',
                                  ].map(s => (
                                    <p key={s} className="text-slate-600">{s}</p>
                                  ))}
                                </div>
                              </div>
                            )}

                            {mobileSection === 'support' && (
                              <div className="space-y-3">
                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-2 text-[11px]">
                                  <p className="text-slate-900 font-semibold text-xs">Support / Chat</p>
                                  <div className="space-y-1">
                                    <div className="rounded bg-slate-100 p-2">
                                      <p className="text-slate-900">How can we help?</p>
                                      <p className="text-slate-600">I need parking guidance.</p>
                                    </div>
                                    <div className="rounded bg-emerald-50 p-2">
                                      <p className="text-emerald-800">Support</p>
                                      <p className="text-emerald-700">Follow P-VIP signage; staff will assist.</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 flex-col">
                                    <input
                                      value={mobileError}
                                      onChange={e => setMobileError(e.target.value)}
                                      placeholder="Type a message..."
                                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                                    />
                                    <button className="w-full px-3 py-2 rounded-lg bg-emerald-500 text-white text-[11px]">Send</button>
                                  </div>
                                </div>
                                <div className="rounded-lg bg-white border border-slate-200 p-3 text-[11px]">
                                  <p className="text-slate-900 font-semibold text-xs">Hotlines</p>
                                  <p className="text-slate-600 mt-1">Security: +92 51 9262017</p>
                                  <p className="text-slate-600">Logistics: +92 51 9262018</p>
                                  <p className="text-slate-600">Helpdesk: +92 51 9262019</p>
                                </div>
                                <div className="rounded-lg bg-white border border-slate-200 p-3 text-[11px] space-y-2">
                                  <p className="text-slate-900 font-semibold text-xs">FAQs</p>
                                  {[
                                    'Where is Gate A parking?',
                                    'What time is badge reprint desk open?',
                                    'How to reach logistics dock?',
                                  ].map(q => (
                                    <p key={q} className="text-slate-600">• {q}</p>
                                  ))}
                                </div>
                              </div>
                            )}

                            {mobileSection === 'more' && (
                              <div className="space-y-3 text-[11px]">
                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-1">
                                  <p className="text-slate-900 font-semibold text-xs">Profile</p>
                                  <p className="text-slate-900">Name: {mobileRole || 'User'}</p>
                                  <p className="text-slate-600">Org: IDEAS 2026 Guest</p>
                                  <p className="text-slate-600">Email: {mobileEmail || '---'}</p>
                                </div>

                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-1">
                                  <p className="text-slate-900 font-semibold text-xs">Vehicle & Parking</p>
                                  <p className="text-slate-700">P-VIP: 78% • P-VVIP: 65% • P-Visitor: 60%</p>
                                  <button className="w-full mt-1 px-3 py-2 rounded-lg bg-[#075e54] text-white text-[11px]">Request Motorcade Clearance</button>
                                </div>

                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-1">
                                  <p className="text-slate-900 font-semibold text-xs">Logistics & Pickups</p>
                                  {['SEA-2278 (Customs)', 'AIR-441 (Arrived)', 'TRK-019 (In transit)'].map(ref => (
                                    <p key={ref} className="text-slate-700">{ref}</p>
                                  ))}
                                  <button className="w-full mt-1 px-3 py-2 rounded-lg border border-dashed border-slate-300 text-slate-700 hover:bg-slate-50">Confirm Pickup</button>
                                </div>

                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-1">
                                  <p className="text-slate-900 font-semibold text-xs">Badge & Reprint</p>
                                  <p className="text-slate-700">Current: {mobileRole || 'User'} • VIS-2026-0401</p>
                                  <div className="flex gap-2">
                                    <button className="flex-1 px-3 py-2 rounded-lg bg-slate-900 text-white">Show QR</button>
                                    <button className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-700">Report Lost</button>
                                  </div>
                                </div>

                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-1">
                                  <p className="text-slate-900 font-semibold text-xs">Delegations</p>
                                  <p className="text-slate-700">KSA convoy ETA 14:20 • Protocol: Military</p>
                                  <p className="text-slate-700">China delegation at hotel • Status: Arrived</p>
                                </div>

                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-1">
                                  <p className="text-slate-900 font-semibold text-xs">Incident & Emergency</p>
                                  <button className="w-full px-3 py-2 rounded-lg bg-red-500 text-white">Raise Incident</button>
                                  <button className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-700">SOS / Emergency</button>
                                </div>

                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-1">
                                  <p className="text-slate-900 font-semibold text-xs">Event Schedule</p>
                                  <p className="text-slate-700">Gala Dinner • 19:00 • Marriott</p>
                                  <p className="text-slate-700">Tri-Services Show • 09:00 • Parade Ground</p>
                                  <p className="text-slate-700">Seminar • 14:00 • Hall A</p>
                                </div>

                                <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-1">
                                  <p className="text-slate-900 font-semibold text-xs">Media & Social</p>
                                  <p className="text-slate-700">Mentions: +12 • Sentiment: Positive</p>
                                  <button className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-700">Open Media Feed</button>
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => resetMobile()}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                            >
                              Logout
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Bottom nav (sticky like mobile apps) */}
                      <div className="border-t border-white/10 bg-black/70 px-1 py-1 flex justify-around text-[11px]">
                        {roleNav(mobileRole).map(item => {
                          const active = mobileSection === item.key
                          return (
                            <button
                              key={item.key}
                              onClick={() => setMobileSection(item.key)}
                              className={`flex flex-col items-center px-2 py-1 rounded-md ${active ? 'text-white' : 'text-slate-400'}`}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d={item.icon} />
                              </svg>
                              <span className="capitalize">{item.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return <Dashboard user={user} onLogout={handleLogout} />
}
