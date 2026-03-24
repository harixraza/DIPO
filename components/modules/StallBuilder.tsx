'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function StallBuilder({ user }: Props) {
  return (
    <ModuleScaffold
      title="Stall Builder"
      subtitle="Self-service stall design and approvals for exhibitors."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Designs Submitted', value: '276', trend: '+9%', tone: 'good' },
        { label: 'Inspections Due', value: '42', trend: 'This week', tone: 'warn' },
        { label: 'Power Requests', value: '118', trend: 'High', tone: 'warn' },
        { label: 'Approved', value: '198', trend: '72%', tone: 'good' }]}
      queueTitle="Design Review Queue"
      queueColumns={[{ key: 'stall', label: 'Stall' },
        { key: 'exhibitor', label: 'Exhibitor' },
        { key: 'needs', label: 'Needs' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 's1', stall: 'A-12', exhibitor: 'BAE Systems', needs: 'Power + Fiber', status: 'Pending' },
        { id: 's2', stall: 'B-19', exhibitor: 'NORINCO', needs: 'Double Height', status: 'Review' },
        { id: 's3', stall: 'C-04', exhibitor: 'POF', needs: 'Standard', status: 'Approved' },
        { id: 's4', stall: 'D-27', exhibitor: 'MBDA', needs: 'Hanging Banner', status: 'Rejected' },
        { id: 's5', stall: 'E-10', exhibitor: 'Rheinmetall', needs: 'Water', status: 'Pending' },
        { id: 's6', stall: 'F-03', exhibitor: 'DRD Group', needs: 'LED Wall', status: 'Review' }]}
      activity={[{ id: 'a1', title: 'Inspection scheduled', detail: 'Hall B design inspection', time: '09:08', tone: 'good' },
        { id: 'a2', title: 'Rejection issued', detail: 'D-27 exceeded height limit', time: '08:22', tone: 'bad' },
        { id: 'a3', title: 'Supplier assigned', detail: 'Power vendor assigned to A-12', time: '07:55', tone: 'neutral' }]}
      actions={[{ id: 'ac1', label: 'Review double-height', detail: '12 stalls awaiting structural approval' },
        { id: 'ac2', label: 'Assign vendors', detail: '7 stalls missing supplier' },
        { id: 'ac3', label: 'Schedule fire checks', detail: '42 inspections due' }]}
      analytics={[{ label: 'Avg Approval Time', value: '3.1 days', note: 'Target 4 days' },
        { label: 'Rejection Rate', value: '6.4%', note: 'Down from 8.1%' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
