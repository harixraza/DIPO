'use client'

import { useState, useEffect } from 'react'
import { getEvents, updateEvent, type Event, type User } from '@/lib/store'

const typeIcon = (type: Event['type']) => ({
  gala: '🥂', triservices: '⭐', golf: '⛳', seminar: '🎓'
}[type] || '📅')

const typeColor = (type: Event['type']) => ({
  gala: 'bg-amber-100 text-amber-800 border-amber-300',
  triservices: 'bg-primary/10 text-primary border-primary/30',
  golf: 'bg-green-100 text-green-800 border-green-300',
  seminar: 'bg-purple-100 text-purple-800 border-purple-300',
}[type])

const statusColor = (s: Event['status']) => ({
  upcoming: 'bg-blue-100 text-blue-700',
  ongoing: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-700',
}[s])

// Hardcoded tab data for each event type
const galaData = {
  tables: [
    { no: 'T-01', seats: 10, assigned: 10, category: 'VVIP', guests: ['CAS, PAF', 'CNS, PN', 'CJCSC', 'DG ISPR', 'Min Defence', 'Ambassador USA', 'Ambassador China', 'Ambassador KSA', 'DG DEPO', 'DG IDEAS'] },
    { no: 'T-02', seats: 10, assigned: 8, category: 'VIP', guests: ['Gen Li Wei - China', 'Lt Gen Al-Harbi - KSA', 'Air Cdre Morrison - UK', 'Brig Al-Mazrouei - UAE', 'Air Marshal Said - Egypt', 'Col Al-Khalidi - Jordan', 'Dr. Yilmaz - Turkey', 'Ms. Klein - Media'] },
    { no: 'T-03', seats: 8, assigned: 6, category: 'Exhibitor', guests: ['BAE Systems', 'NORINCO', 'POF', 'NESCOM', 'KFTR', 'OPF'] },
    { no: 'T-04', seats: 8, assigned: 5, category: 'Industry', guests: ['DRD Group', 'Saab AB', 'MBDA', 'Rheinmetall', 'OTOKAR'] },
  ],
  menu: ['Appetizers: Assorted starters', 'Soup: Shorba Gosht', 'Main: Dum Biryani, Grilled Items', 'Dessert: Gulab Jamun, Ice Cream'],
}

const triServicesData = {
  zones: [
    { name: 'VIP Enclosure', capacity: 200, assigned: 187, clearance: 'Top Secret' },
    { name: 'Diplomatic Box', capacity: 150, assigned: 140, clearance: 'Confidential' },
    { name: 'Media Pit', capacity: 80, assigned: 62, clearance: 'Restricted' },
    { name: 'General Stand A', capacity: 2000, assigned: 1845, clearance: 'General' },
    { name: 'General Stand B', capacity: 2000, assigned: 1981, clearance: 'General' },
  ],
  schedule: [
    { time: '09:00', event: 'VIP Arrival & Welcome', duration: '30 min' },
    { time: '09:30', event: 'Guard of Honour - Army', duration: '15 min' },
    { time: '09:45', event: 'Naval Display & March Past', duration: '20 min' },
    { time: '10:05', event: 'Air Force Flypast', duration: '25 min' },
    { time: '10:30', event: 'Combined Arms Demo', duration: '45 min' },
    { time: '11:15', event: 'Closing Ceremony', duration: '30 min' },
  ],
}

const golfData = {
  players: [
    { name: 'Lt Gen Ahmad Shah', org: 'GHQ', handicap: 12, round1: 72, round2: 69, total: 141 },
    { name: 'Air Cdre Morrison', org: 'RAF UK', handicap: 8, round1: 70, round2: 72, total: 142 },
    { name: 'Brig Al-Mazrouei', org: 'UAE AF', handicap: 15, round1: 75, round2: 71, total: 146 },
    { name: 'Mr. CEO DRD Group', org: 'DRD Group', handicap: 18, round1: 78, round2: 73, total: 151 },
    { name: 'Col Wang Wei', org: 'PLA China', handicap: 10, round1: 71, round2: 75, total: 146 },
  ],
}

