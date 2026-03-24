// lib/store.ts - localStorage based data store with seed data

export type UserRole = 'admin' | 'event_manager' | 'badge_officer' | 'parking_officer' | 'delegation_officer' | 'security_officer' | 'cms_editor' | 'attendee' | 'exhibitor' | 'vip'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  status: 'active' | 'suspended' | 'pending'
  organization?: string
  country?: string
  phone?: string
  createdAt: string
  lastLogin?: string
  badgeId?: string
}

export interface Event {
  id: string
  type: 'gala' | 'triservices' | 'golf' | 'seminar'
  title: string
  date: string
  venue: string
  capacity: number
  registered: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  description: string
}

export interface BadgeRecord {
  id: string
  userId: string
  userName: string
  category: 'VVIP' | 'VIP' | 'Exhibitor' | 'Visitor' | 'Media' | 'Security' | 'Staff'
  badgeCode: string
  status: 'printed' | 'pending' | 'lost' | 'blacklisted'
  printedAt?: string
  zoneAccess: string[]
}

export interface Vehicle {
  id: string
  registrationNo: string
  ownerName: string
  ownerCategory: 'VVIP' | 'VIP' | 'Exhibitor' | 'Visitor' | 'Staff'
  vehicleType: 'Car' | 'SUV' | 'Motorcycle' | 'Bus' | 'Truck'
  parkingZone?: string
  entryTime?: string
  exitTime?: string
  status: 'inside' | 'exited' | 'registered' | 'violation'
  passNo: string
}

export interface Delegation {
  id: string
  country: string
  delegationHead: string
  members: number
  arrivalDate: string
  departureDate: string
  hotel: string
  protocol: string
  status: 'confirmed' | 'pending' | 'arrived' | 'departed'
  category: 'Military' | 'Civilian' | 'Commercial' | 'Diplomatic'
}

export interface AttendanceRecord {
  id: string
  userId: string
  userName: string
  badgeCode: string
  zone: string
  entryTime: string
  exitTime?: string
  method: 'biometric' | 'badge_scan' | 'manual'
}

export type ShipmentMode = 'air' | 'sea' | 'road'
export type ShipmentStatus = 'in_transit' | 'customs' | 'arrived' | 'delivered' | 'hold'

export interface Shipment {
  id: string
  ref: string
  mode: ShipmentMode
  origin: string
  destination: string
  vendor: string
  contact: string
  status: ShipmentStatus
  eta: string
  pallets: number
  priority: 'normal' | 'high'
  lastUpdate: string
}

export interface WarehouseZone {
  id: string
  name: string
  capacity: number
  used: number
  tempControl?: boolean
}

export interface PickupTask {
  id: string
  exhibitor: string
  location: string
  window: string
  status: 'scheduled' | 'en_route' | 'complete' | 'cancelled'
  driver: string
  contact: string
  ref: string
}

