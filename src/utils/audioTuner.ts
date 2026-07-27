// Web Audio Synthesizer for Ukulele Chord Strumming sound

export const playStrumChord = (chordName: string) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();

    // Ukulele chord frequencies (gCEA tuning)
    const chordFrequencies: Record<string, number[]> = {
      C: [392.0, 261.63, 329.63, 523.25], // C chord
      F: [392.0, 261.63, 329.63, 440.0],  // F chord
      G: [392.0, 293.66, 392.0, 493.88],  // G chord
      G7: [392.0, 293.66, 349.23, 493.88], // G7 chord
      Am: [440.0, 261.63, 329.63, 440.0],  // Am chord
    };

    const freqs = chordFrequencies[chordName] || chordFrequencies['C'];

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
