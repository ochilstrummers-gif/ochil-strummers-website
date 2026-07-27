import React from 'react';
import { Facebook, Mail } from 'lucide-react';

interface HeaderProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeNav, setActiveNav, onOpenContact }) => {
  const navItems = [
    { id: 'HOME', label: 'HOME' },
    { id: 'ABOUT US', label: 'ABOUT US' },
    { id: 'EVENTS', label: 'EVENTS' },
    { id: 'SONGBOOK', label: 'SONGBOOK (MEMBERS)' },
    { id: 'GALLERY', label: 'GALLERY' },
    { id: 'JOIN US', label: 'JOIN US' },
    { id: 'CONTACT', label: 'CONTACT' },
  ];

  return (
    <header className="relative z-30 bg-white/95 backdrop-blur-xs border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Left Text Brand / Space */}
          <div 
            onClick={() => setActiveNav('HOME')}
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
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.id === 'CONTACT' || item.id === 'JOIN US') {
                      onOpenContact();
                    }
                  }}
                  className={`text-xs xl:text-sm font-bold tracking-wide transition-colors relative py-1 ${
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

          {/* Right Social & Contact Circle Icons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#3A1554] text-white flex items-center justify-center hover:bg-[#5C1D7A] transition-colors shadow-xs"
              aria-label="Facebook Page"
            >
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5 fill-current stroke-none" />
            </a>

            <button
              onClick={onOpenContact}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#3A1554] text-white flex items-center justify-center hover:bg-[#5C1D7A] transition-colors shadow-xs"
              aria-label="Contact Email"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
