import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  FileDown, 
  Smile, 
  Award,
  BookMarked,
  X,
  Check
} from 'lucide-react';
import logoBadge from '../assets/images/ochil_logo_badge_1785148841944.jpg';

interface Workshop {
  id: string;
  title: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  instructor: string;
  time: string;
  date: string;
  location: string;
  description: string;
  points: string[];
  maxSeats: number;
  registeredSeats: number;
}

interface WorkshopsPageProps {
  onOpenContact: () => void;
  onNavigateHome?: () => void;
  isEmbedded?: boolean;
}

export const WorkshopsPage: React.FC<WorkshopsPageProps> = ({ onOpenContact, onNavigateHome, isEmbedded = false }) => {
  // Workshops list
  const [workshops, setWorkshops] = useState<Workshop[]>([
    {
      id: 'w-1',
      title: 'Beginner Boot Camp: The Big 4 Chords (C, G, Am, F)',
      level: 'BEGINNER',
      instructor: 'Pauline Sutton (Committee)',
      time: '6:45pm to 7:15pm (Before main session)',
      date: 'Monday, August 10, 2026',
      location: 'The Johnstone Arms Snug, Alva',
      description: 'Ideal for absolute beginners who have never held a ukulele before. We will cover correct holding posture, tuning, finger placement, and master transition loops between the four essential cords that unlock over 100 pop and folk songs.',
      points: [
        'How to tune using clip-on headstock tuners',
        'Learn clear finger arching to avoid buzz notes',
        'Smooth chord change drills (C → Am → F → G)',
        'Free visual Chord Card sheet provided to take home'
      ],
      maxSeats: 12,
      registeredSeats: 8
    },
    {
      id: 'w-2',
      title: 'Mastering the Calypso Strum & Chunky Dampening',
      level: 'INTERMEDIATE',
      instructor: 'Gordon Campbell',
      time: '6:45pm to 7:15pm',
      date: 'Monday, August 17, 2026',
      location: 'The Johnstone Arms Snug, Alva',
      description: 'Take your rhythm to the next level. We will break down the classic "Down, Down-Up, Up-Down-Up" Calypso rhythm, learn when to play with a swing feel, and introduce the "chunk" (dampened strum) to add satisfying percussion to your music.',
      points: [
        'Deconstruct the Calypso syncopated timing loop',
        'Master the thumb-side palm dampening technique ("The Chunk")',
        'Strumming exercises to coordinate singing and strumming',
        'Applied practice with "I\'m Gonna Be (500 Miles)"'
      ],
      maxSeats: 15,
      registeredSeats: 12
    },
    {
      id: 'w-3',
      title: 'Barre Chords Demystified & Fretboard Navigation',
      level: 'INTERMEDIATE',
      instructor: 'Fiona MacLeod',
      time: '7:00pm to 7:30pm',
      date: 'Monday, August 24, 2026',
      location: 'The Johnstone Arms Snug, Alva',
      description: 'Struggling with B-flat (Bb), B minor, or barre chords? This hands-on masterclass teaches you how to position your index finger flat across the frets without hand strain, and introduces the concept of moveable chord shapes to play up the neck.',
      points: [
        'Learn the "lever arm" posture to press barres with ease',
        'Deconstruct the Bb major chord into simple, friendly stages',
        'Learn moveable shape mechanics (using the G-shape as a slider)',
        'Understand fretboard chord mapping up to the 7th fret'
      ],
      maxSeats: 10,
      registeredSeats: 5
    }
  ]);

  // Member booking state
  const [bookedWorkshopId, setBookedWorkshopId] = useState<string | null>(null);
  const [bookingFormWorkshop, setBookingFormWorkshop] = useState<Workshop | null>(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Resource download files
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleOpenBooking = (workshop: Workshop) => {
    setBookingFormWorkshop(workshop);
    setBookingName('');
    setBookingEmail('');
    setBookingConfirmed(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingFormWorkshop || !bookingName.trim() || !bookingEmail.trim()) return;

    // Increment registered seats in state
    setWorkshops(workshops.map((w) => {
      if (w.id === bookingFormWorkshop.id) {
        return { ...w, registeredSeats: Math.min(w.maxSeats, w.registeredSeats + 1) };
      }
      return w;
    }));

    setBookingConfirmed(true);
    setBookedWorkshopId(bookingFormWorkshop.id);
    
    setTimeout(() => {
      setBookingFormWorkshop(null);
      setBookingConfirmed(false);
    }, 3500);
  };

  const triggerDownload = (fileName: string) => {
    setDownloadMsg(`Preparing "${fileName}"... PDF guide generated!`);
    
    // Simulate direct PDF/HTML download on the fly
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${fileName} - Ochil Strummers Handout</title>
  <style>
    body { font-family: sans-serif; padding: 40px; color: #1A1A1A; max-width: 800px; margin: 0 auto; }
    h1 { color: #3A1554; border-bottom: 2px solid #596C34; padding-bottom: 10px; }
    .footer { text-align: center; font-size: 11px; color: #718096; margin-top: 50px; }
  </style>
</head>
<body>
  <h1>${fileName}</h1>
  <p><strong>Official Ochil Strummers Ukulele Group Study Guide</strong></p>
  <p>Thank you for downloading our official worksheet! This resource is designed to help you practice at home between our Monday evening rehearsals at The Johnstone Arms, Alva.</p>
  <h3>Key Practice Guidelines:</h3>
  <ul>
    <li>Practice in short, focused blocks (10-15 minutes daily is better than 2 hours once a week).</li>
    <li>Use a clip-on headstock tuner to ensure your ukulele is perfectly tuned to G-C-E-A before starting.</li>
    <li>Always keep your wrists relaxed and tap your foot to stay on beat!</li>
  </ul>
  <p class="footer">Ochil Strummers Ukulele Club • Alva / Clackmannanshire • Come Along & Strum!</p>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName.replace(/\s+/g, '_')}_Study_Guide.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadMsg(null);
    }, 4500);
  };

  return (
    <div className={`bg-[#F4F2E9] text-[#1A1A1A] ${isEmbedded ? '' : 'min-h-screen'}`}>
      
      {/* 1. Page Header (Matching Banner Format) */}
      {!isEmbedded && (
        <section className="relative bg-[#3A1554] text-white py-6 sm:py-8 border-b border-purple-900/40">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left Column: Title and text */}
              <div className="max-w-3xl space-y-2 text-left">
                <div className="inline-block bg-purple-900/60 text-purple-200 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-purple-700/50 mb-1">
                  LEARN &amp; DEVELOP
                </div>
                <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
                  Ukulele Workshops
                </h1>
                <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                  Develop your strumming patterns, master barre chords, and learn fingerstyle techniques during our focused, small-group pre-session workshops.
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
      )}

      {/* 2. Toast notification */}
      {downloadMsg && (
        <div className="sticky top-16 z-50 bg-[#596C34] text-white py-3 px-4 shadow-lg border-b border-[#4C5E2C] animate-fade-in text-center font-bold text-xs">
          {downloadMsg}
        </div>
      )}

      {/* 3. Main Body */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Intro Grid: Workshop Ethos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#3A1554]">
              Improve Your Strumming at Our Free Mini-Workshops
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              Every Monday evening, before our main group strum-along begins at 7:30pm, our experienced players host friendly, focused 30-minute workshops in the Snug room. 
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              These mini-lessons are designed for small numbers so everyone gets hands-on help. If you struggle with chord transitions, buzzing strings, or keeping a steady beat, these casual workshops are perfect for tuning up your confidence! 
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-700 font-bold">
                <Smile className="text-[#596C34] w-4.5 h-4.5" />
                <span>Completely Free</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-700 font-bold">
                <Users className="text-[#596C34] w-4.5 h-4.5" />
                <span>Max 10-15 Seats</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-700 font-bold">
                <Award className="text-[#596C34] w-4.5 h-4.5" />
                <span>Weekly Rotations</span>
              </div>
            </div>
          </div>

          {/* Right box: Quick schedule card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-xs text-left space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#3A1554] flex items-center gap-2 border-b border-gray-100 pb-2">
              <Clock className="w-5 h-5 text-[#596C34]" />
              <span>Monday Strum Night Schedule</span>
            </h3>
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-start gap-3">
                <span className="bg-purple-100 text-[#3A1554] font-extrabold px-2.5 py-1 rounded-lg shrink-0 w-28 text-center">6:45 - 7:15 PM</span>
                <div>
                  <h4 className="font-bold text-gray-800">Pre-Session Workshops</h4>
                  <p className="text-gray-500 mt-0.5">Focused lessons for Beginners / Intermediates inside the Snug</p>
                </div>
              </div>

              <div className="flex justify-between items-start gap-3 border-t border-gray-50/70 pt-3">
                <span className="bg-green-100 text-[#596C34] font-extrabold px-2.5 py-1 rounded-lg shrink-0 w-28 text-center">7:15 - 7:30 PM</span>
                <div>
                  <h4 className="font-bold text-gray-800">Tuning &amp; Social Time</h4>
                  <p className="text-gray-500 mt-0.5">Get tuned up, find your chord sheets, order a halftime drink</p>
                </div>
              </div>

              <div className="flex justify-between items-start gap-3 border-t border-gray-50/70 pt-3">
                <span className="bg-amber-100 text-amber-900 font-extrabold px-2.5 py-1 rounded-lg shrink-0 w-28 text-center">7:30 - 9:30 PM</span>
                <div>
                  <h4 className="font-bold text-gray-800">Main Strum-Along Session</h4>
                  <p className="text-gray-500 mt-0.5">Two hours of collective strumming and singing in the lounge!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Upcoming Workshops Grid */}
        <div className="space-y-6 text-left">
          <div className="border-b border-gray-200 pb-3">
            <h3 className="text-2xl font-serif font-black text-[#3A1554]">
              Upcoming August Workshop Schedule
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Select your session below and book a seat. Walk-ins are welcome if space permits, but registration ensures your seat!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {workshops.map((ws) => {
              const isFull = ws.registeredSeats >= ws.maxSeats;
              const hasBooked = bookedWorkshopId === ws.id;

              return (
                <div
                  key={ws.id}
                  className="bg-white rounded-3xl border border-gray-200 shadow-xs hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    {/* Badge / Level */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        ws.level === 'BEGINNER'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : ws.level === 'INTERMEDIATE'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-purple-100 text-purple-800 border border-purple-200'
                      }`}>
                        {ws.level === 'BEGINNER' ? 'Beginner Basics' : 'Intermediate Skill'}
                      </span>
                      
                      <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        {ws.maxSeats - ws.registeredSeats} seats left
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="text-lg font-serif font-bold text-[#3A1554] leading-snug">
                        {ws.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 font-semibold">
                        Instructor: {ws.instructor}
                      </p>
                    </div>

                    {/* Venue & Time Block */}
                    <div className="space-y-1.5 text-xs text-gray-600 bg-gray-50 p-3.5 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#596C34] shrink-0" />
                        <span className="font-semibold">{ws.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#596C34] shrink-0" />
                        <span>{ws.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#596C34] shrink-0" />
                        <span className="truncate">{ws.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {ws.description}
                    </p>

                    {/* Core bullet points */}
                    <ul className="space-y-1 text-xs text-gray-700 pt-3 border-t border-gray-100">
                      {ws.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#596C34] mt-0.5 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Register/Action button */}
                  <div className="pt-3 border-t border-gray-100">
                    {hasBooked ? (
                      <div className="bg-green-100 text-[#596C34] border border-green-300 rounded-xl py-3 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Registered Successfully</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenBooking(ws)}
                        disabled={isFull}
                        className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isFull
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                            : 'bg-[#3A1554] hover:bg-[#2A0F3D] text-white active:scale-98'
                        }`}
                      >
                        <Award className="w-4 h-4 text-amber-300" />
                        <span>{isFull ? 'Session is Full' : 'Book Workshop Seat'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Resource Library Downloads */}
        <div className="space-y-6 text-left">
          <div className="border-b border-gray-200 pb-3">
            <h3 className="text-2xl font-serif font-black text-[#3A1554] flex items-center gap-2">
              <BookMarked className="w-6 h-6 text-[#596C34]" />
              <span>Workshop Worksheets &amp; Resources</span>
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Download and print our official single-sheet workshop guides. Perfect for your tablet or printing on paper for home rehearsal!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Ochil Big 3-Chord Fingering Chart',
                size: '1.2 MB (PDF)',
                desc: 'Simple visual diagrams mapping out chord fingerings for C, G, and F Major. Contains beginner strumming grids.'
              },
              {
                title: 'The Calypso Dampening Guidebook',
                size: '2.4 MB (PDF)',
                desc: 'Detailed photographic deconstruction of palm dampening (the chunk) with standard notation & exercises.'
              },
              {
                title: 'Baritone Ukulele DGBE Transition',
                size: '1.8 MB (PDF)',
                desc: 'For members switching from soprano GCEA to baritone DGBE. Explains tuning mapping and quick transition shapes.'
              }
            ].map((res, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-5 border border-gray-200 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      STUDY HANDOUT
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold">{res.size}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#3A1554]">{res.title}</h4>
                  <p className="text-xs text-gray-600 leading-normal">{res.desc}</p>
                </div>

                <button
                  onClick={() => triggerDownload(res.title)}
                  className="w-full bg-[#596C34] hover:bg-[#4C5E2C] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <FileDown className="w-4 h-4 text-amber-300" />
                  <span>Download Worksheet</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ================= MODAL: WORKSHOP BOOKING FORM ================= */}
      {bookingFormWorkshop && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative text-left animate-fade-in">
            
            <button
              onClick={() => setBookingFormWorkshop(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingConfirmed ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-purple-100 text-[#3A1554] text-xs font-bold px-3 py-1 rounded-full uppercase">
                    <Award className="w-3.5 h-3.5" />
                    <span>WORKSHOP SEAT BOOKING</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#3A1554]">
                    Reserve Your Seat
                  </h3>
                  <p className="text-xs text-gray-500">
                    Book a free seat in <strong>"{bookingFormWorkshop.title}"</strong>.
                  </p>
                </div>

                {/* Date & Time Recap */}
                <div className="bg-gray-50 p-3 rounded-xl text-xs text-gray-600 space-y-1">
                  <p><strong>Date:</strong> {bookingFormWorkshop.date}</p>
                  <p><strong>Time:</strong> {bookingFormWorkshop.time}</p>
                  <p><strong>Location:</strong> {bookingFormWorkshop.location}</p>
                </div>

                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fiona Campbell"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. fiona@example.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#3A1554] hover:bg-[#2A0F3D] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>Confirm Seat Booking</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-green-100 text-[#596C34] flex items-center justify-center mx-auto border border-green-300">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="text-xl font-bold font-serif text-[#3A1554]">Seat Booked!</h3>
                <p className="text-xs text-gray-600 leading-normal max-w-xs mx-auto">
                  Thank you, <strong>{bookingName}</strong>! Your seat has been reserved for the <strong>{bookingFormWorkshop.title}</strong> workshop. Pauline or Gordon will see you in the Snug room!
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
