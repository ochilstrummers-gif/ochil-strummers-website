import React, { useState } from 'react';
import { X, Check, Sparkles, Music, MapPin, Calendar } from 'lucide-react';
import { NEXT_SESSION } from '../data/homeData';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'Beginner (Never played)',
    needsLoanerUke: 'Yes, please reserve one!',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF5EE] border-2 border-[#3B1F52] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#0F172A] max-h-[90vh] overflow-y-auto">
        
        {/* Tartan Accent Bar Top */}
        <div className="absolute top-0 left-0 right-0 h-2 tartan-accent-strip" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#E8DEC8] hover:bg-[#3B1F52] hover:text-[#FAF5EE] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-5 pt-2">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 bg-[#F3E8FF] border border-[#DDD6FE] text-[#4C1D95] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>First Session Free</span>
              </div>
              <h3 className="text-2xl font-black font-serif text-[#0F172A]">
                Join Us This Monday
              </h3>
              <p className="text-xs text-[#1E293B]/80 font-medium mt-1">
                {NEXT_SESSION.venue} • {NEXT_SESSION.time}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jean Campbell"
                  className="w-full p-3 rounded-xl bg-[#FFFDF9] border border-[#E8DEC8] focus:border-[#4C1D95] focus:ring-1 focus:ring-[#4C1D95] font-medium outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean@example.com"
                    className="w-full p-3 rounded-xl bg-[#FFFDF9] border border-[#E8DEC8] focus:border-[#4C1D95] font-medium outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07123 456789"
                    className="w-full p-3 rounded-xl bg-[#FFFDF9] border border-[#E8DEC8] focus:border-[#4C1D95] font-medium outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Ukulele Experience Level</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#FFFDF9] border border-[#E8DEC8] focus:border-[#4C1D95] font-medium outline-none text-sm"
                >
                  <option>Beginner (Never touched a ukulele)</option>
                  <option>Novice (Know 2 or 3 basic chords)</option>
                  <option>Intermediate (Played before, looking for a club)</option>
                  <option>Experienced Strummer</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Do You Need A Loaner Ukulele?</label>
                <select
                  value={formData.needsLoanerUke}
                  onChange={(e) => setFormData({ ...formData, needsLoanerUke: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#FFFDF9] border border-[#E8DEC8] focus:border-[#4C1D95] font-medium outline-none text-sm"
                >
                  <option>Yes, please reserve a free loaner ukulele for me!</option>
                  <option>No, I will bring my own ukulele</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Any Questions or Comments?</label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Can I bring my teenager along?"
                  className="w-full p-3 rounded-xl bg-[#FFFDF9] border border-[#E8DEC8] focus:border-[#4C1D95] font-medium outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#4C1D95] hover:bg-[#3B1F52] text-[#FAF5EE] font-extrabold py-3.5 rounded-xl shadow-lg border border-[#DDD6FE]/40 transition-all text-sm flex items-center justify-center gap-2 mt-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Confirm My Free Reservation</span>
              </button>
            </form>

            <p className="text-[11px] text-center text-[#1E293B]/70 font-medium">
              🏴󠁧󠁢󠁳󠁣󠁴󠁿 We respect your privacy. No spam — just friendly Scottish ukulele updates!
            </p>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-500">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            
            <h3 className="text-2xl font-black font-serif text-[#0F172A]">
              Haste Ye Back, {formData.name}! 🏴󠁧󠁢󠁳󠁣󠁴󠁿
            </h3>

            <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
              We've saved a spot for you at <strong className="text-[#4C1D95]">The Johnstone Arms Hotel</strong> this Monday at 7:30 PM.
              {formData.needsLoanerUke.includes('Yes') && (
                <span className="block mt-2 font-bold text-[#4C1D95]">
                  🎸 A tuned loaner ukulele will be waiting for you!
                </span>
              )}
            </p>

            <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E8DEC8] text-xs space-y-1.5 text-left">
              <p className="font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#4C1D95]" />
                {NEXT_SESSION.date} @ 7:00 PM
              </p>
              <p className="font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4C1D95]" />
                {NEXT_SESSION.address}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="bg-[#0F172A] hover:bg-[#1E293B] text-[#FAF5EE] font-bold px-6 py-3 rounded-xl text-xs transition-colors"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
