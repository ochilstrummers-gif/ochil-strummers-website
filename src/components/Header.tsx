import React, { useState } from 'react';
import { Facebook, Mail, Menu, X, Youtube } from 'lucide-react';

interface HeaderProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onOpenContact: () => void;
}

const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.11V9.3a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.56a6.34 6.34 0 0 0 10.82 4.48c.18-.18.34-.37.48-.58V12a8.28 8.28 0 0 0 5.29 1.93v-3.46a4.85 4.85 0 0 1-3.45-1.57A4.8 4.8 0 0 1 19.59 6.69z"/>
  </svg>
);

export const Header: React.FC<HeaderProps> = ({ activeNav, setActiveNav, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'HOME', label: 'HOME' },
    { id: 'ABOUT US', label: 'ABOUT US' },
    { id: 'EVENTS', label: 'EVENTS & BOOK US' },
    { id: 'SONGBOOK', label: 'SONGBOOK (MEMBERS)' },
    { id: 'JOIN US', label: 'JOIN US' },
  ];

  const handleSelectNav = (id: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-30 bg-white/95 backdrop-blur-xs border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Left Text Brand */}
          <div 
            onClick={() => handleSelectNav('HOME')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-base sm:text-lg font-black tracking-wider text-[#3A1554] font-serif">
              OCHIL STRUMMERS
            </span>
          </div>

          {/* Center Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectNav(item.id)}
                  className={`text-xs xl:text-sm font-bold tracking-wide transition-colors relative py-1 cursor-pointer ${
                    isActive ? 'text-[#3A1554]' : 'text-gray-700 hover:text-[#3A1554]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3A1554] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Social & Contact Circle Icons + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#3A1554] text-white flex items-center justify-center hover:bg-[#5C1D7A] transition-colors shadow-xs"
              aria-label="Facebook Page"
            >
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5 fill-current stroke-none" />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#3A1554] text-white flex items-center justify-center hover:bg-[#5C1D7A] transition-colors shadow-xs"
              aria-label="TikTok Page"
            >
              <TikTokIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#3A1554] text-white flex items-center justify-center hover:bg-[#5C1D7A] transition-colors shadow-xs"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            <button
              onClick={onOpenContact}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#3A1554] text-white flex items-center justify-center hover:bg-[#5C1D7A] transition-colors shadow-xs cursor-pointer"
              aria-label="Contact Email"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-100 text-[#3A1554] flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectNav(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive ? 'bg-[#3A1554] text-white' : 'text-gray-800 hover:bg-purple-50 hover:text-[#3A1554]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