const SEED_USERS: User[] = [
  { id: 'u1', name: 'Brig (R) Khalid Mehmood', email: 'admin@depo.gov.pk', password: 'admin123', role: 'admin', status: 'active', organization: 'DEPO HQ', country: 'Pakistan', phone: '+92-51-9262017', createdAt: '2026-01-01', lastLogin: '2026-03-19', badgeId: 'B-ADMIN-001' },
  { id: 'u2', name: 'Col Asim Nawaz', email: 'events@depo.gov.pk', password: 'events123', role: 'event_manager', status: 'active', organization: 'DEPO Events', country: 'Pakistan', phone: '+92-51-9262018', createdAt: '2026-01-05', lastLogin: '2026-03-18', badgeId: 'B-EVT-002' },
  { id: 'u3', name: 'Maj Tariq Hassan', email: 'badges@depo.gov.pk', password: 'badge123', role: 'badge_officer', status: 'active', organization: 'DEPO Security', country: 'Pakistan', phone: '+92-51-9262019', createdAt: '2026-01-05', badgeId: 'B-BAD-003' },
  { id: 'u4', name: 'Cpt Bilal Ahmed', email: 'parking@depo.gov.pk', password: 'park123', role: 'parking_officer', status: 'active', organization: 'DEPO Logistics', country: 'Pakistan', phone: '+92-51-9262020', createdAt: '2026-01-06', badgeId: 'B-PRK-004' },
  { id: 'u5', name: 'Mr. Saleem Akhtar', email: 'delegation@depo.gov.pk', password: 'deleg123', role: 'delegation_officer', status: 'active', organization: 'DEPO Protocol', country: 'Pakistan', phone: '+92-51-9262021', createdAt: '2026-01-06', badgeId: 'B-DEL-005' },
  { id: 'u6', name: 'Maj Gen (R) Farrukh Ali', email: 'vip001@ideas2026.pk', password: 'vip123', role: 'vip', status: 'active', organization: 'Ministry of Defence', country: 'Pakistan', phone: '+92-51-9000001', createdAt: '2026-02-01', badgeId: 'B-VIP-101' },
  { id: 'u7', name: 'Dr. Ahmed Al-Rashid', email: 'ksa.delegation@ideas2026.pk', password: 'ksa123', role: 'attendee', status: 'active', organization: 'Saudi Arabian Military Industries', country: 'Saudi Arabia', phone: '+966-11-0001', createdAt: '2026-02-15', badgeId: 'B-VIS-201' },
  { id: 'u8', name: 'Mr. James Thornton', email: 'uk.exhibitor@ideas2026.pk', password: 'uk123', role: 'exhibitor', status: 'active', organization: 'BAE Systems', country: 'United Kingdom', phone: '+44-1619000', createdAt: '2026-02-20', badgeId: 'B-EXH-301' },
  { id: 'u9', name: 'Lt Col Wang Wei', email: 'china.deleg@ideas2026.pk', password: 'china123', role: 'attendee', status: 'active', organization: 'NORINCO', country: 'China', phone: '+86-1090000', createdAt: '2026-03-01', badgeId: 'B-MIL-401' },
  { id: 'u10', name: 'Ms. Sarah Klein', email: 'media@ideas2026.pk', password: 'media123', role: 'cms_editor', status: 'active', organization: 'Dawn News', country: 'Pakistan', phone: '+92-21-0001', createdAt: '2026-03-05', badgeId: 'B-MED-501' },
  { id: 'u11', name: 'Havildar Raza Khan', email: 'security@depo.gov.pk', password: 'sec123', role: 'security_officer', status: 'active', organization: 'DEPO Security', country: 'Pakistan', phone: '+92-51-9262022', createdAt: '2026-01-10', badgeId: 'B-SEC-601' },
  { id: 'u12', name: 'Mr. Tariq Mehmood', email: 'exhibitor2@ideas2026.pk', password: 'exh123', role: 'exhibitor', status: 'active', organization: 'POF - Pakistan Ordnance Factories', country: 'Pakistan', phone: '+92-51-9100001', createdAt: '2026-02-25', badgeId: 'B-EXH-302' },
]

const SEED_EVENTS: Event[] = [
  { id: 'e1', type: 'gala', title: 'IDEAS 2026 Gala Dinner', date: '2026-11-19', venue: 'Marriott Hotel Islamabad', capacity: 500, registered: 387, status: 'upcoming', description: 'Annual Gala Dinner for VVIPs, diplomats and defence industry leaders.' },
  { id: 'e2', type: 'triservices', title: 'Tri-Services Display Show', date: '2026-11-20', venue: 'Parade Ground, Islamabad', capacity: 5000, registered: 4215, status: 'upcoming', description: 'Joint military capability demonstration by Army, Navy and Air Force.' },
  { id: 'e3', type: 'golf', title: 'IDEAS Executive Golf Tournament', date: '2026-11-18', venue: 'Rawalpindi Golf Club', capacity: 80, registered: 62, status: 'upcoming', description: 'Executive golf tournament for senior military and industry officials.' },
  { id: 'e4', type: 'seminar', title: 'IDEAS 2026 International Seminar', date: '2026-11-21', venue: 'Convention Centre Islamabad', capacity: 1200, registered: 934, status: 'upcoming', description: 'High-level seminar on regional security, defence cooperation and technology.' },
]

