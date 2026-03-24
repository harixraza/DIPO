'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function CctvSurveillance({ user }: Props) {
  return (
    <ModuleScaffold
      title="CCTV Surveillance & Monitoring"
      subtitle="Camera health, incident linkage, and playback controls."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Cameras Online', value: '214/228', trend: '94%', tone: 'warn' },
        { label: 'Critical Feeds', value: '12', trend: 'Live', tone: 'warn' },
        { label: 'Playback Requests', value: '38', trend: 'Today', tone: 'neutral' },
        { label: 'Storage', value: '76%', trend: 'Capacity', tone: 'warn' }]}
      queueTitle="Camera Health"
      queueColumns={[{ key: 'camera', label: 'Camera' },
        { key: 'zone', label: 'Zone' },
        { key: 'status', label: 'Status' },
        { key: 'last', label: 'Last Sync' }]}
      queueRows={[{ id: 'c1', camera: 'CAM-14', zone: 'Hall C', status: 'Offline', last: '08:44' },
        { id: 'c2', camera: 'CAM-27', zone: 'Gate 2', status: 'Online', last: '09:09' },
        { id: 'c3', camera: 'CAM-31', zone: 'Press', status: 'Degraded', last: '09:02' },
        { id: 'c4', camera: 'CAM-05', zone: 'VIP Lounge', status: 'Online', last: '09:10' }]}
      activity={[{ id: 'a1', title: 'Camera restored', detail: 'CAM-18 back online', time: '09:07', tone: 'good' },
        { id: 'a2', title: 'Playback exported', detail: 'INC-102 clip saved', time: '08:39', tone: 'neutral' },
        { id: 'a3', title: 'Storage alert', detail: 'Archive at 76%', time: '08:10', tone: 'warn' }]}
      actions={[{ id: 'ac1', label: 'Repair offline cams', detail: '14 cameras offline' },
        { id: 'ac2', label: 'Archive footage', detail: 'Free 12% storage' },
        { id: 'ac3', label: 'Link incidents', detail: 'Attach feeds to open incidents' }]}
      analytics={[{ label: 'Avg Downtime', value: '18 min', note: 'Target 10 min' },
        { label: 'Feed Coverage', value: '92%', note: 'All zones' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
