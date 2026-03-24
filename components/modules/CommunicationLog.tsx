'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function CommunicationLog({ user }: Props) {
  return (
    <ModuleScaffold
      title="Communication Log Tracking"
      subtitle="Operational comms archive across radio, phone, and email."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Logs Today', value: '1,122', trend: '+9%', tone: 'neutral' },
        { label: 'Escalations', value: '27', trend: 'High', tone: 'warn' },
        { label: 'Acknowledged', value: '93%', trend: 'SLA', tone: 'good' },
        { label: 'Pending', value: '84', trend: 'Open', tone: 'warn' }]}
      queueTitle="Priority Logs"
      queueColumns={[{ key: 'channel', label: 'Channel' },
        { key: 'topic', label: 'Topic' },
        { key: 'owner', label: 'Owner' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'c1', channel: 'Radio', topic: 'Gate 3 congestion', owner: 'Ops', status: 'Open' },
        { id: 'c2', channel: 'Phone', topic: 'VIP arrival delay', owner: 'Protocol', status: 'Acknowledged' },
        { id: 'c3', channel: 'Email', topic: 'Vendor access', owner: 'Security', status: 'Open' },
        { id: 'c4', channel: 'Radio', topic: 'Hall B power', owner: 'Engineering', status: 'Escalated' }]}
      activity={[{ id: 'a1', title: 'Escalation', detail: 'Hall B power issue escalated', time: '09:02', tone: 'warn' },
        { id: 'a2', title: 'Acknowledged', detail: 'VIP delay confirmed', time: '08:40', tone: 'good' },
        { id: 'a3', title: 'Log archived', detail: 'Gate 3 congestion closed', time: '08:12', tone: 'neutral' }]}
      actions={[{ id: 'ac1', label: 'Review escalations', detail: '27 outstanding' },
        { id: 'ac2', label: 'Export logs', detail: 'Daily compliance report' },
        { id: 'ac3', label: 'Notify owners', detail: '84 logs pending' }]}
      analytics={[{ label: 'Avg Ack Time', value: '6 min', note: 'Target 10 min' },
        { label: 'Channel Mix', value: 'Radio 58%', note: 'Phone 24%, Email 18%' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
