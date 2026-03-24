'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function IosApp({ user }: Props) {
  return (
    <ModuleScaffold
      title="iOS Application"
      subtitle="VIP and executive mobile experience."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'VIP Installs', value: '320', trend: '+6', tone: 'good' },
        { label: 'Concierge Chats', value: '46', trend: 'Today', tone: 'neutral' },
        { label: 'Check-ins', value: '842', trend: '+8%', tone: 'good' },
        { label: 'Crash Rate', value: '0.2%', trend: 'Low', tone: 'good' }]}
      queueTitle="Concierge Queue"
      queueColumns={[{ key: 'vip', label: 'VIP' },
        { key: 'request', label: 'Request' },
        { key: 'eta', label: 'ETA' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'ios1', vip: 'Gen Li Wei', request: 'Escort to Hall A', eta: '10 min', status: 'Active' },
        { id: 'ios2', vip: 'Lt Gen Al-Harbi', request: 'Meeting reminder', eta: '5 min', status: 'Queued' },
        { id: 'ios3', vip: 'Ms. Braun', request: 'Transport update', eta: '20 min', status: 'Queued' }]}
      activity={[{ id: 'a1', title: 'Check-in', detail: 'VIP badge scanned', time: '09:13', tone: 'good' },
        { id: 'a2', title: 'Chat escalated', detail: 'Security question routed', time: '08:40', tone: 'warn' },
        { id: 'a3', title: 'Update sent', detail: 'Itinerary change pushed', time: '08:05', tone: 'neutral' }]}
      actions={[{ id: 'ac1', label: 'Answer concierge', detail: '12 requests pending' },
        { id: 'ac2', label: 'Push itinerary', detail: 'Late schedule updates' },
        { id: 'ac3', label: 'Verify device access', detail: '3 new VIP devices' }]}
      analytics={[{ label: 'Avg Response', value: '3.2 min', note: 'Target 5 min' },
        { label: 'Adoption', value: '92%', note: 'VIPs active' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
