export type MaterialPreset = 'brass' | 'basalt' | 'borosilicate';

interface MaterialAcousticProfile {
  label: string;
  filterFreq: number;
  harmonicRatio: number;
  detuneCents: number;
  shimmerGain: number;
}

export const MATERIAL_PROFILES: Record<MaterialPreset, MaterialAcousticProfile> = {
  brass: {
    label: 'Brushed Brass',
    filterFreq: 780,
    harmonicRatio: 1.5,
    detuneCents: 6,
    shimmerGain: 0.14,
  },
  basalt: {
    label: 'Honed Basalt',
    filterFreq: 340,
    harmonicRatio: 1.333,
    detuneCents: 3,
    shimmerGain: 0.06,
  },
  borosilicate: {
    label: 'Borosilicate Glass',
    filterFreq: 1320,
    harmonicRatio: 2.0,
    detuneCents: 9,
    shimmerGain: 0.18,
  },
};

class SpatialSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private oscFund: OscillatorNode | null = null;
  private oscFifth: OscillatorNode | null = null;
  private oscShimmer: OscillatorNode | null = null;
  private shimmerGainNode: GainNode | null = null;
  private isPlaying = false;

  public start(frequencyHz: number, apertureDeg: number, material: MaterialPreset): boolean {
    if (typeof window === 'undefined') return false;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return false;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    if (this.isPlaying) {
      this.update(frequencyHz, apertureDeg, material);
      return true;
    }

    const now = this.ctx.currentTime;
    const profile = MATERIAL_PROFILES[material];

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.09, now + 0.6);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.Q.setValueAtTime(1.4, now);
    const cutoff = this.computeCutoff(profile.filterFreq, apertureDeg);
    this.filter.frequency.setValueAtTime(cutoff, now);

    this.oscFund = this.ctx.createOscillator();
    this.oscFund.type = 'sine';
    this.oscFund.frequency.setValueAtTime(frequencyHz, now);

    this.oscFifth = this.ctx.createOscillator();
    this.oscFifth.type = 'triangle';
    this.oscFifth.frequency.setValueAtTime(frequencyHz * profile.harmonicRatio, now);
    this.oscFifth.detune.setValueAtTime(profile.detuneCents, now);

    const fifthGain = this.ctx.createGain();
    fifthGain.gain.setValueAtTime(0.32, now);

    this.oscShimmer = this.ctx.createOscillator();
    this.oscShimmer.type = 'sine';
    this.oscShimmer.frequency.setValueAtTime(frequencyHz * 3.0, now);
    this.oscShimmer.detune.setValueAtTime(-profile.detuneCents, now);

    this.shimmerGainNode = this.ctx.createGain();
    this.shimmerGainNode.gain.setValueAtTime(profile.shimmerGain, now);

    this.oscFund.connect(this.filter);
    this.oscFifth.connect(fifthGain);
    fifthGain.connect(this.filter);
    this.oscShimmer.connect(this.shimmerGainNode);
    this.shimmerGainNode.connect(this.filter);

    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.oscFund.start(now);
    this.oscFifth.start(now);
    this.oscShimmer.start(now);

    this.isPlaying = true;
    return true;
  }

  public update(frequencyHz: number, apertureDeg: number, material: MaterialPreset): void {
    if (!this.isPlaying || !this.ctx || !this.filter || !this.oscFund || !this.oscFifth || !this.oscShimmer || !this.shimmerGainNode) {
      return;
    }
    const now = this.ctx.currentTime;
    const profile = MATERIAL_PROFILES[material];
    const cutoff = this.computeCutoff(profile.filterFreq, apertureDeg);

    this.oscFund.frequency.setTargetAtTime(frequencyHz, now, 0.08);
    this.oscFifth.frequency.setTargetAtTime(frequencyHz * profile.harmonicRatio, now, 0.08);
    this.oscFifth.detune.setTargetAtTime(profile.detuneCents, now, 0.08);
    this.oscShimmer.frequency.setTargetAtTime(frequencyHz * 3.0, now, 0.08);
    this.shimmerGainNode.gain.setTargetAtTime(profile.shimmerGain, now, 0.08);
    this.filter.frequency.setTargetAtTime(cutoff, now, 0.08);
  }

  public stop(): void {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const gain = this.masterGain;
    const f = this.oscFund;
    const fifth = this.oscFifth;
    const shimmer = this.oscShimmer;

    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    this.isPlaying = false;
    this.oscFund = null;
    this.oscFifth = null;
    this.oscShimmer = null;
    this.masterGain = null;
    this.filter = null;
    this.shimmerGainNode = null;

    window.setTimeout(() => {
      try {
        f?.stop();
        fifth?.stop();
        shimmer?.stop();
        f?.disconnect();
        fifth?.disconnect();
        shimmer?.disconnect();
        gain.disconnect();
      } catch {
        // Ignore nodes already stopped
      }
    }, 400);
  }

  private computeCutoff(baseFreq: number, apertureDeg: number): number {
    const ratio = (apertureDeg - 12) / (78 - 12);
    return baseFreq * (0.55 + ratio * 1.15);
  }
}

export const soundEngine = new SpatialSoundEngine();