const seminarData = {
  sessions: [
    { time: '09:00', title: 'Opening Keynote: Regional Security Architecture', speaker: 'DG ISPR', hall: 'Main Hall', attendees: 420 },
    { time: '10:30', title: 'Defence Industry Collaboration: Opportunities', speaker: 'DG DEPO', hall: 'Main Hall', attendees: 380 },
    { time: '12:00', title: 'Cyber Warfare & Modern Defence', speaker: 'Gen (R) Asad', hall: 'Hall B', attendees: 210 },
    { time: '14:00', title: 'Unmanned Systems: Future Battlefield', speaker: 'Dr. Al-Rashid', hall: 'Hall B', attendees: 195 },
    { time: '15:30', title: 'Panel: Export Control & Defence Exports', speaker: 'Multiple', hall: 'Main Hall', attendees: 340 },
  ],
  speakers: [
    { name: 'Gen (R) Asad Khan', topic: 'Cyber Warfare', org: 'JSHQ', status: 'confirmed' },
    { name: 'Dr. Ahmed Al-Rashid', topic: 'UAS Technology', org: 'SAMI', status: 'confirmed' },
    { name: 'Air Cdre Morrison', topic: 'NATO Standards', org: 'RAF', status: 'confirmed' },
    { name: 'Col Wang Wei', topic: 'A2AD Strategy', org: 'PLA', status: 'pending' },
  ],
}

