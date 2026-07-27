/**
 * Home Page Data for Ochil Strummers Ukulele Club
 */

export interface SongPreview {
  id: string;
  title: string;
  artist: string;
  chords: string[];
  tempo: string;
  difficulty: 'Beginner' | 'Easy' | 'Intermediate';
  tag: string;
}

export interface ClubStat {
  label: string;
  value: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  avatarSeed: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const NEXT_SESSION = {
  date: 'Thursday, 30th July 2026',
  time: '7:00 PM - 9:00 PM',
  doorsOpen: '6:45 PM (For tea, coffee & tuning)',
  venue: 'Alva Community Centre (Hills View Hall)',
  address: 'Park Street, Alva, FK12 5LJ (Foot of Ochil Hills)',
  cost: '£3 per session (includes tea, coffee & Scottish shortbread)',
  theme: 'Scottish Folk Classics & 80s Sing-alongs',
  loanerUkulelesAvailable: 8,
};

export const FEATURED_SONGS: SongPreview[] = [
  {
    id: '500-miles',
    title: "I'm Gonna Be (500 Miles)",
    artist: 'The Proclaimers',
    chords: ['C', 'F', 'G'],
    tempo: 'Upbeat Strum (132 BPM)',
    difficulty: 'Beginner',
    tag: 'Scottish Favorite',
  },
  {
    id: 'wild-mountain-thyme',
    title: 'Wild Mountain Thyme',
    artist: 'Traditional Scottish Folk',
    chords: ['C', 'G', 'Am', 'F'],
    tempo: 'Gentle Strum (88 BPM)',
    difficulty: 'Beginner',
    tag: 'Folk Classic',
  },
  {
    id: 'you-are-my-sunshine',
    title: 'You Are My Sunshine',
    artist: 'Johnny Cash / Standard',
    chords: ['C', 'F', 'G7'],
    tempo: 'Relaxed (100 BPM)',
    difficulty: 'Beginner',
    tag: 'Warm-up Starter',
  },
  {
    id: 'caledonia',
    title: 'Caledonia',
    artist: 'Dougie MacLean',
    chords: ['C', 'G', 'Am', 'F', 'Dm'],
    tempo: 'Flowing Strum (92 BPM)',
    difficulty: 'Easy',
    tag: 'Anthem Strum',
  },
];

export const CLUB_STATS: ClubStat[] = [
  {
    label: 'Active Strummers',
    value: '55+',
    description: 'Friendly locals of all ages',
    iconName: 'Users',
  },
  {
    label: 'Weekly Practice',
    value: 'Every Thu',
    description: '7:00 PM @ Alva Centre',
    iconName: 'Calendar',
  },
  {
    label: 'Songbook Library',
    value: '180+',
    description: 'Pop, Rock, Folk & Scottish tunes',
    iconName: 'Music',
  },
  {
    label: 'Beginner Friendly',
    value: '100%',
    description: 'Free loaner ukuleles on hand',
    iconName: 'Heart',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Love a Monday night!!!\nAppreciate the time taken in beginners class to get us up to speed.\nHappy, friendly, enthusiastic, helpful and inclusive group.\nWish I'd started years ago!!",
    name: "Carole",
    role: "Member 3 months",
    location: "Alva",
    avatarSeed: "Carole",
  },
  {
    quote: "Was fast approaching the stage of procrastination and boredom and looking for something new when I was introduced to and joined this fantastic group of individuals, all brought together through the shared passion for the Ukulele and the chance to play ‘out of the box’ music together, whether it be training, gigging or jamming the welcoming sense of friendship, togetherness and social aspect is an added bonus in its own right",
    name: "Steph",
    role: "Member for 2 years",
    location: "Sauchie",
    avatarSeed: "Steph",
  },
  {
    quote: "After a life changing diagnosis I thought it was time to stop playing on my own in the house and join a band and play in front of other people. You only live once.",
    name: "Chris",
    role: "Member for 2 years",
    location: "Sauchie",
    avatarSeed: "Chris",
  },
  {
    quote: "Didn't realise I had it on me to learn and play the Ukelele, always plenty of help and encouragement from all members if your stuck. Wish I'd done this year's ago.",
    name: "Derek",
    role: "Member for 2 months",
    location: "Stirling",
    avatarSeed: "Derek",
  },
  {
    quote: "Learning to play the ukulele in such a welcoming group is a joy and fun. A lovely mix of people all there to enjoy playing the ukulele. Love it!.",
    name: "Janet",
    role: "Member for 3 months",
    location: "Alva",
    avatarSeed: "Janet",
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "Do I need to know how to read sheet music or play an instrument?",
    answer: "Not at all! Over 80% of our members started with zero musical experience. We use simplified chord diagrams and lyrics, so you can play along from day one.",
  },
  {
    question: "What if I don't own a ukulele yet?",
    answer: "No problem! We have 8 free loaner ukuleles available every Thursday. Just send us a quick note or arrive 10 minutes early so we can hand you one tuned up and ready.",
  },
  {
    question: "How much does it cost?",
    answer: "Sessions are just £3 to cover room hire, tea, coffee, and biscuits. Your first taster session is completely free!",
  },
  {
    question: "Where and when do you meet?",
    answer: "We meet every Thursday evening from 7:00 PM to 9:00 PM at Alva Community Centre (Park Street, Alva, FK12 5LJ), nestled right under the Ochil Hills.",
  },
];
