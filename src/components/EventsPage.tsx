import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Heart, 
  Music, 
  Users, 
  ArrowLeft, 
  CheckCircle2, 
  Mail, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Info,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Settings,
  Lock,
  Unlock
} from 'lucide-react';
import ukuleleImg from '../assets/images/ochil_hero_ukulele_1785147316608.jpg';
import ukuleleCajonImg from '../assets/images/stage_ukuleles_bass_cajon_1785255678136.jpg';
import logoBadge from '../assets/images/ochil_logo_badge_1785148841944.jpg';
import groupOutdoorImg from '../assets/images/gallery_outdoor_monument_1785148882137.jpg';
import indoorGroupImg from '../assets/images/gallery_indoor_group_1785148867749.jpg';
import { Testimonials, EVENT_TESTIMONIAL_PLACEHOLDERS } from './Testimonials';

interface EventsPageProps {
  onOpenContact: () => void;
  onNavigateHome: () => void;
}

interface GigEvent {
  id: string;
  title: string;
  category: 'Weekly Practice' | 'Community Performance' | 'Charity Outreach' | 'Special Event';
  date: string; // ISO format YYYY-MM-DD
  year: number;
  monthIndex: number; // 0-11
  dayNumber: number;
  time: string;
  venue: string;
  location: string;
  description: string;
  isPublic: boolean;
  highlight?: boolean;
}

const DEFAULT_GIG_EVENTS: GigEvent[] = [
  {
    id: 'g1',
    title: 'Weekly Jam & Practice Night',
    category: 'Weekly Practice',
    date: '2026-08-06',
    year: 2026,
    monthIndex: 7, // August
    dayNumber: 6,
    time: '7:30pm - 9:30pm',
    venue: 'The Johnstone Arms Hotel',
    location: '55 Stirling St, Alva FK12 5ED',
    description: 'Our regular weekly gathering! All skill levels welcome. We learn new chords, practice group harmonies, and enjoy half-time tea & biscuits.',
    isPublic: true,
    highlight: true
  },
  {
    id: 'g2',
    title: 'Monthly Jam Night',
    category: 'Weekly Practice',
    date: '2026-08-13',
    year: 2026,
    monthIndex: 7, // August
    dayNumber: 13,
    time: '7:30pm - 10:00pm',
    venue: 'The Johnstone Arms Hotel',
    location: '55 Stirling St, Alva FK12 5ED',
    description: 'An extended jam session featuring member song requests, solos, and group singalongs.',
    isPublic: true,
    highlight: false
  },
  {
    id: 'g3',
    title: 'Clackmannanshire Stroke Support Group',
    category: 'Charity Outreach',
    date: '2026-08-18',
    year: 2026,
    monthIndex: 7, // August
    dayNumber: 18,
    time: '1:00pm - 2:00pm',
    venue: 'Clackmannanshire Stroke Support Centre',
    location: 'Alloa, Clackmannanshire',
    description: 'A cheerful afternoon music performance sharing uplifting folk tunes and old-time favourites for stroke survivors and caregivers.',
    isPublic: false,
    highlight: true
  },
  {
    id: 'g4',
    title: 'Weekly Practice & Songbook Review',
    category: 'Weekly Practice',
    date: '2026-08-20',
    year: 2026,
    monthIndex: 7, // August
    dayNumber: 20,
    time: '7:30pm - 9:30pm',
    venue: 'The Johnstone Arms Hotel',
    location: 'Alva, FK12 5ED',
    description: 'Preparing our song setlist for upcoming autumn community appearances. Beginners loaner ukuleles ready!',
    isPublic: true,
    highlight: false
  },
  {
    id: 'g5',
    title: 'Breathe Easy Community Concert',
    category: 'Community Performance',
    date: '2026-09-10',
    year: 2026,
    monthIndex: 8, // September
    dayNumber: 10,
    time: '1:30pm - 2:30pm',
    venue: 'St Mungo\'s Church Hall',
    location: 'Alloa, FK10 1LH',
    description: 'Special community gig supporting the local Breathe Easy group with a lively selection of Scottish traditional songs and pop classics.',
    isPublic: true,
    highlight: true
  },
  {
    id: 'g6',
    title: 'Weekly Jam & Practice Night',
    category: 'Weekly Practice',
    date: '2026-09-17',
    year: 2026,
    monthIndex: 8, // September
    dayNumber: 17,
    time: '7:30pm - 9:30pm',
    venue: 'The Johnstone Arms Hotel',
    location: 'Alva, FK12 5ED',
    description: 'Regular group practice in the back room. Tea, shortbread, and friendly blether mid-session.',
    isPublic: true,
    highlight: false
  },
  {
    id: 'g7',
    title: 'Autumn Hillfoots Gala Performance',
    category: 'Community Performance',
    date: '2026-09-26',
    year: 2026,
    monthIndex: 8, // September
    dayNumber: 26,
    time: '2:00pm - 3:30pm',
    venue: 'Hillfoots Community Centre',
    location: 'Tillicoultry, FK13 6NS',
    description: 'Live outdoor/indoor stage set at the Hillfoots autumn community gathering. Come cheer us on and sing along!',
    isPublic: true,
    highlight: true
  },
  {
    id: 'g8',
    title: 'Alva Senior Care Home Afternoon Singalong',
    category: 'Charity Outreach',
    date: '2026-10-14',
    year: 2026,
    monthIndex: 9, // October
    dayNumber: 14,
    time: '2:00pm - 3:15pm',
    venue: 'Glentana Care Home',
    location: 'Alva, FK12 5EE',
    description: 'Bringing music and warmth to local care home residents with timeless singalongs and acoustic strumming.',
    isPublic: false,
    highlight: false
  }
];

