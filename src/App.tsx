import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IntroBanner } from './components/IntroBanner';
import { FeaturesRow } from './components/FeaturesRow';
import { Testimonials } from './components/Testimonials';
import { EventsAndPhotosSection } from './components/EventsAndPhotosSection';
import { JoinBanner } from './components/JoinBanner';
import { AboutPage } from './pages/AboutPage';
import { EventsPage } from './components/EventsPage';
import { JoinUsPage } from './components/JoinUsPage';
import { JamNightPage } from './components/JamNightPage';
import { SectionModals } from './components/SectionModals';

export function App() {
  const [activeNav, setActiveNav] = useState('HOME');
  const [activeModal, setActiveModal] = useState<'CONTACT' | 'EVENTS' | 'SONGBOOK' | 'ABOUT' | 'GALLERY' | null>(null);

  const handleNavClick = (navItem: string) => {
    setActiveNav(navItem);
    if (navItem === 'CONTACT') {
      setActiveModal('CONTACT');
    } else if (navItem === 'JOIN US') {
      setActiveModal(null); // Dedicated Join Us page view
    } else if (navItem === 'JAM NIGHT') {
      setActiveModal(null); // Dedicated Jam Night page view
    } else if (navItem === 'EVENTS') {
      setActiveModal(null); // Dedicated page view instead of modal
    } else if (navItem === 'SONGBOOK') {
      setActiveModal('SONGBOOK');
    } else if (navItem === 'ABOUT US') {
      setActiveModal(null); // Dedicated page view instead of modal
    } else if (navItem === 'GALLERY') {
      setActiveModal('GALLERY');
    } else if (navItem === 'HOME') {
      setActiveModal(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F2E9] text-[#1A1A1A] font-sans antialiased selection:bg-[#3A1554] selection:text-white">
      {/* 1. Navigation Header */}
      <Header
        activeNav={activeNav}
        setActiveNav={handleNavClick}
        onOpenContact={() => setActiveModal('CONTACT')}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {activeNav === 'ABOUT US' ? (
          <AboutPage
            onOpenContact={() => setActiveModal('CONTACT')}
            onNavigateHome={() => handleNavClick('HOME')}
          />
        ) : activeNav === 'EVENTS' ? (
          <EventsPage
            onOpenContact={() => setActiveModal('CONTACT')}
            onNavigateHome={() => handleNavClick('HOME')}
          />
        ) : activeNav === 'JOIN US' ? (
          <JoinUsPage
            onOpenContact={() => setActiveModal('CONTACT')}
            onNavigateHome={() => handleNavClick('HOME')}
          />
        ) : activeNav === 'JAM NIGHT' ? (
          <JamNightPage
            onOpenContact={() => setActiveModal('CONTACT')}
            onNavigateHome={() => handleNavClick('HOME')}
            onNavigateEvents={() => handleNavClick('EVENTS')}
          />
        ) : (
          <>
            {/* 2. Hero Section with Panoramic Ochil Hills & Ukulele Group */}
            <Hero onOpenContact={() => setActiveModal('CONTACT')} />

            {/* 3. Thistle Intro Banner ("Music brings people together.") */}
            <IntroBanner />

            {/* 4. 4-Feature Columns Row (Beginners Welcome, Friendly Community, etc.) */}
            <FeaturesRow />

            {/* 5. Member Testimonials */}
            <Testimonials />

            {/* 6. Upcoming Events & Latest Photos Split Grid */}
            <EventsAndPhotosSection
              onOpenEventsModal={() => handleNavClick('EVENTS')}
              onOpenGalleryModal={() => setActiveModal('GALLERY')}
            />

            {/* 7. Footer Callout ("Ready to Join?") */}
            <JoinBanner onOpenContact={() => setActiveModal('CONTACT')} />
          </>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="bg-[#2F1045] text-purple-200 text-xs py-6 border-t border-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <p className="font-bold text-white">Ochil Strummers Ukulele Group • Clackmannanshire & Stirling, Scotland</p>
          <p>© {new Date().getFullYear()} Ochil Strummers. Everyone welcome — Come along and play!</p>
        </div>
      </footer>

      {/* Interactivity Modals */}
      <SectionModals
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}

export default App;
