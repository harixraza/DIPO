'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function AiChatbot({ user }: Props) {
  return (
    <ModuleScaffold
      title="AI Chatbot"
      subtitle="Guided support with controlled knowledge sources and escalation."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Sessions Today', value: '5,402', trend: '+12%', tone: 'good' },
        { label: 'Escalations', value: '3.1%', trend: 'Low', tone: 'good' },
        { label: 'Top Intent', value: 'Registration', trend: '32%', tone: 'neutral' },
        { label: 'Deflection', value: '68%', trend: 'Above goal', tone: 'good' }]}
      queueTitle="Unresolved Intents"
      queueColumns={[{ key: 'topic', label: 'Topic' },
        { key: 'count', label: 'Count' },
        { key: 'severity', label: 'Severity' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'c1', topic: 'Badge reprint', count: '42', severity: 'Medium', status: 'Open' },
        { id: 'c2', topic: 'Visa letters', count: '28', severity: 'High', status: 'Escalated' },
        { id: 'c3', topic: 'Parking zones', count: '19', severity: 'Low', status: 'Open' },
        { id: 'c4', topic: 'Hotel transfers', count: '16', severity: 'Medium', status: 'Open' },
        { id: 'c5', topic: 'Security clearance', count: '9', severity: 'High', status: 'Escalated' }]}
      activity={[{ id: 'a1', title: 'Knowledge update', detail: 'Added Visa letter FAQ', time: '09:06', tone: 'good' },
        { id: 'a2', title: 'Escalation', detail: '9 security clearance chats routed', time: '08:30', tone: 'warn' },
        { id: 'a3', title: 'Prompt audit', detail: 'Prompt v5 approved', time: '08:05', tone: 'neutral' }]}
      actions={[{ id: 'ac1', label: 'Add FAQ', detail: 'Draft for hotel transfers' },
        { id: 'ac2', label: 'Review escalations', detail: '17 pending handoffs' },
        { id: 'ac3', label: 'Update intent tags', detail: 'New booth setup intent' }]}
      analytics={[{ label: 'Avg Response Time', value: '1.4s', note: 'Target < 2s' },
        { label: 'Satisfaction', value: '4.6/5', note: '+0.2 vs last week' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
