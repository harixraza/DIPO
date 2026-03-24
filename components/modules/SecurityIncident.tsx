'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function SecurityIncident({ user }: Props) {
  return (
    <ModuleScaffold
      title="Security & Incident Control"
      subtitle="Live security posture and incident coordination."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Active Incidents', value: '3', trend: 'Live', tone: 'warn' },
        { label: 'Zones Elevated', value: '2', trend: 'Amber', tone: 'warn' },
        { label: 'Response Units', value: '28', trend: 'Ready', tone: 'good' },
        { label: 'Avg Response', value: '4m', trend: 'SLA 5m', tone: 'good' }]}
      queueTitle="Active Incidents"
      queueColumns={[{ key: 'ref', label: 'Ref' },
        { key: 'zone', label: 'Zone' },
        { key: 'type', label: 'Type' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'si1', ref: 'INC-102', zone: 'Hall A', type: 'Access breach', status: 'Responding' },
        { id: 'si2', ref: 'INC-108', zone: 'Gate 3', type: 'Vehicle check', status: 'Open' },
        { id: 'si3', ref: 'INC-111', zone: 'Press Area', type: 'Lost badge', status: 'Open' },
        { id: 'si4', ref: 'INC-114', zone: 'Hall C', type: 'Suspicious bag', status: 'Escalated' }]}
      activity={[{ id: 'a1', title: 'Zone elevated', detail: 'Hall C moved to Amber', time: '09:10', tone: 'warn' },
        { id: 'a2', title: 'Unit dispatched', detail: 'Team Bravo to Gate 3', time: '08:50', tone: 'neutral' },
        { id: 'a3', title: 'Incident closed', detail: 'Press badge recovered', time: '08:12', tone: 'good' }]}
      actions={[{ id: 'ac1', label: 'Authorize lockdown', detail: 'Hall C pending decision' },
        { id: 'ac2', label: 'Brief response units', detail: 'Shift change in 20 min' },
        { id: 'ac3', label: 'Sync CCTV', detail: 'Review feeds for INC-114' }]}
      analytics={[{ label: 'Incident Closure', value: '82%', note: 'Within SLA' },
        { label: 'False Alarms', value: '6%', note: 'Down 1%' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
