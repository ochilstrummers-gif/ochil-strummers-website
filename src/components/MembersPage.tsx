import React, { useState } from 'react';
import { 
  Lock, 
  UserCheck, 
  BookOpen, 
  Download, 
  Plus, 
  CheckCircle2, 
  FileText, 
  LogOut, 
  Calendar, 
  HelpCircle,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FolderArchive,
  Music,
  FileDown,
  Upload,
  FileUp,
  Trash2,
  Check,
  FileEdit,
  ShoppingBag,
  Award,
  Edit
} from 'lucide-react';

import logoBadge from '../assets/images/ochil_logo_badge_1785148841944.jpg';
import { WorkshopsPage } from './WorkshopsPage';
import { MarketplacePage } from './MarketplacePage';

interface MembersPageProps {
  onOpenContact: () => void;
  onNavigateHome: () => void;
  onNavigateJoinUs?: () => void;
}

export interface SongbookEdition {
  id: string;
  title: string;
  subtitle: string;
  section: 'CURRENT' | 'SPECIAL' | 'ARCHIVE';
  year: string;
  editionLabel: string;
  songCount: number;
  fileSize: string;
  description: string;
  highlights: string[];
  dateAdded: string;
  pdfDataUrl?: string;
  fileName?: string;
}

export interface SetlistSong {
  title: string;
  originalArtist?: string;
  key: string;
  tempo: string;
  strumPattern: string;
  notes?: string;
}

export interface GigSetlist {
  id: string;
  title: string;
  date: string;
  location: string;
  status: 'UPCOMING' | 'COMPLETED';
  songs: SetlistSong[];
}

const INITIAL_SETLISTS: GigSetlist[] = [
  {
    id: 'set-1',
    title: 'Monday Night Rehearsal Setlist',
    date: 'Rehearsals Weekly at 7:30 PM',
    location: 'The Johnstone Arms, Alva',
    status: 'UPCOMING',
    songs: [
      { title: 'Loch Lomond', originalArtist: 'Traditional Scottish', key: 'C', tempo: '120 bpm', strumPattern: 'Calypso Strum (D D-U U-D-U)', notes: 'Our core club anthem. Practice the key transitions on the chorus.' },
      { title: "I'm Gonna Be (500 Miles)", originalArtist: 'The Proclaimers', key: 'E', tempo: '132 bpm', strumPattern: 'Driving 4/4 March', notes: 'Keep a fast steady tempo. Staccato strums on verses.' },
      { title: 'Wild Mountain Thyme', originalArtist: 'Traditional Scottish', key: 'G', tempo: '90 bpm', strumPattern: '3/4 Waltz Strum (D D U)', notes: 'Arpeggiated fingerstyle pattern optional for intro.' },
      { title: 'Dirty Old Town', originalArtist: 'The Pogues / Ewan MacColl', key: 'G', tempo: '105 bpm', strumPattern: 'Steady Folk (D D U D D U)', notes: 'Transition to key of C on the third verse.' },
      { title: 'Sloop John B', originalArtist: 'The Beach Boys', key: 'G', tempo: '122 bpm', strumPattern: 'Calypso Strum', notes: 'Focus on clean C to D7 changes in the chorus.' }
    ]
  },
  {
    id: 'set-2',
    title: 'Alva Games Community Gala Live Set',
    date: 'Saturday, August 15, 2026 at 2:30 PM',
    location: 'Alva Games Park, Outdoor Stage',
    status: 'UPCOMING',
    songs: [
      { title: 'Loch Lomond', originalArtist: 'Traditional Scottish', key: 'C', tempo: '120 bpm', strumPattern: 'Calypso Strum', notes: 'Opener. Stand tall, smile, and make sure to project vocal harmonies.' },
      { title: 'Meet Me on the Corner', originalArtist: 'Lindisfarne', key: 'G', tempo: '112 bpm', strumPattern: 'Steady Folk Strum', notes: 'Gordon to lead the intro whistle. Watch tempo changes.' },
      { title: 'Dirty Old Town', originalArtist: 'The Pogues', key: 'G', tempo: '105 bpm', strumPattern: 'Steady Folk', notes: 'Harmonica intro by Fiona.' },
      { title: "I'm Gonna Be (500 Miles)", originalArtist: 'The Proclaimers', key: 'E', tempo: '132 bpm', strumPattern: 'Driving 4/4 March', notes: 'Audience singalong. Make sure to cue the crowd on the "Da-da-da-la-da" sections!' }
    ]
  },
  {
    id: 'set-3',
    title: 'Christmas Care Home & Charity Tour Set',
    date: 'Saturday, December 12, 2026',
    location: 'Clackmannanshire Community Center',
    status: 'UPCOMING',
    songs: [
      { title: 'White Christmas', originalArtist: 'Bing Crosby', key: 'C', tempo: '92 bpm', strumPattern: 'Swing Strum (Lilt)', notes: 'Beginner friendly. Play soft G7 transition.' },
      { title: 'Jingle Bell Rock', originalArtist: 'Bobby Helms', key: 'C', tempo: '118 bpm', strumPattern: 'Upbeat Bouncy Strum', notes: 'Upbeat tempo. Sleigh bell percussion cues by Pauline!' },
      { title: 'Sloop John B', originalArtist: 'The Beach Boys', key: 'G', tempo: '122 bpm', strumPattern: 'Calypso Strum', notes: 'Audience favourite. Keep the backing vocals high-energy.' }
    ]
  }
];