const SEED_BADGES: BadgeRecord[] = [
  { id: 'b1', userId: 'u6', userName: 'Maj Gen (R) Farrukh Ali', category: 'VVIP', badgeCode: 'VVIP-2026-0001', status: 'printed', printedAt: '2026-11-15', zoneAccess: ['Zone-A', 'Zone-B', 'Zone-C', 'VIP-Lounge', 'All-Areas'] },
  { id: 'b2', userId: 'u7', userName: 'Dr. Ahmed Al-Rashid', category: 'VIP', badgeCode: 'VIP-2026-0201', status: 'printed', printedAt: '2026-11-15', zoneAccess: ['Zone-A', 'Zone-B', 'VIP-Lounge'] },
  { id: 'b3', userId: 'u8', userName: 'Mr. James Thornton', category: 'Exhibitor', badgeCode: 'EXH-2026-0301', status: 'printed', printedAt: '2026-11-14', zoneAccess: ['Zone-B', 'Zone-C', 'Exhibition-Hall'] },
  { id: 'b4', userId: 'u9', userName: 'Lt Col Wang Wei', category: 'Visitor', badgeCode: 'VIS-2026-0401', status: 'pending', zoneAccess: ['Zone-B', 'Exhibition-Hall'] },
  { id: 'b5', userId: 'u10', userName: 'Ms. Sarah Klein', category: 'Media', badgeCode: 'MED-2026-0501', status: 'printed', printedAt: '2026-11-16', zoneAccess: ['Zone-A', 'Zone-B', 'Press-Area'] },
  { id: 'b6', userId: 'u12', userName: 'Mr. Tariq Mehmood', category: 'Exhibitor', badgeCode: 'EXH-2026-0302', status: 'printed', printedAt: '2026-11-14', zoneAccess: ['Zone-B', 'Zone-C', 'Exhibition-Hall'] },
]

const SEED_VEHICLES: Vehicle[] = [
  { id: 'v1', registrationNo: 'ISD-001', ownerName: 'Maj Gen (R) Farrukh Ali', ownerCategory: 'VVIP', vehicleType: 'SUV', parkingZone: 'P-VVIP', entryTime: '2026-11-20 08:15', status: 'inside', passNo: 'VP-VVIP-001' },
  { id: 'v2', registrationNo: 'LEA-4521', ownerName: 'Dr. Ahmed Al-Rashid', ownerCategory: 'VIP', vehicleType: 'Car', parkingZone: 'P-VIP', entryTime: '2026-11-20 09:30', status: 'inside', passNo: 'VP-VIP-201' },
  { id: 'v3', registrationNo: 'ISB-8823', ownerName: 'Mr. James Thornton', ownerCategory: 'Exhibitor', vehicleType: 'SUV', parkingZone: 'P-EXH', entryTime: '2026-11-20 07:00', exitTime: '2026-11-20 19:00', status: 'exited', passNo: 'VP-EXH-301' },
  { id: 'v4', registrationNo: 'RWP-3344', ownerName: 'Unknown Vehicle', ownerCategory: 'Visitor', vehicleType: 'Car', status: 'violation', passNo: 'VP-VIS-000' },
  { id: 'v5', registrationNo: 'ISB-0099', ownerName: 'Ms. Sarah Klein', ownerCategory: 'Staff', vehicleType: 'Car', parkingZone: 'P-STAFF', entryTime: '2026-11-20 08:45', status: 'inside', passNo: 'VP-STF-501' },
  { id: 'v6', registrationNo: 'RWP-7712', ownerName: 'Col Asim Nawaz', ownerCategory: 'Staff', vehicleType: 'Car', parkingZone: 'P-STAFF', entryTime: '2026-11-20 07:30', status: 'inside', passNo: 'VP-STF-502' },
]

