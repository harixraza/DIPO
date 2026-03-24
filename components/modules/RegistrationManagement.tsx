'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function RegistrationManagement({ user }: Props) {
  return (
    <ModuleScaffold
      title="Registration Management"
      subtitle="Centralized registration control with verification and risk scoring."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Registrations', value: '12,482', trend: '+6%', tone: 'good' },
        { label: 'Pending Verifications', value: '1,248', trend: 'Queue', tone: 'warn' },
        { label: 'Auto-Approved', value: '8,934', trend: '72%', tone: 'good' },
        { label: 'Rejected', value: '306', trend: '1.9%', tone: 'bad' }]}
      queueTitle="Verification Queue"
      queueColumns={[{ key: 'name', label: 'Name' },
        { key: 'category', label: 'Category' },
        { key: 'country', label: 'Country' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'r1', name: 'Dr. Ahmad Al-Rashid', category: 'VIP', country: 'Saudi Arabia', status: 'Pending' },
        { id: 'r2', name: 'Ms. Sarah Klein', category: 'Media', country: 'Pakistan', status: 'Docs Review' },
        { id: 'r3', name: 'Mr. Tariq Mehmood', category: 'Exhibitor', country: 'Pakistan', status: 'Approved' },
        { id: 'r4', name: 'Col Wang Wei', category: 'Delegation', country: 'China', status: 'Risk Check' },
        { id: 'r5', name: 'Mr. James Thornton', category: 'Exhibitor', country: 'UK', status: 'Pending' },
        { id: 'r6', name: 'Lt Gen Al-Harbi', category: 'VIP', country: 'KSA', status: 'Approved' },
        { id: 'r7', name: 'Ms. Helga Braun', category: 'Visitor', country: 'Germany', status: 'Pending' }]}
      activity={[{ id: 'a1', title: 'Auto-approval', detail: '74 visitor registrations approved', time: '09:05', tone: 'good' },
        { id: 'a2', title: 'Risk escalation', detail: 'Delegation profile flagged for manual review', time: '08:42', tone: 'warn' },
        { id: 'a3', title: 'Document verified', detail: 'Media accreditation completed', time: '08:20', tone: 'good' }]}
      actions={[{ id: 'ac1', label: 'Review VIP queue', detail: '18 VIPs waiting approval' },
        { id: 'ac2', label: 'Audit auto-approvals', detail: 'Random sample of 120' },
        { id: 'ac3', label: 'Notify badge team', detail: '1,248 pending verifications' }]}
      analytics={[{ label: 'Verification SLA', value: '18h', note: 'Target 24h' },
        { label: 'Fraud Risk', value: '0.7%', note: 'Stable vs last week' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
