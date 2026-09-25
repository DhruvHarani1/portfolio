"use client";

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!ctx) ctx = new AudioContextClass();
  return ctx;
}

function tone(
  context: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  peakGain: number
) {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.connect(gain);
  gain.connect(context.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

/** A soft two-note startup chime, synthesized — no audio file needed. */
export function playBootChime() {
  const context = getContext();
  if (!context) return;
  if (context.state === "suspended") context.resume();
  const now = context.currentTime;
  tone(context, 523.25, now, 0.5, 0.08); // C5
  tone(context, 783.99, now + 0.12, 0.6, 0.07); // G5
}

/** A quick, subtle click for UI interactions. */
export function playClick() {
  const context = getContext();
  if (!context) return;
  if (context.state === "suspended") context.resume();
  tone(context, 880, context.currentTime, 0.06, 0.03);
}
