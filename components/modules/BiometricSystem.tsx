'use client'

import { useState } from 'react'
import type { User } from '@/lib/store'

const DEVICES = [
  { id: 'BIO-001', location: 'Main Entrance Gate 1', type: 'Fingerprint + Face', status: 'online', scans: 412, battery: 95, lastSync: '09:41' },
  { id: 'BIO-002', location: 'Main Entrance Gate 2', type: 'Fingerprint', status: 'online', scans: 388, battery: 88, lastSync: '09:41' },
  { id: 'BIO-003', location: 'VIP Lounge Entry', type: 'Face Recognition', status: 'online', scans: 87, battery: 72, lastSync: '09:40' },
  { id: 'BIO-004', location: 'Exhibition Hall A', type: 'Fingerprint', status: 'degraded', scans: 256, battery: 45, lastSync: '09:30' },
  { id: 'BIO-005', location: 'Exhibition Hall B', type: 'Fingerprint + Face', status: 'online', scans: 310, battery: 91, lastSync: '09:41' },
  { id: 'BIO-006', location: 'Media Centre', type: 'Face Recognition', status: 'offline', scans: 0, battery: 12, lastSync: '07:15' },
  { id: 'BIO-007', location: 'VVIP Enclosure', type: 'Iris + Fingerprint', status: 'online', scans: 34, battery: 100, lastSync: '09:42' },
  { id: 'BIO-008', location: 'Secure Operations Area', type: 'Iris + Face', status: 'online', scans: 22, battery: 98, lastSync: '09:42' },
]

const SCANS = [
  { time: '09:41', person: 'Maj Gen (R) Farrukh Ali', badge: 'VVIP-2026-0001', device: 'BIO-007', result: 'granted', confidence: 99.2 },
  { time: '09:38', person: 'Dr. Ahmed Al-Rashid', badge: 'VIP-2026-0201', device: 'BIO-001', result: 'granted', confidence: 97.8 },
  { time: '09:35', person: 'Unknown Person', badge: 'N/A', device: 'BIO-001', result: 'denied', confidence: 31.4 },
  { time: '09:32', person: 'Ms. Sarah Klein', badge: 'MED-2026-0501', device: 'BIO-006', result: 'granted', confidence: 95.1 },
  { time: '09:29', person: 'Mr. James Thornton', badge: 'EXH-2026-0301', device: 'BIO-004', result: 'granted', confidence: 98.7 },
  { time: '09:25', person: 'Lt Col Wang Wei', badge: 'VIS-2026-0401', device: 'BIO-003', result: 'granted', confidence: 96.3 },
  { time: '09:20', person: 'Unknown Person', badge: 'N/A', device: 'BIO-002', result: 'denied', confidence: 24.5 },
]

