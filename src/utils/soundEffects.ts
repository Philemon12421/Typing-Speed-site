import { SoundProfile } from '../types';

class SoundSynthesizer {
  private audioCtx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  playKeyPress(profile: SoundProfile, volume = 0.5, isSpace = false, isError = false) {
    if (profile === 'silent' || volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      const masterVol = Math.max(0.01, Math.min(1, volume));

      if (isError) {
        // Low error buzz
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

        gain.gain.setValueAtTime(masterVol * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
        return;
      }

      switch (profile) {
        case 'cherry_mx': {
          // Sharp metallic click + thock
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(isSpace ? 350 : 650, now);
          osc1.frequency.exponentialRampToValueAtTime(isSpace ? 100 : 200, now + 0.03);

          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(isSpace ? 800 : 1200, now);
          osc2.frequency.exponentialRampToValueAtTime(300, now + 0.02);

          gain.gain.setValueAtTime(masterVol * 0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.04);
          osc2.stop(now + 0.04);
          break;
        }

        case 'typewriter': {
          // Sharp high snap + wooden resonance
          const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(isSpace ? 1500 : 2800, now);
          filter.Q.setValueAtTime(3, now);

          gain.gain.setValueAtTime(masterVol * 0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

          whiteNoise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          whiteNoise.start(now);
          whiteNoise.stop(now + 0.03);
          break;
        }

        case 'soft': {
          // Smooth warm pop
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(isSpace ? 280 : 420, now);
          osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

          gain.gain.setValueAtTime(masterVol * 0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.04);
          break;
        }

        case 'click':
        default: {
          // Clean modern digital UI click
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(isSpace ? 500 : 900, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.02);

          gain.gain.setValueAtTime(masterVol * 0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.02);
          break;
        }
      }
    } catch (e) {
      // Ignore audio synthesis errors silently
    }
  }
}

export const soundSynth = new SoundSynthesizer();