const SEED_DELEGATIONS: Delegation[] = [
  { id: 'd1', country: 'Saudi Arabia', delegationHead: 'Lt Gen Abdullah Al-Harbi', members: 12, arrivalDate: '2026-11-18', departureDate: '2026-11-23', hotel: 'Serena Hotel', protocol: 'Military', status: 'confirmed', category: 'Military' },
  { id: 'd2', country: 'China', delegationHead: 'Gen Li Wei', members: 20, arrivalDate: '2026-11-17', departureDate: '2026-11-22', hotel: 'Marriott Hotel', protocol: 'State', status: 'arrived', category: 'Military' },
  { id: 'd3', country: 'United Kingdom', delegationHead: 'Air Cdre James Morrison', members: 8, arrivalDate: '2026-11-19', departureDate: '2026-11-21', hotel: 'PC Hotel', protocol: 'Normal', status: 'confirmed', category: 'Military' },
  { id: 'd4', country: 'Turkey', delegationHead: 'Dr. Mehmet Yilmaz', members: 6, arrivalDate: '2026-11-18', departureDate: '2026-11-22', hotel: 'Islamabad Hotel', protocol: 'Diplomatic', status: 'confirmed', category: 'Diplomatic' },
  { id: 'd5', country: 'UAE', delegationHead: 'Brig Khalfan Al-Mazrouei', members: 15, arrivalDate: '2026-11-17', departureDate: '2026-11-23', hotel: 'Serena Hotel', protocol: 'Military', status: 'arrived', category: 'Military' },
  { id: 'd6', country: 'Germany', delegationHead: 'Ms. Helga Braun', members: 5, arrivalDate: '2026-11-19', departureDate: '2026-11-21', hotel: 'Ramada Hotel', protocol: 'Normal', status: 'pending', category: 'Commercial' },
  { id: 'd7', country: 'Jordan', delegationHead: 'Col Omar Al-Khalidi', members: 4, arrivalDate: '2026-11-20', departureDate: '2026-11-21', hotel: 'Envoy Hotel', protocol: 'Military', status: 'pending', category: 'Military' },
  { id: 'd8', country: 'Egypt', delegationHead: 'Air Marshal Hossam Said', members: 7, arrivalDate: '2026-11-18', departureDate: '2026-11-22', hotel: 'Marriott Hotel', protocol: 'Military', status: 'arrived', category: 'Military' },
]

const SEED_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', userId: 'u6', userName: 'Maj Gen (R) Farrukh Ali', badgeCode: 'VVIP-2026-0001', zone: 'Main Entrance', entryTime: '2026-11-20 08:20', method: 'biometric' },
  { id: 'a2', userId: 'u7', userName: 'Dr. Ahmed Al-Rashid', badgeCode: 'VIP-2026-0201', zone: 'Main Entrance', entryTime: '2026-11-20 09:35', method: 'badge_scan' },
  { id: 'a3', userId: 'u8', userName: 'Mr. James Thornton', badgeCode: 'EXH-2026-0301', zone: 'Exhibition Hall', entryTime: '2026-11-20 07:15', exitTime: '2026-11-20 18:45', method: 'badge_scan' },
  { id: 'a4', userId: 'u10', userName: 'Ms. Sarah Klein', badgeCode: 'MED-2026-0501', zone: 'Press Area', entryTime: '2026-11-20 09:00', method: 'badge_scan' },
  { id: 'a5', userId: 'u12', userName: 'Mr. Tariq Mehmood', badgeCode: 'EXH-2026-0302', zone: 'Exhibition Hall', entryTime: '2026-11-20 07:30', method: 'badge_scan' },
  { id: 'a6', userId: 'u9', userName: 'Lt Col Wang Wei', badgeCode: 'VIS-2026-0401', zone: 'VIP Lounge', entryTime: '2026-11-20 10:00', method: 'biometric' },
]

const SEED_SHIPMENTS: Shipment[] = [
  { id: 's1', ref: 'SEA-2278', mode: 'sea', origin: 'Shanghai', destination: 'Karachi Port', vendor: 'Maersk', contact: '+86-21-5555', status: 'customs', eta: '2026-03-21', pallets: 42, priority: 'high', lastUpdate: '2026-03-19 08:30' },
  { id: 's2', ref: 'AIR-441', mode: 'air', origin: 'Dubai', destination: 'Islamabad', vendor: 'Emirates SkyCargo', contact: '+971-4-0000', status: 'arrived', eta: '2026-03-19', pallets: 12, priority: 'normal', lastUpdate: '2026-03-19 07:10' },
  { id: 's3', ref: 'TRK-019', mode: 'road', origin: 'Karachi Expo', destination: 'Hall D', vendor: 'TCS Logistics', contact: '+92-21-111111', status: 'in_transit', eta: '2026-03-19', pallets: 8, priority: 'normal', lastUpdate: '2026-03-19 09:05' },
  { id: 's4', ref: 'SEA-2304', mode: 'sea', origin: 'Istanbul', destination: 'Port Qasim', vendor: 'MSC', contact: '+90-212-000', status: 'hold', eta: '2026-03-22', pallets: 30, priority: 'high', lastUpdate: '2026-03-18 18:10' },
]

