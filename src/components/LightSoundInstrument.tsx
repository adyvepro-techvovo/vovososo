import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { MATERIAL_PROFILES, type MaterialPreset } from '../utils/soundEngine';

interface LightSoundInstrumentProps {
  apertureDeg: number;
  onApertureChange: (deg: number) => void;
  frequencyHz: number;
  onFrequencyChange: (hz: number) => void;
  material: MaterialPreset;
  onMaterialChange: (mat: MaterialPreset) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onReset: () => void;
}

const MATERIAL_COLORS: Record<
  MaterialPreset,
  { stroke: string; glow: string; surface: string; beamOpacity: number }
> = {
  brass: {
    stroke: '#C88A2B',
    glow: 'rgba(200, 138, 43, 0.16)',
    surface: '#1F1B16',
    beamOpacity: 0.72,
  },
  basalt: {
    stroke: '#71717A',
    glow: 'rgba(113, 113, 122, 0.14)',
    surface: '#141416',
    beamOpacity: 0.48,
  },
  borosilicate: {
    stroke: '#C8281E',
    glow: 'rgba(200, 40, 30, 0.18)',
    surface: '#1A1516',
    beamOpacity: 0.85,
  },
};

export function LightSoundInstrument({
  apertureDeg,
  onApertureChange,
  frequencyHz,
  onFrequencyChange,
  material,
  onMaterialChange,
  isAudioPlaying,
  onToggleAudio,
  onReset,
}: LightSoundInstrumentProps) {
  const visual = MATERIAL_COLORS[material];
  const profile = MATERIAL_PROFILES[material];

  // Compute geometric refraction rays based on apertureDeg & frequencyHz
  const rayCount = 9;
  const centerX = 240;
  const centerY = 170;
  const spreadRad = (apertureDeg * Math.PI) / 180;
  const harmonicShift = ((frequencyHz - 110) / 110) * 18;

  const rays = Array.from({ length: rayCount }, (_, idx) => {
    const t = idx / (rayCount - 1) - 0.5;
    const angle = t * spreadRad - 0.14;
    const len = 175 + Math.cos(t * Math.PI) * 55;
    const x2 = centerX + Math.cos(angle) * len;
    const y2 = centerY + Math.sin(angle) * len + (idx % 2 === 0 ? harmonicShift * 0.2 : -harmonicShift * 0.2);
    return { id: idx, x2, y2, weight: 1.5 - Math.abs(t) * 0.9 };
  });

  // Standing-wave harmonic curve points
  const wavePath = Array.from({ length: 48 }, (_, i) => {
    const x = 36 + (i / 47) * 448;
    const norm = i / 47;
    const cycles = 2 + ((frequencyHz - 110) / 110) * 3;
    const amp = (apertureDeg / 78) * 26 * Math.sin(norm * Math.PI);
    const y = 278 + Math.sin(norm * Math.PI * cycles * profile.harmonicRatio) * amp;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  return (
    <section
      id="instrument"
      aria-labelledby="instrument-heading"
      className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#E4E4E7] pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-medium tracking-wider text-[#52525B]">
            02. Interactive Acoustic &amp; Optical Bench
          </p>
          <h2
            id="instrument-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl"
          >
            Harmonic Aperture Study
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-[#52525B]">
          Test how our three primary architectural materials modulate caustic light dispersion and harmonic room resonance in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
        {/* Left: Optical & Standing Wave Viewport */}
        <div
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#27272A] p-6 transition-colors duration-300 lg:col-span-7"
          style={{ backgroundColor: visual.surface }}
        >
          <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
            <span className="font-mono tabular-nums">
              Aperture {apertureDeg}° · {frequencyHz} Hz
            </span>
            <span>{profile.label}</span>
          </div>

          <div className="my-4 flex items-center justify-center">
            <svg
              viewBox="0 0 520 330"
              className="h-auto w-full max-w-[520px]"
              role="img"
              aria-label={`Simulated light refraction and standing wave diagram for ${profile.label} at ${apertureDeg} degrees and ${frequencyHz} Hz`}
            >
              <defs>
                <radialGradient id="causticGlow" cx="46%" cy="52%" r="50%">
                  <stop offset="0%" stopColor={visual.stroke} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={visual.stroke} stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ambient glow */}
              <circle cx={centerX} cy={centerY} r="145" fill="url(#causticGlow)" />

              {/* Architectural elevation grid */}
              <line x1="36" y1="40" x2="36" y2="235" stroke="#27272A" strokeWidth="1" />
              <line x1="484" y1="40" x2="484" y2="235" stroke="#27272A" strokeWidth="1" />
              <line x1="36" y1={centerY} x2="484" y2={centerY} stroke="#27272A" strokeDasharray="3 4" strokeWidth="1" />

              {/* Incident beam from left aperture */}
              <line
                x1="48"
                y1={centerY}
                x2={centerX - 18}
                y2={centerY}
                stroke="#F4F4F5"
                strokeWidth="2.5"
                strokeOpacity="0.8"
              />

              {/* Rotating optical prism assembly */}
              <g transform={`translate(${centerX}, ${centerY}) rotate(${(apertureDeg - 45) * 0.6})`}>
                <rect
                  x="-18"
                  y="-34"
                  width="36"
                  height="68"
                  rx="2"
                  fill="none"
                  stroke={visual.stroke}
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="0" r="14" fill="none" stroke="#E4E4E7" strokeWidth="1" strokeOpacity="0.6" />
              </g>

              {/* Refracted caustic rays */}
              {rays.map((ray) => (
                <line
                  key={ray.id}
                  x1={centerX + 12}
                  y1={centerY}
                  x2={ray.x2}
                  y2={ray.y2}
                  stroke={visual.stroke}
                  strokeWidth={ray.weight}
                  strokeOpacity={visual.beamOpacity}
                />
              ))}

              {/* Acoustic standing wave floor */}
              <line x1="36" y1="278" x2="484" y2="278" stroke="#27272A" strokeWidth="1" />
              <path d={wavePath} fill="none" stroke="#FAFAF9" strokeWidth="1.5" strokeOpacity="0.88" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#27272A] pt-4 text-xs text-[#A1A1AA]">
            <span>
              Harmonic Ratio <span className="font-mono tabular-nums text-[#FAFAF9]">1 : {profile.harmonicRatio}</span>
            </span>
            <span>
              Overtone Detune <span className="font-mono tabular-nums text-[#FAFAF9]">±{profile.detuneCents} cents</span>
            </span>
          </div>
        </div>

        {/* Right: Controls Panel */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-white p-6 md:p-8 lg:col-span-5">
          <div className="space-y-7">
            <div>
              <span className="block text-xs font-medium text-[#52525B]">
                01. Chamber Material
              </span>
              <div
                className="mt-2.5 grid grid-cols-3 gap-1 rounded-lg bg-[#F4F4F5] p-1"
                role="group"
                aria-label="Select chamber material"
              >
                {(['brass', 'basalt', 'borosilicate'] as MaterialPreset[]).map((key) => {
                  const active = material === key;
                  const shortLabel =
                    key === 'brass' ? 'Brass' : key === 'basalt' ? 'Basalt' : 'Glass';
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onMaterialChange(key)}
                      className={`min-h-[40px] whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E] ${
                        active
                          ? 'bg-white text-[#111111] shadow-sm'
                          : 'text-[#52525B] hover:text-[#111111]'
                      }`}
                    >
                      {shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="aperture-slider" className="text-xs font-medium text-[#52525B]">
                  02. Optical Aperture Angle
                </label>
                <span className="font-mono text-xs font-medium tabular-nums text-[#111111]">
                  {apertureDeg}°
                </span>
              </div>
              <input
                id="aperture-slider"
                type="range"
                min={12}
                max={78}
                step={1}
                value={apertureDeg}
                onChange={(e) => onApertureChange(Number(e.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E4E4E7] accent-[#C8281E]"
              />
              <div className="mt-1.5 flex justify-between text-[11px] text-[#71717A]">
                <span>Narrow 12°</span>
                <span>Wide 78°</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="frequency-slider" className="text-xs font-medium text-[#52525B]">
                  03. Chamber Fundamental
                </label>
                <span className="font-mono text-xs font-medium tabular-nums text-[#111111]">
                  {frequencyHz} Hz
                </span>
              </div>
              <input
                id="frequency-slider"
                type="range"
                min={110}
                max={220}
                step={1}
                value={frequencyHz}
                onChange={(e) => onFrequencyChange(Number(e.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E4E4E7] accent-[#C8281E]"
              />
              <div className="mt-1.5 flex justify-between text-[11px] text-[#71717A]">
                <span>A2 · 110 Hz</span>
                <span>A3 · 220 Hz</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#E4E4E7] pt-6">
            <button
              type="button"
              onClick={onToggleAudio}
              className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E] ${
                isAudioPlaying
                  ? 'bg-[#111111] text-white hover:bg-[#27272A]'
                  : 'bg-[#C8281E] text-white hover:bg-[#A61E16]'
              }`}
            >
              {isAudioPlaying ? (
                <>
                  <VolumeX className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Mute Room Tone</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Play Room Tone</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onReset}
              aria-label="Reset acoustic bench defaults"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#E4E4E7] bg-white px-4 py-2.5 text-sm font-medium text-[#111111] transition-colors duration-150 hover:bg-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E]"
            >
              <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