export default function BiometricSystem({ user }: { user: User }) {
  const [tab, setTab] = useState<'devices' | 'scans' | 'enroll'>('devices')
  const [enrollForm, setEnrollForm] = useState({ name: '', badgeCode: '', type: 'fingerprint' })
  const [enrollStep, setEnrollStep] = useState(0)

  const online = DEVICES.filter(d => d.status === 'online').length
  const totalScans = DEVICES.reduce((s, d) => s + d.scans, 0)
  const denials = SCANS.filter(s => s.result === 'denied').length

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">Biometric Verification System</h2>
        <p className="text-sm text-muted-foreground">Fingerprint, face recognition & iris scan management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Devices Online', value: `${online}/${DEVICES.length}`, color: 'text-green-600' },
          { label: 'Total Scans Today', value: totalScans, color: 'text-primary' },
          { label: 'Access Granted', value: SCANS.filter(s => s.result === 'granted').length, color: 'text-green-600' },
          { label: 'Access Denied', value: denials, color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-1">
        {(['devices', 'scans', 'enroll'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 ${tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>{t}</button>
        ))}
      </div>

      {tab === 'devices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DEVICES.map(d => (
            <div key={d.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${d.status === 'online' ? 'bg-green-100' : d.status === 'degraded' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={d.status === 'online' ? 'text-green-600' : d.status === 'degraded' ? 'text-yellow-600' : 'text-red-500'}>
                      <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04.054-.09A13.916 13.916 0 0 0 8 11a4 4 0 1 1 8 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0 0 15.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 0 0 8 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{d.id}</p>
                    <p className="text-xs text-muted-foreground">{d.location}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${d.status === 'online' ? 'bg-green-100 text-green-700' : d.status === 'degraded' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{d.status}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div className="bg-secondary rounded p-2 text-center">
                  <p className="font-bold text-foreground">{d.scans}</p>
                  <p className="text-muted-foreground">Scans</p>
                </div>
                <div className="bg-secondary rounded p-2 text-center">
                  <p className={`font-bold ${d.battery > 50 ? 'text-green-600' : d.battery > 20 ? 'text-yellow-600' : 'text-red-600'}`}>{d.battery}%</p>
                  <p className="text-muted-foreground">Battery</p>
                </div>
                <div className="bg-secondary rounded p-2 text-center">
                  <p className="font-bold text-foreground">{d.lastSync}</p>
                  <p className="text-muted-foreground">Last Sync</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 bg-secondary/50 px-2 py-1 rounded">{d.type}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'scans' && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-sm">Recent Biometric Scans</h3>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary border-b border-border">
                <tr>{['Time', 'Person', 'Badge', 'Device', 'Confidence', 'Result'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {SCANS.map((s, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 hover:bg-secondary/40 ${s.result === 'denied' ? 'bg-red-50/30' : ''}`}>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{s.time}</td>
                    <td className="px-4 py-2.5 text-xs font-medium">{s.person}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{s.badge}</td>
                    <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground">{s.device}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${s.confidence > 90 ? 'bg-green-500' : s.confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${s.confidence}%` }} />
                        </div>
                        <span className="text-xs">{s.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.result === 'granted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {s.result === 'granted' ? 'GRANTED' : 'DENIED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'enroll' && (
        <div className="max-w-lg">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-1">Biometric Enrollment</h3>
            <p className="text-sm text-muted-foreground mb-4">Register a new person's biometric data</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">Full Name</label>
                <input value={enrollForm.name} onChange={e => setEnrollForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Enter full name" className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Badge Code</label>
                <input value={enrollForm.badgeCode} onChange={e => setEnrollForm(p => ({ ...p, badgeCode: e.target.value }))}
                  placeholder="e.g. VIP-2026-0001" className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring font-mono" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Biometric Type</label>
                <select value={enrollForm.type} onChange={e => setEnrollForm(p => ({ ...p, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="fingerprint">Fingerprint Only</option>
                  <option value="face">Face Recognition Only</option>
                  <option value="iris">Iris Scan Only</option>
                  <option value="fingerprint+face">Fingerprint + Face</option>
                  <option value="iris+face">Iris + Face</option>
                </select>
              </div>
            </div>

            {enrollStep === 0 && (
              <button onClick={() => setEnrollStep(1)} disabled={!enrollForm.name || !enrollForm.badgeCode}
                className="mt-4 w-full py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
                Start Enrollment
              </button>
            )}

            {enrollStep === 1 && (
              <div className="mt-4 bg-secondary rounded-lg p-4 text-center">
                <div className="w-24 h-24 border-4 border-dashed border-primary rounded-lg mx-auto flex items-center justify-center">
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-primary">
                    <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04.054-.09A13.916 13.916 0 0 0 8 11a4 4 0 1 1 8 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0 0 15.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 0 0 8 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <p className="text-sm font-semibold mt-3">Place {enrollForm.type} on scanner...</p>
                <p className="text-xs text-muted-foreground mt-1">Waiting for biometric input from device BIO-001</p>
                <div className="mt-3 flex gap-2 justify-center">
                  <button onClick={() => setEnrollStep(2)} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90">Simulate Scan</button>
                  <button onClick={() => setEnrollStep(0)} className="px-4 py-2 border border-border rounded-md text-sm hover:bg-secondary">Cancel</button>
                </div>
              </div>
            )}

            {enrollStep === 2 && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                  <svg width="20" height="20" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <p className="text-sm font-semibold text-green-700 mt-2">Enrollment Successful</p>
                <p className="text-xs text-green-600 mt-1">{enrollForm.name} — {enrollForm.badgeCode}</p>
                <button onClick={() => { setEnrollStep(0); setEnrollForm({ name: '', badgeCode: '', type: 'fingerprint' }) }}
                  className="mt-3 px-4 py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">Enroll Another</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
