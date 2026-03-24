'use client'

import { useState, useEffect } from 'react'
import { getBadges, updateBadge, addBadge, type BadgeRecord, type User } from '@/lib/store'

const catColor = (cat: BadgeRecord['category']) => ({
  VVIP: 'bg-red-600 text-white',
  VIP: 'bg-amber-500 text-white',
  Exhibitor: 'bg-blue-600 text-white',
  Visitor: 'bg-green-600 text-white',
  Media: 'bg-purple-600 text-white',
  Security: 'bg-gray-700 text-white',
  Staff: 'bg-teal-600 text-white',
}[cat] || 'bg-secondary text-secondary-foreground')

const statusColor = (s: BadgeRecord['status']) => ({
  printed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  lost: 'bg-red-100 text-red-700',
  blacklisted: 'bg-gray-100 text-gray-600 line-through',
}[s])

function BadgePreview({ badge }: { badge: BadgeRecord }) {
  return (
    <div className={`w-48 mx-auto rounded-xl overflow-hidden shadow-xl border-4 ${badge.category === 'VVIP' ? 'border-red-600' : badge.category === 'VIP' ? 'border-amber-500' : badge.category === 'Exhibitor' ? 'border-blue-600' : badge.category === 'Media' ? 'border-purple-600' : 'border-green-600'}`}>
      <div className={`px-4 py-3 text-center ${catColor(badge.category)}`}>
        <img src="https://ideaspakistan.gov.pk/static/images/IDEAS.png" alt="IDEAS" className="h-8 mx-auto mb-1 object-contain" crossOrigin="anonymous" />
        <p className="text-xs font-bold tracking-widest">{badge.category}</p>
      </div>
      <div className="bg-white px-4 py-4 text-center">
        <div className="w-12 h-12 rounded-full bg-primary mx-auto flex items-center justify-center text-primary-foreground text-xl font-bold mb-2">
          {badge.userName.charAt(0)}
        </div>
        <p className="font-bold text-gray-900 text-sm leading-tight">{badge.userName}</p>
        <div className="mt-2 bg-gray-100 rounded p-1.5">
          <div className="grid grid-cols-6 gap-0.5 mb-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`h-4 w-1 rounded-sm ${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-gray-900 opacity-40'}`} style={{ height: `${8 + (i % 3) * 4}px` }} />
            ))}
          </div>
          <p className="text-xs font-mono text-gray-700">{badge.badgeCode}</p>
        </div>
        <div className="mt-2 flex flex-wrap gap-1 justify-center">
          {badge.zoneAccess.slice(0, 3).map(z => (
            <span key={z} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{z}</span>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">IDEAS 2026 | DEPO</p>
      </div>
    </div>
  )
}

export default function BadgePrinting({ user }: { user: User }) {
  const [badges, setBadges] = useState<BadgeRecord[]>([])
  const [selected, setSelected] = useState<BadgeRecord | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [scanInput, setScanInput] = useState('')
  const [scanResult, setScanResult] = useState<BadgeRecord | null | 'not_found'>(null)
  const [form, setForm] = useState({ userName: '', category: 'Visitor' as BadgeRecord['category'], zoneAccess: 'Zone-B,Exhibition-Hall', userId: '' })

  useEffect(() => { setBadges(getBadges()) }, [])

  const filtered = badges.filter(b => {
    const matchFilter = filter === 'all' || b.category === filter || b.status === filter
    const matchSearch = b.userName.toLowerCase().includes(search.toLowerCase()) || b.badgeCode.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const handlePrint = (badge: BadgeRecord) => {
    const updated = { ...badge, status: 'printed' as const, printedAt: new Date().toISOString().split('T')[0] }
    updateBadge(updated)
    setBadges(getBadges())
    setSelected(updated)
  }

  const handleBlacklist = (badge: BadgeRecord) => {
    if (confirm(`Blacklist badge ${badge.badgeCode}?`)) {
      updateBadge({ ...badge, status: 'blacklisted' })
      setBadges(getBadges())
      setSelected(null)
    }
  }

  const handleMarkLost = (badge: BadgeRecord) => {
    updateBadge({ ...badge, status: 'lost' })
    setBadges(getBadges())
    setSelected(null)
  }

  const handleAddBadge = () => {
    const catPrefixes: Record<string, string> = { VVIP: 'VVIP', VIP: 'VIP', Exhibitor: 'EXH', Visitor: 'VIS', Media: 'MED', Security: 'SEC', Staff: 'STF' }
    const code = `${catPrefixes[form.category]}-2026-${Date.now().toString().slice(-4)}`
    addBadge({
      userId: form.userId || 'u' + Date.now(),
      userName: form.userName,
      category: form.category,
      badgeCode: code,
      status: 'pending',
      zoneAccess: form.zoneAccess.split(',').map(z => z.trim()),
    })
    setBadges(getBadges())
    setShowForm(false)
  }

  const handleScan = () => {
    const found = badges.find(b => b.badgeCode.toLowerCase() === scanInput.toLowerCase())
    setScanResult(found || 'not_found')
  }

  const stats = {
    total: badges.length,
    printed: badges.filter(b => b.status === 'printed').length,
    pending: badges.filter(b => b.status === 'pending').length,
    lost: badges.filter(b => b.status === 'lost').length,
    blacklisted: badges.filter(b => b.status === 'blacklisted').length,
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Badge Printing & Accreditation</h2>
          <p className="text-sm text-muted-foreground">Badge Code Generation System (BPCGS)</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
          + Issue Badge
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Total', value: stats.total, color: 'text-foreground' },
          { label: 'Printed', value: stats.printed, color: 'text-green-600' },
          { label: 'Pending', value: stats.pending, color: 'text-yellow-600' },
          { label: 'Lost', value: stats.lost, color: 'text-red-600' },
          { label: 'Blacklisted', value: stats.blacklisted, color: 'text-gray-500' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-3 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Scanner */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-sm mb-3">Badge Validation Scanner</h3>
        <div className="flex gap-2">
          <input
            value={scanInput}
            onChange={e => setScanInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleScan()}
            placeholder="Enter badge code (e.g. VVIP-2026-0001)"
            className="flex-1 px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring font-mono"
          />
          <button onClick={handleScan} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
            Scan
          </button>
        </div>
        {scanResult && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${scanResult === 'not_found' ? 'bg-red-50 border border-red-200' : (scanResult as BadgeRecord).status === 'blacklisted' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            {scanResult === 'not_found' ? (
              <p className="text-red-700 font-medium">Badge not found — ACCESS DENIED</p>
            ) : (
              <div>
                <p className={`font-bold ${(scanResult as BadgeRecord).status === 'blacklisted' ? 'text-red-700' : 'text-green-700'}`}>
                  {(scanResult as BadgeRecord).status === 'blacklisted' ? 'BLACKLISTED — ACCESS DENIED' : 'VALID — ACCESS GRANTED'}
                </p>
                <p className="text-xs mt-1">{(scanResult as BadgeRecord).userName} | {(scanResult as BadgeRecord).category} | Zones: {(scanResult as BadgeRecord).zoneAccess.join(', ')}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {/* List */}
        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search badges..." className="flex-1 px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="all">All</option>
              <option value="VVIP">VVIP</option>
              <option value="VIP">VIP</option>
              <option value="Exhibitor">Exhibitor</option>
              <option value="Visitor">Visitor</option>
              <option value="Media">Media</option>
              <option value="pending">Pending</option>
              <option value="printed">Printed</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary border-b border-border">
                <tr>{['Name', 'Category', 'Code', 'Status', 'Zones', 'Actions'].map(h => <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">{h}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.map(badge => (
                  <tr key={badge.id} onClick={() => setSelected(badge)} className={`border-b border-border cursor-pointer hover:bg-secondary/50 ${selected?.id === badge.id ? 'bg-primary/5' : ''}`}>
                    <td className="px-4 py-2.5 font-medium text-xs">{badge.userName}</td>
                    <td className="px-4 py-2.5"><span className={`px-2 py-0.5 rounded-full text-xs ${catColor(badge.category)}`}>{badge.category}</span></td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{badge.badgeCode}</td>
                    <td className="px-4 py-2.5"><span className={`px-2 py-0.5 rounded-full text-xs ${statusColor(badge.status)}`}>{badge.status}</span></td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{badge.zoneAccess.length} zones</td>
                    <td className="px-4 py-2.5">
                      <div className="flex gap-1">
                        {badge.status === 'pending' && <button onClick={e => { e.stopPropagation(); handlePrint(badge) }} className="text-xs px-2 py-0.5 bg-primary text-primary-foreground rounded hover:bg-primary/90">Print</button>}
                        {badge.status !== 'blacklisted' && <button onClick={e => { e.stopPropagation(); handleBlacklist(badge) }} className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded hover:bg-red-200">Block</button>}
                        {badge.status === 'printed' && <button onClick={e => { e.stopPropagation(); handleMarkLost(badge) }} className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded hover:bg-orange-200">Lost</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Badge Preview */}
        {selected && (
          <div className="w-64 shrink-0">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-sm">Badge Preview</h4>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-xs">Close</button>
              </div>
              <BadgePreview badge={selected} />
              <div className="mt-4 space-y-1 text-xs">
                <p><span className="text-muted-foreground">Status:</span> <span className={`px-2 py-0.5 rounded-full ${statusColor(selected.status)}`}>{selected.status}</span></p>
                {selected.printedAt && <p><span className="text-muted-foreground">Printed:</span> {selected.printedAt}</p>}
                <p><span className="text-muted-foreground">Zones:</span> {selected.zoneAccess.join(', ')}</p>
              </div>
              {selected.status === 'pending' && (
                <button onClick={() => handlePrint(selected)} className="mt-3 w-full text-xs py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Print Badge
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Badge Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-xl w-full max-w-md border border-border">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">Issue New Badge</h3>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">Full Name</label>
                <input value={form.userName} onChange={e => setForm(p => ({ ...p, userName: e.target.value }))} className="w-full px-3 py-1.5 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Category</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as BadgeRecord['category'] }))} className="w-full px-3 py-1.5 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  {['VVIP', 'VIP', 'Exhibitor', 'Visitor', 'Media', 'Security', 'Staff'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Zone Access (comma separated)</label>
                <input value={form.zoneAccess} onChange={e => setForm(p => ({ ...p, zoneAccess: e.target.value }))} className="w-full px-3 py-1.5 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Zone-A, Zone-B" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-border rounded-md hover:bg-secondary">Cancel</button>
              <button onClick={handleAddBadge} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Issue Badge</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
