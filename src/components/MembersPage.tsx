import React, { useState } from 'react';
import { 
  Lock, 
  Key, 
  UserCheck, 
  BookOpen, 
  ListMusic, 
  ShoppingBag, 
  GraduationCap, 
  Search, 
  Download, 
  Play, 
  Volume2, 
  Plus, 
  Tag, 
  CheckCircle2, 
  FileText, 
  LogOut, 
  Calendar, 
  MapPin, 
  Music, 
  HelpCircle,
  X,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Filter
} from 'lucide-react';

import logoBadge from '../assets/images/ochil_logo_badge_1785148841944.jpg';
import pubSessionPhoto from '../assets/images/ukulele_pub_session_1785257120765.jpg';
import stageUkulelesPhoto from '../assets/images/stage_ukuleles_bass_cajon_1785255678136.jpg';
import indoorGroupPhoto from '../assets/images/gallery_indoor_group_1785148867749.jpg';
import { playStrumChord } from '../utils/audioTuner';

interface MembersPageProps {
  onOpenContact: () => void;
  onNavigateHome: () => void;
  onNavigateJoinUs?: () => void;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  key: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tuning: 'Standard (GCEA)' | 'Baritone (DGBE)' | 'Both';
  strumPattern: string;
  pdfUrl?: string;
  chords: string[];
}

export interface SetListItem {
  id: string;
  name: string;
  event: string;
  date: string;
  venue: string;
  totalTime: string;
  songs: { title: string; key: string; notes: string }[];
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: 'Ukuleles' | 'Amps & Gear' | 'Accessories' | 'Free / Loan';
  price: string;
  seller: string;
  location: string;
  contact: string;
  description: string;
  condition: string;
  dateAdded: string;
  image?: string;
}

export interface WorkshopItem {
  id: string;
  title: string;
  category: 'Strumming Patterns' | 'Chord Mastery' | 'Ukulele Tuning & Gear' | 'Rhythm Mastery';
  duration: string;
  level: 'All Levels' | 'Beginner' | 'Intermediate';
  summary: string;
  strumGuide?: string;
  downloads?: string;
}

