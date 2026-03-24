'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function KpiDashboard({ user }: Props) {
  return (
    <ModuleScaffold
      title="KPI Dashboard"
      subtitle="Performance scorecards across all modules."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'KPIs On Track', value: '42/48', trend: '87%', tone: 'good' },
        { label: 'Critical Breaches', value: '2', trend: 'Immediate', tone: 'bad' },
        { label: 'Warnings', value: '4', trend: 'Monitor', tone: 'warn' },
        { label: 'Trend', value: '+3%', trend: 'Week', tone: 'good' }]}
      queueTitle="KPI Exceptions"
      queueColumns={[{ key: 'kpi', label: 'KPI' },
        { key: 'module', label: 'Module' },
        { key: 'value', label: 'Value' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'k1', kpi: 'Incident SLA', module: 'Security', value: '7.8 min', status: 'Breach' },
        { id: 'k2', kpi: 'Clearance Holds', module: 'Logistics', value: '9', status: 'Breach' },
        { id: 'k3', kpi: 'VIP Queue', module: 'Registration', value: '220', status: 'Warning' },
        { id: 'k4', kpi: 'CCTV Uptime', module: 'CCTV', value: '93%', status: 'Warning' }]}
      activity={[{ id: 'a1', title: 'KPI recovered', detail: 'Attendance hit 96%', time: '09:08', tone: 'good' },
        { id: 'a2', title: 'Breach flagged', detail: 'Logistics clearance holds', time: '08:38', tone: 'bad' },
        { id: 'a3', title: 'Warning', detail: 'CCTV uptime dipped', time: '08:05', tone: 'warn' }]}
      actions={[{ id: 'ac1', label: 'Assign owners', detail: '2 KPI breaches' },
        { id: 'ac2', label: 'Schedule review', detail: 'KPI council 15:00' },
        { id: 'ac3', label: 'Update targets', detail: 'Adjust queue thresholds' }]}
      analytics={[{ label: 'Overall Score', value: '87/100', note: 'Up 3 points' },
        { label: 'Recovery Time', value: '5.2h', note: 'Avg' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
