'use client'

import type { User } from '@/lib/store'
import ModuleScaffold from './ModuleScaffold'

interface Props {
  user: User
}

export default function SocialMediaMonitoring({ user }: Props) {
  return (
    <ModuleScaffold
      title="Social Media Monitoring"
      subtitle="Sentiment, media coverage, and risk signal detection."
      owner={user.role.replace(/_/g, ' ')}
      kpis={[{ label: 'Mentions 24h', value: '18.2k', trend: '+14%', tone: 'warn' },
        { label: 'High-Risk Flags', value: '4', trend: 'Review', tone: 'warn' },
        { label: 'Positive', value: '62%', trend: 'Stable', tone: 'good' },
        { label: 'Influencer Posts', value: '38', trend: 'Tracked', tone: 'neutral' }]}
      queueTitle="Priority Mentions"
      queueColumns={[{ key: 'source', label: 'Source' },
        { key: 'topic', label: 'Topic' },
        { key: 'score', label: 'Score' },
        { key: 'status', label: 'Status' }]}
      queueRows={[{ id: 'sm1', source: 'X', topic: 'Crowd congestion', score: 'High', status: 'Open' },
        { id: 'sm2', source: 'YouTube', topic: 'Keynote highlights', score: 'Medium', status: 'Noted' },
        { id: 'sm3', source: 'Instagram', topic: 'VIP arrival', score: 'Low', status: 'Archived' },
        { id: 'sm4', source: 'Facebook', topic: 'Security rumor', score: 'High', status: 'Escalated' }]}
      activity={[{ id: 'a1', title: 'Alert issued', detail: 'Security rumor escalated', time: '09:07', tone: 'warn' },
        { id: 'a2', title: 'Sentiment update', detail: 'Positive sentiment +3%', time: '08:41', tone: 'good' },
        { id: 'a3', title: 'Influencer flagged', detail: 'High reach post detected', time: '08:05', tone: 'neutral' }]}
      actions={[{ id: 'ac1', label: 'Escalate high-risk', detail: '4 flags pending' },
        { id: 'ac2', label: 'Update keywords', detail: 'Add new brand terms' },
        { id: 'ac3', label: 'Prepare briefing', detail: 'Daily sentiment summary' }]}
      analytics={[{ label: 'Avg Response', value: '12 min', note: 'Target 15 min' },
        { label: 'Coverage Index', value: '78', note: 'Up 6 points' }]}
      connections={[
        { id: 'c1', label: 'Identity & Access', status: 'connected', detail: 'SSO + badge registry linked' },
        { id: 'c2', label: 'Notification Bus', status: 'connected', detail: 'Email/WhatsApp triggers active' },
        { id: 'c3', label: 'Operations API', status: 'degraded', detail: 'Latency elevated 320ms' },
      ]}
    />
  )
}
