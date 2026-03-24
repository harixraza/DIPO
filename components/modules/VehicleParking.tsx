'use client'

import { useState, useEffect } from 'react'
import { getVehicles, addVehicle, updateVehicle, type Vehicle, type User } from '@/lib/store'

const zones = [
  { id: 'P-VVIP', label: 'P-VVIP', total: 20, color: 'bg-red-600' },
  { id: 'P-VIP', label: 'P-VIP', total: 60, color: 'bg-amber-500' },
  { id: 'P-EXH', label: 'P-Exhibitor', total: 200, color: 'bg-blue-600' },
  { id: 'P-VIS', label: 'P-Visitor', total: 500, color: 'bg-green-600' },
  { id: 'P-STAFF', label: 'P-Staff', total: 150, color: 'bg-teal-600' },
]

const statusColor = (s: Vehicle['status']) => ({
  inside: 'bg-green-100 text-green-700',
  exited: 'bg-gray-100 text-gray-600',
  registered: 'bg-blue-100 text-blue-700',
  violation: 'bg-red-100 text-red-700',
}[s])

const catColor = (c: Vehicle['ownerCategory']) => ({
  VVIP: 'bg-red-100 text-red-700',
  VIP: 'bg-amber-100 text-amber-700',
  Exhibitor: 'bg-blue-100 text-blue-700',
  Visitor: 'bg-green-100 text-green-700',
  Staff: 'bg-teal-100 text-teal-700',
}[c])

