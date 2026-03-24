'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function IncidentManagement({ user }: Props) {
  return (
    <ModuleScaffold
      title="Incident Management"
      subtitle="Incident lifecycle, RCA, and post-incident reporting."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Open Incidents', value: '14', trend: 'Live', tone: 'warn' },
        { label: 'Closed This Week', value: '38', trend: '+6', tone: 'good' },
        { label: 'Open Reviews', value: '6', trend: 'RCA', tone: 'warn' },
        { label: 'Avg Closure', value: '6.1h', trend: 'SLA 8h', tone: 'good' }]}
      queueTitle="RCA Reviews"
      queueColumns={[{ key: 'ref', label: 'Ref' },
        { key: 'category', label: 'Category' },
        { key: 'owner', label: 'Owner' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'i1', ref: 'INC-082', category: 'Access', owner: 'Security Ops', status: 'RCA' },
        { id: 'i2', ref: 'INC-091', category: 'Medical', owner: 'Med Unit', status: 'Pending' },
        { id: 'i3', ref: 'INC-099', category: 'Logistics', owner: 'Ops', status: 'Draft' },
        { id: 'i4', ref: 'INC-104', category: 'CCTV', owner: 'IT', status: 'Pending' }]}
      activity={[{ id: 'a1', title: 'RCA submitted', detail: 'INC-082 RCA submitted', time: '09:06', tone: 'good' },
        { id: 'a2', title: 'Evidence added', detail: 'Video attached to INC-104', time: '08:28', tone: 'neutral' },
        { id: 'a3', title: 'Closure approved', detail: 'INC-077 closed', time: '08:02', tone: 'good' }]}
      actions={[{ id: 'ac1', label: 'Finalize RCA', detail: '6 RCA reviews pending' },
        { id: 'ac2', label: 'Assign owners', detail: '3 incidents unassigned' },
        { id: 'ac3', label: 'Export weekly report', detail: 'Due today' }]}
      analytics={[{ label: 'RCA Completion', value: '78%', note: 'Target 85%' },
        { label: 'Repeat Incidents', value: '4%', note: 'Down 2%' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
