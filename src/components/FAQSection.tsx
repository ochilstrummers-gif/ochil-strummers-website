import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { FAQS } from '../data/homeData';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleIdx = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 bg-[#FFFDF9] border-b border-[#E8DEC8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F3E8FF] border border-[#DDD6FE] text-[#4C1D95] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-serif">
            New to Ukulele or Ochil Strummers?
          </h2>
          <p className="mt-2 text-base text-[#1E293B]/80 font-medium">
            Everything you need to know before stepping through the doors in Alva.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#4C1D95] bg-[#FAF5EE] shadow-sm'
                    : 'border-[#E8DEC8] bg-[#FFFDF9] hover:border-[#4C1D95]/40'
                }`}
              >
                <button
                  onClick={() => toggleIdx(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-base text-[#0F172A]"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4C1D95] shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#4C1D95]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#1E293B]/85 font-medium leading-relaxed border-t border-[#E8DEC8]/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
