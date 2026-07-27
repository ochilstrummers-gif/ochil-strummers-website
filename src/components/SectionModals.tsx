import React, { useState } from 'react';
import { X, Calendar, MapPin, Music, Volume2, Sparkles, Check } from 'lucide-react';
import { playStrumChord } from '../utils/audioTuner';
import photo1 from '../assets/images/photo1.jpeg';
import photo2 from '../assets/images/photo2.jpeg';
import photo3 from '../assets/images/photo3.jpeg';
import photo4 from '../assets/images/photo4.jpeg';

interface ModalProps {
  type: 'CONTACT' | 'EVENTS' | 'SONGBOOK' | 'ABOUT' | 'GALLERY' | null;
  onClose: () => void;
}

export const SectionModals: React.FC<ModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  if (type === 'CONTACT') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 overflow-y-auto animate-fadeIn">
        {/* Dark backdrop */}
        <div onClick={onClose} className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"></div>
        
        {/* Modal Content Card */}
        <div className="relative bg-[#faf9f5] rounded-xl overflow-hidden shadow-2xl max-w-2xl w-full border border-stone-200 flex flex-col md:flex-row z-10 my-auto text-left">
          
          {/* Left Column: Details */}
          <div className="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif text-[#422057] text-xl font-bold">Come Along &amp; Meet Us</h3>
                <p className="text-stone-500 text-xs mt-0.5">We'd love to have you strum along with us!</p>
              </div>
              <button
                onClick={onClose}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-200/60 transition cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Info Rows */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start space-x-2.5">
                <svg className="w-4 h-4 text-[#52792c] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>
                  <h4 className="text-stone-800 font-bold uppercase text-[10px] tracking-wider">Venue</h4>
                  <p className="text-stone-700 font-semibold mt-0.5">The Johnstone Arms Hotel</p>
                  <p className="text-stone-500 text-xs">55 Stirling St, Alva FK12 5ED, Clackmannanshire</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <svg className="w-4 h-4 text-[#52792c] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div>
                  <h4 className="text-stone-800 font-bold uppercase text-[10px] tracking-wider">When we meet</h4>
                  <p className="text-stone-500 text-xs mt-0.5">Regular strum-along sessions every Monday at 7.30pm to 9.30pm</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <svg className="w-4 h-4 text-[#52792c] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <div>
                  <h4 className="text-stone-800 font-bold uppercase text-[10px] tracking-wider">Experience Level</h4>
                  <p className="text-stone-500 text-xs mt-0.5">No experience required! Free songbooks provided.</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Johnstone+Arms+Alva+Scotland"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 bg-[#52792c] hover:bg-[#3d5c21] text-white px-4 py-2 rounded-full font-semibold text-xs tracking-wider transition duration-150"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
              <button
                onClick={onClose}
                className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-2 rounded-full font-semibold text-xs tracking-wider transition duration-150 cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>

          {/* Right Column: Map Embed */}
          <div className="w-full md:w-[240px] h-[180px] md:h-auto border-t md:border-t-0 md:border-l border-stone-200 bg-stone-100 relative min-h-[180px]">
            <iframe
              title="Google Map location of The Johnstone Arms"
              src="https://maps.google.com/maps?q=The%20Johnstone%20Arms%20Hotel,%20Alva,%20Scotland&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF8F2] border-2 border-[#3A1554] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-[#1A1A1A] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-[#3A1554] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* CONTACT & JOIN US FORM */}
        {(type === 'CONTACT') && (
          <div>
            {!submitted ? (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-black font-serif text-[#3A1554]">Get In Touch</h3>
                  <p className="text-xs text-gray-600 font-medium">
                    We'd love to meet you at Ochil Strummers! Leave your details below to come along to our next session.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="block font-bold text-gray-800 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fiona MacLeod"
                      className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-[#3A1554] outline-none text-sm font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-800 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="fiona@example.com"
                        className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-[#3A1554] outline-none text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-800 mb-1">Phone (Optional)</label>
                      <input
                        type="tel"
                        placeholder="07123 456789"
                        className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-[#3A1554] outline-none text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-800 mb-1">Experience Level</label>
                    <select className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-[#3A1554] outline-none text-sm font-medium">
                      <option>Complete Beginner (Never played before)</option>
                      <option>Novice (Know a few chords)</option>
                      <option>Intermediate Strummer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-800 mb-1">Message / Questions</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Can I borrow a ukulele for my first session?"
                      className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:border-[#3A1554] outline-none text-sm font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#596C34] hover:bg-[#4C5E2C] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs transition-colors shadow-md"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-500">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black font-serif text-[#3A1554]">Thank You!</h3>
                <p className="text-sm font-medium text-gray-700">
                  We've received your message and can't wait to welcome you to Ochil Strummers!
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#3A1554] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase"
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
        )}

        {/* EVENTS MODAL */}
        {type === 'EVENTS' && (
          <div className="space-y-4">
            <div className="text-center border-b border-gray-200 pb-3">
              <h3 className="text-2xl font-black font-serif text-[#3A1554]">All Upcoming Events</h3>
              <p className="text-xs text-gray-600 font-medium">Join us at local gatherings, jam nights, and fairs</p>
            </div>

            <div className="space-y-3">
              {[
                { date: 'AUG 13', title: 'Jam Night', venue: 'The Johnstone Arms, Alva', time: '7.30pm to 10.00pm' },
                { date: 'AUG 18', title: 'Stroke Association', venue: 'Clackmannanshire Stroke Support Group', time: '1.00pm to 2.00pm' },
                { date: 'SEP 10', title: 'Breathe Easy', venue: 'St Mungos Church', time: '1.30pm to 2.30pm' },
                { date: 'JUL 23', title: 'Summer Folk Session', venue: 'Dollar Community Centre', time: '7:30pm' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#4E5D2B] text-white font-bold text-xs px-2.5 py-1.5 rounded-lg text-center">
                      {item.date}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.venue} • {item.time}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#596C34] bg-[#EBF0E1] px-2.5 py-1 rounded-full">
                    Open to All
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SONGBOOK MODAL */}
        {type === 'SONGBOOK' && (
          <div className="space-y-4">
            <div className="text-center border-b border-gray-200 pb-3">
              <h3 className="text-2xl font-black font-serif text-[#3A1554]">Members Songbook</h3>
              <p className="text-xs text-gray-600 font-medium">Tap any chord button to hear its acoustic ukulele sound</p>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { title: "I'm Gonna Be (500 Miles)", artist: "The Proclaimers", chords: ['C', 'F', 'G'] },
                { title: "Wild Mountain Thyme", artist: "Traditional Scottish", chords: ['C', 'G', 'Am', 'F'] },
                { title: "Caledonia", artist: "Dougie MacLean", chords: ['C', 'G', 'Am', 'F'] },
                { title: "You Are My Sunshine", artist: "Johnny Cash", chords: ['C', 'F', 'G7'] },
              ].map((song, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-gray-900">{song.title}</h4>
                    <span className="text-[10px] text-gray-500 font-medium">Artist: {song.artist}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="font-bold text-gray-600">Chords:</span>
                    {song.chords.map((chord) => (
                      <button
                        key={chord}
                        onClick={() => playStrumChord(chord)}
                        className="bg-[#EBF0E1] hover:bg-[#596C34] hover:text-white text-[#596C34] px-2.5 py-1 rounded-md font-bold transition-colors flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        {chord}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABOUT MODAL */}
        {type === 'ABOUT' && (
          <div className="space-y-4 text-xs sm:text-sm font-medium text-gray-700 leading-relaxed">
            <div className="text-center border-b border-gray-200 pb-3">
              <h3 className="text-2xl font-black font-serif text-[#3A1554]">About Ochil Strummers</h3>
              <p className="text-xs text-gray-600 font-medium">Central Scotland's Friendliest Ukulele Club</p>
            </div>
            <p>
              Ochil Strummers was formed to bring people together across Alva, Tillicoultry, Dollar, Alloa, and Stirling for weekly music, fun, and warm community spirit.
            </p>
            <p>
              We believe music should be accessible to everyone — no auditions, no requirement to read sheet music, and no previous experience needed!
            </p>
          </div>
        )}

        {/* GALLERY MODAL */}
        {type === 'GALLERY' && (
          <div className="space-y-4">
            <div className="text-center border-b border-gray-200 pb-3">
              <h3 className="text-2xl font-black font-serif text-[#3A1554]">Club Photo Gallery</h3>
              <p className="text-xs text-gray-600 font-medium">Moments from our strum nights and community outings</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[photo1, photo2, photo3, photo4].map((src, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                  <img src={src} alt="Gallery item" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
