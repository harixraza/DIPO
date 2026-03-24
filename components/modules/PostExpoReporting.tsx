'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function PostExpoReporting({ user }: Props) {
  return (
    <ModuleScaffold
      title="Post Expo Reporting"
      subtitle="Final reports, KPIs, and compliance sign-off."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Reports Ready', value: '12/18', trend: 'In progress', tone: 'warn' },
        { label: 'Sign-Offs', value: '5', trend: 'Pending', tone: 'warn' },
        { label: 'Modules Covered', value: '19', trend: 'Complete', tone: 'good' },
        { label: 'Exports', value: '44', trend: 'Today', tone: 'neutral' }]}
      queueTitle="Report Queue"
      queueColumns={[{ key: 'module', label: 'Module' },
        { key: 'owner', label: 'Owner' },
        { key: 'status', label: 'Status' },
        { key: 'due', label: 'Due' }]}
      queueRows={[{ id: 'pr1', module: 'Security', owner: 'Ops', status: 'Draft', due: 'Mar 22' },
        { id: 'pr2', module: 'Logistics', owner: 'Ops', status: 'Review', due: 'Mar 21' },
        { id: 'pr3', module: 'Registration', owner: 'Admin', status: 'Pending', due: 'Mar 23' },
        { id: 'pr4', module: 'Media', owner: 'PR', status: 'Draft', due: 'Mar 24' }]}
      activity={[{ id: 'a1', title: 'Report approved', detail: 'Attendance report signed', time: '09:12', tone: 'good' },
        { id: 'a2', title: 'Export generated', detail: 'Executive summary PDF', time: '08:36', tone: 'neutral' },
        { id: 'a3', title: 'Reminder sent', detail: 'Security report overdue', time: '08:05', tone: 'warn' }]}
      actions={[{ id: 'ac1', label: 'Chase sign-offs', detail: '5 approvals pending' },
        { id: 'ac2', label: 'Compile KPI pack', detail: 'Executive summary' },
        { id: 'ac3', label: 'Archive evidence', detail: 'Attach compliance docs' }]}
      analytics={[{ label: 'On-Time Rate', value: '72%', note: 'Goal 90%' },
        { label: 'Revision Count', value: '1.6', note: 'Avg per report' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