const SEED_WAREHOUSE_ZONES: WarehouseZone[] = [
  { id: 'w1', name: 'Zone A - Cold', capacity: 80, used: 56, tempControl: true },
  { id: 'w2', name: 'Zone B - General', capacity: 120, used: 104 },
  { id: 'w3', name: 'Zone C - Oversized', capacity: 40, used: 18 },
]

const SEED_PICKUPS: PickupTask[] = [
  { id: 'p1', exhibitor: 'BAE Systems', location: 'Hall B Dock 2', window: '14:00-15:00', status: 'scheduled', driver: 'Aslam', contact: '+92-333-1234567', ref: 'AIR-441' },
  { id: 'p2', exhibitor: 'NORINCO', location: 'Hall C Dock 1', window: '15:00-16:00', status: 'en_route', driver: 'Imran', contact: '+92-333-2223344', ref: 'SEA-2278' },
  { id: 'p3', exhibitor: 'POF', location: 'Hall D Dock 3', window: '16:30-17:00', status: 'scheduled', driver: 'Bilal', contact: '+92-333-9876543', ref: 'TRK-019' },
]

export function initStore() {
  if (typeof window === 'undefined') return
  if (!localStorage.getItem('ideas_initialized')) {
    localStorage.setItem('ideas_users', JSON.stringify(SEED_USERS))
    localStorage.setItem('ideas_events', JSON.stringify(SEED_EVENTS))
    localStorage.setItem('ideas_badges', JSON.stringify(SEED_BADGES))
    localStorage.setItem('ideas_vehicles', JSON.stringify(SEED_VEHICLES))
    localStorage.setItem('ideas_delegations', JSON.stringify(SEED_DELEGATIONS))
    localStorage.setItem('ideas_attendance', JSON.stringify(SEED_ATTENDANCE))
    localStorage.setItem('ideas_shipments', JSON.stringify(SEED_SHIPMENTS))
    localStorage.setItem('ideas_warehouse_zones', JSON.stringify(SEED_WAREHOUSE_ZONES))
    localStorage.setItem('ideas_pickups', JSON.stringify(SEED_PICKUPS))
    localStorage.setItem('ideas_initialized', 'true')
  }
}

export function login(email: string, password: string): User | null {
  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  if (user) {
    const updated = { ...user, lastLogin: new Date().toISOString().split('T')[0] }
    updateUser(updated)
    localStorage.setItem('ideas_current_user', JSON.stringify(updated))
    return updated
  }
  return null
}

export function logout() {
  localStorage.removeItem('ideas_current_user')
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem('ideas_current_user')
  return data ? JSON.parse(data) : null
}

export function getUsers(): User[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('ideas_users')
  return data ? JSON.parse(data) : []
}

export function updateUser(user: User) {
  const users = getUsers()
  const idx = users.findIndex(u => u.id === user.id)
  if (idx >= 0) users[idx] = user
  else users.push(user)
  localStorage.setItem('ideas_users', JSON.stringify(users))
}

export function deleteUser(id: string) {
  const users = getUsers().filter(u => u.id !== id)
  localStorage.setItem('ideas_users', JSON.stringify(users))
}

export function addUser(user: Omit<User, 'id'>): User {
  const users = getUsers()
  const newUser = { ...user, id: 'u' + Date.now() }
  users.push(newUser)
  localStorage.setItem('ideas_users', JSON.stringify(users))
  return newUser
}

export function getEvents(): Event[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('ideas_events')
  return data ? JSON.parse(data) : []
}

export function updateEvent(event: Event) {
  const events = getEvents()
  const idx = events.findIndex(e => e.id === event.id)
  if (idx >= 0) events[idx] = event
  else events.push(event)
  localStorage.setItem('ideas_events', JSON.stringify(events))
}

export function addEvent(event: Omit<Event, 'id'>): Event {
  const events = getEvents()
  const newEvent = { ...event, id: 'e' + Date.now() }
  events.push(newEvent)
  localStorage.setItem('ideas_events', JSON.stringify(events))
  return newEvent
}

export function getBadges(): BadgeRecord[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('ideas_badges')
  return data ? JSON.parse(data) : []
}

export function updateBadge(badge: BadgeRecord) {
  const badges = getBadges()
  const idx = badges.findIndex(b => b.id === badge.id)
  if (idx >= 0) badges[idx] = badge
  else badges.push(badge)
  localStorage.setItem('ideas_badges', JSON.stringify(badges))
}

