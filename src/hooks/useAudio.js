import { useCallback, useRef, useState } from 'react';
import { CHROMATIC } from '../data/notes';

export default function useAudio() {
  const ctxRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const timeoutRef = useRef(null);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playChord = useCallback((rootNote, intervals) => {
    const ctx = getContext();
    const now = ctx.currentTime;
    const rootIndex = CHROMATIC.indexOf(rootNote);
    const noteCount = intervals.length;
    const totalDuration = noteCount * 0.12 + 0.5;

    setPlaying(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setPlaying(false), totalDuration * 1000);

    intervals.forEach((interval, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const midi = rootIndex + interval + 60;
      const freq = 440 * Math.pow(2, (midi - 69) / 12);

      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.3, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.5);
    });
  }, [getContext]);

  return { playChord, playing };
}