export default function EventManagement({ user }: { user: User }) {
  const [events, setEvents] = useState<Event[]>([])
  const [activeEvent, setActiveEvent] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => { setEvents(getEvents()) }, [])

  const selectedEvent = events.find(e => e.id === activeEvent)

  const handleStatusChange = (event: Event, status: Event['status']) => {
    const updated = { ...event, status }
    updateEvent(updated)
    setEvents(getEvents())
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">Event Management</h2>
        <p className="text-sm text-muted-foreground">Manage all IDEAS 2026 events</p>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map(event => (
          <button
            key={event.id}
            onClick={() => { setActiveEvent(event.id); setActiveTab('overview') }}
            className={`bg-card border rounded-lg p-4 text-left transition-all hover:shadow-md ${activeEvent === event.id ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs border capitalize ${typeColor(event.type)}`}>{event.type === 'triservices' ? 'Tri-Services' : event.type}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${statusColor(event.status)}`}>{event.status}</span>
            </div>
            <h3 className="font-semibold text-sm mt-2 leading-tight">{event.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
            <p className="text-xs text-muted-foreground">{event.venue}</p>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Registered</span>
                <span className="font-semibold">{event.registered}/{event.capacity}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${Math.round(event.registered / event.capacity * 100)}%` }} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Event Detail */}
      {selectedEvent && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-primary px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-primary-foreground font-semibold">{selectedEvent.title}</h3>
              <p className="text-primary-foreground/70 text-xs mt-1">{selectedEvent.description}</p>
            </div>
            <div className="flex gap-2">
              {(['upcoming', 'ongoing', 'completed'] as Event['status'][]).map(s => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(selectedEvent, s)}
                  className={`text-xs px-3 py-1 rounded-full capitalize transition-colors ${selectedEvent.status === s ? 'bg-white text-primary font-semibold' : 'bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border px-6 flex gap-4">
            {['overview', selectedEvent.type === 'gala' ? 'seating' : selectedEvent.type === 'triservices' ? 'zones' : selectedEvent.type === 'golf' ? 'leaderboard' : 'sessions', 'schedule', 'registrations'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-xs font-medium border-b-2 capitalize transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Capacity', value: selectedEvent.capacity },
                  { label: 'Registered', value: selectedEvent.registered },
                  { label: 'Available', value: selectedEvent.capacity - selectedEvent.registered },
                  { label: 'Fill Rate', value: `${Math.round(selectedEvent.registered / selectedEvent.capacity * 100)}%` },
                ].map(s => (
                  <div key={s.label} className="bg-secondary rounded-lg p-4 text-center">
                    <p className="text-xl font-bold text-primary">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'seating' && selectedEvent.type === 'gala' && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Seating & Table Management</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-secondary">
                      <tr>{['Table', 'Seats', 'Assigned', 'Category', 'Guests'].map(h => <th key={h} className="px-3 py-2 text-left font-semibold text-muted-foreground">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {galaData.tables.map(t => (
                        <tr key={t.no} className="border-t border-border">
                          <td className="px-3 py-2 font-mono font-bold">{t.no}</td>
                          <td className="px-3 py-2">{t.seats}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full ${t.assigned === t.seats ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{t.assigned}/{t.seats}</span></td>
                          <td className="px-3 py-2"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">{t.category}</span></td>
                          <td className="px-3 py-2 text-muted-foreground">{t.guests.slice(0, 3).join(', ')}{t.guests.length > 3 ? ` +${t.guests.length - 3} more` : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <h5 className="font-semibold text-xs mb-2">Catering Menu</h5>
                  {galaData.menu.map((item, i) => <p key={i} className="text-xs text-muted-foreground py-1 border-b border-border last:border-0">{item}</p>)}
                </div>
              </div>
            )}

            {activeTab === 'zones' && selectedEvent.type === 'triservices' && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Zone & Attendance Management</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-secondary">
                      <tr>{['Zone', 'Capacity', 'Assigned', 'Clearance', 'Fill'].map(h => <th key={h} className="px-3 py-2 text-left font-semibold text-muted-foreground">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {triServicesData.zones.map(z => (
                        <tr key={z.name} className="border-t border-border">
                          <td className="px-3 py-2 font-medium">{z.name}</td>
                          <td className="px-3 py-2">{z.capacity}</td>
                          <td className="px-3 py-2">{z.assigned}</td>
                          <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full ${z.clearance === 'Top Secret' ? 'bg-red-100 text-red-700' : z.clearance === 'Confidential' ? 'bg-orange-100 text-orange-700' : z.clearance === 'Restricted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{z.clearance}</span></td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 bg-border rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${Math.round(z.assigned / z.capacity * 100)}%` }} />
                              </div>
                              <span>{Math.round(z.assigned / z.capacity * 100)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <h5 className="font-semibold text-xs mb-2">Show Schedule</h5>
                  {triServicesData.schedule.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 py-1.5 border-b border-border last:border-0 text-xs">
                      <span className="font-mono font-bold w-12 text-primary">{s.time}</span>
                      <span className="flex-1">{s.event}</span>
                      <span className="text-muted-foreground">{s.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && selectedEvent.type === 'golf' && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Golf Leaderboard</h4>
                <table className="w-full text-xs">
                  <thead className="bg-secondary">
                    <tr>{['#', 'Player', 'Organization', 'HCP', 'R1', 'R2', 'Total'].map(h => <th key={h} className="px-3 py-2 text-left font-semibold text-muted-foreground">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {[...golfData.players].sort((a, b) => a.total - b.total).map((p, i) => (
                      <tr key={p.name} className={`border-t border-border ${i === 0 ? 'bg-amber-50' : ''}`}>
                        <td className="px-3 py-2 font-bold">{i + 1}</td>
                        <td className="px-3 py-2 font-medium">{p.name}</td>
                        <td className="px-3 py-2 text-muted-foreground">{p.org}</td>
                        <td className="px-3 py-2">{p.handicap}</td>
                        <td className="px-3 py-2">{p.round1}</td>
                        <td className="px-3 py-2">{p.round2}</td>
                        <td className="px-3 py-2 font-bold text-primary">{p.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'sessions' && selectedEvent.type === 'seminar' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Seminar Sessions</h4>
                <div className="space-y-2">
                  {seminarData.sessions.map((s, i) => (
                    <div key={i} className="flex gap-4 p-3 bg-secondary rounded-lg text-xs">
                      <span className="font-mono font-bold text-primary w-12 shrink-0">{s.time}</span>
                      <div className="flex-1">
                        <p className="font-semibold">{s.title}</p>
                        <p className="text-muted-foreground">{s.speaker} | {s.hall}</p>
                      </div>
                      <span className="text-muted-foreground shrink-0">{s.attendees} reg.</span>
                    </div>
                  ))}
                </div>
                <h4 className="font-semibold text-sm mt-4">Speakers</h4>
                <div className="grid grid-cols-2 gap-3">
                  {seminarData.speakers.map(sp => (
                    <div key={sp.name} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">{sp.name.charAt(0)}</div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold truncate">{sp.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{sp.topic} | {sp.org}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ml-auto ${sp.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{sp.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="text-center text-muted-foreground py-8">
                <p className="text-sm">Schedule details for {selectedEvent.title}</p>
                <p className="text-xs mt-2">Date: {selectedEvent.date} | Venue: {selectedEvent.venue}</p>
              </div>
            )}

            {activeTab === 'registrations' && (
              <div className="text-center text-muted-foreground py-8">
                <p className="text-sm font-semibold text-foreground">{selectedEvent.registered} Registrations</p>
                <p className="text-xs mt-2 text-muted-foreground">Capacity: {selectedEvent.capacity} | Available: {selectedEvent.capacity - selectedEvent.registered}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
