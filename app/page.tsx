'use client'

import { useState, useEffect } from 'react'
import { login, getCurrentUser, logout, initStore, type User } from '@/lib/store'
import Dashboard from '@/components/Dashboard'
import Image from 'next/image'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #0f2318 50%, #1a3a2a 100%)' }}>
        <div className="w-full max-w-md mx-4">
          {/* Card */}
          <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border">
            {/* Header */}
            <div className="bg-primary px-8 pt-8 pb-6 text-center">
              <div className="flex justify-center mb-4">
                <img src="https://ideaspakistan.gov.pk/static/images/IDEAS.png" alt="IDEAS Logo" className="h-16 object-contain" crossOrigin="anonymous" />
              </div>
              <h1 className="text-primary-foreground text-xl font-bold tracking-wide">IDEAS 2026</h1>
              <p className="text-primary-foreground/70 text-sm mt-1">International Defence Exhibition & Seminar</p>
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
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
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
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
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

              {/* Test users */}
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground font-semibold mb-2">Test Accounts:</p>
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
          <p className="text-center text-white/40 text-xs mt-4">Defence Export Promotion Organization &copy; 2026</p>
        </div>
      </div>
    )
  }

  return <Dashboard user={user} onLogout={handleLogout} />
}
