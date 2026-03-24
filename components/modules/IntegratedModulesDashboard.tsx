'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function IntegratedModulesDashboard({ user }: Props) {
  return (
    <ModuleScaffold
      title="Integrated Modules Dashboard"
      subtitle="Tiered executive, ops, and module KPI overview."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Live KPIs', value: '48', trend: 'Active', tone: 'good' },
        { label: 'Alerts', value: '7', trend: 'Open', tone: 'warn' },
        { label: 'Uptime', value: '99.4%', trend: 'SLA', tone: 'good' },
        { label: 'Bottlenecks', value: '3', trend: 'Ops', tone: 'warn' }]}
      queueTitle="Cross-Module Alerts"
      queueColumns={[{ key: 'module', label: 'Module' },
        { key: 'alert', label: 'Alert' },
        { key: 'severity', label: 'Severity' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'im1', module: 'Security', alert: 'Zone C elevated', severity: 'High', status: 'Open' },
        { id: 'im2', module: 'Logistics', alert: 'Warehouse B full', severity: 'Medium', status: 'Open' },
        { id: 'im3', module: 'Registration', alert: 'VIP queue spike', severity: 'High', status: 'Open' },
        { id: 'im4', module: 'CCTV', alert: 'Camera 14 offline', severity: 'Medium', status: 'Investigating' }]}
      activity={[{ id: 'a1', title: 'Alert resolved', detail: 'Camera 18 back online', time: '09:06', tone: 'good' },
        { id: 'a2', title: 'New alert', detail: 'VIP queue spike', time: '08:42', tone: 'warn' },
        { id: 'a3', title: 'KPI updated', detail: 'Attendance target hit', time: '08:10', tone: 'good' }]}
      actions={[{ id: 'ac1', label: 'Resolve alerts', detail: '7 open alerts' },
        { id: 'ac2', label: 'Share exec brief', detail: '09:30 update' },
        { id: 'ac3', label: 'Adjust thresholds', detail: 'VIP queue trigger' }]}
      analytics={[{ label: 'Ops Response', value: '6 min', note: 'Target 8 min' },
        { label: 'System Load', value: '68%', note: 'Within limits' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
