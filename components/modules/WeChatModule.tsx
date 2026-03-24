'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function WeChatModule({ user }: Props) {
  return (
    <ModuleScaffold
      title="WeChat Module"
      subtitle="WeChat messaging and mini-program support."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Messages 24h', value: '8.9k', trend: '+9%', tone: 'neutral' },
        { label: 'Mini-Program Users', value: '2,140', trend: '+4%', tone: 'good' },
        { label: 'Opt-In Rate', value: '88%', trend: 'Stable', tone: 'good' },
        { label: 'Failures', value: '1.3%', trend: 'Low', tone: 'good' }]}
      queueTitle="Campaigns"
      queueColumns={[{ key: 'campaign', label: 'Campaign' },
        { key: 'audience', label: 'Audience' },
        { key: 'sent', label: 'Sent' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'wc1', campaign: 'Delegate Welcome', audience: 'Delegations', sent: '1.2k', status: 'Running' },
        { id: 'wc2', campaign: 'Seminar Update', audience: 'Attendees', sent: '2.6k', status: 'Scheduled' },
        { id: 'wc3', campaign: 'Badge Pickup', audience: 'Exhibitors', sent: '1.1k', status: 'Running' }]}
      activity={[{ id: 'a1', title: 'Mini-program updated', detail: 'v2.3 released', time: '09:03', tone: 'good' },
        { id: 'a2', title: 'Template approved', detail: 'Welcome message', time: '08:33', tone: 'good' },
        { id: 'a3', title: 'Failure alert', detail: 'Delivery lag in CN region', time: '08:04', tone: 'warn' }]}
      actions={[{ id: 'ac1', label: 'Review failures', detail: 'CN delivery lag' },
        { id: 'ac2', label: 'Push update', detail: 'v2.3 rollout' },
        { id: 'ac3', label: 'Add translations', detail: '2 templates pending' }]}
      analytics={[{ label: 'Delivery Time', value: '2.4 min', note: 'Target 3 min' },
        { label: 'Engagement', value: '61%', note: 'Up 4%' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