export default function VehicleParking({ user }: { user: User }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [alerts] = useState([
    { type: 'violation', msg: 'Vehicle RWP-3344 parked in unauthorized zone', time: '10:15' },
    { type: 'overstay', msg: 'Vehicle LEA-4521 has been parked 6+ hours in P-VIP', time: '09:30' },
    { type: 'capacity', msg: 'P-Visitor zone at 85% capacity', time: '09:00' },
  ])
  const [form, setForm] = useState({ registrationNo: '', ownerName: '', ownerCategory: 'Visitor' as Vehicle['ownerCategory'], vehicleType: 'Car' as Vehicle['vehicleType'], parkingZone: '', passNo: '' })

  useEffect(() => { setVehicles(getVehicles()) }, [])

  const filtered = vehicles.filter(v => {
    const matchFilter = filter === 'all' || v.status === filter || v.ownerCategory === filter
    const matchSearch = v.registrationNo.toLowerCase().includes(search.toLowerCase()) || v.ownerName.toLowerCase().includes(search.toLowerCase()) || v.passNo.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const handleEntry = (v: Vehicle) => {
    const updated = { ...v, status: 'inside' as const, entryTime: new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }) }
    updateVehicle(updated)
    setVehicles(getVehicles())
  }

  const handleExit = (v: Vehicle) => {
    const updated = { ...v, status: 'exited' as const, exitTime: new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }) }
    updateVehicle(updated)
    setVehicles(getVehicles())
  }

  const handleAdd = () => {
    addVehicle({ ...form, status: 'registered', passNo: form.passNo || `VP-${form.ownerCategory.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-4)}` })
    setVehicles(getVehicles())
    setShowForm(false)
    setForm({ registrationNo: '', ownerName: '', ownerCategory: 'Visitor', vehicleType: 'Car', parkingZone: '', passNo: '' })
  }

  const zoneStats = zones.map(z => ({
    ...z,
    used: vehicles.filter(v => v.parkingZone === z.id && v.status === 'inside').length,
  }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Vehicle Access & Smart Parking</h2>
          <p className="text-sm text-muted-foreground">VSPMS — Real-time vehicle & parking management</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
          + Register Vehicle
        </button>
      </div>

      {/* Zone Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {zoneStats.map(z => (
          <div key={z.id} className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">{z.label}</span>
              <span className={`w-2 h-2 rounded-full ${z.used >= z.total * 0.9 ? 'bg-red-500' : z.used >= z.total * 0.7 ? 'bg-yellow-500' : 'bg-green-500'}`} />
            </div>
            <p className="text-xl font-bold text-foreground">{z.used}</p>
            <p className="text-xs text-muted-foreground">/ {z.total} slots</p>
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${z.color} rounded-full`} style={{ width: `${Math.round(z.used / z.total * 100)}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{Math.round(z.used / z.total * 100)}% full</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs ${a.type === 'violation' ? 'bg-red-50 border border-red-200' : a.type === 'overstay' ? 'bg-orange-50 border border-orange-200' : 'bg-yellow-50 border border-yellow-200'}`}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={a.type === 'violation' ? 'text-red-600' : 'text-orange-600'}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span className="flex-1">{a.msg}</span>
              <span className="text-muted-foreground">{a.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by reg no, name, pass..." className="flex-1 min-w-48 px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="all">All</option>
          <option value="inside">Inside</option>
          <option value="exited">Exited</option>
          <option value="violation">Violation</option>
          <option value="VVIP">VVIP</option>
          <option value="VIP">VIP</option>
          <option value="Exhibitor">Exhibitor</option>
        </select>
      </div>

      {/* VIP Motorcade section */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full" />
          VIP/VVIP Motorcade Tracking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {vehicles.filter(v => v.ownerCategory === 'VVIP' || v.ownerCategory === 'VIP').map(v => (
            <div key={v.id} className="flex items-center gap-3 bg-secondary rounded-lg p-3 text-xs">
              <div className={`w-2 h-2 rounded-full shrink-0 ${v.status === 'inside' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold truncate">{v.ownerName}</p>
                <p className="text-muted-foreground font-mono">{v.registrationNo} | {v.parkingZone || 'No zone'}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full ${catColor(v.ownerCategory)}`}>{v.ownerCategory}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary border-b border-border">
              <tr>{['Reg No', 'Owner', 'Category', 'Type', 'Zone', 'Entry', 'Exit', 'Pass No', 'Status', 'Actions'].map(h => <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                  <td className="px-3 py-2.5 font-mono font-bold text-xs">{v.registrationNo}</td>
                  <td className="px-3 py-2.5 text-xs font-medium">{v.ownerName}</td>
                  <td className="px-3 py-2.5"><span className={`px-2 py-0.5 rounded-full text-xs ${catColor(v.ownerCategory)}`}>{v.ownerCategory}</span></td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground">{v.vehicleType}</td>
                  <td className="px-3 py-2.5 text-xs font-mono text-muted-foreground">{v.parkingZone || '-'}</td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground">{v.entryTime?.split(' ')[1] || '-'}</td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground">{v.exitTime?.split(' ')[1] || '-'}</td>
                  <td className="px-3 py-2.5 text-xs font-mono text-muted-foreground">{v.passNo}</td>
                  <td className="px-3 py-2.5"><span className={`px-2 py-0.5 rounded-full text-xs ${statusColor(v.status)}`}>{v.status}</span></td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-1">
                      {v.status === 'registered' && <button onClick={() => handleEntry(v)} className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded hover:bg-green-200">Entry</button>}
                      {v.status === 'inside' && <button onClick={() => handleExit(v)} className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded hover:bg-red-200">Exit</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-xl w-full max-w-md border border-border">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">Register Vehicle</h3>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                { label: 'Registration No', key: 'registrationNo' },
                { label: 'Owner Name', key: 'ownerName' },
                { label: 'Pass No', key: 'passNo' },
              ].map(f => (
                <div key={f.key} className="col-span-2">
                  <label className="block text-xs font-medium mb-1">{f.label}</label>
                  <input value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} className="w-full px-3 py-1.5 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1">Category</label>
                <select value={form.ownerCategory} onChange={e => setForm(p => ({ ...p, ownerCategory: e.target.value as Vehicle['ownerCategory'] }))} className="w-full px-3 py-1.5 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  {['VVIP', 'VIP', 'Exhibitor', 'Visitor', 'Staff'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Vehicle Type</label>
                <select value={form.vehicleType} onChange={e => setForm(p => ({ ...p, vehicleType: e.target.value as Vehicle['vehicleType'] }))} className="w-full px-3 py-1.5 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  {['Car', 'SUV', 'Motorcycle', 'Bus', 'Truck'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium mb-1">Assigned Parking Zone</label>
                <select value={form.parkingZone} onChange={e => setForm(p => ({ ...p, parkingZone: e.target.value }))} className="w-full px-3 py-1.5 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select Zone</option>
                  {zones.map(z => <option key={z.id} value={z.id}>{z.label}</option>)}
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-border rounded-md hover:bg-secondary">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Register</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
