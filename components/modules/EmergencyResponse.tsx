'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function EmergencyResponse({ user }: Props) {
  return (
    <ModuleScaffold
      title="Emergency Response Coordination"
      subtitle="Rapid response playbooks and resource tracking."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Response Units', value: '28', trend: 'Ready', tone: 'good' },
        { label: 'Drills Complete', value: '5/7', trend: 'In progress', tone: 'warn' },
        { label: 'Medical Alerts', value: '4', trend: 'Today', tone: 'warn' },
        { label: 'Evac Routes', value: '12', trend: 'Verified', tone: 'good' }]}
      queueTitle="Live Response Tasks"
      queueColumns={[{ key: 'task', label: 'Task' },
        { key: 'lead', label: 'Lead' },
        { key: 'eta', label: 'ETA' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'er1', task: 'Medical standby', lead: 'Unit Alpha', eta: '10 min', status: 'Active' },
        { id: 'er2', task: 'Evac drill', lead: 'Unit Delta', eta: '30 min', status: 'Scheduled' },
        { id: 'er3', task: 'Fire check', lead: 'Unit Echo', eta: '20 min', status: 'Active' },
        { id: 'er4', task: 'Route audit', lead: 'Unit Bravo', eta: '45 min', status: 'Pending' }]}
      activity={[{ id: 'a1', title: 'Drill completed', detail: 'Gate 2 evacuation drill', time: '09:04', tone: 'good' },
        { id: 'a2', title: 'Medical call', detail: 'Minor injury at Hall A', time: '08:36', tone: 'warn' },
        { id: 'a3', title: 'Resource assigned', detail: 'Unit Alpha to VIP gate', time: '08:05', tone: 'neutral' }]}
      actions={[{ id: 'ac1', label: 'Complete drills', detail: '2 drills remaining' },
        { id: 'ac2', label: 'Review playbooks', detail: 'Fire response update' },
        { id: 'ac3', label: 'Check equipment', detail: 'AED inventory audit' }]}
      analytics={[{ label: 'Avg Response', value: '3.8 min', note: 'Target 5 min' },
        { label: 'Drill Compliance', value: '71%', note: 'Goal 100%' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
