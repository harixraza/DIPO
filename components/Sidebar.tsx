'use client'

import type { User, UserRole } from '@/lib/store'
import type { Module } from './Dashboard'

interface NavItem {
  id: Module
  label: string
  icon: React.ReactNode
  roles: UserRole[] | 'all'
  badge?: string
}

export const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Master Dashboard',
    roles: 'all',
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    id: 'users',
    label: 'User Management',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    id: 'events',
    label: 'Event Management',
    roles: ['admin', 'event_manager'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  },
  {
    id: 'badges',
    label: 'Badge & Accreditation',
    roles: ['admin', 'badge_officer', 'security_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  },
  {
    id: 'vehicles',
    label: 'Vehicle & Parking',
    roles: ['admin', 'parking_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v10a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
  },
  {
    id: 'delegations',
    label: 'Delegation Handling',
    roles: ['admin', 'delegation_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    id: 'attendance',
    label: 'Attendance Tracking',
    roles: ['admin', 'security_officer', 'badge_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  },
  {
    id: 'cms',
    label: 'Content Management',
    roles: ['admin', 'cms_editor'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  },
  {
    id: 'api',
    label: 'API Integration',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  },
  {
    id: 'biometric',
    label: 'Biometric Verification',
    roles: ['admin', 'security_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04.054-.09A13.916 13.916 0 0 0 8 11a4 4 0 1 1 8 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0 0 15.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 0 0 8 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/></svg>,
  },
  {
    id: 'cyber',
    label: 'Cyber Security',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    id: 'exhibitor_floor',
    label: 'Exhibitor Floor',
    roles: ['admin', 'event_manager'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    id: 'registration',
    label: 'Registration',
    roles: ['admin', 'event_manager', 'badge_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  },
  {
    id: 'auto_email',
    label: 'Auto Email',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/></svg>,
  },
  {
    id: 'stall_builder',
    label: 'Stall Builder',
    roles: ['admin', 'event_manager'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>,
  },
  {
    id: 'ai_chatbot',
    label: 'AI Chatbot',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 10h8M9 14h6"/></svg>,
  },
  {
    id: 'logistics',
    label: 'Logistics',
    roles: ['admin', 'parking_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7h13v10H3z"/><path d="M16 10h4l1 2v5h-5z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>,
  },
  {
    id: 'media',
    label: 'Media Management',
    roles: ['admin', 'cms_editor'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M21 15l-4-4-6 6"/></svg>,
  },
  {
    id: 'security_incident',
    label: 'Security & Incident',
    roles: ['admin', 'security_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    id: 'pass_management',
    label: 'Pass Management',
    roles: ['admin', 'badge_officer', 'security_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M12 11h6"/><path d="M12 15h4"/></svg>,
  },
  {
    id: 'incident_management',
    label: 'Incident Management',
    roles: ['admin', 'security_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10 2h4l7 7-7 13H10L3 9z"/></svg>,
  },
  {
    id: 'communication_log',
    label: 'Communication Logs',
    roles: ['admin', 'security_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    id: 'emergency_response',
    label: 'Emergency Response',
    roles: ['admin', 'security_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20"/><path d="M2 12h20"/></svg>,
  },
  {
    id: 'social_monitoring',
    label: 'Social Monitoring',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 11l3-3 3 3 3-1"/></svg>,
  },
  {
    id: 'meetings_mou',
    label: 'Meetings & MOU',
    roles: ['admin', 'delegation_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7h18"/><path d="M8 3v4"/><path d="M16 3v4"/><rect x="3" y="7" width="18" height="14" rx="2"/></svg>,
  },
  {
    id: 'mobile_android',
    label: 'Android App',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M10 7h4"/></svg>,
  },
  {
    id: 'mobile_ios',
    label: 'iOS App',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 6h4"/></svg>,
  },
  {
    id: 'mobile_harmony',
    label: 'Harmony App',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 8h.01"/><path d="M8 12h.01"/><path d="M8 16h.01"/><path d="M12 8h4"/><path d="M12 12h4"/><path d="M12 16h4"/></svg>,
  },
  {
    id: 'wechat',
    label: 'WeChat',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="10" r="5"/><circle cx="16" cy="14" r="5"/><path d="M7 9h.01"/><path d="M11 9h.01"/><path d="M14 13h.01"/><path d="M18 13h.01"/></svg>,
  },
  {
    id: 'post_expo',
    label: 'Post Expo Reporting',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19h16"/><rect x="6" y="3" width="12" height="14" rx="2"/><path d="M9 7h6"/><path d="M9 11h6"/></svg>,
  },
  {
    id: 'integrated_dashboard',
    label: 'Integrated Dashboard',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 15l3-3 3 2 4-4"/></svg>,
  },
  {
    id: 'kpi_dashboard',
    label: 'KPI Dashboard',
    roles: ['admin'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19h16"/><path d="M7 16V9"/><path d="M12 16V5"/><path d="M17 16v-3"/></svg>,
  },
  {
    id: 'cctv',
    label: 'CCTV Monitoring',
    roles: ['admin', 'security_officer'],
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="8" width="14" height="8" rx="2"/><path d="M17 12h4l2 2v2h-6"/></svg>,
  },
]

export const allowedModulesForRole = (role: UserRole): Module[] =>
  navItems
    .filter(item => item.roles === 'all' || item.roles.includes(role))
    .map(item => item.id)

interface Props {
  user: User
  activeModule: Module
  onNavigate: (module: Module) => void
  onLogout: () => void
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ user, activeModule, onNavigate, onLogout, isOpen }: Props) {
  const visibleItems = navItems.filter(item =>
    item.roles === 'all' || item.roles.includes(user.role)
  )

  return (
    <aside
      className={`${isOpen ? 'w-60' : 'w-0 overflow-hidden'} transition-all duration-200 bg-sidebar flex flex-col shrink-0`}
    >
      {/* Logo */}
      <div className="px-4 py-4 border-b border-sidebar-border flex items-center gap-3">
        <img src="https://ideaspakistan.gov.pk/static/images/IDEAS.png" alt="IDEAS" className="h-8 object-contain" crossOrigin="anonymous" />
        <div>
          <p className="text-sidebar-foreground font-bold text-sm leading-tight">IDEAS 2026</p>
          <p className="text-sidebar-foreground/50 text-xs">DEPO Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <p className="text-sidebar-foreground/40 text-xs font-semibold uppercase tracking-wider px-2 mb-2">Navigation</p>
        {visibleItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors mb-0.5 ${
              activeModule === item.id
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
            }`}
          >
            <span className={activeModule === item.id ? 'text-sidebar-primary' : ''}>{item.icon}</span>
            <span className="truncate">{item.label}</span>
            {activeModule === item.id && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
            )}
          </button>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-xs font-bold shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sidebar-foreground text-xs font-semibold truncate">{user.name}</p>
            <p className="text-sidebar-foreground/50 text-xs capitalize truncate">{user.role.replace(/_/g, ' ')}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground flex items-center gap-2 px-2 py-1.5 rounded hover:bg-sidebar-accent/50 transition-colors"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  )
}
