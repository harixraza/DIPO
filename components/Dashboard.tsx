'use client'

import { useState } from 'react'
import type { User } from '@/lib/store'
import Sidebar, { allowedModulesForRole } from './Sidebar'
import AdminDashboard from '@/components/modules/AdminDashboard'
import UserManagement from '@/components/modules/UserManagement'
import EventManagement from '@/components/modules/EventManagement'
import BadgePrinting from '@/components/modules/BadgePrinting'
import VehicleParking from '@/components/modules/VehicleParking'
import DelegationHandling from '@/components/modules/DelegationHandling'
import AttendanceTracking from '@/components/modules/AttendanceTracking'
import CmsModule from '@/components/modules/CmsModule'
import ApiMonitor from '@/components/modules/ApiMonitor'
import BiometricSystem from '@/components/modules/BiometricSystem'
import CyberSecurity from '@/components/modules/CyberSecurity'
import ExhibitorFloor from '@/components/modules/ExhibitorFloor'
import RegistrationManagement from '@/components/modules/RegistrationManagement'
import AutoEmailModule from '@/components/modules/AutoEmailModule'
import StallBuilder from '@/components/modules/StallBuilder'
import AiChatbot from '@/components/modules/AiChatbot'
import LogisticsManagement from '@/components/modules/LogisticsManagement'
import MediaManagement from '@/components/modules/MediaManagement'
import SecurityIncident from '@/components/modules/SecurityIncident'
import PassManagement from '@/components/modules/PassManagement'
import IncidentManagement from '@/components/modules/IncidentManagement'
import CommunicationLog from '@/components/modules/CommunicationLog'
import EmergencyResponse from '@/components/modules/EmergencyResponse'
import SocialMediaMonitoring from '@/components/modules/SocialMediaMonitoring'
import MeetingsMou from '@/components/modules/MeetingsMou'
import AndroidApp from '@/components/modules/AndroidApp'
import IosApp from '@/components/modules/IosApp'
import HarmonyApp from '@/components/modules/HarmonyApp'
import WhatsAppModule from '@/components/modules/WhatsAppModule'
import WeChatModule from '@/components/modules/WeChatModule'
import PostExpoReporting from '@/components/modules/PostExpoReporting'
import IntegratedModulesDashboard from '@/components/modules/IntegratedModulesDashboard'
import KpiDashboard from '@/components/modules/KpiDashboard'
import CctvSurveillance from '@/components/modules/CctvSurveillance'

export type Module =
  | 'dashboard'
  | 'users'
  | 'events'
  | 'badges'
  | 'vehicles'
  | 'delegations'
  | 'attendance'
  | 'cms'
  | 'api'
  | 'biometric'
  | 'cyber'
  | 'exhibitor_floor'
  | 'registration'
  | 'auto_email'
  | 'stall_builder'
  | 'ai_chatbot'
  | 'logistics'
  | 'media'
  | 'security_incident'
  | 'pass_management'
  | 'incident_management'
  | 'communication_log'
  | 'emergency_response'
  | 'social_monitoring'
  | 'meetings_mou'
  | 'mobile_android'
  | 'mobile_ios'
  | 'mobile_harmony'
  | 'whatsapp'
  | 'wechat'
  | 'post_expo'
  | 'integrated_dashboard'
  | 'kpi_dashboard'
  | 'cctv'

interface Props {
  user: User
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: Props) {
  const allowedModules = allowedModulesForRole(user.role)
  const [activeModule, setActiveModule] = useState<Module>(allowedModules[0] || 'dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const safeNavigate = (module: Module) => {
    if (allowedModules.includes(module)) {
      setActiveModule(module)
    } else {
      setActiveModule(allowedModules[0] || 'dashboard')
    }
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <AdminDashboard user={user} onNavigate={safeNavigate} />
      case 'users': return <UserManagement user={user} />
      case 'events': return <EventManagement user={user} />
      case 'badges': return <BadgePrinting user={user} />
      case 'vehicles': return <VehicleParking user={user} />
      case 'delegations': return <DelegationHandling user={user} />
      case 'attendance': return <AttendanceTracking user={user} />
      case 'cms': return <CmsModule user={user} />
      case 'api': return <ApiMonitor user={user} />
      case 'biometric': return <BiometricSystem user={user} />
      case 'cyber': return <CyberSecurity user={user} />
      case 'exhibitor_floor': return <ExhibitorFloor user={user} />
      case 'registration': return <RegistrationManagement user={user} />
      case 'auto_email': return <AutoEmailModule user={user} />
      case 'stall_builder': return <StallBuilder user={user} />
      case 'ai_chatbot': return <AiChatbot user={user} />
      case 'logistics': return <LogisticsManagement user={user} />
      case 'media': return <MediaManagement user={user} />
      case 'security_incident': return <SecurityIncident user={user} />
      case 'pass_management': return <PassManagement user={user} />
      case 'incident_management': return <IncidentManagement user={user} />
      case 'communication_log': return <CommunicationLog user={user} />
      case 'emergency_response': return <EmergencyResponse user={user} />
      case 'social_monitoring': return <SocialMediaMonitoring user={user} />
      case 'meetings_mou': return <MeetingsMou user={user} />
      case 'mobile_android': return <AndroidApp user={user} />
      case 'mobile_ios': return <IosApp user={user} />
      case 'mobile_harmony': return <HarmonyApp user={user} />
      case 'whatsapp': return <WhatsAppModule user={user} />
      case 'wechat': return <WeChatModule user={user} />
      case 'post_expo': return <PostExpoReporting user={user} />
      case 'integrated_dashboard': return <IntegratedModulesDashboard user={user} />
      case 'kpi_dashboard': return <KpiDashboard user={user} />
      case 'cctv': return <CctvSurveillance user={user} />
      default: return <AdminDashboard user={user} onNavigate={safeNavigate} />
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        user={user}
        activeModule={activeModule}
        onNavigate={safeNavigate}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div>
              <h2 className="text-sm font-semibold text-foreground capitalize">{activeModule === 'dashboard' ? 'Master Dashboard' : activeModule.replace(/_/g, ' ')}</h2>
              <p className="text-xs text-muted-foreground">IDEAS 2026 - DEPO Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role.replace(/_/g, ' ')}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {renderModule()}
        </main>
      </div>
    </div>
  )
}