export const EventsPage: React.FC<EventsPageProps> = ({ onOpenContact, onNavigateHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentMonth, setCurrentMonth] = useState<number>(7); // August (0-indexed 7)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [selectedEventModal, setSelectedEventModal] = useState<GigEvent | null>(null);

  // Live storage state for events
  const [gigEvents, setGigEvents] = useState<GigEvent[]>(() => {
    try {
      const saved = localStorage.getItem('ochil_gig_events');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load events from storage:', e);
    }
    return DEFAULT_GIG_EVENTS;
  });

  // Manage/Admin mode & Passcode Protection
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('ochil_admin_unlocked') === 'true';
  });
  const [isManageMode, setIsManageMode] = useState<boolean>(false);
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string>('');

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<Partial<GigEvent> | null>(null);

  // Handle Passcode Unlock
  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    // Default organiser passcode '1234' or 'strum' or 'admin'
    const validCodes = ['1234', 'strum', 'admin', 'ochil'];
    if (validCodes.includes(passcodeInput.trim().toLowerCase())) {
      setIsAdminUnlocked(true);
      setIsManageMode(true);
      sessionStorage.setItem('ochil_admin_unlocked', 'true');
      setIsPasscodeModalOpen(false);
      setPasscodeInput('');
      setPasscodeError('');
    } else {
      setPasscodeError('Incorrect passcode. Please try again or contact the organiser.');
    }
  };

  const handleLockAdmin = () => {
    setIsAdminUnlocked(false);
    setIsManageMode(false);
    sessionStorage.removeItem('ochil_admin_unlocked');
  };

  // Save to localStorage whenever gigEvents updates
  useEffect(() => {
    try {
      localStorage.setItem('ochil_gig_events', JSON.stringify(gigEvents));
    } catch (e) {
      console.error('Failed to save events to storage:', e);
    }
  }, [gigEvents]);

  // Handler to open Add Modal
  const handleOpenAdd = () => {
    setEditingEvent({
      id: '',
      title: '',
      category: 'Weekly Practice',
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-15`,
      time: '7:30pm - 9:30pm',
      venue: '',
      location: 'Alva',
      description: '',
      isPublic: true,
      highlight: false
    });
    setIsEditModalOpen(true);
  };

  // Handler to open Edit Modal
  const handleOpenEdit = (evt: GigEvent) => {
    setEditingEvent({ ...evt });
    setIsEditModalOpen(true);
  };

  // Handler to Delete an Event
  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to remove this event from the schedule?')) {
      setGigEvents(prev => prev.filter(e => e.id !== id));
      if (selectedEventModal?.id === id) {
        setSelectedEventModal(null);
      }
    }
  };

  // Reset to default events
  const handleResetDefaults = () => {
    if (window.confirm('Reset event schedule to original default list? Any custom additions will be restored.')) {
      setGigEvents(DEFAULT_GIG_EVENTS);
      localStorage.removeItem('ochil_gig_events');
    }
  };

  // Save or Update Event
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !editingEvent.title || !editingEvent.date) return;

    const dateParts = editingEvent.date.split('-');
    const year = parseInt(dateParts[0], 10) || currentYear;
    const monthIndex = (parseInt(dateParts[1], 10) || 1) - 1;
    const dayNumber = parseInt(dateParts[2], 10) || 1;

    if (editingEvent.id) {
      // Update existing
      setGigEvents(prev => prev.map(e => e.id === editingEvent.id ? {
        ...(editingEvent as GigEvent),
        year,
        monthIndex,
        dayNumber
      } : e));
    } else {
      // Create new
      const newEvt: GigEvent = {
        id: 'g_' + Date.now(),
        title: editingEvent.title || 'Untitled Event',
        category: (editingEvent.category as GigEvent['category']) || 'Weekly Practice',
        date: editingEvent.date,
        year,
        monthIndex,
        dayNumber,
        time: editingEvent.time || '7:30pm - 9:30pm',
        venue: editingEvent.venue || 'TBD Venue',
        location: editingEvent.location || 'Alva',
        description: editingEvent.description || '',
        isPublic: editingEvent.isPublic !== false,
        highlight: !!editingEvent.highlight
      };
      setGigEvents(prev => [...prev, newEvt]);
    }

    setIsEditModalOpen(false);
    setEditingEvent(null);
  };

  // Month Names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Filter events by category
  const filteredEvents = gigEvents.filter(evt => {
    const matchesCategory = selectedCategory === 'ALL' || evt.category === selectedCategory;
    return matchesCategory;
  });

  const monthEvents = filteredEvents.filter(evt => evt.monthIndex === currentMonth && evt.year === currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate Calendar Grid Days
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sun, 1 is Mon...
  const startOffset = (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1); // Monday start

  return (
    <div className="bg-[#F4F2E9] text-[#1A1A1A] min-h-screen">
      
      {/* 1. Page Header */}
      <section className="relative bg-[#3A1554] text-white py-6 sm:py-8 border-b border-purple-900/40">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Column: Heading and description */}
            <div className="max-w-3xl space-y-2 text-left">
              <div className="inline-block bg-purple-900/60 text-purple-200 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-purple-700/50 mb-1">
                UPCOMING GIGS &amp; REHEARSALS
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
                Upcoming Events &amp; Gigs
              </h1>
              <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                Find out where Ochil Strummers are playing next! Join us for our weekly practice sessions in Alva, or come along to support us at local community concerts and charity outings.
              </p>
            </div>

            {/* Right Column: Logo in line with writing */}
            <div className="shrink-0">
              <img
                src={logoBadge}
                alt="Ochil Strummers Logo"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/20 shadow-lg object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Community Playing Narrative & Featured Ukulele Showcase */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Playing in the Community Text */}
          <div className="lg:col-span-7 space-y-6">

            <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#3A1554]">
              Playing Music in Our Local Community
            </h2>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              At Ochil Strummers, our favourite thing is bringing smiles and lively song to local people across Clackmannanshire and Stirling.
            </p>

            <p className="text-gray-700 text-base leading-relaxed">
              From strumming at care homes and stroke support groups to performing at outdoor galas, church halls, and charity fundraisers, music has a wonderful way of connecting people and brightening up everyone’s week.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenContact}
                className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Invite Us To Play At Your Event</span>
              </button>
            </div>

          </div>

          {/* Right Column: Picture of a Ukulele Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#2F1045] group">
              <img
                src={ukuleleCajonImg}
                alt="Ukuleles, Bass and Cajon Stage Setup - Ochil Strummers"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1F0730] via-[#2F1045]/90 to-transparent p-6 text-white space-y-1">
                <p className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">Acoustic Set</p>
                <h3 className="text-lg font-bold">Ukuleles, Bass &amp; Cajon Stage Setup</h3>
                <p className="text-xs text-purple-200">
                  Ready to strum, thump, and beat along for our next live community gig!
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Interactive Gig Calendar & Schedule Outline */}
      <section className="bg-white py-12 sm:py-16 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Calendar Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {isAdminUnlocked ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsManageMode(!isManageMode)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border transition-all cursor-pointer ${
                        isManageMode 
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs' 
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-300'
                      }`}
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>{isManageMode ? 'Done Managing' : 'Manage Mode Active'}</span>
                    </button>
                    <button
                      onClick={handleLockAdmin}
                      className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-full border border-gray-300 transition-colors cursor-pointer"
                      title="Lock Admin Mode"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Lock Admin</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsPasscodeModalOpen(true);
                      setPasscodeError('');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-[#3A1554] border border-gray-200 transition-all cursor-pointer"
                    title="Organiser Access"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Organiser Login</span>
                  </button>
                )}
              </div>

              <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#3A1554]">
                Gig Calendar &amp; Schedule
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Browse our monthly calendar of practice nights, public concerts, and community visits.
              </p>
            </div>

            {/* Category Filter Tabs & Add Event Button */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'ALL', label: 'All Events' },
                { id: 'Weekly Practice', label: 'Weekly Practice' },
                { id: 'Community Performance', label: 'Public Concerts' },
                { id: 'Charity Outreach', label: 'Care Home & Charity' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#3A1554] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              {/* Add Event Button (Visible to Unlocked Organisers) */}
              {isAdminUnlocked && (
                <button
                  onClick={handleOpenAdd}
                  className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Event</span>
                </button>
              )}
            </div>
          </div>

          {/* Organizer Quick Banner if in Manage Mode */}
          {isManageMode && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-amber-700 shrink-0" />
                <span><strong>Organizer Mode Active:</strong> You can add new events, edit existing details, or delete past/cancelled gigs directly. Changes save automatically!</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenAdd}
                  className="bg-[#596C34] text-white px-3 py-1 rounded-md font-bold hover:bg-[#4A5A2B] cursor-pointer"
                >
                  + Add Event
                </button>
                <button
                  onClick={handleResetDefaults}
                  className="bg-amber-200 hover:bg-amber-300 text-amber-900 px-3 py-1 rounded-md font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Schedule
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Monthly Calendar Grid (Outline View) */}
            <div className="lg:col-span-5 bg-[#FAF9F5] rounded-2xl p-5 border border-gray-200 shadow-xs">
              
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <button
                  onClick={prevMonth}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="font-serif font-black text-lg text-[#3A1554]">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Day Headers (Mon - Sun) */}
              <div className="grid grid-cols-7 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

              {/* Calendar Grid Days */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {/* Empty Offset cells */}
                {Array.from({ length: startOffset }).map((_, idx) => (
                  <div key={`offset-${idx}`} className="h-9 rounded-lg bg-transparent" />
                ))}

                {/* Days of Month */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const day = idx + 1;
                  const dayEvents = monthEvents.filter(e => e.dayNumber === day);
                  const hasEvent = dayEvents.length > 0;
                  const hasHighlight = dayEvents.some(e => e.highlight);

                  return (
                    <div
                      key={`day-${day}`}
                      onClick={() => {
                        if (hasEvent) setSelectedEventModal(dayEvents[0]);
                      }}
                      className={`h-10 rounded-xl flex flex-col items-center justify-center text-xs font-bold relative transition-all ${
                        hasEvent
                          ? hasHighlight
                            ? 'bg-[#3A1554] text-white shadow-xs cursor-pointer hover:bg-[#521D75]'
                            : 'bg-[#596C34] text-white cursor-pointer hover:bg-[#47572A]'
                          : 'bg-white text-gray-700 border border-gray-100'
                      }`}
                    >
                      <span>{day}</span>
                      {hasEvent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-300 absolute bottom-1"></span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-5 pt-3 border-t border-gray-200 flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium text-gray-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#3A1554]"></span>
                  <span>Featured Gig</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#596C34]"></span>
                  <span>Practice / Event</span>
                </div>
              </div>

            </div>

            {/* Right: Detailed Event Cards List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-black text-xl text-[#3A1554]">
                  Gigs in {monthNames[currentMonth]} ({monthEvents.length})
                </h3>
                {monthEvents.length === 0 && (
                  <span className="text-xs text-gray-500 font-semibold">No events scheduled for this month</span>
                )}
              </div>

              {monthEvents.length === 0 ? (
                <div className="bg-[#FAF9F5] rounded-2xl p-8 text-center space-y-3 border border-gray-200">
                  <CalendarIcon className="w-10 h-10 text-purple-300 mx-auto" />
                  <p className="font-bold text-gray-800 text-sm">No gigs found for {monthNames[currentMonth]}</p>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Try switching months using the arrows on the calendar, or add a new event using the "+ Add Event" button above!
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={handleOpenAdd}
                      className="text-xs font-bold text-white bg-[#596C34] hover:bg-[#4C5E2C] px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      + Add Event For {monthNames[currentMonth]}
                    </button>
                  </div>
                </div>
              ) : (
                monthEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-start justify-between relative group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Date Box */}
                      <div className="bg-[#3A1554] text-white rounded-xl px-3 py-2 text-center shrink-0 min-w-[56px] shadow-xs">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-200">
                          {monthNames[evt.monthIndex].substring(0, 3)}
                        </span>
                        <span className="block text-xl font-black leading-tight mt-0.5">
                          {evt.dayNumber}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                            evt.category === 'Weekly Practice' 
                              ? 'bg-purple-100 text-[#3A1554]'
                              : evt.category === 'Community Performance'
                              ? 'bg-emerald-100 text-[#596C34]'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {evt.category}
                          </span>
                          
                          {evt.isPublic ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                              Open to Public
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/60">
                              Community Visit
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-base text-gray-900 font-serif">
                          {evt.title}
                        </h4>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#596C34]" />
                            <span>{evt.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#3A1554]" />
                            <span>{evt.venue}, {evt.location}</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 pt-1 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {isManageMode && (
                        <>
                          <button
                            onClick={() => handleOpenEdit(evt)}
                            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                            title="Edit Event"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setSelectedEventModal(evt)}
                        className="text-xs font-bold text-[#3A1554] bg-purple-50 hover:bg-purple-100 px-3.5 py-2 rounded-xl transition-colors shrink-0 cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Event Host & Venue Testimonials Section */}
      <Testimonials 
        title="WHAT EVENT HOSTS & VENUES SAY" 
        testimonials={EVENT_TESTIMONIAL_PLACEHOLDERS} 
      />

      {/* Event Details Modal Popup */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 relative shadow-2xl animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-purple-100 text-[#3A1554]">
                {selectedEventModal.category}
              </span>
              <h3 className="text-2xl font-black font-serif text-[#3A1554]">
                {selectedEventModal.title}
              </h3>
            </div>

            <div className="bg-[#FAF9F5] p-4 rounded-xl border border-gray-200 space-y-2 text-xs sm:text-sm text-gray-700">
              <div className="flex items-center gap-2 font-semibold">
                <CalendarIcon className="w-4 h-4 text-[#3A1554]" />
                <span>Date: {selectedEventModal.date} ({monthNames[selectedEventModal.monthIndex]} {selectedEventModal.dayNumber})</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <Clock className="w-4 h-4 text-[#596C34]" />
                <span>Time: {selectedEventModal.time}</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <MapPin className="w-4 h-4 text-[#3A1554]" />
                <span>Venue: {selectedEventModal.venue}, {selectedEventModal.location}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {selectedEventModal.description}
            </p>

            <div className="pt-2 flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const evtToEdit = selectedEventModal;
                    setSelectedEventModal(null);
                    handleOpenEdit(evtToEdit);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Event
                </button>
                <button
                  onClick={() => {
                    handleDeleteEvent(selectedEventModal.id);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedEventModal(null);
                    onOpenContact();
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#596C34] hover:bg-[#4C5E2C] shadow-xs"
                >
                  Contact Organisers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Event Modal Popup */}
      {isEditModalOpen && editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 relative shadow-2xl my-8">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingEvent(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors"
            >
              ✕
            </button>

            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#596C34] bg-emerald-50 px-2.5 py-1 rounded-md">
                Organizer Event Tool
              </span>
              <h3 className="text-xl font-black font-serif text-[#3A1554] mt-1">
                {editingEvent.id ? 'Edit Event Details' : 'Add New Event to Calendar'}
              </h3>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekly Jam & Practice Night"
                  value={editingEvent.title || ''}
                  onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A1554]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={editingEvent.category || 'Weekly Practice'}
                    onChange={e => setEditingEvent({ ...editingEvent, category: e.target.value as GigEvent['category'] })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A1554]"
                  >
                    <option value="Weekly Practice">Weekly Practice</option>
                    <option value="Community Performance">Community Performance</option>
                    <option value="Charity Outreach">Charity Outreach</option>
                    <option value="Special Event">Special Event</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={editingEvent.date || ''}
                    onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A1554]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 7:30pm - 9:30pm"
                    value={editingEvent.time || ''}
                    onChange={e => setEditingEvent({ ...editingEvent, time: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A1554]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Venue</label>
                  <input
                    type="text"
                    placeholder="e.g. The Johnstone Arms Hotel"
                    value={editingEvent.venue || ''}
                    onChange={e => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A1554]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Location / Address</label>
                <input
                  type="text"
                  placeholder="e.g. 55 Stirling St, Alva FK12 5ED"
                  value={editingEvent.location || ''}
                  onChange={e => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A1554]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Details about practice, songbook focus, or gig information..."
                  value={editingEvent.description || ''}
                  onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A1554]"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={editingEvent.isPublic !== false}
                    onChange={e => setEditingEvent({ ...editingEvent, isPublic: e.target.checked })}
                    className="w-4 h-4 rounded-md text-[#3A1554]"
                  />
                  <span>Open to Public</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={!!editingEvent.highlight}
                    onChange={e => setEditingEvent({ ...editingEvent, highlight: e.target.checked })}
                    className="w-4 h-4 rounded-md text-[#3A1554]"
                  />
                  <span>Highlight on Calendar</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingEvent(null);
                  }}
                  className="px-4 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#596C34] hover:bg-[#4C5E2C] shadow-md"
                >
                  {editingEvent.id ? 'Save Changes' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Organiser Passcode Unlock Modal */}
      {isPasscodeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 space-y-4 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => {
                setIsPasscodeModalOpen(false);
                setPasscodeError('');
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 text-[#3A1554] rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black font-serif text-[#3A1554]">
                Organiser Admin Access
              </h3>
              <p className="text-xs text-gray-600">
                Enter your organiser PIN to unlock event creation, editing, and calendar management.
              </p>
            </div>

            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="Enter PIN (Default: 1234)"
                  value={passcodeInput}
                  onChange={e => setPasscodeInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-[#3A1554]"
                />
                {passcodeError && (
                  <p className="text-xs font-bold text-red-600 mt-1.5 text-center">{passcodeError}</p>
                )}
                <p className="text-[11px] text-gray-500 text-center mt-2">
                  Tip: Default organiser passcode is <span className="font-mono font-bold text-gray-800 bg-gray-100 px-1 rounded">1234</span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPasscodeModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl font-bold text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl font-bold text-xs text-white bg-[#3A1554] hover:bg-[#2A0F3C] shadow-md transition-colors"
                >
                  Unlock Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
