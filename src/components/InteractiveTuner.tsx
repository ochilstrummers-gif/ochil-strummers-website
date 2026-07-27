import React, { useState } from 'react';
import { Volume2, Music, Sparkles, HelpCircle, RefreshCw } from 'lucide-react';
import { UKULELE_STRINGS, CHORD_FREQUENCIES, playUkuleleNote, playStrumChord } from '../utils/audioTuner';

export const InteractiveTuner: React.FC = () => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [activeChord, setActiveChord] = useState<string>('C');
  const [vibratingString, setVibratingString] = useState<string | null>(null);

  const handlePluckString = (key: string, freq: number) => {
    setActiveNote(key);
    setVibratingString(key);
    playUkuleleNote(freq, 2.0);

    setTimeout(() => {
      setVibratingString(null);
    }, 1200);
  };

  const handleStrumChord = (chordKey: string) => {
    setActiveChord(chordKey);
    playStrumChord(chordKey);
  };

  return (
    <section id="interactive-tuner" className="py-16 bg-[#0F172A] text-[#FAF5EE] border-b border-[#3B1F52] relative overflow-hidden">
      
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#4C1D95_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#4C1D95] border border-[#DDD6FE]/30 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Music className="w-3.5 h-3.5" />
            <span>Interactive Home Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FAF5EE] font-serif">
            Ukulele Tuner & Chord Finder
          </h2>
          <p className="mt-2 text-base text-slate-300 font-medium">
            Standard GCEA Ukulele Tuning. Tap any string to hear its note or pick a chord to practice your finger placements!
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: String Plucker / Tuner */}
          <div className="lg:col-span-6 bg-[#1E293B] rounded-3xl p-6 sm:p-8 border border-[#3B1F52] shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#3B1F52] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#FAF5EE]">Acoustic String Tuner</h3>
                <p className="text-xs text-amber-300">Standard Re-entrant Tuning (G4 - C4 - E4 - A4)</p>
              </div>
              <span className="text-xs font-bold bg-[#4C1D95] text-[#FAF5EE] px-2.5 py-1 rounded-md border border-[#DDD6FE]/20">
                Web Audio
              </span>
            </div>

            {/* String Buttons Display */}
            <div className="space-y-3">
              {Object.entries(UKULELE_STRINGS).map(([key, data]) => {
                const isPlucked = vibratingString === key;
                return (
                  <div
                    key={key}
                    onClick={() => handlePluckString(key, data.freq)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isPlucked
                        ? 'bg-[#4C1D95] border-amber-400 shadow-lg scale-[1.02]'
                        : 'bg-[#0F172A] border-[#3B1F52] hover:border-[#6D28D9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full font-black text-lg flex items-center justify-center ${
                        isPlucked ? 'bg-amber-400 text-[#0F172A]' : 'bg-[#3B1F52] text-amber-300'
                      }`}>
                        {key}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#FAF5EE]">{data.name}</p>
                        <p className="text-xs text-slate-400">{data.freq} Hz</p>
                      </div>
                    </div>

                    {/* Visual String Graphic */}
                    <div className="flex-1 max-w-[120px] sm:max-w-[180px] mx-3">
                      <div className={`h-1.5 rounded-full ukulele-string ${isPlucked ? 'string-vibrating bg-amber-300' : ''}`} />
                    </div>

                    <button className="p-2 rounded-lg bg-[#3B1F52] hover:bg-[#6D28D9] text-amber-300 transition-colors">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-400 text-center font-medium">
              💡 Tip: Match your ukulele strings to these tones before joining us on Thursday!
            </p>

          </div>

          {/* Right Column: Beginner Chord Finger Placement Visualizer */}
          <div className="lg:col-span-6 bg-[#1E293B] rounded-3xl p-6 sm:p-8 border border-[#3B1F52] shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#3B1F52] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#FAF5EE]">Essential Beginner Chords</h3>
                <p className="text-xs text-amber-300">The "Golden Four" chords used in 90% of songs</p>
              </div>
              <button
                onClick={() => handleStrumChord(activeChord)}
                className="bg-amber-500 hover:bg-amber-400 text-[#0F172A] font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                Strum {activeChord}
              </button>
            </div>

            {/* Chord Selector Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {['C', 'G', 'Am', 'F'].map((chord) => (
                <button
                  key={chord}
                  onClick={() => handleStrumChord(chord)}
                  className={`py-3 rounded-xl font-black text-base sm:text-lg transition-all border ${
                    activeChord === chord
                      ? 'bg-gradient-to-br from-[#6D28D9] to-[#4C1D95] text-amber-300 border-amber-400 shadow-md scale-105'
                      : 'bg-[#0F172A] text-slate-300 border-[#3B1F52] hover:bg-[#260E40]'
                  }`}
                >
                  {chord}
                </button>
              ))}
            </div>

            {/* Chord Fretboard Diagram Container */}
            <div className="bg-[#0F172A] p-6 rounded-2xl border border-[#3B1F52] text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-black text-amber-300 font-serif">{activeChord} Major Chord</span>
                <span className="text-xs bg-[#4C1D95] text-[#FAF5EE] px-2 py-0.5 rounded font-bold">
                  {activeChord === 'C' && '1 Finger'}
                  {activeChord === 'Am' && '1 Finger'}
                  {activeChord === 'F' && '2 Fingers'}
                  {activeChord === 'G' && '3 Fingers'}
                </span>
              </div>

              {/* Graphical Chord Box Representation */}
              <div className="max-w-[220px] mx-auto p-4 fretboard-neck rounded-xl text-xs space-y-2">
                <div className="text-amber-200 font-bold text-[10px] tracking-wider uppercase mb-1">
                  Strings: G C E A (Nut at top)
                </div>

                {/* Finger placement hints */}
                {activeChord === 'C' && (
                  <div className="text-left space-y-1 text-slate-200 font-medium">
                    <p>• <strong>G (4th):</strong> Open String (0)</p>
                    <p>• <strong>C (3rd):</strong> Open String (0)</p>
                    <p>• <strong>E (2nd):</strong> Open String (0)</p>
                    <p>• <strong>A (1st):</strong> 3rd Fret (Ring Finger) 🟡</p>
                  </div>
                )}

                {activeChord === 'Am' && (
                  <div className="text-left space-y-1 text-slate-200 font-medium">
                    <p>• <strong>G (4th):</strong> 2nd Fret (Middle Finger) 🟡</p>
                    <p>• <strong>C (3rd):</strong> Open String (0)</p>
                    <p>• <strong>E (2nd):</strong> Open String (0)</p>
                    <p>• <strong>A (1st):</strong> Open String (0)</p>
                  </div>
                )}

                {activeChord === 'F' && (
                  <div className="text-left space-y-1 text-slate-200 font-medium">
                    <p>• <strong>G (4th):</strong> 2nd Fret (Middle Finger) 🟡</p>
                    <p>• <strong>C (3rd):</strong> Open String (0)</p>
                    <p>• <strong>E (2nd):</strong> 1st Fret (Index Finger) 🟡</p>
                    <p>• <strong>A (1st):</strong> Open String (0)</p>
                  </div>
                )}

                {activeChord === 'G' && (
                  <div className="text-left space-y-1 text-slate-200 font-medium">
                    <p>• <strong>G (4th):</strong> Open String (0)</p>
                    <p>• <strong>C (3rd):</strong> 2nd Fret (Index Finger) 🟡</p>
                    <p>• <strong>E (2nd):</strong> 3rd Fret (Ring Finger) 🟡</p>
                    <p>• <strong>A (1st):</strong> 2nd Fret (Middle Finger) 🟡</p>
                  </div>
                )}
              </div>

              <p className="text-xs text-amber-200 font-semibold pt-1">
                Press "Strum {activeChord}" above to hear this chord played on a ukulele!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
