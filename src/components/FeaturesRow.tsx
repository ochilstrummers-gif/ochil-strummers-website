import React from 'react';
import { Guitar, Users, Music } from 'lucide-react';

export const FeaturesRow: React.FC = () => {
  const features = [
    {
      icon: Guitar,
      title: 'BEGINNERS WELCOME',
      description: "No experience needed. We'll help you get started.",
    },
    {
      icon: Users,
      title: 'FRIENDLY COMMUNITY',
      description: 'A relaxed, supportive group that feels like family.',
    },
    {
      icon: Music,
      title: 'PERFORM LOCALLY',
      description: 'Join in at community events or just play for fun.',
    },
  ];

  return (
    <section className="bg-white border-b border-gray-200 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-start gap-4 pt-6 md:pt-0 ${
                  idx === 0
                    ? 'md:pr-6 lg:pr-10'
                    : idx === features.length - 1
                    ? 'md:pl-6 lg:pl-10'
                    : 'md:px-6 lg:px-10'
                }`}
              >
                {/* Light Green Circular Icon Background */}
                <div className="w-14 h-14 rounded-full bg-[#EBF0E1] flex items-center justify-center shrink-0 border border-[#D5E0C2]">
                  <Icon className="w-7 h-7 text-[#596C34] stroke-[1.75]" />
                </div>

                {/* Copy */}
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-black text-[#3A1554] tracking-wider uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
