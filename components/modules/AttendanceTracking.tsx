'use client'

import { useState, useEffect } from 'react'
import { getAttendance, addAttendance, getBadges, type AttendanceRecord, type User } from '@/lib/store'

const zoneColors: Record<string, string> = {
  'Main Entrance': 'bg-primary text-primary-foreground',
  'Exhibition Hall': 'bg-blue-600 text-white',
  'Press Area': 'bg-purple-600 text-white',
  'VIP Lounge': 'bg-amber-600 text-white',
  'Conference Room': 'bg-teal-600 text-white',
}

export default function AttendanceTracking({ user }: { user: User }) {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [scanCode, setScanCode] = useState('')
  const [selectedZone, setSelectedZone] = useState('Main Entrance')
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string; record?: AttendanceRecord } | null>(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => { setRecords(getAttendance()) }, [])

  const zones = ['Main Entrance', 'Exhibition Hall', 'VIP Lounge', 'Press Area', 'Conference Room', 'Zone-A', 'Zone-B', 'Zone-C']

  const handleScan = () => {
    const badges = getBadges()
    const badge = badges.find(b => b.badgeCode.toLowerCase() === scanCode.toLowerCase())
    if (!badge) {
      setScanResult({ success: false, message: 'Badge not found — ACCESS DENIED' })
      return
    }
    if (badge.status === 'blacklisted') {
      setScanResult({ success: false, message: `BLACKLISTED BADGE — ACCESS DENIED (${badge.userName})` })
      return
    }
    if (badge.status === 'lost') {
      setScanResult({ success: false, message: `REPORTED LOST — ACCESS DENIED (${badge.userName})` })
      return
    }
    const newRecord = addAttendance({
      userId: badge.userId,
      userName: badge.userName,
      badgeCode: badge.badgeCode,
      zone: selectedZone,
      entryTime: new Date().toLocaleString('en-PK', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      method: 'badge_scan',
    })
    setRecords(getAttendance())
    setScanResult({ success: true, message: `ACCESS GRANTED — ${badge.userName} | ${badge.category}`, record: newRecord })
    setScanCode('')
  }

  const filtered = records.filter(r => filter === 'all' || r.zone === filter)

  const zoneStats = zones.map(z => ({
    zone: z,
    count: records.filter(r => r.zone === z && !r.exitTime).length,
    total: records.filter(r => r.zone === z).length,
  }))

  const stats = {
    total: records.length,
    inside: records.filter(r => !r.exitTime).length,
    exited: records.filter(r => !!r.exitTime).length,
    biometric: records.filter(r => r.method === 'biometric').length,
    badge: records.filter(r => r.method === 'badge_scan').length,
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">Attendance Tracking System (ATS)</h2>
        <p className="text-sm text-muted-foreground">Real-time entry/exit tracking across all zones</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Total Records', value: stats.total, color: 'text-foreground' },
          { label: 'Currently Inside', value: stats.inside, color: 'text-green-600' },
          { label: 'Exited', value: stats.exited, color: 'text-gray-600' },
          { label: 'Biometric', value: stats.biometric, color: 'text-primary' },
          { label: 'Badge Scan', value: stats.badge, color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-3 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Live Scanner */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live Entry Scanner
        </h3>
        <div className="flex gap-2 mb-3">
          <input
            value={scanCode}
            onChange={e => setScanCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleScan()}
            placeholder="Scan or enter badge code..."
            className="flex-1 px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring font-mono"
          />
          <select value={selectedZone} onChange={e => setSelectedZone(e.target.value)} className="px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
            {zones.map(z => <option key={z}>{z}</option>)}
          </select>
          <button onClick={handleScan} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
            Log Entry
          </button>
        </div>

        {/* Quick scan test buttons */}
        <div className="flex gap-2 flex-wrap">
          <p className="text-xs text-muted-foreground self-center">Quick test:</p>
          {['VVIP-2026-0001', 'EXH-2026-0301', 'MED-2026-0501'].map(code => (
            <button key={code} onClick={() => setScanCode(code)} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded hover:bg-primary hover:text-primary-foreground transition-colors font-mono">
              {code}
            </button>
          ))}
        </div>

        {scanResult && (
          <div className={`mt-3 px-4 py-3 rounded-lg flex items-center gap-3 text-sm ${scanResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${scanResult.success ? 'bg-green-500' : 'bg-red-500'}`}>
              {scanResult.success
                ? <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" fill="none"/></svg>
                : <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="3"/><line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="3"/></svg>
              }
            </div>
            <span className={`font-semibold ${scanResult.success ? 'text-green-700' : 'text-red-700'}`}>{scanResult.message}</span>
            {scanResult.record && <span className="text-xs text-muted-foreground ml-auto">{scanResult.record.zone} | {scanResult.record.entryTime}</span>}
          </div>
        )}
      </div>

      {/* Zone Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {zoneStats.filter(z => z.total > 0).map(z => (
          <div key={z.zone} className="bg-card border border-border rounded-lg p-3">
            <p className="text-xs font-semibold truncate">{z.zone}</p>
            <p className="text-lg font-bold text-foreground mt-1">{z.count}</p>
            <p className="text-xs text-muted-foreground">currently inside / {z.total} total</p>
          </div>
        ))}
      </div>

      {/* Records Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-sm">Attendance Log</h3>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-1.5 border border-input rounded-md text-xs bg-background focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="all">All Zones</option>
            {zones.map(z => <option key={z}>{z}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary border-b border-border">
              <tr>{['Name', 'Badge Code', 'Zone', 'Entry Time', 'Exit Time', 'Method', 'Status'].map(h => <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                  <td className="px-4 py-2.5 text-xs font-medium">{r.userName}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{r.badgeCode}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${zoneColors[r.zone] || 'bg-secondary text-secondary-foreground'}`}>{r.zone}</span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{r.entryTime}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{r.exitTime || '-'}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${r.method === 'biometric' ? 'bg-primary/10 text-primary' : r.method === 'badge_scan' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                      {r.method.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${r.exitTime ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                      {r.exitTime ? 'exited' : 'inside'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