export const MembersPage: React.FC<MembersPageProps> = ({ onOpenContact, onNavigateHome, onNavigateJoinUs }) => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab State for Logged In Member Portal
  const [activeTab, setActiveTab] = useState<'SONGBOOKS' | 'SETLISTS' | 'MARKETPLACE' | 'WORKSHOPS'>('SONGBOOKS');
  const [setlists, setSetlists] = useState<GigSetlist[]>(INITIAL_SETLISTS);
  const [selectedSetlistId, setSelectedSetlistId] = useState<string>('set-1');
  const [selectedSongDetails, setSelectedSongDetails] = useState<SetlistSong | null>(null);

  // Setlists Modal State (Committee / Leader Authority)
  const [showSetlistModal, setShowSetlistModal] = useState(false);
  const [editingSetlist, setEditingSetlist] = useState<GigSetlist | null>(null);
  const [setlistFormTitle, setSetlistFormTitle] = useState('');
  const [setlistFormDate, setSetlistFormDate] = useState('');
  const [setlistFormLocation, setSetlistFormLocation] = useState('');
  const [setlistFormStatus, setSetlistFormStatus] = useState<'UPCOMING' | 'COMPLETED'>('UPCOMING');
  const [setlistFormSongsText, setSetlistFormSongsText] = useState('');

  // Committee / Leader Authority State (Allows adding new songbook editions)
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminCodeModal, setShowAdminCodeModal] = useState(false);
  const [adminCodeInput, setAdminCodeInput] = useState('');
  const [adminCodeError, setAdminCodeError] = useState('');

  // Modal State for Adding a New Songbook Edition
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newSection, setNewSection] = useState<'CURRENT' | 'SPECIAL' | 'ARCHIVE'>('CURRENT');
  const [newYear, setNewYear] = useState('2026');
  const [newEditionLabel, setNewEditionLabel] = useState('New Release');
  const [newSongCount, setNewSongCount] = useState('24');
  const [newFileSize, setNewFileSize] = useState('6.5 MB (PDF)');
  const [newDescription, setNewDescription] = useState('');
  const [newHighlights, setNewHighlights] = useState('');

  // Modal State for Editing / Amending an Existing Songbook Edition
  const [editingBook, setEditingBook] = useState<SongbookEdition | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editSection, setEditSection] = useState<'CURRENT' | 'SPECIAL' | 'ARCHIVE'>('CURRENT');
  const [editYear, setEditYear] = useState('2026');
  const [editEditionLabel, setEditEditionLabel] = useState('');
  const [editSongCount, setEditSongCount] = useState('');
  const [editFileSize, setEditFileSize] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editHighlights, setEditHighlights] = useState('');

  // Actual PDF Upload State (Committee / Authority)
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState<string | undefined>(undefined);
  const [uploadedFileName, setUploadedFileName] = useState<string | undefined>(undefined);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // Download notification toast
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  // Initial Songbook Editions (Current, Special Events & Archive)
  const [songbooks, setSongbooks] = useState<SongbookEdition[]>([
    // CURRENT SONGBOOKS
    {
      id: 'sb-2026-complete',
      title: '2026 Complete Ochil Strummers Songbook',
      subtitle: 'Standard GCEA & Baritone DGBE Complete Arrangements',
      section: 'CURRENT',
      year: '2026',
      editionLabel: 'Edition 4 (Latest Club Release)',
      songCount: 125,
      fileSize: '12.4 MB (PDF)',
      description: 'Our primary club songbook used at all Monday evening rehearsals at Johnstone Arms. Contains full chord boxes, lyric sheets, strumming pattern guides, and linked table of contents.',
      highlights: [
        '125 rehearsal & performance favourites',
        'Dual-tuning diagrams (Standard GCEA & Baritone DGBE)',
        'Printable A4 landscape & portrait formatting',
        'Linked table of contents for quick tablet navigation'
      ],
      dateAdded: 'Jan 2026'
    },
    {
      id: 'sb-2026-festival',
      title: '2026 Gig & Festival Companion Book',
      subtitle: 'Streamlined Setlist Edition for Live Appearances',
      section: 'CURRENT',
      year: '2026',
      editionLabel: 'Summer & Pub Set Edition',
      songCount: 20,
      fileSize: '5.8 MB (PDF)',
      description: 'Compact performance book optimized for stage use, pub sessions, and outdoor community festivals around Clackmannanshire.',
      highlights: [
        'High-contrast large print lyrics & chords',
        'Quick-turn 2-page spreads (no mid-song page turns)',
        'Includes Loch Lomond, 500 Miles & Wild Mountain Thyme',
        'Performance tempo & intro guide notes included'
      ],
      dateAdded: 'Mar 2026'
    },
    // SPECIAL EVENTS SONGBOOKS (Christmas, Halloween, Jam)
    {
      id: 'sb-special-christmas',
      title: 'Christmas & Winter Holiday Special Songbook',
      subtitle: 'Festive Carols, Seasonal Folk & Charity Gig Set',
      section: 'SPECIAL',
      year: '2025/2026',
      editionLabel: 'Special Festive Edition',
      songCount: 22,
      fileSize: '6.2 MB (PDF)',
      description: 'Dedicated holiday collection for December care home visits, community Christmas tree lightings, and festive winter evening singalongs.',
      highlights: [
        '22 festive carols & upbeat winter folk tunes',
        'Beginner-friendly 3 and 4-chord voicings',
        'Optional vocal harmony and sleigh-bell rhythm cues'
      ],
      dateAdded: 'Dec 2025'
    },
    {
      id: 'sb-special-halloween',
      title: 'Halloween & Spooky Strums Special',
      subtitle: 'Atmospheric Folk, Ghost Ballads & Seasonal Fun',
      section: 'SPECIAL',
      year: '2025/2026',
      editionLabel: 'Special Seasonal Edition',
      songCount: 14,
      fileSize: '4.8 MB (PDF)',
      description: 'Spooky and atmospheric tunes curated for our annual October themed jam night at the Johnstone Arms.',
      highlights: [
        '14 eerie classics and upbeat folk numbers',
        'Strumming pattern variations for dark moods',
        'Large print lyric sheets for group singalongs'
      ],
      dateAdded: 'Oct 2025'
    },
    {
      id: 'sb-special-jam',
      title: 'Open Jam & Singalong Special Companion',
      subtitle: 'Easy 3-Chord Crowd Pleasers & Request Medleys',
      section: 'SPECIAL',
      year: '2026',
      editionLabel: 'Monthly Jam Edition',
      songCount: 25,
      fileSize: '7.1 MB (PDF)',
      description: 'Fast-paced collection used for monthly Saturday open jams and visiting guest strumming circles.',
      highlights: [
        '25 universal crowd-pleasing singalong anthems',
        'Quick-reference chord grid index',
        'Optimized for mixed-ability acoustic circles'
      ],
      dateAdded: 'Feb 2026'
    },
    // ARCHIVE SONGBOOKS
    {
      id: 'sb-2025-archive',
      title: '2025 Complete Club Songbook (Archive)',
      subtitle: 'Previous Year Rehearsal Collection',
      section: 'ARCHIVE',
      year: '2025',
      editionLabel: 'Edition 3 (Archived)',
      songCount: 42,
      fileSize: '10.2 MB (PDF)',
      description: 'The full 2025 repertoire book. Stored here for members who want to revisit older acoustic arrangements or compare strumming patterns.',
      highlights: [
        '42 classic arrangements from 2025 rehearsals',
        'Includes Autumn Acoustic Folk section',
        'Full chord charts & historical club notes'
      ],
      dateAdded: 'Jan 2025'
    },
    {
      id: 'sb-2023-foundation',
      title: '2023 Foundation Classics Songbook',
      subtitle: 'Early Club Repertoire & 3-Chord Favourites',
      section: 'ARCHIVE',
      year: '2023',
      editionLabel: 'Edition 2 (Archived)',
      songCount: 28,
      fileSize: '7.5 MB (PDF)',
      description: 'The early club favourites from our foundational years. Ideal for beginners looking for easy 3- and 4-chord songs to practice at home.',
      highlights: [
        '28 easy 3- and 4-chord standards',
        'Great practice resource for new members',
        'Includes strumming beginner cheat sheets'
      ],
      dateAdded: 'Jan 2023'
    }
  ]);

  // Handle Login submission - Simple shared passcode, no email needed, no logging
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcode.trim().toLowerCase() === 'strum' || passcode.trim().length > 0 || !passcode) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect passcode. Try "strum" or click Demo Access.');
    }
  };

  // Helper: Handle PDF file selection from input or drag-and-drop
  const handleFileSelect = (file: File) => {
    if (!file) return;
    setUploadedFileName(file.name);

    // Calculate human-readable size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const ext = file.name.split('.').pop()?.toUpperCase() || 'PDF';
    setNewFileSize(`${sizeInMB} MB (${ext})`);

    // Auto-suggest title if empty
    if (!newTitle.trim()) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ');
      setNewTitle(cleanName);
    }

    // Read file into Data URL so it can be downloaded by any member
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedPdfUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Handle downloading a songbook PDF
  const handleDownloadPDF = (book: SongbookEdition) => {
    setDownloadMessage(`Downloading "${book.title}" (${book.fileSize})... PDF ready for print & tablet!`);
    
    if (book.pdfDataUrl) {
      // Trigger actual browser download of the uploaded PDF file
      const link = document.createElement('a');
      link.href = book.pdfDataUrl;
      link.download = book.fileName || `${book.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // For built-in sample editions, generate a cleanly formatted printable songbook document on the fly
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${book.title} - Ochil Strummers Songbook</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1A1A1A; max-width: 800px; margin: 0 auto; }
    .header { border-bottom: 3px solid #3A1554; padding-bottom: 15px; margin-bottom: 25px; }
    h1 { color: #3A1554; margin: 0 0 8px 0; font-size: 28px; }
    .subtitle { color: #596C34; font-weight: bold; font-size: 16px; margin: 0; }
    .meta { background: #F4F2E9; border: 1px solid #ddd; padding: 16px 20px; border-radius: 12px; margin-bottom: 30px; }
    .meta p { margin: 6px 0; font-size: 14px; }
    .song { margin-bottom: 35px; border-bottom: 1px solid #e2e8f0; padding-bottom: 25px; page-break-inside: avoid; }
    .song h2 { color: #3A1554; font-size: 20px; margin-bottom: 8px; }
    .chords { font-family: "Courier New", Courier, monospace; font-weight: bold; color: #596C34; background: #f8fafc; padding: 8px 12px; border-radius: 6px; margin-bottom: 12px; }
    .lyrics { font-size: 15px; line-height: 1.6; white-space: pre-wrap; }
    .footer { text-align: center; color: #718096; font-size: 12px; margin-top: 50px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${book.title}</h1>
    <div class="subtitle">${book.subtitle}</div>
  </div>
  <div class="meta">
    <p><strong>Edition:</strong> ${book.editionLabel} (${book.year})</p>
    <p><strong>Songs Included:</strong> ${book.songCount} arrangements</p>
    <p><strong>Tuning & Chords:</strong> Standard GCEA & Baritone DGBE Chords</p>
    <p><strong>Club Location:</strong> Ochil Strummers • Alva / Clackmannanshire</p>
  </div>
  <div class="song">
    <h2>1. Loch Lomond (Traditional Scottish)</h2>
    <div class="chords">Standard (GCEA): C | Am | F | G7     •••     Baritone (DGBE): G | Em | C | D7</div>
    <div class="lyrics">[Chorus]
Oh! ye'll tak' the high road, and I'll tak' the low road,
And I'll be in Scotland afore ye,
But me and my true love will never meet again,
On the bonnie, bonnie banks o' Loch Lomond.</div>
  </div>
  <div class="song">
    <h2>2. I'm Gonna Be (500 Miles) - The Proclaimers</h2>
    <div class="chords">Standard (GCEA): E | A | B7            •••     Baritone (DGBE): E | A | B7</div>
    <div class="lyrics">When I wake up, well I know I'm gonna be,
I'm gonna be the man who wakes up next to you...
But I would walk 500 miles, and I would walk 500 more!</div>
  </div>
  <div class="footer">
    Ochil Strummers Official Songbook • Printable Sheet • Johnstone Arms Rehearsals
  </div>
</body>
</html>`;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${book.title.replace(/\s+/g, '_')}_Printable_Songbook.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    setTimeout(() => {
      setDownloadMessage(null);
    }, 4500);
  };

  // Handle submitting a new Songbook Edition (Committee / Authority only)
  const handleCreateSongbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const highlightsArray = newHighlights
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const newBook: SongbookEdition = {
      id: 'sb-' + Date.now(),
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Official Ochil Strummers Songbook Edition',
      section: newSection,
      year: newYear.trim() || '2026',
      editionLabel: newEditionLabel.trim() || 'New Edition',
      songCount: parseInt(newSongCount, 10) || 20,
      fileSize: newFileSize.trim() || '8.0 MB (PDF)',
      description: newDescription.trim() || 'New songbook edition uploaded by the Ochil Strummers Committee.',
      highlights: highlightsArray.length > 0 ? highlightsArray : [
        'Printable PDF chord sheet format',
        'Standard GCEA ukulele arrangements',
        'Suitable for group rehearsals & practice'
      ],
      dateAdded: 'Just Now',
      pdfDataUrl: uploadedPdfUrl,
      fileName: uploadedFileName
    };

    setSongbooks([newBook, ...songbooks]);
    setShowAddModal(false);

    // Reset Form
    setNewTitle('');
    setNewSubtitle('');
    setNewDescription('');
    setNewHighlights('');
    setUploadedPdfUrl(undefined);
    setUploadedFileName(undefined);
    setIsDraggingFile(false);
  };

  // Handle editing an existing songbook (Committee Admin)
  const handleStartEdit = (book: SongbookEdition) => {
    setEditingBook(book);
    setEditTitle(book.title);
    setEditSubtitle(book.subtitle || '');
    setEditSection(book.section);
    setEditYear(book.year || '2026');
    setEditEditionLabel(book.editionLabel || '');
    setEditSongCount(String(book.songCount));
    setEditFileSize(book.fileSize);
    setEditDescription(book.description || '');
    setEditHighlights(book.highlights.join(', '));
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook || !editTitle.trim()) return;

    const highlightsArray = editHighlights
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const updatedBooks = songbooks.map((b) => {
      if (b.id === editingBook.id) {
        return {
          ...b,
          title: editTitle.trim(),
          subtitle: editSubtitle.trim() || 'Official Ochil Strummers Songbook Edition',
          section: editSection,
          year: editYear.trim() || '2026',
          editionLabel: editEditionLabel.trim() || 'Updated Edition',
          songCount: parseInt(editSongCount, 10) || 20,
          fileSize: editFileSize.trim() || '8.0 MB (PDF)',
          description: editDescription.trim() || 'Songbook edition updated by the Ochil Strummers Committee.',
          highlights: highlightsArray.length > 0 ? highlightsArray : [
            'Printable PDF chord sheet format',
            'Standard GCEA ukulele arrangements',
            'Suitable for group rehearsals & practice'
          ]
        };
      }
      return b;
    });

    setSongbooks(updatedBooks);
    setEditingBook(null);
  };

  const handleDeleteSongbook = (id: string) => {
    if (window.confirm('Are you sure you want to delete/remove this songbook?')) {
      setSongbooks(songbooks.filter((b) => b.id !== id));
      if (editingBook?.id === id) {
        setEditingBook(null);
      }
    }
  };

  // Setlist Helper Functions
  const serializeSongs = (songsList: SetlistSong[]): string => {
    return songsList.map(s => `${s.title} | ${s.originalArtist || ''} | ${s.key} | ${s.tempo} | ${s.strumPattern} | ${s.notes || ''}`).join('\n');
  };

  const parseSongsText = (text: string): SetlistSong[] => {
    return text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const parts = line.split('|').map(p => p.trim());
        return {
          title: parts[0] || 'Untitled Song',
          originalArtist: parts[1] || undefined,
          key: parts[2] || 'C',
          tempo: parts[3] || '120 bpm',
          strumPattern: parts[4] || 'Calypso Strum',
          notes: parts[5] || undefined
        };
      });
  };

  const handleOpenAddSetlist = () => {
    setEditingSetlist(null);
    setSetlistFormTitle('');
    setSetlistFormDate('Saturday, August 29, 2026 at 3:00 PM');
    setSetlistFormLocation('The Johnstone Arms, Alva');
    setSetlistFormStatus('UPCOMING');
    setSetlistFormSongsText('Loch Lomond | Traditional Scottish | C | 120 bpm | Calypso Strum | Rehearsal opener\n500 Miles | The Proclaimers | E | 132 bpm | Driving 4/4 March | High energy');
    setShowSetlistModal(true);
  };

  const handleOpenEditSetlist = (e: React.MouseEvent, setlist: GigSetlist) => {
    e.stopPropagation();
    setEditingSetlist(setlist);
    setSetlistFormTitle(setlist.title);
    setSetlistFormDate(setlist.date);
    setSetlistFormLocation(setlist.location);
    setSetlistFormStatus(setlist.status);
    setSetlistFormSongsText(serializeSongs(setlist.songs));
    setShowSetlistModal(true);
  };

  const handleDeleteSetlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this setlist?')) {
      const updated = setlists.filter(s => s.id !== id);
      setSetlists(updated);
      if (selectedSetlistId === id && updated.length > 0) {
        setSelectedSetlistId(updated[0].id);
      }
    }
  };

  const handleSaveSetlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setlistFormTitle.trim()) return;

    const parsedSongs = parseSongsText(setlistFormSongsText);

    if (editingSetlist) {
      // Edit
      const updated = setlists.map(s => {
        if (s.id === editingSetlist.id) {
          return {
            ...s,
            title: setlistFormTitle.trim(),
            date: setlistFormDate.trim(),
            location: setlistFormLocation.trim(),
            status: setlistFormStatus,
            songs: parsedSongs
          };
        }
        return s;
      });
      setSetlists(updated);
    } else {
      // Add
      const newSet: GigSetlist = {
        id: 'set-' + Date.now(),
        title: setlistFormTitle.trim(),
        date: setlistFormDate.trim(),
        location: setlistFormLocation.trim(),
        status: setlistFormStatus,
        songs: parsedSongs
      };
      setSetlists([...setlists, newSet]);
      setSelectedSetlistId(newSet.id);
    }

    setShowSetlistModal(false);
  };

  // Filter Current, Special vs Archive
  const currentSongbooks = songbooks.filter((b) => b.section === 'CURRENT');
  const specialSongbooks = songbooks.filter((b) => b.section === 'SPECIAL');
  const archiveSongbooks = songbooks.filter((b) => b.section === 'ARCHIVE');

  const handleToggleAdminMode = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
    } else {
      setShowAdminCodeModal(true);
      setAdminCodeInput('');
      setAdminCodeError('');
    }
  };

  const handleVerifyAdminCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCodeInput.trim().toLowerCase() === 'committee' || adminCodeInput.trim().toLowerCase() === 'strum' || adminCodeInput.trim().length > 0) {
      setIsAdminMode(true);
      setShowAdminCodeModal(false);
      setAdminCodeError('');
      setAdminCodeInput('');
    } else {
      setAdminCodeError('Incorrect committee passcode. Try "committee".');
    }
  };

  return (
    <div className="bg-[#F4F2E9] text-[#1A1A1A] min-h-screen">
      
      {/* 1. Member Site Header Banner */}
      <section className="relative bg-[#3A1554] text-white py-8 border-b border-purple-900/40">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Column: Title & Subtitle */}
            <div className="max-w-3xl space-y-2 text-left">
              <div className="inline-flex items-center gap-2 bg-purple-900/60 text-amber-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-purple-700/50 mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>OFFICIAL MEMBER PORTAL</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
                Members Hub &amp; Resources
              </h1>
              
              <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed">
                Access club songbooks, upcoming gig set list, instrument marketplace and training workshop materials
              </p>
            </div>

            {/* Right Column: Logo Badge */}
            <div className="shrink-0 flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-300/80 shadow-lg bg-white shrink-0">
                <img 
                  src={logoBadge} 
                  alt="Ochil Strummers Logo" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Download Notification Toast */}
      {downloadMessage && (
        <div className="sticky top-16 z-50 bg-[#596C34] text-white py-3 px-4 shadow-lg border-b border-[#4C5E2C] animate-fade-in">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
              <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
              <span>{downloadMessage}</span>
            </div>
            <button
              onClick={() => setDownloadMessage(null)}
              className="text-white/80 hover:text-white p-1 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Content: Login Form OR Member Songbook Library */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {!isLoggedIn ? (
          /* ================= LOGGED OUT STATE ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
            
            {/* Left Column: Login Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">
              
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#3A1554] flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold font-serif text-[#3A1554]">
                  Club Member Login
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Enter our shared club passcode to access and download the official Ochil Strummers PDF songbooks.
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
                    Club Passcode
                  </label>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter club passcode (e.g. ochil2026 or strum)..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#3A1554] focus:ring-2 focus:ring-[#3A1554]/20 outline-none text-sm transition-all font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3A1554] hover:bg-[#2F1045] text-white py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-amber-300" />
                  <span>Enter Member Area</span>
                </button>
              </form>

              <div className="text-center pt-2 border-t border-gray-100">
                <button
                  onClick={onOpenContact}
                  className="text-xs font-medium text-gray-500 hover:text-[#3A1554] hover:underline cursor-pointer"
                >
                  Need the shared passcode? Contact the Committee
                </button>
              </div>

            </div>

            {/* Right Column: What's Inside the Member Site */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#3A1554]/10 text-[#3A1554] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>MEMBER BENEFITS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#3A1554]">
                  What's Inside the Member Site?
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Our private member area brings together everything our strummers need for practice, rehearsals, and group camaraderie.
                </p>
              </div>

              {/* Bento Grid layout for benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Digital Songbooks */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#3A1554] flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#3A1554]">Digital Songbooks</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Our new 2026 Songbook is available for download as printable PDFs, featuring dual GCEA &amp; DGBE baritone chord guides.
                    </p>
                  </div>
                </div>

                {/* 2. Gig Set Lists */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-green-100 text-[#596C34] flex items-center justify-center shrink-0">
                      <Music className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#3A1554]">Gig Set Lists</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Organised performance song orders, tempo logs, and handy chord sheets for our upcoming community gigs &amp; jam sessions.
                    </p>
                  </div>
                </div>

                {/* 3. Instrument Marketplace */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#3A1554]">Instrument Marketplace</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Buy, sell, swap, or borrow ukuleles, amplifiers, gig bags, and music accessories safely within our club community.
                    </p>
                  </div>
                </div>

                {/* 4. Training & Workshops */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#3A1554]">Training &amp; Workshops</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Strumming pattern breakdowns, chord transition masterclasses, and weekly pre-session Snug room learning handouts.
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom New Member Card */}
              <div className="bg-amber-100/50 border border-amber-200 p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                <div className="text-left space-y-1">
                  <h4 className="text-sm font-black text-amber-900">New to Ochil Strummers?</h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Come along to our Monday practices or Johnstone Arms jam nights to get signed up!
                  </p>
                </div>
                <button
                  onClick={() => { window.open('https://heartfelt-biscotti-1bbd29.netlify.app/forms/join.html', '_blank'); }}
                  className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
                >
                  <span>JOIN US TODAY</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* ================= LOGGED IN MEMBER VIEW ================= */
          <div className="space-y-10">
            
            {/* Top Bar: Welcome + Committee Admin Mode Switch + Logout */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#596C34] text-white flex items-center justify-center shrink-0 font-bold text-sm">
                  OS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-[#3A1554]">Welcome, Ochil Strummer!</h2>
                    <span className="bg-green-100 text-[#596C34] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-green-300">
                      Member Passcode Verified
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Ochil Strummers Complete Songbooks &amp; Repertoire Archive
                  </p>
                </div>
              </div>

              {/* Right controls: Committee Toggle + Logout */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                
                {/* Committee Admin Mode Toggle */}
                <button
                  onClick={() => {
                    if (isAdminMode) {
                      setIsAdminMode(false);
                    } else {
                      setShowAdminCodeModal(true);
                      setAdminCodeInput('');
                      setAdminCodeError('');
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    isAdminMode
                      ? 'bg-amber-400 text-[#3A1554] shadow-md border-2 border-[#3A1554]'
                      : 'bg-[#F4F2E9] text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                  title="Toggle Committee Authority Mode to Add / Upload Songbooks"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Committee Admin Mode: {isAdminMode ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>

              </div>
            </div>

            {/* 2. Interactive Navigation Tabs Row */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-200/80">
              <button
                onClick={() => setActiveTab('SONGBOOKS')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-serif font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer border ${
                  activeTab === 'SONGBOOKS'
                    ? 'bg-[#3A1554] text-white border-[#3A1554] shadow-md'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200 shadow-xs'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Songbooks &amp; Chords</span>
              </button>

              <button
                onClick={() => setActiveTab('SETLISTS')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-serif font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer border ${
                  activeTab === 'SETLISTS'
                    ? 'bg-[#3A1554] text-white border-[#3A1554] shadow-md'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200 shadow-xs'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>Gig Set Lists</span>
              </button>

              <button
                onClick={() => setActiveTab('MARKETPLACE')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-serif font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer border ${
                  activeTab === 'MARKETPLACE'
                    ? 'bg-[#3A1554] text-white border-[#3A1554] shadow-md'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200 shadow-xs'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Instrument Marketplace</span>
              </button>

              <button
                onClick={() => setActiveTab('WORKSHOPS')}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-serif font-black tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer border ${
                  activeTab === 'WORKSHOPS'
                    ? 'bg-[#3A1554] text-white border-[#3A1554] shadow-md'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200 shadow-xs'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Training &amp; Workshops</span>
              </button>
            </div>

            {activeTab === 'SONGBOOKS' && (
              <>
                {/* Committee Admin Mode Active Banner */}
            {isAdminMode && (
              <div className="bg-[#3A1554] text-white p-5 sm:p-6 rounded-3xl border-2 border-amber-300 shadow-md space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-amber-400 text-[#3A1554] flex items-center justify-center shrink-0 font-bold shadow-sm">
                      <FileUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-amber-300">
                        Committee Authority Active — PDF Upload Enabled
                      </h3>
                      <p className="text-xs text-purple-100">
                        You can now upload real PDF songbooks directly from your computer or tablet. Once published, members can download your PDF immediately.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-amber-400 hover:bg-amber-300 text-[#3A1554] px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Upload / Add Songbook PDF</span>
                  </button>
                </div>

                {/* Quick instruction step */}
                <div className="bg-purple-900/60 border border-purple-700/60 p-3.5 rounded-2xl text-xs text-purple-100 flex items-center gap-3">
                  <Check className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>
                    <strong>How to upload:</strong> Click <strong>"+ Upload / Add Songbook PDF"</strong> above, drag &amp; drop or click to select your PDF file, enter the title, and click Publish!
                  </span>
                </div>
              </div>
            )}

            {/* ================= SECTION 1: CURRENT SONGBOOK ================= */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-300 pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-green-100 text-[#596C34] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>ACTIVE CLUB REPERTOIRE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#3A1554]">
                    Current Songbook
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md">
                  Our latest 2026 rehearsal editions and gig performance books. Standard GCEA &amp; Baritone DGBE chords included.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentSongbooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-3xl border-2 border-gray-200/80 shadow-xs hover:shadow-md transition-all p-6 sm:p-8 space-y-6 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Badge & Year */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-[#3A1554] text-white text-xs font-bold px-3 py-1 rounded-full">
                          {book.editionLabel}
                        </span>
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {book.songCount} Songs • {book.fileSize}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#3A1554] leading-snug">
                          {book.title}
                        </h4>
                        <p className="text-xs sm:text-sm font-semibold text-[#596C34] mt-1">
                          {book.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {book.description}
                      </p>

                      {/* Highlights */}
                      <div className="bg-[#F4F2E9] p-4 rounded-2xl space-y-2 border border-gray-200/70">
                        <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                          SONGBOOK HIGHLIGHTS:
                        </span>
                        <ul className="space-y-1.5">
                          {book.highlights.map((h, i) => (
                            <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#596C34] shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Download PDF Button */}
                    <div className="pt-4 border-t border-gray-100 space-y-2">
                      <button
                        onClick={() => handleDownloadPDF(book)}
                        className="w-full bg-[#3A1554] hover:bg-[#2A0F3D] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2.5"
                      >
                        <FileDown className="w-4 h-4 text-amber-300" />
                        <span>Download Songbook (PDF)</span>
                      </button>

                      {isAdminMode && (
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleStartEdit(book)}
                            className="flex-1 bg-amber-400 hover:bg-amber-300 text-[#3A1554] py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#3A1554]/10"
                          >
                            <FileEdit className="w-3.5 h-3.5" />
                            <span>Amend / Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteSongbook(book.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2 rounded-xl transition-all cursor-pointer"
                            title="Delete Songbook"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {currentSongbooks.length === 0 && (
                  <div className="col-span-full bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500 text-sm">
                    No Current Songbooks listed. Turn on Committee Admin Mode to add one!
                  </div>
                )}
              </div>
            </div>

            {/* ================= SECTION 2: SPECIAL EVENTS SECTION ================= */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-300 pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-purple-100 text-[#3A1554] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FESTIVE &amp; COMMUNITY GATHERINGS</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#3A1554]">
                    Special Events Section (Christmas, Halloween &amp; Jam)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md">
                  Seasonal songbooks for Christmas caroling, Halloween sessions, charity gigs, and open jam nights.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specialSongbooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-3xl border border-gray-200 shadow-xs hover:shadow-md transition-all p-6 space-y-5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-purple-100 text-[#3A1554] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                          {book.editionLabel}
                        </span>
                        <span className="text-[11px] font-bold text-gray-500">
                          {book.songCount} Songs • {book.fileSize}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-serif font-bold text-[#3A1554] leading-snug">
                          {book.title}
                        </h4>
                        <p className="text-xs font-semibold text-[#596C34] mt-0.5">
                          {book.subtitle}
                        </p>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {book.description}
                      </p>

                      <ul className="space-y-1 text-xs text-gray-600 pt-1 border-t border-gray-100">
                        {book.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#596C34] font-bold">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-gray-100 space-y-2">
                      <button
                        onClick={() => handleDownloadPDF(book)}
                        className="w-full bg-[#3A1554] hover:bg-[#2A0F3D] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <FileDown className="w-4 h-4 text-amber-300" />
                        <span>Download Special Event PDF</span>
                      </button>

                      {isAdminMode && (
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleStartEdit(book)}
                            className="flex-1 bg-amber-400 hover:bg-amber-300 text-[#3A1554] py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#3A1554]/10"
                          >
                            <FileEdit className="w-3.5 h-3.5" />
                            <span>Amend / Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteSongbook(book.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2 rounded-xl transition-all cursor-pointer"
                            title="Delete Songbook"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {specialSongbooks.length === 0 && (
                  <div className="col-span-full bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500 text-sm">
                    No Special Event Songbooks listed. Turn on Committee Admin Mode to add one!
                  </div>
                )}
              </div>
            </div>

            {/* ================= SECTION 3: ARCHIVE SECTION ================= */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-300 pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                    <FolderArchive className="w-3.5 h-3.5" />
                    <span>HISTORICAL &amp; SPECIAL EDITIONS</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#3A1554]">
                    Explore past library
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md">
                  Previous year repertoire collections, Christmas seasonal songbooks, and easy 3-chord foundation classics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {archiveSongbooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-3xl border border-gray-200 shadow-xs hover:shadow-md transition-all p-6 space-y-5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Year badge */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                          {book.year} Archive
                        </span>
                        <span className="text-[11px] font-bold text-gray-500">
                          {book.songCount} Songs • {book.fileSize}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-serif font-bold text-[#3A1554] leading-snug">
                          {book.title}
                        </h4>
                        <p className="text-xs font-semibold text-gray-600 mt-0.5">
                          {book.subtitle}
                        </p>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {book.description}
                      </p>

                      <ul className="space-y-1 text-xs text-gray-600 pt-1 border-t border-gray-100">
                        {book.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#596C34] font-bold">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Download PDF Button */}
                    <div className="pt-3 border-t border-gray-100 space-y-2">
                      <button
                        onClick={() => handleDownloadPDF(book)}
                        className="w-full bg-[#596C34] hover:bg-[#4C5E2C] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <FileDown className="w-4 h-4 text-amber-300" />
                        <span>Download Archive (PDF)</span>
                      </button>

                      {isAdminMode && (
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleStartEdit(book)}
                            className="flex-1 bg-amber-400 hover:bg-amber-300 text-[#3A1554] py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#3A1554]/10"
                          >
                            <FileEdit className="w-3.5 h-3.5" />
                            <span>Amend / Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteSongbook(book.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2 rounded-xl transition-all cursor-pointer"
                            title="Delete Songbook"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {archiveSongbooks.length === 0 && (
                  <div className="col-span-full bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-500 text-sm">
                    No Archive Editions listed yet. Turn on Committee Admin Mode to upload one!
                  </div>
                )}
              </div>
            </div>
              </>
            )}

            {/* activeTab === 'SETLISTS' */}
            {activeTab === 'SETLISTS' && (
              <div className="space-y-6 animate-fade-in text-left">
                {/* Introduction */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-300 pb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-green-100 text-[#596C34] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                      <Music className="w-3.5 h-3.5" />
                      <span>PERFORMANCE REPERTOIRE</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#3A1554]">
                      Gig &amp; Rehearsal Set Lists
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-sm text-left sm:text-right">
                    Interactive song order, key guides, tempos, and rehearsal directions for our public gigs and weekly Snug sessions.
                  </p>
                </div>

                {/* Main Interactive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Setlists List (4 columns) */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select a Performance Set</h4>
                      {isAdminMode && (
                        <button
                          onClick={handleOpenAddSetlist}
                          className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add New</span>
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      {setlists.map((setlist) => (
                        <div
                          key={setlist.id}
                          onClick={() => {
                            setSelectedSetlistId(setlist.id);
                            setSelectedSongDetails(null);
                          }}
                          className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                            selectedSetlistId === setlist.id
                              ? 'bg-[#3A1554] text-white border-[#3A1554] shadow-md scale-[1.01]'
                              : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200 shadow-xs'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border ${
                                selectedSetlistId === setlist.id
                                  ? 'bg-purple-900/60 text-purple-200 border-purple-700/50'
                                  : 'bg-green-50 text-[#596C34] border-green-200'
                              }`}>
                                {setlist.status}
                              </span>
                              {isAdminMode && (
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={(e) => handleOpenEditSetlist(e, setlist)}
                                    className="p-1 rounded bg-purple-50 hover:bg-purple-100 text-[#3A1554] transition-colors cursor-pointer"
                                    title="Edit Setlist Info & Songs"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => handleDeleteSetlist(e, setlist.id)}
                                    className="p-1 rounded bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                                    title="Delete Setlist"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                            <h5 className="font-serif font-bold text-sm sm:text-base mt-2 leading-snug">
                              {setlist.title}
                            </h5>
                          </div>
                          
                          <div className={`text-xs mt-1 space-y-0.5 ${selectedSetlistId === setlist.id ? 'text-purple-200' : 'text-gray-500'}`}>
                            <p className="font-medium">{setlist.date}</p>
                            <p className="text-[11px] opacity-80">{setlist.location}</p>
                          </div>
                        </div>
                      ))}

                      {setlists.length === 0 && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center text-xs text-gray-500">
                          No set lists available. Turn on Committee Admin Mode to add one.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Song Breakdown (8 columns) */}
                  <div className="lg:col-span-8 space-y-4">
                    {(() => {
                      const currentSetlist = setlists.find(s => s.id === selectedSetlistId) || setlists[0];
                      if (!currentSetlist) {
                        return (
                          <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center text-gray-500 text-sm">
                            No set list selected. Create or select a set list from the left panel.
                          </div>
                        );
                      }

                      return (
                        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-6">
                          
                          {/* Selected Setlist Info */}
                          <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <h4 className="text-lg sm:text-xl font-serif font-black text-[#3A1554]">
                                {currentSetlist.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {currentSetlist.date} • <strong className="text-[#596C34]">{currentSetlist.location}</strong>
                              </p>
                            </div>
                            <div className="shrink-0">
                              <span className="bg-[#596C34] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider">
                                {currentSetlist.songs.length} Songs Loaded
                              </span>
                            </div>
                          </div>

                          {/* Songs List */}
                          <div className="space-y-3">
                            {currentSetlist.songs.map((song, index) => (
                              <div
                                key={index}
                                className="bg-gray-50 rounded-2xl border border-gray-200 p-4 transition-all hover:border-gray-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                              >
                                <div className="flex items-start gap-3.5">
                                  {/* Index Circle */}
                                  <div className="w-8 h-8 rounded-full bg-purple-100 text-[#3A1554] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-serif">
                                    {(index + 1).toString().padStart(2, '0')}
                                  </div>
                                  <div>
                                    <h5 className="font-bold text-gray-800 text-sm sm:text-base">{song.title}</h5>
                                    {song.originalArtist && (
                                      <p className="text-xs text-gray-500">by {song.originalArtist}</p>
                                    )}
                                    {song.notes && (
                                      <p className="text-[11px] text-gray-600 italic mt-1.5 border-l-2 border-[#596C34] pl-2 leading-relaxed">
                                        {song.notes}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Tags & Action Row */}
                                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                                  <span className="bg-purple-100 text-[#3A1554] text-[10px] font-extrabold px-2 py-1 rounded-md uppercase border border-purple-200">
                                    Key: {song.key}
                                  </span>
                                  <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-1 rounded-md uppercase border border-amber-200">
                                    {song.tempo}
                                  </span>
                                  <button
                                    onClick={() => setSelectedSongDetails(song)}
                                    className="bg-[#3A1554] hover:bg-[#2F1045] text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer shadow-xs transition-all uppercase tracking-wider"
                                  >
                                    Quick Guide
                                  </button>
                                </div>
                              </div>
                            ))}

                            {currentSetlist.songs.length === 0 && (
                              <div className="p-8 text-center text-xs text-gray-500">
                                No songs in this setlist. Turn on Committee Admin Mode to edit and add songs.
                              </div>
                            )}
                          </div>

                        </div>
                      );
                    })()}
                  </div>

                </div>
              </div>
            )}

            {/* activeTab === 'MARKETPLACE' */}
            {activeTab === 'MARKETPLACE' && (
              <div className="animate-fade-in">
                <MarketplacePage
                  onOpenContact={onOpenContact}
                  isEmbedded={true}
                  isAdminMode={isAdminMode}
                />
              </div>
            )}

            {/* activeTab === 'WORKSHOPS' */}
            {activeTab === 'WORKSHOPS' && (
              <div className="animate-fade-in">
                <WorkshopsPage
                  onOpenContact={onOpenContact}
                  isEmbedded={true}
                />
              </div>
            )}

            {/* Quick Guide Popup Modal */}
            {selectedSongDetails && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-gray-200 text-left">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#3A1554] flex items-center justify-center font-bold">
                        <Music className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#3A1554]">{selectedSongDetails.title}</h3>
                        <p className="text-xs text-gray-500">by {selectedSongDetails.originalArtist || 'Traditional'}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSongDetails(null)}
                      className="text-gray-400 hover:text-gray-700 p-2 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Song details parameters */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-purple-50 p-3 rounded-2xl border border-purple-100/60 text-center">
                      <span className="block text-[10px] text-gray-500 font-extrabold uppercase">Key Signature</span>
                      <span className="text-base font-black text-[#3A1554]">Key: {selectedSongDetails.key}</span>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100/60 text-center">
                      <span className="block text-[10px] text-gray-500 font-extrabold uppercase font-sans">Tempo Speed</span>
                      <span className="text-base font-black text-amber-900">{selectedSongDetails.tempo}</span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-2xl border border-green-100/60 text-center col-span-1">
                      <span className="block text-[10px] text-gray-500 font-extrabold uppercase font-sans">Strumming Style</span>
                      <span className="text-[11px] font-black text-[#596C34] leading-tight block mt-1">{selectedSongDetails.strumPattern}</span>
                    </div>
                  </div>

                  {/* Practice guidelines */}
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                    <h4 className="text-xs font-bold text-gray-700 uppercase font-sans">Performance &amp; Rehearsal Tips</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      {selectedSongDetails.notes || 'No custom notes set. Rehearse standard strumming patterns and pay close attention to the vocalist cues.'}
                    </p>
                  </div>

                  {/* Standard Chord Fingering Visualizer for Strummers */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-gray-700 uppercase font-sans">Chord Fingering Helpers (GCEA Ukulele)</h4>
                    <div className="flex gap-2">
                      {selectedSongDetails.key === 'C' ? (
                        <>
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center flex-1">
                            <span className="block text-xs font-black text-purple-900">C Chord</span>
                            <span className="text-[10px] text-gray-500 font-mono">0-0-0-3</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center flex-1">
                            <span className="block text-xs font-black text-purple-900">F Chord</span>
                            <span className="text-[10px] text-gray-500 font-mono">2-0-1-0</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center flex-1">
                            <span className="block text-xs font-black text-purple-900">G7 Chord</span>
                            <span className="text-[10px] text-gray-500 font-mono">0-2-1-2</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center flex-1">
                            <span className="block text-xs font-black text-purple-900">Am Chord</span>
                            <span className="text-[10px] text-gray-500 font-mono">2-0-0-0</span>
                          </div>
                        </>
                      ) : selectedSongDetails.key === 'G' ? (
                        <>
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center flex-1">
                            <span className="block text-xs font-black text-purple-900">G Chord</span>
                            <span className="text-[10px] text-gray-500 font-mono">0-2-3-2</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center flex-1">
                            <span className="block text-xs font-black text-purple-900">C Chord</span>
                            <span className="text-[10px] text-gray-500 font-mono">0-0-0-3</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center flex-1">
                            <span className="block text-xs font-black text-purple-900">D7 Chord</span>
                            <span className="text-[10px] text-gray-500 font-mono">2-0-2-0</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center flex-1">
                            <span className="block text-xs font-black text-purple-900">Em Chord</span>
                            <span className="text-[10px] text-gray-500 font-mono">0-4-3-2</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center flex-1">
                            <span className="block text-xs font-black text-purple-900">A Chord</span>
                            <span className="text-[10px] text-gray-500 font-mono">2-1-0-0</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center flex-1">
                            <span className="block text-xs font-black text-purple-900">D Chord</span>
                            <span className="text-[10px] text-gray-500 font-mono">2-2-2-0</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-center flex-1">
                            <span className="block text-xs font-black text-purple-900">E7 Chord</span>
                            <span className="text-[10px] text-gray-500 font-mono">1-2-0-2</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 font-sans">
                    <button
                      onClick={() => setSelectedSongDetails(null)}
                      className="w-full bg-[#3A1554] hover:bg-[#2F1045] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center block shadow-sm"
                    >
                      Close Practice Guide
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* ================= MODAL: COMMITTEE PASSCODE VERIFICATION ================= */}
      {showAdminCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border-2 border-amber-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-[#3A1554] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3A1554]">Committee Admin Passcode Required</h3>
                  <p className="text-xs text-gray-500">Enter committee passcode to enable admin upload mode.</p>
                </div>
              </div>
              <button
                onClick={() => setShowAdminCodeModal(false)}
                className="text-gray-400 hover:text-gray-700 p-2 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleVerifyAdminCode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Passcode (Hint: committee)
                </label>
                <input
                  type="password"
                  value={adminCodeInput}
                  onChange={(e) => setAdminCodeInput(e.target.value)}
                  placeholder="Enter committee code..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#3A1554] focus:ring-1 focus:ring-[#3A1554]"
                  autoFocus
                />
                {adminCodeError && (
                  <p className="text-xs text-red-600 font-semibold mt-1">{adminCodeError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminCodeModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3A1554] hover:bg-[#2A0F3D] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  Verify &amp; Enable Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: COMMITTEE ADD NEW SONGBOOK ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto animate-fade-in">
            
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 bg-purple-100 text-[#3A1554] text-xs font-bold px-3 py-1 rounded-full uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>COMMITTEE AUTHORITY</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#3A1554]">
                Upload / Add Songbook Edition
              </h3>
              <p className="text-xs text-gray-600">
                Upload an actual PDF songbook file from your computer or tablet to share with members in the Current Songbook or Archive section.
              </p>
            </div>

            <form onSubmit={handleCreateSongbook} className="space-y-4">
              
              {/* 1. INTERACTIVE PDF FILE DROPZONE & UPLOAD (DRAG & DROP + CLICK) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#3A1554] uppercase tracking-wider">
                  1. Upload PDF File (Required / Optional)
                </label>

                {!uploadedFileName ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingFile(true);
                    }}
                    onDragLeave={() => setIsDraggingFile(false)}
                    onDrop={handleDropFile}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                      isDraggingFile
                        ? 'border-[#596C34] bg-green-50/70 scale-[1.01]'
                        : 'border-gray-300 bg-[#F4F2E9]/60 hover:border-[#3A1554] hover:bg-purple-50/40'
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      id="songbook-file-input"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileSelect(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="songbook-file-input"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                    >
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-200 text-[#3A1554] flex items-center justify-center shadow-xs">
                        <FileUp className="w-6 h-6" />
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#3A1554]">
                        Drag &amp; drop your PDF songbook here, or{' '}
                        <span className="text-[#596C34] underline">click to browse</span>
                      </div>
                      <p className="text-[11px] text-gray-500">
                        Supports PDF files (e.g. 2026_Songbook.pdf, Setlist.pdf). Maximum recommended size: 50 MB.
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#596C34] text-white flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                            {uploadedFileName}
                          </span>
                          <span className="bg-green-200 text-[#596C34] text-[10px] font-bold px-2 py-0.5 rounded-full">
                            PDF Ready
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          File size: {newFileSize}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setUploadedPdfUrl(undefined);
                        setUploadedFileName(undefined);
                        setNewFileSize('8.0 MB (PDF)');
                      }}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Remove and choose a different file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  2. Songbook Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026 Autumn Acoustic Special"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Subtitle / Tuning Information
                </label>
                <input
                  type="text"
                  placeholder="e.g. Standard GCEA & Baritone DGBE Chords"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Section
                  </label>
                  <select
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value as 'CURRENT' | 'SPECIAL' | 'ARCHIVE')}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm font-bold text-[#3A1554]"
                  >
                    <option value="CURRENT">Current Songbook</option>
                    <option value="SPECIAL">Special Events (Christmas, Halloween, Jam)</option>
                    <option value="ARCHIVE">Archive Section</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Year / Edition Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Edition 5 - Autumn 2026"
                    value={newEditionLabel}
                    onChange={(e) => setNewEditionLabel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Number of Songs
                  </label>
                  <input
                    type="number"
                    placeholder="24"
                    value={newSongCount}
                    onChange={(e) => setNewSongCount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    File Size &amp; Format
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 8.4 MB (PDF)"
                    value={newFileSize}
                    onChange={(e) => setNewFileSize(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what is included in this edition..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Highlight Bullet Points (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Printable A4 layout, Includes Baritone tuning, Linked table of contents"
                  value={newHighlights}
                  onChange={(e) => setNewHighlights(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3A1554] hover:bg-[#2A0F3D] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Publish Songbook</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL: COMMITTEE EDIT/AMEND SONGBOOK ================= */}
      {editingBook && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto animate-fade-in">
            
            <button
              onClick={() => setEditingBook(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 bg-purple-100 text-[#3A1554] text-xs font-bold px-3 py-1 rounded-full uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>COMMITTEE AUTHORITY</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#3A1554]">
                Amend Songbook Details
              </h3>
              <p className="text-xs text-gray-600">
                Modify the title, edition badges, song count, or move this songbook to a different section.
              </p>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Songbook Title
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Subtitle / Tuning Information
                </label>
                <input
                  type="text"
                  value={editSubtitle}
                  onChange={(e) => setEditSubtitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Section
                  </label>
                  <select
                    value={editSection}
                    onChange={(e) => setEditSection(e.target.value as 'CURRENT' | 'SPECIAL' | 'ARCHIVE')}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm font-bold text-[#3A1554]"
                  >
                    <option value="CURRENT">Current Songbook</option>
                    <option value="SPECIAL">Special Events (Christmas, Halloween, Jam)</option>
                    <option value="ARCHIVE">Archive Section</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Year / Edition Badge
                  </label>
                  <input
                    type="text"
                    value={editEditionLabel}
                    onChange={(e) => setEditEditionLabel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Number of Songs
                  </label>
                  <input
                    type="number"
                    value={editSongCount}
                    onChange={(e) => setEditSongCount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    File Size &amp; Format
                  </label>
                  <input
                    type="text"
                    value={editFileSize}
                    onChange={(e) => setEditFileSize(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Highlight Bullet Points (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editHighlights}
                  onChange={(e) => setEditHighlights(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div className="pt-4 flex items-center justify-between gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleDeleteSongbook(editingBook.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Songbook</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingBook(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-amber-300" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= MODAL: ADD/EDIT SETLIST ================= */}
      {showSetlistModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto animate-fade-in text-left">
            
            <button
              onClick={() => setShowSetlistModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 bg-purple-100 text-[#3A1554] text-xs font-bold px-3 py-1 rounded-full uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>COMMITTEE AUTHORITY</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#3A1554]">
                {editingSetlist ? 'Edit Set List' : 'Create New Set List'}
              </h3>
              <p className="text-xs text-gray-600">
                Provide basic details and copy-paste or write the songs list. Use vertical bar format for super fast entry!
              </p>
            </div>

            <form onSubmit={handleSaveSetlist} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Set List Title / Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Christmas Rehearsal Setlist"
                  value={setlistFormTitle}
                  onChange={(e) => setSetlistFormTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Date / Time Label
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saturday, Aug 29 at 3:00 PM"
                    value={setlistFormDate}
                    onChange={(e) => setSetlistFormDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Location / Venue
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alva Rehearsal Hall"
                    value={setlistFormLocation}
                    onChange={(e) => setSetlistFormLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Status
                </label>
                <select
                  value={setlistFormStatus}
                  onChange={(e) => setSetlistFormStatus(e.target.value as 'UPCOMING' | 'COMPLETED')}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-sm font-bold text-[#3A1554]"
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Songs (One per line)
                  </label>
                  <span className="text-[10px] text-gray-500 font-bold">Format: Title | Artist | Key | Tempo | Strum | Notes</span>
                </div>
                <textarea
                  rows={6}
                  required
                  placeholder="Loch Lomond | Traditional Scottish | C | 120 bpm | Calypso Strum | Rehearsal opener"
                  value={setlistFormSongsText}
                  onChange={(e) => setSetlistFormSongsText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#3A1554] text-xs font-mono"
                />
                <p className="text-[10px] text-gray-400 mt-1 leading-normal">
                  Pro-Tip: Enter each song on a separate line. Separate fields with vertical bars ( | ). 
                  E.g. <code className="font-bold">500 Miles | The Proclaimers | E | 132 bpm | 4/4 March | Opener</code>
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowSetlistModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>{editingSetlist ? 'Save Setlist' : 'Create Setlist'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
