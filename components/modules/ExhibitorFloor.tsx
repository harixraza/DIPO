'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function ExhibitorFloor({ user }: Props) {
  return (
    <ModuleScaffold
      title="Exhibitor Floor Management"
      subtitle="Hall zoning, booth allocation, and exhibitor compliance control."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Halls Live', value: '6', trend: 'All open', tone: 'good' },
        { label: 'Booths Allocated', value: '412/460', trend: '+2%', tone: 'good' },
        { label: 'Layout Conflicts', value: '18', trend: 'Needs review', tone: 'warn' },
        { label: 'Build Approvals', value: '132', trend: 'Today', tone: 'neutral' }]}
      queueTitle="Allocation Queue"
      queueColumns={[{ key: 'booth', label: 'Booth' },
        { key: 'exhibitor', label: 'Exhibitor' },
        { key: 'hall', label: 'Hall' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'q1', booth: 'B-12', exhibitor: 'BAE Systems', hall: 'Hall A', status: 'Pending' },
        { id: 'q2', booth: 'C-44', exhibitor: 'NORINCO', hall: 'Hall C', status: 'Change Req' },
        { id: 'q3', booth: 'D-18', exhibitor: 'POF', hall: 'Hall D', status: 'Approved' },
        { id: 'q4', booth: 'A-03', exhibitor: 'Rheinmetall', hall: 'Hall A', status: 'Awaiting Docs' },
        { id: 'q5', booth: 'B-27', exhibitor: 'MBDA', hall: 'Hall B', status: 'Approved' },
        { id: 'q6', booth: 'E-09', exhibitor: 'DRD Group', hall: 'Hall E', status: 'Conflict' },
        { id: 'q7', booth: 'F-11', exhibitor: 'NESCOM', hall: 'Hall F', status: 'Approved' }]}
      activity={[{ id: 'a1', title: 'Layout updated', detail: 'Hall C zoning revised for fire lane', time: '09:12', tone: 'good' },
        { id: 'a2', title: 'Conflict flagged', detail: 'Hall E Booth 09 overlaps emergency exit', time: '08:40', tone: 'warn' },
        { id: 'a3', title: 'Booth approved', detail: 'B-27 MBDA branding accepted', time: '08:10', tone: 'good' },
        { id: 'a4', title: 'Inspection scheduled', detail: 'Hall A safety inspection', time: '07:55', tone: 'neutral' }]}
      actions={[{ id: 'ac1', label: 'Approve change requests', detail: 'Review 18 layout conflicts pending' },
        { id: 'ac2', label: 'Send exhibitor reminders', detail: '12 exhibitors missing documents' },
        { id: 'ac3', label: 'Lock Hall D layout', detail: 'Finalize by end of week' }]}
      analytics={[{ label: 'Average Allocation Time', value: '2.6 days', note: 'Based on last 30 requests' },
        { label: 'Conflict Rate', value: '4.1%', note: 'Down from 5.3% last cycle' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
