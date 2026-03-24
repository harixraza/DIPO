'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function AutoEmailModule({ user }: Props) {
  return (
    <ModuleScaffold
      title="Auto Email Module"
      subtitle="Transactional email workflows and delivery analytics."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Queued', value: '3,480', trend: '+11%', tone: 'warn' },
        { label: 'Delivered', value: '98.2%', trend: 'SLA', tone: 'good' },
        { label: 'Bounces', value: '1.1%', trend: 'Low', tone: 'good' },
        { label: 'Escalations', value: '42', trend: 'Today', tone: 'warn' }]}
      queueTitle="Active Campaigns"
      queueColumns={[{ key: 'template', label: 'Template' },
        { key: 'trigger', label: 'Trigger' },
        { key: 'audience', label: 'Audience' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'e1', template: 'Badge Approval', trigger: 'Manual approve', audience: 'Exhibitors', status: 'Running' },
        { id: 'e2', template: 'Parking Pass', trigger: 'Issued', audience: 'Visitors', status: 'Scheduled' },
        { id: 'e3', template: 'Security Alert', trigger: 'Incident', audience: 'All Staff', status: 'Running' },
        { id: 'e4', template: 'VIP Reminder', trigger: '48h to arrival', audience: 'VIP', status: 'Scheduled' },
        { id: 'e5', template: 'Media Briefing', trigger: 'Event updated', audience: 'Media', status: 'Paused' },
        { id: 'e6', template: 'Event Update', trigger: 'Schedule change', audience: 'All', status: 'Running' }]}
      activity={[{ id: 'a1', title: 'Template updated', detail: 'VIP Reminder v3 approved', time: '09:02', tone: 'good' },
        { id: 'a2', title: 'Bounce spike', detail: 'Media Briefing campaign at 3.2%', time: '08:45', tone: 'warn' },
        { id: 'a3', title: 'Escalation routed', detail: '42 failed deliveries sent to support', time: '08:10', tone: 'warn' }]}
      actions={[{ id: 'ac1', label: 'Clean bounce list', detail: '312 emails need review' },
        { id: 'ac2', label: 'Approve templates', detail: '6 pending translations' },
        { id: 'ac3', label: 'Resume campaign', detail: 'Media Briefing paused' }]}
      analytics={[{ label: 'Avg Delivery Time', value: '4.2 min', note: 'Target < 10 min' },
        { label: 'Open Rate', value: '64%', note: 'Above benchmark' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
