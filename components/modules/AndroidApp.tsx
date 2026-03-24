'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function AndroidApp({ user }: Props) {
  return (
    <ModuleScaffold
      title="Android Application"
      subtitle="Operational mobile client for staff and exhibitors."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Active Devices', value: '1,420', trend: '+4%', tone: 'good' },
        { label: 'Sync Queue', value: '2.1k', trend: 'Offline', tone: 'warn' },
        { label: 'Scans Today', value: '18.4k', trend: '+12%', tone: 'good' },
        { label: 'Crash Rate', value: '0.6%', trend: 'Low', tone: 'good' }]}
      queueTitle="Device Sync Queue"
      queueColumns={[{ key: 'device', label: 'Device' },
        { key: 'owner', label: 'Owner' },
        { key: 'pending', label: 'Pending' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'ad1', device: 'AND-112', owner: 'Badge Ops', pending: '42', status: 'Syncing' },
        { id: 'ad2', device: 'AND-187', owner: 'Security', pending: '118', status: 'Offline' },
        { id: 'ad3', device: 'AND-201', owner: 'Logistics', pending: '9', status: 'Complete' },
        { id: 'ad4', device: 'AND-244', owner: 'Parking', pending: '64', status: 'Syncing' }]}
      activity={[{ id: 'a1', title: 'Release pushed', detail: 'Android v1.8 deployed', time: '09:01', tone: 'good' },
        { id: 'a2', title: 'Offline alert', detail: 'AND-187 offline 2h', time: '08:33', tone: 'warn' },
        { id: 'a3', title: 'Crash report', detail: 'Null pointer in scan flow', time: '08:10', tone: 'warn' }]}
      actions={[{ id: 'ac1', label: 'Investigate crashes', detail: '0.6% crash rate' },
        { id: 'ac2', label: 'Force sync', detail: '12 devices offline' },
        { id: 'ac3', label: 'Update OTA', detail: 'Schedule v1.9 build' }]}
      analytics={[{ label: 'Avg Sync Time', value: '2.1 min', note: 'Target 3 min' },
        { label: 'Adoption', value: '78%', note: 'Staff devices active' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
