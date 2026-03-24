'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  getShipments,
  updateShipment,
  addShipment,
  getWarehouseZones,
  updateWarehouseZone,
  getPickups,
  addPickup,
  updatePickup,
  type Shipment,
  type WarehouseZone,
  type PickupTask,
  type User,
} from '@/lib/store'
import { initStore } from '@/lib/store'

interface Props {
  user: User
}

const statusLabels: Record<Shipment['status'], string> = {
  in_transit: 'In Transit',
  customs: 'Customs',
  arrived: 'Arrived',
  delivered: 'Delivered',
  hold: 'Hold',
}

const pickupStatusLabel: Record<PickupTask['status'], string> = {
  scheduled: 'Scheduled',
  en_route: 'En Route',
  complete: 'Complete',
  cancelled: 'Cancelled',
}

export default function LogisticsManagement({ user }: Props) {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [zones, setZones] = useState<WarehouseZone[]>([])
  const [pickups, setPickups] = useState<PickupTask[]>([])
  const [filter, setFilter] = useState<Shipment['status'] | 'all'>('all')
  const [search, setSearch] = useState('')
  const [showShipmentForm, setShowShipmentForm] = useState(false)
  const [showPickupForm, setShowPickupForm] = useState(false)

  const [shipmentDraft, setShipmentDraft] = useState<Omit<Shipment, 'id' | 'lastUpdate'>>({
    ref: '',
    mode: 'air',
    origin: '',
    destination: '',
    vendor: '',
    contact: '',
    status: 'in_transit',
    eta: '',
    pallets: 1,
    priority: 'normal',
  })

  const [pickupDraft, setPickupDraft] = useState<Omit<PickupTask, 'id'>>({
    exhibitor: '',
    location: '',
    window: '',
    status: 'scheduled',
    driver: '',
    contact: '',
    ref: '',
  })

  useEffect(() => {
    setShipments(getShipments())
    setZones(getWarehouseZones())
    setPickups(getPickups())
  }, [])

  const filteredShipments = useMemo(() => {
    return shipments.filter(s => {
      const matchStatus = filter === 'all' || s.status === filter
      const q = search.toLowerCase()
      const matchText =
        !q ||
        s.ref.toLowerCase().includes(q) ||
        s.origin.toLowerCase().includes(q) ||
        s.destination.toLowerCase().includes(q) ||
        s.vendor.toLowerCase().includes(q)
      return matchStatus && matchText
    })
  }, [shipments, filter, search])

  const statusCounts = useMemo(() => {
    const base: Record<Shipment['status'], number> = {
      in_transit: 0,
      customs: 0,
      arrived: 0,
      delivered: 0,
      hold: 0,
    }
    shipments.forEach(s => { base[s.status] += 1 })
    return base
  }, [shipments])

  const utilization = useMemo(() => {
    const totals = zones.reduce(
      (acc, z) => {
        acc.used += z.used
        acc.total += z.capacity
        return acc
      },
      { used: 0, total: 0 }
    )
    return totals.total ? Math.round((totals.used / totals.total) * 100) : 0
  }, [zones])

  const kpis = useMemo(() => {
    const active = shipments.filter(s => ['in_transit', 'customs', 'hold', 'arrived'].includes(s.status)).length
    const holds = shipments.filter(s => s.status === 'hold' || s.status === 'customs').length
    const deliveredToday = shipments.filter(s => s.status === 'delivered').length
    return [
      { label: 'Active Shipments', value: active.toString(), trend: 'Live', tone: active > 0 ? 'warn' : 'good' as const },
      { label: 'Customs / Hold', value: holds.toString(), trend: 'Attention', tone: holds > 0 ? 'bad' : 'good' as const },
      { label: 'Warehouse Util.', value: `${utilization}%`, trend: 'Capacity', tone: utilization >= 85 ? 'warn' : 'good' as const },
      { label: 'Delivered', value: deliveredToday.toString(), trend: 'Today', tone: 'good' as const },
    ]
  }, [shipments, zones])

  const handleStatusChange = (id: string, status: Shipment['status']) => {
    const updated = shipments.map(s => (s.id === id ? { ...s, status, lastUpdate: new Date().toISOString().slice(0, 16).replace('T', ' ') } : s))
    const ship = updated.find(s => s.id === id)
    if (ship) updateShipment(ship)
    setShipments(updated)
  }

  const handleAddShipment = () => {
    if (!shipmentDraft.ref.trim()) return
    const created = addShipment(shipmentDraft)
    setShipments(getShipments())
    setShowShipmentForm(false)
    setShipmentDraft({
      ref: '',
      mode: 'air',
      origin: '',
      destination: '',
      vendor: '',
      contact: '',
      status: 'in_transit',
      eta: '',
      pallets: 1,
      priority: 'normal',
    })
  }

  const adjustZone = (id: string, delta: number) => {
    const z = zones.find(x => x.id === id)
    if (!z) return
    const next = { ...z, used: Math.min(Math.max(0, z.used + delta), z.capacity) }
    updateWarehouseZone(next)
    setZones(getWarehouseZones())
  }

  const handlePickupStatus = (id: string, status: PickupTask['status']) => {
    const updated = pickups.map(p => (p.id === id ? { ...p, status } : p))
    const task = updated.find(p => p.id === id)
    if (task) updatePickup(task)
    setPickups(updated)
  }

  const handleAddPickup = () => {
    if (!pickupDraft.exhibitor.trim() || !pickupDraft.location.trim()) return
    addPickup(pickupDraft)
    setPickups(getPickups())
    setShowPickupForm(false)
    setPickupDraft({ exhibitor: '', location: '', window: '', status: 'scheduled', driver: '', contact: '', ref: '' })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">Logistics Management</h2>
          <p className="text-sm text-muted-foreground">Shipments, warehousing, vendor handoffs</p>
          <p className="text-xs text-muted-foreground">Owner: {user.role.replace(/_/g, ' ')}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowShipmentForm(true)} className="px-3 py-2 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90">+ New Shipment</button>
          <button onClick={() => setShowPickupForm(true)} className="px-3 py-2 text-xs rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground">+ Pickup</button>
          <button
            onClick={() => {
              localStorage.removeItem('ideas_shipments')
              localStorage.removeItem('ideas_warehouse_zones')
              localStorage.removeItem('ideas_pickups')
              initStore()
              setShipments(getShipments())
              setZones(getWarehouseZones())
              setPickups(getPickups())
            }}
            className="px-3 py-2 text-xs rounded-md border border-border text-destructive hover:bg-destructive/10"
          >
            Clear Logistics Data
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map(k => (
          <div key={k.label} className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{k.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${k.tone === 'bad' ? 'bg-red-100 text-red-700' : k.tone === 'warn' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{k.trend}</span>
            </div>
            <p className="text-xl font-semibold mt-2 text-foreground">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Alert banner */}
      {(statusCounts.customs + statusCounts.hold > 0 || utilization >= 90) && (
        <div className="border border-amber-300 bg-amber-50 text-amber-800 text-xs rounded-lg px-3 py-2 flex items-center gap-2">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-amber-600">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div className="flex-1">
            {statusCounts.customs + statusCounts.hold > 0 && (
              <span className="font-semibold">{statusCounts.customs + statusCounts.hold} shipment(s)</span>
            )} {statusCounts.customs + statusCounts.hold > 0 && 'awaiting customs/hold resolution.'}
            {utilization >= 90 && (
              <span className="font-semibold ml-1">Warehouse utilization {utilization}%</span>
            )}
          </div>
        </div>
      )}

      {/* Status chips */}
      <div className="flex flex-wrap gap-2">
        {[{ key: 'all', label: 'All' as const }, ...Object.entries(statusLabels).map(([k, v]) => ({ key: k as Shipment['status'] | 'all', label: v }))].map(item => {
          const isActive = filter === item.key
          const count = item.key === 'all' ? shipments.length : statusCounts[item.key as Shipment['status']]
          const tone =
            item.key === 'hold'
              ? 'bg-red-100 text-red-700 border-red-200'
              : item.key === 'customs'
              ? 'bg-amber-100 text-amber-800 border-amber-200'
              : item.key === 'delivered'
              ? 'bg-green-100 text-green-700 border-green-200'
              : 'bg-secondary text-foreground border-border'
          return (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as any)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${tone} ${
                isActive ? 'ring-2 ring-primary ring-offset-1' : ''
              }`}
            >
              {item.label} <span className="font-semibold ml-1">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Shipments */}
      <div className="bg-card border border-border rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 py-3 border-b border-border">
          <div>
            <h3 className="text-sm font-semibold">Shipments</h3>
            <p className="text-xs text-muted-foreground">Intake, customs, last-mile</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ref / origin / vendor" className="text-xs px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            <select value={filter} onChange={e => setFilter(e.target.value as any)} className="text-xs px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="all">All statuses</option>
              {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-secondary">
              <tr>
                {['Ref', 'Mode', 'Origin', 'Destination', 'Vendor', 'ETA', 'Pallets', 'Priority', 'Status', 'Updated'].map(h => (
                  <th key={h} className="px-3 py-2 text-left font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 font-mono font-semibold">{s.ref}</td>
                  <td className="px-3 py-2 uppercase">{s.mode}</td>
                  <td className="px-3 py-2">{s.origin}</td>
                  <td className="px-3 py-2">{s.destination}</td>
                  <td className="px-3 py-2">{s.vendor}</td>
                  <td className="px-3 py-2">{s.eta}</td>
                  <td className="px-3 py-2">{s.pallets}</td>
                  <td className="px-3 py-2">
                    {s.priority === 'high'
                      ? <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700">High</span>
                      : <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">Normal</span>}
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={s.status}
                      onChange={e => handleStatusChange(s.id, e.target.value as Shipment['status'])}
                      className="text-xs px-2 py-1 rounded-md border border-border bg-background"
                    >
                      {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{s.lastUpdate}</td>
                </tr>
              ))}
              {filteredShipments.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-3 py-4 text-center text-muted-foreground">No shipments match the filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Warehouse */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold">Warehouse Zones</h3>
            <p className="text-xs text-muted-foreground">Capacity & allocation</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {zones.map(z => {
            const pct = Math.round((z.used / z.capacity) * 100)
            const tone = pct >= 90 ? 'bg-red-500' : pct >= 75 ? 'bg-amber-500' : 'bg-green-500'
            return (
              <div key={z.id} className="border border-border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{z.name}</p>
                  {z.tempControl && <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Cold</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{z.used} / {z.capacity} slots</p>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${tone}`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">{pct}% utilized</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => adjustZone(z.id, -1)} className="px-2 py-1 text-[11px] rounded-md border border-border hover:bg-secondary">-1</button>
                  <button onClick={() => adjustZone(z.id, +1)} className="px-2 py-1 text-[11px] rounded-md border border-border hover:bg-secondary">+1</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Pickup tasks */}
      <div className="bg-card border border-border rounded-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <h3 className="text-sm font-semibold">Pickup / Last Mile</h3>
            <p className="text-xs text-muted-foreground">Dock schedule for exhibitors</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-secondary">
              <tr>{['Exhibitor', 'Location', 'Window', 'Driver', 'Contact', 'Ref', 'Status'].map(h => <th key={h} className="px-3 py-2 text-left font-semibold text-muted-foreground">{h}</th>)}</tr>
            </thead>
            <tbody>
              {pickups.map(p => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 font-semibold">{p.exhibitor}</td>
                  <td className="px-3 py-2">{p.location}</td>
                  <td className="px-3 py-2">{p.window}</td>
                  <td className="px-3 py-2">{p.driver}</td>
                  <td className="px-3 py-2">{p.contact}</td>
                  <td className="px-3 py-2 font-mono text-muted-foreground">{p.ref}</td>
                  <td className="px-3 py-2">
                    <select
                      value={p.status}
                      onChange={e => handlePickupStatus(p.id, e.target.value as PickupTask['status'])}
                      className="text-xs px-2 py-1 rounded-md border border-border bg-background"
                    >
                      {Object.entries(pickupStatusLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {pickups.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-center text-muted-foreground">No pickup tasks scheduled.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipment modal */}
      {showShipmentForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-card border border-border rounded-xl shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">New Shipment</p>
                <h4 className="text-lg font-semibold">Logistics Management</h4>
              </div>
              <button onClick={() => setShowShipmentForm(false)} className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground">Close</button>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {[
                { label: 'Reference', key: 'ref', placeholder: 'e.g., AIR-500' },
                { label: 'Origin', key: 'origin', placeholder: 'Origin city/port' },
                { label: 'Destination', key: 'destination', placeholder: 'Destination' },
                { label: 'Vendor / Carrier', key: 'vendor', placeholder: 'e.g., DHL' },
                { label: 'Contact', key: 'contact', placeholder: '+92-xxx' },
                { label: 'ETA (YYYY-MM-DD)', key: 'eta', placeholder: '2026-03-22' },
              ].map(f => (
                <div key={f.key} className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{f.label}</label>
                  <input
                    value={(shipmentDraft as any)[f.key]}
                    onChange={e => setShipmentDraft(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase tracking-wide text-muted-foreground">Mode</label>
                <select value={shipmentDraft.mode} onChange={e => setShipmentDraft(p => ({ ...p, mode: e.target.value as Shipment['mode'] }))} className="px-3 py-2 rounded-md border border-border bg-background">
                  <option value="air">Air</option>
                  <option value="sea">Sea</option>
                  <option value="road">Road</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase tracking-wide text-muted-foreground">Status</label>
                <select value={shipmentDraft.status} onChange={e => setShipmentDraft(p => ({ ...p, status: e.target.value as Shipment['status'] }))} className="px-3 py-2 rounded-md border border-border bg-background">
                  {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase tracking-wide text-muted-foreground">Priority</label>
                <select value={shipmentDraft.priority} onChange={e => setShipmentDraft(p => ({ ...p, priority: e.target.value as Shipment['priority'] }))} className="px-3 py-2 rounded-md border border-border bg-background">
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase tracking-wide text-muted-foreground">Pallets</label>
                <input
                  type="number"
                  min={1}
                  value={shipmentDraft.pallets}
                  onChange={e => setShipmentDraft(p => ({ ...p, pallets: Number(e.target.value) || 1 }))}
                  className="px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-border flex justify-end gap-2">
              <button onClick={() => setShowShipmentForm(false)} className="px-4 py-2 text-xs rounded-md border border-border hover:bg-secondary">Cancel</button>
              <button onClick={handleAddShipment} className="px-4 py-2 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90">Save Shipment</button>
            </div>
          </div>
        </div>
      )}

      {/* Pickup modal */}
      {showPickupForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Pickup Task</p>
                <h4 className="text-lg font-semibold">Last Mile</h4>
              </div>
              <button onClick={() => setShowPickupForm(false)} className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground">Close</button>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {[
                { label: 'Exhibitor', key: 'exhibitor', placeholder: 'Org / company' },
                { label: 'Location / Dock', key: 'location', placeholder: 'Hall B Dock 2' },
                { label: 'Window', key: 'window', placeholder: '14:00-15:00' },
                { label: 'Driver', key: 'driver', placeholder: 'Name' },
                { label: 'Contact', key: 'contact', placeholder: '+92-xxx' },
                { label: 'Shipment Ref (optional)', key: 'ref', placeholder: 'AIR-500' },
              ].map(f => (
                <div key={f.key} className="flex flex-col gap-1">
                  <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{f.label}</label>
                  <input
                    value={(pickupDraft as any)[f.key]}
                    onChange={e => setPickupDraft(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] uppercase tracking-wide text-muted-foreground">Status</label>
                <select value={pickupDraft.status} onChange={e => setPickupDraft(p => ({ ...p, status: e.target.value as PickupTask['status'] }))} className="px-3 py-2 rounded-md border border-border bg-background">
                  {Object.entries(pickupStatusLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-border flex justify-end gap-2">
              <button onClick={() => setShowPickupForm(false)} className="px-4 py-2 text-xs rounded-md border border-border hover:bg-secondary">Cancel</button>
              <button onClick={handleAddPickup} className="px-4 py-2 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90">Save Pickup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
