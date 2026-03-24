'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function HarmonyApp({ user }: Props) {
  return (
    <ModuleScaffold
      title="Harmony Application"
      subtitle="HarmonyOS deployment with badge wallet and updates."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Installs', value: '110', trend: '+4', tone: 'good' },
        { label: 'Wallet Activations', value: '78', trend: '71%', tone: 'good' },
        { label: 'Update Success', value: '96%', trend: 'Stable', tone: 'good' },
        { label: 'Support Tickets', value: '5', trend: 'Low', tone: 'good' }]}
      queueTitle="Device Rollout"
      queueColumns={[{ key: 'device', label: 'Device' },
        { key: 'region', label: 'Region' },
        { key: 'version', label: 'Version' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'h1', device: 'HMY-021', region: 'Islamabad', version: '1.2.0', status: 'Updated' },
        { id: 'h2', device: 'HMY-044', region: 'Lahore', version: '1.2.0', status: 'Queued' },
        { id: 'h3', device: 'HMY-063', region: 'Islamabad', version: '1.1.8', status: 'Pending' }]}
      activity={[{ id: 'a1', title: 'Wallet activated', detail: 'HMY-021 wallet enabled', time: '09:10', tone: 'good' },
        { id: 'a2', title: 'Update queued', detail: 'Version 1.2.0 queued', time: '08:35', tone: 'neutral' },
        { id: 'a3', title: 'Support ticket', detail: 'Login issue reported', time: '08:02', tone: 'warn' }]}
      actions={[{ id: 'ac1', label: 'Complete rollout', detail: '32 devices pending' },
        { id: 'ac2', label: 'Resolve tickets', detail: '5 open tickets' },
        { id: 'ac3', label: 'Verify wallet', detail: '12 activations pending' }]}
      analytics={[{ label: 'Avg Update Time', value: '4.5 min', note: 'Target 6 min' },
        { label: 'Activation Rate', value: '71%', note: 'Up from 64%' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
