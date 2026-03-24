'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function WhatsAppModule({ user }: Props) {
  return (
    <ModuleScaffold
      title="WhatsApp Module"
      subtitle="Official WhatsApp messaging integration."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Messages 24h', value: '22.4k', trend: '+18%', tone: 'warn' },
        { label: 'Opt-In Rate', value: '91%', trend: 'High', tone: 'good' },
        { label: 'Reply SLA', value: '12 min', trend: 'Target 15', tone: 'good' },
        { label: 'Failures', value: '0.8%', trend: 'Low', tone: 'good' }]}
      queueTitle="Active Broadcasts"
      queueColumns={[{ key: 'campaign', label: 'Campaign' },
        { key: 'audience', label: 'Audience' },
        { key: 'sent', label: 'Sent' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'w1', campaign: 'Event Update', audience: 'All', sent: '6.2k', status: 'Running' },
        { id: 'w2', campaign: 'VIP Reminder', audience: 'VIP', sent: '420', status: 'Scheduled' },
        { id: 'w3', campaign: 'Parking Alert', audience: 'Visitors', sent: '2.1k', status: 'Running' },
        { id: 'w4', campaign: 'Media Briefing', audience: 'Media', sent: '680', status: 'Paused' }]}
      activity={[{ id: 'a1', title: 'Template approved', detail: 'Parking alert template', time: '09:00', tone: 'good' },
        { id: 'a2', title: 'Failure spike', detail: 'Media briefing failures 2.4%', time: '08:30', tone: 'warn' },
        { id: 'a3', title: 'Broadcast sent', detail: 'Event update sent to all', time: '08:05', tone: 'good' }]}
      actions={[{ id: 'ac1', label: 'Resume broadcast', detail: 'Media briefing paused' },
        { id: 'ac2', label: 'Review opt-outs', detail: '312 opt-outs today' },
        { id: 'ac3', label: 'Update templates', detail: '3 templates pending' }]}
      analytics={[{ label: 'Delivery Time', value: '1.2 min', note: 'Target 3 min' },
        { label: 'Engagement', value: '67%', note: 'Above baseline' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
