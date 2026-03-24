'use client'

import { useState, useEffect } from 'react'
import { getDelegations, addDelegation, updateDelegation, type Delegation, type User } from '@/lib/store'

const statusColor = (s: Delegation['status']) => ({
  confirmed: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
  arrived: 'bg-green-100 text-green-700',
  departed: 'bg-gray-100 text-gray-600',
}[s])

const catColor = (c: Delegation['category']) => ({
  Military: 'bg-primary/10 text-primary',
  Civilian: 'bg-teal-100 text-teal-700',
  Commercial: 'bg-orange-100 text-orange-700',
  Diplomatic: 'bg-purple-100 text-purple-700',
}[c])

const flagMap: Record<string, string> = {
  'Saudi Arabia': '🇸🇦', 'China': '🇨🇳', 'United Kingdom': '🇬🇧', 'Turkey': '🇹🇷', 'UAE': '🇦🇪',
  'Germany': '🇩🇪', 'Jordan': '🇯🇴', 'Egypt': '🇪🇬', 'USA': '🇺🇸', 'France': '🇫🇷',
}

export default function DelegationHandling({ user }: { user: User }) {
  const [delegations, setDelegations] = useState<Delegation[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Delegation | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ country: '', delegationHead: '', members: 1, arrivalDate: '', departureDate: '', hotel: '', protocol: 'Normal', status: 'pending' as Delegation['status'], category: 'Military' as Delegation['category'] })

  useEffect(() => { setDelegations(getDelegations()) }, [])

  const filtered = delegations.filter(d => {
    const matchFilter = filter === 'all' || d.status === filter || d.category === filter
    const matchSearch = d.country.toLowerCase().includes(search.toLowerCase()) || d.delegationHead.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const handleStatusChange = (d: Delegation, status: Delegation['status']) => {
    updateDelegation({ ...d, status })
    setDelegations(getDelegations())
    setSelected(prev => prev?.id === d.id ? { ...d, status } : prev)
  }

  const handleAdd = () => {
    addDelegation(form)
    setDelegations(getDelegations())
    setShowForm(false)
    setForm({ country: '', delegationHead: '', members: 1, arrivalDate: '', departureDate: '', hotel: '', protocol: 'Normal', status: 'pending', category: 'Military' })
  }

  const stats = {
    total: delegations.length,
    arrived: delegations.filter(d => d.status === 'arrived').length,
    confirmed: delegations.filter(d => d.status === 'confirmed').length,
    pending: delegations.filter(d => d.status === 'pending').length,
    totalPax: delegations.reduce((sum, d) => sum + d.members, 0),
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Delegation Handling</h2>
          <p className="text-sm text-muted-foreground">International delegation management & protocol</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
          + Add Delegation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Total Delegations', value: stats.total, color: 'text-foreground' },
          { label: 'Arrived', value: stats.arrived, color: 'text-green-600' },
          { label: 'Confirmed', value: stats.confirmed, color: 'text-blue-600' },
          { label: 'Pending', value: stats.pending, color: 'text-yellow-600' },
          { label: 'Total PAX', value: stats.totalPax, color: 'text-primary' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-3 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search country or delegation head..." className="flex-1 px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="all">All</option>
          <option value="arrived">Arrived</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="departed">Departed</option>
          <option value="Military">Military</option>
          <option value="Diplomatic">Diplomatic</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      <div className="flex gap-4">
        {/* Delegation List */}
        <div className="flex-1 space-y-2">
          {filtered.map(d => (
            <div
              key={d.id}
              onClick={() => setSelected(d)}
              className={`bg-card border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${selected?.id === d.id ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{flagMap[d.country] || '🌍'}</span>
                  <div>
                    <p className="font-semibold text-sm">{d.country}</p>
                    <p className="text-xs text-muted-foreground">{d.delegationHead}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${catColor(d.category)}`}>{d.category}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor(d.status)}`}>{d.status}</span>
                </div>
              </div>
              <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                <span>{d.members} members</span>
                <span>Arrival: {d.arrivalDate}</span>
                <span>Hotel: {d.hotel}</span>
                <span>Protocol: {d.protocol}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-72 shrink-0">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-primary px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{flagMap[selected.country] || '🌍'}</span>
                  <span className="text-primary-foreground font-semibold text-sm">{selected.country} Delegation</span>
                </div>
                <button onClick={() => setSelected(null)} className="text-primary-foreground/60 hover:text-primary-foreground text-xs">Close</button>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-xs space-y-2">
                  {[
                    { label: 'Head', value: selected.delegationHead },
                    { label: 'Members', value: `${selected.members} PAX` },
                    { label: 'Category', value: selected.category },
                    { label: 'Protocol', value: selected.protocol },
                    { label: 'Hotel', value: selected.hotel },
                    { label: 'Arrival', value: selected.arrivalDate },
                    { label: 'Departure', value: selected.departureDate },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-3">
                  <p className="text-xs font-semibold mb-2">Update Status</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(['pending', 'confirmed', 'arrived', 'departed'] as Delegation['status'][]).map(s => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(selected, s)}
                        className={`text-xs py-1.5 rounded-md capitalize transition-colors ${selected.status === s ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-primary/10 text-secondary-foreground'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-3">
                  <p className="text-xs font-semibold mb-2">Protocol Requirements</p>
                  <div className="space-y-1 text-xs">
                    {[
                      { item: 'Airport Reception', done: selected.status === 'arrived' || selected.status === 'departed' },
                      { item: 'Hotel Arrangements', done: selected.status !== 'pending' },
                      { item: 'Security Briefing', done: selected.status !== 'pending' },
                      { item: 'Badge Issuance', done: selected.status === 'arrived' || selected.status === 'departed' },
                      { item: 'Transport Arranged', done: selected.status !== 'pending' },
                    ].map(p => (
                      <div key={p.item} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${p.done ? 'bg-green-500' : 'bg-gray-300'}`}>
                          {p.done && <svg width="8" height="8" fill="white" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" fill="none"/></svg>}
                        </div>
                        <span className={p.done ? 'text-foreground' : 'text-muted-foreground'}>{p.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Delegation Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-xl w-full max-w-lg border border-border">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">Add Delegation</h3>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                { label: 'Country', key: 'country', span: 1 },
                { label: 'Members', key: 'members', span: 1, type: 'number' },
                { label: 'Delegation Head', key: 'delegationHead', span: 2 },
                { label: 'Hotel', key: 'hotel', span: 2 },
                { label: 'Arrival Date', key: 'arrivalDate', span: 1, type: 'date' },
                { label: 'Departure Date', key: 'departureDate', span: 1, type: 'date' },
              ].map(f => (
                <div key={f.key} className={`col-span-${f.span}`}>
                  <label className="block text-xs font-medium mb-1">{f.label}</label>
                  <input type={f.type || 'text'} value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: f.type === 'number' ? +e.target.value : e.target.value }))} className="w-full px-3 py-1.5 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1">Category</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as Delegation['category'] }))} className="w-full px-3 py-1.5 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  {['Military', 'Civilian', 'Commercial', 'Diplomatic'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Protocol</label>
                <select value={form.protocol} onChange={e => setForm(p => ({ ...p, protocol: e.target.value }))} className="w-full px-3 py-1.5 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  {['State', 'Military', 'Diplomatic', 'Normal'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-border rounded-md hover:bg-secondary">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Add Delegation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
