'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function MediaManagement({ user }: Props) {
  return (
    <ModuleScaffold
      title="Media Management"
      subtitle="Press accreditation, assets, and briefing coordination."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Accreditations', value: '612', trend: '+14', tone: 'good' },
        { label: 'Pending Review', value: '73', trend: 'Queue', tone: 'warn' },
        { label: 'Press Briefings', value: '7', trend: 'Scheduled', tone: 'neutral' },
        { label: 'Assets Downloaded', value: '2.4k', trend: '+8%', tone: 'good' }]}
      queueTitle="Accreditation Queue"
      queueColumns={[{ key: 'name', label: 'Name' },
        { key: 'outlet', label: 'Outlet' },
        { key: 'country', label: 'Country' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'm1', name: 'Sarah Klein', outlet: 'Dawn News', country: 'Pakistan', status: 'Approved' },
        { id: 'm2', name: 'James Patel', outlet: 'Reuters', country: 'UK', status: 'Pending' },
        { id: 'm3', name: 'Liu Chen', outlet: 'Xinhua', country: 'China', status: 'Docs Review' },
        { id: 'm4', name: 'Aisha Khan', outlet: 'ARY', country: 'Pakistan', status: 'Approved' },
        { id: 'm5', name: 'Markus Weber', outlet: 'DW', country: 'Germany', status: 'Pending' }]}
      activity={[{ id: 'a1', title: 'Briefing updated', detail: 'Press conference moved to Hall B', time: '09:03', tone: 'warn' },
        { id: 'a2', title: 'Accreditation approved', detail: 'Reuters team approved', time: '08:33', tone: 'good' },
        { id: 'a3', title: 'Asset uploaded', detail: 'IDEAS keynote photos', time: '08:05', tone: 'neutral' }]}
      actions={[{ id: 'ac1', label: 'Review pending media', detail: '73 accreditations awaiting' },
        { id: 'ac2', label: 'Publish briefing notes', detail: 'For Hall B press' },
        { id: 'ac3', label: 'Secure embargo', detail: 'Lock keynote assets' }]}
      analytics={[{ label: 'Approval SLA', value: '12h', note: 'Target 24h' },
        { label: 'Asset Engagement', value: '58%', note: 'Up 5%' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
