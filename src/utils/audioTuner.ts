// Web Audio Synthesizer for Ukulele Chord Strumming sound

export interface UkuleleString {
  stringNum: number;
  note: string;
  name: string;
  freq: number;
  pitch: string;
}

export const UKULELE_STRINGS: UkuleleString[] = [
  { stringNum: 4, note: 'G4', name: '4th String (G)', freq: 392.00, pitch: 'High G' },
  { stringNum: 3, note: 'C4', name: '3rd String (C)', freq: 261.63, pitch: 'Middle C' },
  { stringNum: 2, note: 'E4', name: '2nd String (E)', freq: 329.63, pitch: 'E4' },
  { stringNum: 1, note: 'A4', name: '1st String (A)', freq: 440.00, pitch: 'High A' },
];

export const CHORD_FREQUENCIES: Record<string, number[]> = {
  C: [392.0, 261.63, 329.63, 523.25], // C chord
  F: [392.0, 261.63, 329.63, 440.0],  // F chord
  G: [392.0, 293.66, 392.0, 493.88],  // G chord
  G7: [392.0, 293.66, 349.23, 493.88], // G7 chord
  Am: [440.0, 261.63, 329.63, 440.0],  // Am chord
};

export const playUkuleleNote = (frequency: number) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.55);
  } catch (err) {
    console.warn('Audio play note failed:', err);
  }
};

export const playStrumChord = (chordName: string) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();

    const freqs = CHORD_FREQUENCIES[chordName] || CHORD_FREQUENCIES['C'];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const strumDelay = idx * 0.04; // 40ms strum stagger
      const startTime = ctx.currentTime + strumDelay;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.25);
    });
  } catch (err) {
    console.warn('Audio play failed:', err);
  }
};
