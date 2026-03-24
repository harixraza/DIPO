'use client'

import { useState } from 'react'
import type { User } from '@/lib/store'

const ANNOUNCEMENTS = [
  { id: 1, title: 'IDEAS 2026 Registration Now Open', category: 'General', status: 'published', date: '2026-03-01', author: 'Admin', views: 1420 },
  { id: 2, title: 'Gala Dinner — Dress Code & Protocol', category: 'Events', status: 'published', date: '2026-03-10', author: 'Events Team', views: 892 },
  { id: 3, title: 'Security Briefing for All Exhibitors', category: 'Security', status: 'published', date: '2026-03-12', author: 'Security Team', views: 634 },
  { id: 4, title: 'Vehicle Pass Collection Procedure', category: 'Logistics', status: 'draft', date: '2026-03-15', author: 'Admin', views: 0 },
  { id: 5, title: 'Seminar Programme — Final Schedule', category: 'Events', status: 'published', date: '2026-03-18', author: 'Events Team', views: 2100 },
  { id: 6, title: 'Media Accreditation Guidelines', category: 'Media', status: 'review', date: '2026-03-19', author: 'Media Team', views: 0 },
]

const GALLERY = [
  { id: 1, caption: 'IDEAS 2024 Opening Ceremony', tag: 'archive', approved: true },
  { id: 2, caption: 'Tri-Services Display 2024', tag: 'archive', approved: true },
  { id: 3, caption: 'IDEAS 2026 Venue Setup', tag: '2026-prep', approved: true },
  { id: 4, caption: 'Exhibitor Hall Layout', tag: '2026-prep', approved: false },
]

const PAGE_ANALYTICS = [
  { page: 'Homepage', views: 45820, sessions: 12400, bounce: '32%' },
  { page: 'Registration', views: 18200, sessions: 9800, bounce: '18%' },
  { page: 'Exhibitors', views: 12100, sessions: 6200, bounce: '41%' },
  { page: 'Seminar', views: 9400, sessions: 4800, bounce: '35%' },
  { page: 'Contact', views: 3200, sessions: 1900, bounce: '55%' },
]

const statusC = (s: string) => s === 'published' ? 'bg-green-100 text-green-700' : s === 'draft' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-700'