export function addBadge(badge: Omit<BadgeRecord, 'id'>): BadgeRecord {
  const badges = getBadges()
  const newBadge = { ...badge, id: 'b' + Date.now() }
  badges.push(newBadge)
  localStorage.setItem('ideas_badges', JSON.stringify(badges))
  return newBadge
}

export function getVehicles(): Vehicle[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('ideas_vehicles')
  return data ? JSON.parse(data) : []
}

export function updateVehicle(vehicle: Vehicle) {
  const vehicles = getVehicles()
  const idx = vehicles.findIndex(v => v.id === vehicle.id)
  if (idx >= 0) vehicles[idx] = vehicle
  else vehicles.push(vehicle)
  localStorage.setItem('ideas_vehicles', JSON.stringify(vehicles))
}

export function addVehicle(vehicle: Omit<Vehicle, 'id'>): Vehicle {
  const vehicles = getVehicles()
  const newV = { ...vehicle, id: 'v' + Date.now() }
  vehicles.push(newV)
  localStorage.setItem('ideas_vehicles', JSON.stringify(vehicles))
  return newV
}

export function getDelegations(): Delegation[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('ideas_delegations')
  return data ? JSON.parse(data) : []
}

export function updateDelegation(d: Delegation) {
  const delegations = getDelegations()
  const idx = delegations.findIndex(x => x.id === d.id)
  if (idx >= 0) delegations[idx] = d
  else delegations.push(d)
  localStorage.setItem('ideas_delegations', JSON.stringify(delegations))
}

export function addDelegation(d: Omit<Delegation, 'id'>): Delegation {
  const delegations = getDelegations()
  const newD = { ...d, id: 'd' + Date.now() }
  delegations.push(newD)
  localStorage.setItem('ideas_delegations', JSON.stringify(delegations))
  return newD
}

export function getAttendance(): AttendanceRecord[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('ideas_attendance')
  return data ? JSON.parse(data) : []
}

export function addAttendance(a: Omit<AttendanceRecord, 'id'>): AttendanceRecord {
  const records = getAttendance()
  const newA = { ...a, id: 'a' + Date.now() }
  records.push(newA)
  localStorage.setItem('ideas_attendance', JSON.stringify(records))
  return newA
}

export function getShipments(): Shipment[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('ideas_shipments')
  return data ? JSON.parse(data) : []
}

export function updateShipment(shipment: Shipment) {
  const items = getShipments()
  const idx = items.findIndex(s => s.id === shipment.id)
  if (idx >= 0) items[idx] = shipment
  else items.push(shipment)
  localStorage.setItem('ideas_shipments', JSON.stringify(items))
}

export function addShipment(shipment: Omit<Shipment, 'id' | 'lastUpdate'>): Shipment {
  const items = getShipments()
  const now = new Date().toISOString().slice(0, 16).replace('T', ' ')
  const newS: Shipment = { ...shipment, id: 's' + Date.now(), lastUpdate: now }
  items.push(newS)
  localStorage.setItem('ideas_shipments', JSON.stringify(items))
  return newS
}

export function getWarehouseZones(): WarehouseZone[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('ideas_warehouse_zones')
  return data ? JSON.parse(data) : []
}

export function updateWarehouseZone(zone: WarehouseZone) {
  const zones = getWarehouseZones()
  const idx = zones.findIndex(z => z.id === zone.id)
  if (idx >= 0) zones[idx] = zone
  else zones.push(zone)
  localStorage.setItem('ideas_warehouse_zones', JSON.stringify(zones))
}

export function getPickups(): PickupTask[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('ideas_pickups')
  return data ? JSON.parse(data) : []
}

export function updatePickup(task: PickupTask) {
  const tasks = getPickups()
  const idx = tasks.findIndex(t => t.id === task.id)
  if (idx >= 0) tasks[idx] = task
  else tasks.push(task)
  localStorage.setItem('ideas_pickups', JSON.stringify(tasks))
}

export function addPickup(task: Omit<PickupTask, 'id'>): PickupTask {
  const tasks = getPickups()
  const newT = { ...task, id: 'p' + Date.now() }
  tasks.push(newT)
  localStorage.setItem('ideas_pickups', JSON.stringify(tasks))
  return newT
}