export const MembersPage: React.FC<MembersPageProps> = ({ onOpenContact, onNavigateHome, onNavigateJoinUs }) => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Active Tab inside Member Hub
  const [activeTab, setActiveTab] = useState<'SONGBOOKS' | 'SETLISTS' | 'MARKETPLACE' | 'TRAINING'>('SONGBOOKS');

  // Interactive Media / Modal States
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('ALL');

  // Marketplace New Listing Modal
  const [showPostItemModal, setShowPostItemModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Ukuleles' | 'Amps & Gear' | 'Accessories' | 'Free / Loan'>('Ukuleles');
  const [newPrice, setNewPrice] = useState('');
  const [newSeller, setNewSeller] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Contact Seller Modal
  const [contactSellerItem, setContactSellerItem] = useState<MarketplaceItem | null>(null);

  // Initial Data
  const [songbook, setSongbook] = useState<SongItem[]>([
    {
      id: 's1',
      title: 'Wild Mountain Thyme',
      artist: 'Traditional Scottish Folk',
      key: 'C Major',
      difficulty: 'Beginner',
      tuning: 'Both',
      strumPattern: 'D - DU - UDU (3/4 Folk Waltz)',
      chords: ['C', 'F', 'G', 'Am'],
    },
    {
      id: 's2',
      title: '500 Miles (I\'m Gonna Be)',
      artist: 'The Proclaimers',
      key: 'E / F Major (Capo 1)',
      difficulty: 'Beginner',
      tuning: 'Standard (GCEA)',
      strumPattern: 'D - D - UDU (Upbeat Driving Rhythm)',
      chords: ['C', 'F', 'G'],
    },
    {
      id: 's3',
      title: 'Loch Lomond',
      artist: 'Traditional Scottish',
      key: 'G Major',
      difficulty: 'Beginner',
      tuning: 'Both',
      strumPattern: 'D - DU - DU',
      chords: ['G', 'Em', 'C', 'D7'],
    },
    {
      id: 's4',
      title: 'Dirty Old Town',
      artist: 'Ewan MacColl / The Pogues',
      key: 'G Major',
      difficulty: 'Intermediate',
      tuning: 'Standard (GCEA)',
      strumPattern: 'D - DU - UDU',
      chords: ['G', 'C', 'D', 'Em'],
    },
    {
      id: 's5',
      title: 'Calendar Girl',
      artist: 'Neil Sedaka',
      key: 'C Major',
      difficulty: 'Intermediate',
      tuning: 'Both',
      strumPattern: 'D - D - UDU (Rock n Roll Swing)',
      chords: ['C', 'Am', 'F', 'G7'],
    },
    {
      id: 's6',
      title: 'Baritone Blues in G',
      artist: 'Ochil Strummers Workshop',
      key: 'G Major',
      difficulty: 'Intermediate',
      tuning: 'Baritone (DGBE)',
      strumPattern: 'Shuffle Strum (D-u D-u D-u D-u)',
      chords: ['G', 'C7', 'D7'],
    },
  ]);

  const [setLists] = useState<SetListItem[]>([
    {
      id: 'set-1',
      name: 'Johnstone Arms Jam Night Core Set',
      event: 'Bi-Weekly Jam Session',
      date: 'Every 2nd Thursday (7:30pm)',
      venue: 'The Johnstone Arms Hotel, Alva',
      totalTime: '90 Mins (2 Sets + Break)',
      songs: [
        { title: '1. Wild Mountain Thyme', key: 'C', notes: 'Warm-up singalong, 3/4 waltz rhythm' },
        { title: '2. 500 Miles', key: 'F (Capo 1)', notes: 'Full group vocals on chorus' },
        { title: '3. Loch Lomond', key: 'G', notes: 'Steady tempo, fiddle / accordion leads optional' },
        { title: '4. Dirty Old Town', key: 'G', notes: 'Highlights cajón beat' },
        { title: '5. Calendar Girl', key: 'C', notes: 'Fun upbeat closer before half-time break' },
      ],
    },
    {
      id: 'set-2',
      name: 'Summer Gala Performance Set',
      event: 'Alva & Clackmannanshire Gala',
      date: 'Upcoming Summer Event',
      venue: 'Cochrane Hall / Outdoor Stage',
      totalTime: '45 Mins Continuous',
      songs: [
        { title: '1. Scottish Medley (Loch Lomond / Thyme)', key: 'G', notes: 'Welcome intro to crowd' },
        { title: '2. 500 Miles', key: 'F', notes: 'Audience participation encouraged!' },
        { title: '3. King of the Road', key: 'C', notes: 'Finger snapping and baritone groove' },
        { title: '4. You Are My Sunshine', key: 'C', notes: 'Slow intro into fast chorus' },
      ],
    },
  ]);

  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([
    {
      id: 'm1',
      title: 'Kala Concert Ukulele (Mahogany Finish)',
      category: 'Ukuleles',
      price: '£45',
      seller: 'Fiona M.',
      location: 'Alva',
      contact: 'fiona.uke@example.com',
      description: 'Excellent condition Kala concert ukulele with warm tone. Comes with padded gig bag and clip-on tuner.',
      condition: 'Like New',
      dateAdded: '2 days ago',
    },
    {
      id: 'm2',
      title: 'Stagg Baritone Ukulele (DGBE Tuning)',
      category: 'Ukuleles',
      price: '£60',
      seller: 'David K.',
      location: 'Alloa',
      contact: 'david.k@example.com',
      description: 'Great rich bass sound, perfect for anyone transitioning from guitar to ukulele. Strung with Aquila strings.',
      condition: 'Very Good',
      dateAdded: '1 week ago',
    },
    {
      id: 'm3',
      title: 'Mini Portable Battery Amp (For Acoustic Ukulele)',
      category: 'Amps & Gear',
      price: '£25',
      seller: 'Tom H.',
      location: 'Dollar',
      contact: 'tom.strummer@example.com',
      description: 'Compact 5W amplifier, ideal for practice or small outdoor group jams.',
      condition: 'Good',
      dateAdded: '3 days ago',
    },
    {
      id: 'm4',
      title: 'Spare Soprano Gig Bag & Nylon Strap',
      category: 'Free / Loan',
      price: 'Free to Member',
      seller: 'Christina S.',
      location: 'Sauchie',
      contact: 'christina.s@example.com',
      description: 'Free to any beginner joining the group who needs a protective bag for their soprano uke!',
      condition: 'Good',
      dateAdded: 'Yesterday',
    },
  ]);

  const [workshops] = useState<WorkshopItem[]>([
    {
      id: 'w1',
      title: 'The Universal "Island Strum" (D - DU - UDU)',
      category: 'Strumming Patterns',
      duration: '10 Mins',
      level: 'All Levels',
      summary: 'Learn the foundational 4/4 rhythm used in over 60% of our songbook pop & folk tunes.',
      strumGuide: '1 (Down) - 2 (Down-Up) - 3 (Up-Down-Up)',
    },
    {
      id: 'w2',
      title: 'Seamless Chord Transitions: C → G7 → F',
      category: 'Chord Mastery',
      duration: '15 Mins',
      level: 'Beginner',
      summary: 'Anchor finger techniques to switch between core chords smoothly without stopping the strumming rhythm.',
    },
    {
      id: 'w3',
      title: 'Ukulele Tuning & String Care Guide',
      category: 'Ukulele Tuning & Gear',
      duration: '15 Mins',
      level: 'All Levels',
      summary: 'Standard GCEA tuning techniques, clip-on tuner usage, and keeping your instrument sounding crisp.',
    },
    {
      id: 'w4',
      title: 'Rhythm & Dynamic Strumming',
      category: 'Rhythm Mastery',
      duration: '15 Mins',
      level: 'All Levels',
      summary: 'Keeping steady tempo and dynamic accentuation for smooth group ensemble strumming.',
    },
  ]);

  // Handle Login submission
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Allow any passkey or instant demo access
    if (passcode.trim().toLowerCase() === 'strum' || passcode.trim().length > 0 || !passcode) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect passcode. Try "strum" or click Demo Access.');
    }
  };

  // Handle Adding Marketplace Item
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSeller) return;

    const newItem: MarketplaceItem = {
      id: 'm-' + Date.now(),
      title: newTitle,
      category: newCategory,
      price: newPrice || 'Free / Contact',
      seller: newSeller,
      location: 'Clackmannanshire',
      contact: newContact || 'Inquire via group',
      description: newDesc || 'No additional details provided.',
      condition: 'Good',
      dateAdded: 'Just now',
    };

    setMarketplaceItems([newItem, ...marketplaceItems]);
    setShowPostItemModal(false);
    // Reset form
    setNewTitle('');
    setNewPrice('');
    setNewSeller('');
    setNewContact('');
    setNewDesc('');
  };

  const playSongSample = (songId: string, chord: string) => {
    if (playingSongId === songId) {
      setPlayingSongId(null);
    } else {
      setPlayingSongId(songId);
      playStrumChord(chord);
    }
  };

  // Filtered Songs
  const filteredSongs = songbook.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === 'ALL' || song.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="bg-[#F4F2E9] text-[#1A1A1A] min-h-screen">
      
      {/* 1. Member Site Header Banner */}
      <section className="relative bg-[#3A1554] text-white py-6 sm:py-8 border-b border-purple-900/40">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Column: Title & Subtitle */}
            <div className="max-w-3xl space-y-2 text-left">
              <div className="inline-flex items-center gap-2 bg-purple-900/60 text-amber-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-purple-700/50 mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>OFFICIAL MEMBER PORTAL</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
                Members Hub &amp; Resources
              </h1>
              <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                Access club songbooks, upcoming gig set lists, instrument marketplace, and training workshop materials.
              </p>
            </div>

            {/* Right Column: Logo badge */}
            <div className="shrink-0 flex items-center gap-4">
              <img
                src={logoBadge}
                alt="Ochil Strummers Logo"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white/20 shadow-lg object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Content Body: Login View OR Logged-in Member Portal */}
      {!isLoggedIn ? (
        /* ================= LOGIN PORTAL VIEW ================= */
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Login Form Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
              
              <div className="space-y-2 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#3A1554] text-white flex items-center justify-center shadow-md">
                  <Key className="w-7 h-7 text-amber-400" />
                </div>
                <h2 className="text-2xl font-black font-serif text-[#3A1554]">
                  Member Login
                </h2>
                <p className="text-xs text-gray-600">
                  Enter your member passcode to access the private site &amp; resources.
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium text-center">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Member Email / Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. member@ochilstrummers.co.uk"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#3A1554] focus:ring-2 focus:ring-[#3A1554]/20 outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Club Passcode
                  </label>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter club passcode..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#3A1554] focus:ring-2 focus:ring-[#3A1554]/20 outline-none text-sm transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3A1554] hover:bg-[#2F1045] text-white py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>Enter Member Site</span>
                </button>
              </form>

              <div className="text-center pt-2 border-t border-gray-100">
                <button
                  onClick={onOpenContact}
                  className="text-xs font-semibold text-[#3A1554] hover:underline cursor-pointer"
                >
                  Need the passcode? Contact the Committee
                </button>
              </div>

            </div>

            {/* Right Column: Sneak Peek of Features */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#3A1554]/10 text-[#3A1554] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Member Benefits</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#3A1554]">
                  What’s Inside the Member Site?
                </h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-1">
                  Our private member area brings together everything our strummers need for practice, rehearsals, and group camaraderie.
                </p>
              </div>

              {/* 4 Feature Preview Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Feature 1: Songbooks */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#3A1554] flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#3A1554]">Digital Songbooks</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Our new 2026 Songbook will be available for download as printable pdfs.
                  </p>
                </div>

                {/* Feature 2: Set Lists */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-[#596C34] flex items-center justify-center">
                    <ListMusic className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#3A1554]">Gig Set Lists</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Organised performance song orders guides for upcoming gigs &amp; jams.
                  </p>
                </div>

                {/* Feature 3: Instrument Marketplace */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#3A1554]">Instrument Marketplace</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Buy, sell, swap, or borrow ukuleles, amplifiers, gig bags, and music accessories within the group.
                  </p>
                </div>

                {/* Feature 4: Training & Workshops */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#3A1554] flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#3A1554]">Training &amp; Workshops</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Strumming pattern breakdowns, chord transition masterclasses, and ukulele tuning guides.
                  </p>
                </div>

              </div>

              {/* Callout box */}
              <div className="bg-[#3A1554] text-white p-6 rounded-2xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm">New to Ochil Strummers?</h4>
                  <p className="text-xs text-purple-200">
                    Come along to our Monday practices or Johnstone Arms jam nights to get signed up!
                  </p>
                </div>
                <button
                  onClick={onNavigateJoinUs || onOpenContact}
                  className="bg-amber-400 hover:bg-amber-300 text-black px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer"
                >
                  Join Us
                </button>
              </div>

            </div>

          </div>

        </section>
      ) : (
        /* ================= LOGGED IN MEMBER HUB SITE ================= */
        <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Member Welcome Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#3A1554] text-amber-400 flex items-center justify-center font-bold text-lg shadow-xs">
                🎵
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[#3A1554]">Welcome, Ochil Strummer!</h2>
                  <span className="bg-green-100 text-[#596C34] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-green-300">
                    Active Member
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Accessing Ochil Strummers Private Member Site
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

          {/* Member Site Sub-Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-300 pb-2">
            
            <button
              onClick={() => setActiveTab('SONGBOOKS')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'SONGBOOKS'
                  ? 'bg-[#3A1554] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Songbooks &amp; Chords</span>
            </button>

            <button
              onClick={() => setActiveTab('SETLISTS')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'SETLISTS'
                  ? 'bg-[#3A1554] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <ListMusic className="w-4 h-4" />
              <span>Gig Set Lists</span>
            </button>

            <button
              onClick={() => setActiveTab('MARKETPLACE')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'MARKETPLACE'
                  ? 'bg-[#3A1554] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Instrument Marketplace</span>
            </button>

            <button
              onClick={() => setActiveTab('TRAINING')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'TRAINING'
                  ? 'bg-[#3A1554] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Training &amp; Workshops</span>
            </button>

          </div>

          {/* ================= TAB 1: SONGBOOKS ================= */}
          {activeTab === 'SONGBOOKS' && (
            <div className="space-y-6">
              
              {/* Controls Header */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search song title or artist..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F4F2E9] rounded-xl text-xs font-medium border border-gray-300 focus:outline-none focus:border-[#3A1554]"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" />
                    Level:
                  </span>
                  {['ALL', 'Beginner', 'Intermediate'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        difficultyFilter === diff
                          ? 'bg-[#596C34] text-white'
                          : 'bg-[#F4F2E9] text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>

                {/* PDF Download All Banner */}
                <button
                  onClick={() => alert('Downloading complete Ochil Strummers Songbook (PDF)...')}
                  className="bg-[#3A1554] hover:bg-[#2F1045] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Full Songbook PDF</span>
                </button>

              </div>

              {/* Songs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSongs.map((song) => {
                  const isPlaying = playingSongId === song.id;

                  return (
                    <div
                      key={song.id}
                      className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all p-6 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="bg-purple-100 text-[#3A1554] text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                            Key: {song.key}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                            song.difficulty === 'Beginner'
                              ? 'bg-green-100 text-[#596C34]'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {song.difficulty}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold font-serif text-[#3A1554] leading-snug">
                          {song.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                          {song.artist}
                        </p>
                      </div>

                      {/* Strumming Pattern & Tuning Info */}
                      <div className="bg-[#F4F2E9] p-3 rounded-xl space-y-1 border border-gray-200">
                        <div className="text-[11px] text-gray-700 font-bold">
                          🎵 Strum: <span className="font-mono text-[#3A1554]">{song.strumPattern}</span>
                        </div>
                        <div className="text-[11px] text-gray-600">
                          🎸 Tuning: {song.tuning}
                        </div>
                      </div>

                      {/* Chord Pills */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Chords:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {song.chords.map((chord, idx) => (
                            <button
                              key={idx}
                              onClick={() => playStrumChord(chord)}
                              title={`Click to hear ${chord} chord strum`}
                              className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-[#3A1554] border border-purple-200 rounded-md font-mono font-bold text-xs transition-colors cursor-pointer"
                            >
                              {chord}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                        <button
                          onClick={() => playSongSample(song.id, song.chords[0] || 'C')}
                          className="flex-1 bg-white hover:bg-purple-50 text-[#3A1554] border border-purple-200 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {isPlaying ? (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                              <span>Stop Audio</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 text-[#3A1554]" />
                              <span>Listen Audio Guide</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => alert(`Opening PDF chord sheet for ${song.title}...`)}
                          className="bg-[#596C34] hover:bg-[#4C5E2C] text-white p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                          title="Download Song Sheet PDF"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ================= TAB 2: SET LISTS ================= */}
          {activeTab === 'SETLISTS' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <h2 className="text-xl font-bold font-serif text-[#3A1554]">
                  Upcoming Performance Set Lists
                </h2>
                <p className="text-xs text-gray-600">
                  Review song order, key transpose notes, and performance arrangements for our upcoming gigs and pub jams.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {setLists.map((set) => (
                  <div
                    key={set.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      
                      <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                        <div>
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                            {set.event}
                          </span>
                          <h3 className="text-lg font-bold font-serif text-[#3A1554] mt-1">
                            {set.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => alert(`Printing setlist for ${set.name}...`)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-xl text-xs font-bold cursor-pointer"
                          title="Print / Save Setlist"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#596C34]" />
                          <span>{set.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#596C34]" />
                          <span className="truncate">{set.venue}</span>
                        </div>
                      </div>

                      {/* Songlist table */}
                      <div className="bg-[#F4F2E9] rounded-xl p-3 border border-gray-200 space-y-2">
                        <div className="text-xs font-bold text-[#3A1554] uppercase tracking-wider mb-1">
                          Song Order &amp; Key Notes:
                        </div>
                        <div className="space-y-2">
                          {set.songs.map((song, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-2.5 rounded-lg border border-gray-200 text-xs flex items-center justify-between gap-2"
                            >
                              <div className="font-bold text-gray-800 truncate">
                                {song.title}
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="bg-purple-100 text-[#3A1554] font-mono font-bold text-[10px] px-2 py-0.5 rounded">
                                  {song.key}
                                </span>
                                <span className="text-[10px] text-gray-500 hidden sm:inline">
                                  {song.notes}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs text-gray-500 font-medium">
                      <span>Total Duration: {set.totalTime}</span>
                      <button
                        onClick={() => alert(`Downloading chords bundle for ${set.name}...`)}
                        className="text-[#3A1554] font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Download Setlist Chord Bundle</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= TAB 3: MARKETPLACE ================= */}
          {activeTab === 'MARKETPLACE' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center md:text-left">
                  <h2 className="text-xl font-bold font-serif text-[#3A1554]">
                    Member Instrument &amp; Gear Swap
                  </h2>
                  <p className="text-xs text-gray-600">
                    Buy, sell, trade, or borrow ukuleles, amplifiers, and accessories directly with fellow club members.
                  </p>
                </div>

                <button
                  onClick={() => setShowPostItemModal(true)}
                  className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post an Item for Sale / Trade</span>
                </button>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketplaceItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-purple-100 text-[#3A1554] text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                          {item.category}
                        </span>
                        <span className="bg-amber-400 text-black text-xs font-black px-2.5 py-0.5 rounded-md">
                          {item.price}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#3A1554] leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="bg-[#F4F2E9] p-2.5 rounded-xl space-y-1 text-[11px] text-gray-700">
                        <div>Seller: <strong>{item.seller}</strong> ({item.location})</div>
                        <div>Condition: <span className="text-[#596C34] font-bold">{item.condition}</span></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">{item.dateAdded}</span>
                      <button
                        onClick={() => setContactSellerItem(item)}
                        className="bg-[#3A1554] hover:bg-[#2F1045] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Contact Seller</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= TAB 4: TRAINING & WORKSHOPS ================= */}
          {activeTab === 'TRAINING' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                <h2 className="text-xl font-bold font-serif text-[#3A1554]">
                  Training &amp; Workshop Materials
                </h2>
                <p className="text-xs text-gray-600">
                  Tutorial guides, strumming pattern notation, chord transition exercises, and baritone tuning masterclasses.
                </p>
              </div>

              {/* Workshops Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workshops.map((ws) => (
                  <div
                    key={ws.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-purple-100 text-[#3A1554] text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                          {ws.category}
                        </span>
                        <span className="bg-green-100 text-[#596C34] text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                          {ws.level} • {ws.duration}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-serif text-[#3A1554]">
                        {ws.title}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {ws.summary}
                      </p>

                      {ws.strumGuide && (
                        <div className="bg-[#F4F2E9] p-3 rounded-xl border border-gray-200 text-xs font-mono font-bold text-[#3A1554]">
                          Pattern breakdown: {ws.strumGuide}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => alert(`Opening workshop guide for ${ws.title}...`)}
                        className="bg-[#3A1554] hover:bg-[#2F1045] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5 text-amber-400" />
                        <span>View Tutorial</span>
                      </button>

                      <button
                        onClick={() => alert(`Downloading PDF sheet for ${ws.title}...`)}
                        className="text-[#596C34] hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF Sheet</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

        </section>
      )}

      {/* ================= MODAL: POST MARKETPLACE ITEM ================= */}
      {showPostItemModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-5 relative shadow-2xl">
            
            <button
              onClick={() => setShowPostItemModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-black font-serif text-[#3A1554]">
                Post an Item to Member Marketplace
              </h3>
              <p className="text-xs text-gray-600">
                List your ukulele, amp, or accessories for fellow Ochil Strummers.
              </p>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1 uppercase">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cordoba Concert Ukulele w/ Tuner"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554]"
                  >
                    <option value="Ukuleles">Ukuleles</option>
                    <option value="Amps & Gear">Amps &amp; Gear</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Free / Loan">Free / Loan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase">Price (£ or Free)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. £35 or Free"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah M."
                    value={newSeller}
                    onChange={(e) => setNewSeller(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1 uppercase">Contact Email / Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. sarah@example.com"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1 uppercase">Description &amp; Condition</label>
                <textarea
                  rows={3}
                  placeholder="Describe condition, strings, gig bag included, etc."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#596C34] hover:bg-[#4C5E2C] text-white py-3 rounded-xl font-bold uppercase tracking-wider cursor-pointer"
              >
                Publish Member Listing
              </button>
            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL: CONTACT SELLER ================= */}
      {contactSellerItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setContactSellerItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="bg-amber-400 text-black text-[10px] font-extrabold px-2 py-0.5 rounded">
                {contactSellerItem.price}
              </span>
              <h3 className="text-lg font-bold font-serif text-[#3A1554]">
                Contact {contactSellerItem.seller}
              </h3>
              <p className="text-xs text-gray-600">
                Item: <strong>{contactSellerItem.title}</strong>
              </p>
            </div>

            <div className="bg-[#F4F2E9] p-4 rounded-xl space-y-2 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3A1554]" />
                <span>Contact info: <strong>{contactSellerItem.contact}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#596C34]" />
                <span>Location: <strong>{contactSellerItem.location}</strong></span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              You can also speak with {contactSellerItem.seller} directly at our Monday practice sessions or Johnstone Arms jam nights!
            </p>

            <button
              onClick={() => setContactSellerItem(null)}
              className="w-full bg-[#3A1554] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
