import React, { useState } from 'react';
import { Clock, ArrowRight, X } from 'lucide-react';
import photo1 from '../assets/images/gallery_outdoor_monument_1785148882137.jpg';
import photo2 from '../assets/images/ukulele_pub_session_1785257120765.jpg';
import photo3 from '../assets/images/gallery_indoor_group_1785148867749.jpg';
import photo4 from '../assets/images/gallery_women_strummers_1785148893490.jpg';

interface EventsAndPhotosSectionProps {
  onOpenEventsModal: () => void;
  onOpenGalleryModal: () => void;
}

export const EventsAndPhotosSection: React.FC<EventsAndPhotosSectionProps> = ({
  onOpenEventsModal,
  onOpenGalleryModal,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const events = [
    {
      month: 'AUG',
      day: '13',
      title: 'Jam Night',
      location: 'The Johnstone Arms, Alva',
      time: '7.30pm to 10.00pm',
    },
    {
      month: 'AUG',
      day: '18',
      title: 'Stroke Association',
      location: 'Clackmannanshire Stroke Support Group',
      time: '1.00pm to 2.00pm',
    },
    {
      month: 'SEP',
      day: '10',
      title: 'Breathe Easy',
      location: 'St Mungos Church',
      time: '1.30pm to 2.30pm',
    },
  ];

  const photos = [
    {
      src: photo1,
      alt: 'Ochil Strummers photo 1',
    },
    {
      src: photo2,
      alt: 'Ochil Strummers photo 2',
    },
    {
      src: photo3,
      alt: 'Ochil Strummers photo 3',
    },
    {
      src: photo4,
      alt: 'Ochil Strummers photo 4',
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: UPCOMING EVENTS */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-black text-[#3A1554] tracking-tight uppercase">
                UPCOMING EVENTS
              </h2>
              <button
                onClick={onOpenEventsModal}
                className="text-xs sm:text-sm font-bold text-[#596C34] hover:text-[#4C5E2C] flex items-center gap-1 transition-colors"
              >
                <span>VIEW ALL EVENTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Event Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {events.map((evt, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-3.5 shadow-xs border border-gray-100 flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    {/* Date Box */}
                    <div className="bg-[#4E5D2B] text-white rounded-lg px-2.5 py-1.5 text-center shrink-0 min-w-[48px]">
                      <span className="block text-[10px] font-bold uppercase tracking-wider leading-none">
                        {evt.month}
                      </span>
                      <span className="block text-lg font-black leading-tight mt-0.5">
                        {evt.day}
                      </span>
                    </div>

                    {/* Event Info */}
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                        {evt.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-medium line-clamp-2 mt-0.5">
                        {evt.location}
                      </p>
                    </div>
                  </div>

                  {/* Time Footer */}
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 pt-1 border-t border-gray-100">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>{evt.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Button */}
            <div className="pt-2">
              <button
                onClick={onOpenEventsModal}
                className="bg-[#3A1554] hover:bg-[#2F1045] text-white px-6 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase transition-colors shadow-xs"
              >
                SEE ALL EVENTS
              </button>
            </div>

          </div>

          {/* Right Column: LATEST PHOTOS */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-black text-[#3A1554] tracking-tight uppercase">
                LATEST PHOTOS
              </h2>
            </div>

            {/* 4 Photo Thumbnails Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhoto(photo.src)}
                  className="aspect-square rounded-xl overflow-hidden shadow-xs border border-gray-200 cursor-pointer group relative bg-white flex items-center justify-center"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
                      photo.src.includes('drawing') ? 'object-contain p-3' : 'object-cover'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-gray-800 bg-white/40 backdrop-blur-xs">
                    Zoom
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Lightbox Modal when clicking a thumbnail */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden p-2">
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedPhoto} alt="Enlarged photo" className="w-full h-auto rounded-xl max-h-[80vh] object-contain mx-auto" />
          </div>
        </div>
      )}
    </section>
  );
};