export default function CmsModule({ user }: { user: User }) {
  const [tab, setTab] = useState<'announcements' | 'gallery' | 'analytics' | 'pages'>('announcements')
  const [items, setItems] = useState(ANNOUNCEMENTS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'General', status: 'draft', content: '' })

  const handlePublish = (id: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'published' } : i))
  }

  const handleAdd = () => {
    setItems(prev => [...prev, { id: Date.now(), title: form.title, category: form.category, status: form.status, date: new Date().toISOString().split('T')[0], author: user.name, views: 0 }])
    setShowForm(false)
    setForm({ title: '', category: 'General', status: 'draft', content: '' })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold">Content Management System</h2>
          <p className="text-sm text-muted-foreground">IDEAS 2026 website CMS — announcements, gallery & analytics</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          + New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Posts', value: items.length, color: 'text-foreground' },
          { label: 'Published', value: items.filter(i => i.status === 'published').length, color: 'text-green-600' },
          { label: 'Drafts', value: items.filter(i => i.status === 'draft').length, color: 'text-gray-500' },
          { label: 'Total Views', value: items.reduce((s, i) => s + i.views, 0).toLocaleString(), color: 'text-primary' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-3 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-1">
        {(['announcements', 'gallery', 'analytics', 'pages'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 ${tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'announcements' && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary border-b border-border">
              <tr>{['Title', 'Category', 'Author', 'Date', 'Views', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={`border-b border-border last:border-0 hover:bg-secondary/40 ${i % 2 === 1 ? 'bg-secondary/10' : ''}`}>
                  <td className="px-4 py-2.5 font-medium text-sm max-w-[220px] truncate">{item.title}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{item.category}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{item.author}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{item.date}</td>
                  <td className="px-4 py-2.5 text-xs font-medium">{item.views.toLocaleString()}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusC(item.status)}`}>{item.status}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1">
                      {item.status !== 'published' && (
                        <button onClick={() => handlePublish(item.id)} className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">Publish</button>
                      )}
                      <button className="text-xs px-2 py-0.5 bg-secondary rounded hover:bg-primary hover:text-primary-foreground transition-colors">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'gallery' && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map(g => (
              <div key={g.id} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="h-32 bg-secondary flex items-center justify-center">
                  <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-muted-foreground">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium">{g.caption}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded">{g.tag}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${g.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{g.approved ? 'Approved' : 'Pending'}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-secondary border-2 border-dashed border-border rounded-lg h-full min-h-[160px] flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <div className="text-center">
                <p className="text-2xl text-muted-foreground">+</p>
                <p className="text-xs text-muted-foreground mt-1">Upload Image</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'analytics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total Page Views', value: '89,740', change: '+12%' },
              { label: 'Unique Sessions', value: '35,100', change: '+8%' },
              { label: 'Avg. Session Duration', value: '4m 32s', change: '+5%' },
              { label: 'Registrations Online', value: '1,842', change: '+22%' },
            ].map(s => (
              <div key={s.label} className="bg-card border border-border rounded-lg p-4">
                <p className="text-xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                <p className="text-xs text-green-600 mt-1 font-medium">{s.change} vs last month</p>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="font-semibold text-sm">Page Performance</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-secondary"><tr>{['Page', 'Views', 'Sessions', 'Bounce Rate'].map(h => <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
              <tbody>
                {PAGE_ANALYTICS.map((p, i) => (
                  <tr key={p.page} className={`border-t border-border hover:bg-secondary/40 ${i % 2 === 1 ? 'bg-secondary/10' : ''}`}>
                    <td className="px-4 py-2.5 font-medium text-sm">{p.page}</td>
                    <td className="px-4 py-2.5 text-sm">{p.views.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-sm">{p.sessions.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-sm">{p.bounce}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'pages' && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary border-b border-border">
              <tr>{['Page Name', 'URL', 'Last Updated', 'Status', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                { name: 'Homepage', url: '/', updated: '2026-03-18', status: 'live' },
                { name: 'About IDEAS', url: '/about', updated: '2026-03-10', status: 'live' },
                { name: 'Registration', url: '/register', updated: '2026-03-15', status: 'live' },
                { name: 'Exhibitors', url: '/exhibitors', updated: '2026-03-12', status: 'live' },
                { name: 'Seminar Programme', url: '/seminar', updated: '2026-03-18', status: 'live' },
                { name: 'Contact Us', url: '/contact', updated: '2026-02-28', status: 'live' },
                { name: 'Press & Media', url: '/media', updated: '2026-03-05', status: 'review' },
              ].map((p, i) => (
                <tr key={p.url} className={`border-b border-border last:border-0 hover:bg-secondary/40 ${i % 2 === 1 ? 'bg-secondary/10' : ''}`}>
                  <td className="px-4 py-2.5 font-medium text-sm">{p.name}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{p.url}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{p.updated}</td>
                  <td className="px-4 py-2.5"><span className={`px-2 py-0.5 rounded-full text-xs ${p.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span></td>
                  <td className="px-4 py-2.5"><button className="text-xs px-2 py-0.5 bg-secondary rounded hover:bg-primary hover:text-primary-foreground transition-colors">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Post Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-2xl w-full max-w-md border border-border">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">New Announcement</h3>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">Title</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Post title..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                    {['General', 'Events', 'Security', 'Logistics', 'Media'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="draft">Draft</option><option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Content</label>
                <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={4} className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Post content..." />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border border-border rounded-md hover:bg-secondary transition-colors">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Save Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
