'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function PassManagement({ user }: Props) {
  return (
    <ModuleScaffold
      title="Pass Management System"
      subtitle="Temporary and emergency pass workflows with audit trail."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Active Passes', value: '1,904', trend: '+3%', tone: 'neutral' },
        { label: 'Expiring Today', value: '86', trend: 'Urgent', tone: 'warn' },
        { label: 'Revoked', value: '12', trend: 'Today', tone: 'warn' },
        { label: 'Pass Scans', value: '7,224', trend: '+5%', tone: 'good' }]}
      queueTitle="Pass Requests"
      queueColumns={[{ key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'zone', label: 'Zone' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'p1', name: 'Aamir Qureshi', type: 'Temporary', zone: 'Zone B', status: 'Pending' },
        { id: 'p2', name: 'Liu Chen', type: 'Media', zone: 'Press', status: 'Approved' },
        { id: 'p3', name: 'Vendor Team', type: 'Emergency', zone: 'Hall C', status: 'Escalated' },
        { id: 'p4', name: 'Sadia Khan', type: 'Vendor', zone: 'Zone A', status: 'Pending' },
        { id: 'p5', name: 'Markus Weber', type: 'Visitor', zone: 'Zone B', status: 'Rejected' }]}
      activity={[{ id: 'a1', title: 'Pass revoked', detail: 'Vendor pass invalidated', time: '09:00', tone: 'warn' },
        { id: 'a2', title: 'Emergency pass', detail: 'Hall C issued', time: '08:35', tone: 'good' },
        { id: 'a3', title: 'Batch approved', detail: '28 temporary passes', time: '08:05', tone: 'good' }]}
      actions={[{ id: 'ac1', label: 'Approve expiring', detail: '86 passes expiring' },
        { id: 'ac2', label: 'Audit revokes', detail: '12 revoked today' },
        { id: 'ac3', label: 'Notify security', detail: '3 emergency passes' }]}
      analytics={[{ label: 'Average Approval', value: '22 min', note: 'Target 30 min' },
        { label: 'Abuse Rate', value: '0.4%', note: 'Stable' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
