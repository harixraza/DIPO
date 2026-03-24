'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function MeetingsMou({ user }: Props) {
  return (
    <ModuleScaffold
      title="Meetings & MOU Management"
      subtitle="Delegation meetings, schedules, and MOU approvals."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Meetings Scheduled', value: '214', trend: '+9', tone: 'good' },
        { label: 'MOU Drafts', value: '38', trend: 'Active', tone: 'warn' },
        { label: 'Signatures', value: '12', trend: 'Completed', tone: 'good' },
        { label: 'Conflicts', value: '6', trend: 'Resolve', tone: 'warn' }]}
      queueTitle="Upcoming Meetings"
      queueColumns={[{ key: 'time', label: 'Time' },
        { key: 'party', label: 'Party' },
        { key: 'topic', label: 'Topic' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'mm1', time: '10:30', party: 'KSA Delegation', topic: 'MoU Logistics', status: 'Confirmed' },
        { id: 'mm2', time: '11:15', party: 'Turkey', topic: 'R&D Collaboration', status: 'Pending' },
        { id: 'mm3', time: '12:00', party: 'UAE', topic: 'Supply Chain', status: 'Confirmed' },
        { id: 'mm4', time: '14:30', party: 'UK', topic: 'Tech Transfer', status: 'Pending' }]}
      activity={[{ id: 'a1', title: 'Draft approved', detail: 'MoU-12 legal review complete', time: '09:09', tone: 'good' },
        { id: 'a2', title: 'Conflict flagged', detail: 'Room double-booked', time: '08:36', tone: 'warn' },
        { id: 'a3', title: 'Meeting confirmed', detail: 'UAE schedule locked', time: '08:05', tone: 'good' }]}
      actions={[{ id: 'ac1', label: 'Resolve conflicts', detail: '6 meetings need reschedule' },
        { id: 'ac2', label: 'Finalize drafts', detail: '5 MOUs awaiting signatures' },
        { id: 'ac3', label: 'Notify protocol', detail: 'Update VIP itineraries' }]}
      analytics={[{ label: 'Meeting Utilization', value: '86%', note: 'Target 90%' },
        { label: 'Approval Cycle', value: '3.4 days', note: 'Down from 4.1' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
