'use client'

import { useState, useEffect } from 'react'
import { getUsers, addUser, updateUser, deleteUser, type User, type UserRole } from '@/lib/store'

const ROLE_COLORS: Record<UserRole, string> = {
  admin: 'bg-red-100 text-red-700',
  event_manager: 'bg-blue-100 text-blue-700',
  badge_officer: 'bg-indigo-100 text-indigo-700',
  parking_officer: 'bg-orange-100 text-orange-700',
  delegation_officer: 'bg-purple-100 text-purple-700',
  security_officer: 'bg-gray-100 text-gray-700',
  cms_editor: 'bg-teal-100 text-teal-700',
  attendee: 'bg-green-100 text-green-700',
  exhibitor: 'bg-yellow-100 text-yellow-700',
  vip: 'bg-amber-100 text-amber-700',
}

const BLANK_FORM = { name: '', email: '', password: '', role: 'attendee' as UserRole, organization: '', country: '', phone: '', status: 'active' as User['status'] }

export default function UserManagement({ user }: { user: User }) {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [form, setForm] = useState(BLANK_FORM)

  const load = () => setUsers(getUsers())
  useEffect(() => { load() }, [])

  const filtered = users.filter(u => {
    const q = search.toLowerCase()
    return (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.organization || '').toLowerCase().includes(q)) &&
      (roleFilter === 'all' || u.role === roleFilter)
  })

  const openAdd = () => { setEditUser(null); setForm(BLANK_FORM); setShowForm(true) }
  const openEdit = (u: User) => {
    setEditUser(u)
    setForm({ name: u.name, email: u.email, password: u.password, role: u.role, organization: u.organization || '', country: u.country || '', phone: u.phone || '', status: u.status })
    setShowForm(true)
  }

  const handleSave = () => {
    if (!form.name || !form.email) return
    if (editUser) updateUser({ ...editUser, ...form })
    else addUser({ ...form, createdAt: new Date().toISOString().split('T')[0] })
    load(); setShowForm(false); setEditUser(null)
  }

  const toggleStatus = (u: User) => {
    updateUser({ ...u, status: u.status === 'active' ? 'suspended' : 'active' })
    load()
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this user permanently?')) { deleteUser(id); load() }
  }

  if (user.role !== 'admin') return <p className="text-muted-foreground p-8 text-center">Access restricted to administrators.</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold">User Management</h2>
          <p className="text-sm text-muted-foreground">Manage all users, roles and access permissions</p>
        </div>
        <button onClick={openAdd} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          + Add User
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: 'Total', count: users.length, c: 'text-foreground' },
          { label: 'Active', count: users.filter(u => u.status === 'active').length, c: 'text-green-600' },
          { label: 'Suspended', count: users.filter(u => u.status === 'suspended').length, c: 'text-red-600' },
          { label: 'Staff', count: users.filter(u => !['attendee','exhibitor','vip'].includes(u.role)).length, c: 'text-primary' },
          { label: 'External', count: users.filter(u => ['attendee','exhibitor','vip'].includes(u.role)).length, c: 'text-purple-600' },
          { label: 'Countries', count: [...new Set(users.map(u => u.country).filter(Boolean))].length, c: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-3 text-center">
            <p className={`text-2xl font-bold ${s.c}`}>{s.count}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, organization..."
          className="flex-1 min-w-48 px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
          className="px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="all">All Roles</option>
          {(['admin','event_manager','badge_officer','parking_officer','delegation_officer','security_officer','cms_editor','attendee','exhibitor','vip'] as UserRole[]).map(r => (
            <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary border-b border-border">
              <tr>
                {['Name', 'Email', 'Role', 'Organization', 'Country', 'Status', 'Badge ID', 'Last Login', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="text-center py-8 text-muted-foreground text-sm">No users found</td></tr>
              )}
              {filtered.map((u, i) => (
                <tr key={u.id} className={`border-b border-border last:border-0 hover:bg-secondary/40 ${i % 2 === 1 ? 'bg-secondary/10' : ''}`}>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">{u.name.charAt(0)}</div>
                      <span className="font-medium truncate max-w-[130px]">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${ROLE_COLORS[u.role]}`}>{u.role.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground max-w-[110px] truncate">{u.organization || '—'}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{u.country || '—'}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      u.status === 'active' ? 'bg-green-100 text-green-700' :
                      u.status === 'suspended' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'}`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground">{u.badgeId || '—'}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{u.lastLogin || '—'}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1 flex-wrap">
                      <button onClick={() => openEdit(u)} className="text-xs px-2 py-1 bg-secondary rounded hover:bg-primary hover:text-primary-foreground transition-colors">Edit</button>
                      <button onClick={() => toggleStatus(u)} className={`text-xs px-2 py-1 rounded transition-colors ${u.status === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                      {u.id !== 'u1' && <button onClick={() => handleDelete(u.id)} className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded hover:bg-destructive hover:text-destructive-foreground transition-colors">Del</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground">
          Showing {filtered.length} of {users.length} users
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-2xl w-full max-w-lg border border-border max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">{editUser ? 'Edit User' : 'Add New User'}</h3>
              <button onClick={() => { setShowForm(false); setEditUser(null) }} className="text-muted-foreground hover:text-foreground">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {([
                { label: 'Full Name', key: 'name', type: 'text', span: true },
                { label: 'Email Address', key: 'email', type: 'email' },
                { label: 'Password', key: 'password', type: 'password' },
                { label: 'Phone', key: 'phone', type: 'text' },
                { label: 'Organization', key: 'organization', type: 'text' },
                { label: 'Country', key: 'country', type: 'text' },
              ] as { label: string; key: string; type: string; span?: boolean }[]).map(f => (
                <div key={f.key} className={f.span ? 'col-span-2' : ''}>
                  <label className="block text-xs font-medium mb-1">{f.label}</label>
                  <input type={f.type} value={(form as Record<string, string>)[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1">Role</label>
                <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value as UserRole }))}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  {(['admin','event_manager','badge_officer','parking_officer','delegation_officer','security_officer','cms_editor','attendee','exhibitor','vip'] as UserRole[]).map(r => (
                    <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as User['status'] }))}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
              <button onClick={() => { setShowForm(false); setEditUser(null) }} className="px-4 py-2 text-sm border border-border rounded-md hover:bg-secondary transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Save User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
