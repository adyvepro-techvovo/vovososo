import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Volume2, VolumeX, X, ChevronDown, ChevronUp } from 'lucide-react';
import {
  ATELIER_WORKS,
  EXHIBITIONS,
  PRINCIPALS,
  STUDIO_METRICS,
  type AtelierWork,
  type PrincipalProfile,
  type WorkCategory,
} from './data/atelierData';
import { soundEngine, type MaterialPreset } from './utils/soundEngine';
import { ResilientImage } from './components/ResilientImage';
import { LightSoundInstrument } from './components/LightSoundInstrument';
import { WorkLightboxModal } from './components/WorkLightboxModal';
import { InquiryModal } from './components/InquiryModal';
import { PrincipalModal } from './components/PrincipalModal';

const FILTER_OPTIONS: { id: WorkCategory; label: string }[] = [
  { id: 'all', label: 'All Works' },
  { id: 'kinetic-light', label: 'Kinetic Light' },
  { id: 'spatial-sound', label: 'Spatial Sound' },
  { id: 'monographs', label: 'Monographs' },
];

const DISCIPLINES = [
  {
    index: '01. Kinetic Optics',
    detail:
      'Counterweighted brass armatures, passive convection vanes, and Murano-annealed borosilicate lenses engineered to track daylight across civic interiors.',
  },
  {
    index: '02. Spatial Acoustics',
    detail:
      'Site-calibrated standing-wave resonators carved from Komatsu basalt and Swiss larch, tuned directly to each gallery’s architectural geometry.',
  },
  {
    index: '03. Monograph Press',
    detail:
      'Limited-edition Swiss-bound architectural books pairing duotone installation photography with impulse-response field-recording archives.',
  },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('all');
  const [selectedWork, setSelectedWork] = useState<AtelierWork | null>(null);
  const [selectedPrincipal, setSelectedPrincipal] = useState<PrincipalProfile | null>(null);
  const [expandedExhibitionId, setExpandedExhibitionId] = useState<string | null>(EXHIBITIONS[0].id);

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Sound & Optical Instrument State
  const [apertureDeg, setApertureDeg] = useState(38);
  const [frequencyHz, setFrequencyHz] = useState(144);
  const [material, setMaterial] = useState<MaterialPreset>('brass');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    if (isAudioPlaying) {
      soundEngine.update(frequencyHz, apertureDeg, material);
    }
  }, [apertureDeg, frequencyHz, material, isAudioPlaying]);

  useEffect(() => {
    return () => {
      soundEngine.stop();
    };
  }, []);

  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      soundEngine.stop();
      setIsAudioPlaying(false);
    } else {
      const started = soundEngine.start(frequencyHz, apertureDeg, material);
      setIsAudioPlaying(started);
    }
  };

  const handleResetInstrument = () => {
    setApertureDeg(38);
    setFrequencyHz(144);
    setMaterial('brass');
  };

  const openInquiry = (subject = '') => {
    setInquirySubject(subject);
    setInquiryOpen(true);
    setMobileMenuOpen(false);
  };

  const filteredWorks =
    activeCategory === 'all'
      ? ATELIER_WORKS
      : ATELIER_WORKS.filter((work) => work.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111111]">
      {/* Top Bar Contract: 3 Zones separated by gap-8 */}
      <header className="sticky top-0 z-40 border-b border-[#E4E4E7] bg-[#FAFAF9]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4 md:px-10">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="shrink-0 whitespace-nowrap font-display text-lg font-semibold tracking-tight text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8281E]"
          >
            Kestrel Atelier
          </a>

          {/* Zone 2: 4 Single-line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 text-sm font-medium text-[#52525B] md:flex"
          >
            <a
              href="#works"
              className="shrink-0 whitespace-nowrap transition-colors hover:text-[#111111] hover:underline hover:underline-offset-4"
            >
              Selected Works
            </a>
            <a
              href="#instrument"
              className="shrink-0 whitespace-nowrap transition-colors hover:text-[#111111] hover:underline hover:underline-offset-4"
            >
              Acoustic Study
            </a>
            <a
              href="#exhibitions"
              className="shrink-0 whitespace-nowrap transition-colors hover:text-[#111111] hover:underline hover:underline-offset-4"
            >
              Exhibitions
            </a>
            <a
              href="#studio"
              className="shrink-0 whitespace-nowrap transition-colors hover:text-[#111111] hover:underline hover:underline-offset-4"
            >
              Studio
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => openInquiry()}
              className="hidden min-h-[40px] shrink-0 whitespace-nowrap rounded-lg bg-[#111111] px-4 py-2 text-xs font-medium text-white transition-colors duration-150 hover:bg-[#C8281E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E] md:inline-flex md:items-center"
            >
              Commission Inquiry
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E4E4E7] bg-white text-[#111111] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen ? (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-[#E4E4E7] bg-[#FAFAF9] px-6 py-4 md:hidden"
          >
            <div className="flex flex-col space-y-3 text-sm font-medium text-[#111111]">
              <a
                href="#works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5"
              >
                Selected Works
              </a>
              <a
                href="#instrument"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5"
              >
                Acoustic Study
              </a>
              <a
                href="#exhibitions"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5"
              >
                Exhibitions
              </a>
              <a
                href="#studio"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5"
              >
                Studio
              </a>
              <button
                type="button"
                onClick={() => openInquiry()}
                className="mt-2 min-h-[44px] w-full whitespace-nowrap rounded-lg bg-[#C8281E] px-4 py-2.5 text-center text-sm font-medium text-white"
              >
                Commission Inquiry
              </button>
            </div>
          </nav>
        ) : null}
      </header>

      <main id="top">
        {/* Hero Split */}
        <section className="mx-auto max-w-[1200px] px-6 pt-12 pb-12 md:px-10 md:pt-16 md:pb-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-xs font-medium text-[#52525B]">
                  Zurich · Kyoto · Spatial Architecture Monograph
                </p>

                <h1 className="mt-4 font-display text-[clamp(2.5rem,4.5vw,3.75rem)] font-semibold leading-[1.06] tracking-tight text-[#111111]">
                  Light as material.{' '}
                  <span className="font-serif-editorial font-normal italic text-[#52525B]">
                    Sound as structure.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#52525B]">
                  Kestrel Atelier is an architectural sculpture and acoustic practice crafting kinetic daylight instruments, carved stone resonators, and limited-edition monographs for civic museums and quiet public spaces.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#works"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#C8281E] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#A61E16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E]"
                >
                  <span>Explore Archive</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleToggleAudio}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#E4E4E7] bg-white px-5 py-2.5 text-sm font-medium text-[#111111] transition-colors duration-150 hover:bg-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E]"
                >
                  {isAudioPlaying ? (
                    <>
                      <VolumeX className="h-4 w-4 shrink-0 text-[#C8281E]" aria-hidden="true" />
                      <span>Mute Room Tone</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 shrink-0 text-[#52525B]" aria-hidden="true" />
                      <span>Listen to Room Tone</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <button
                type="button"
                onClick={() => setSelectedWork(ATELIER_WORKS[0])}
                aria-label="Inspect Heliostat VII installation details"
                className="group relative block h-full min-h-[300px] w-full overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#141416] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8281E]"
              >
                <ResilientImage
                  src={ATELIER_WORKS[0].image}
                  alt={ATELIER_WORKS[0].imageAlt}
                  fallbackTitle="Heliostat VII"
                  fallbackSubtitle="Zurich Kunsthalle · 2026"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] lg:h-full"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-6 text-white">
                  <p className="text-xs text-white/80">
                    Heliostat VII · Kunsthalle Zürich · 2026
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* 4-Column Full-Width KPI Row Below Hero Split */}
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-[#E4E4E7] pt-8 md:grid-cols-4">
            {STUDIO_METRICS.map((metric) => (
              <div key={metric.label}>
                <div className="font-display text-2xl font-semibold tabular-nums tracking-tight text-[#111111] md:text-3xl">
                  {metric.value}
                </div>
                <div className="mt-1 text-xs text-[#52525B]">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Subtle Animated Marquee Ribbon */}
        <div
          aria-hidden="true"
          className="overflow-hidden border-y border-[#E4E4E7] bg-white py-3.5 text-xs tracking-wide text-[#52525B]"
        >
          <div className="animate-marquee">
            <span className="px-6">
              kinetic light · architectural acoustics · spatial installations · monograph editions · zurich &amp; kyoto ·
            </span>
            <span className="px-6">
              kinetic light · architectural acoustics · spatial installations · monograph editions · zurich &amp; kyoto ·
            </span>
            <span className="px-6">
              kinetic light · architectural acoustics · spatial installations · monograph editions · zurich &amp; kyoto ·
            </span>
            <span className="px-6">
              kinetic light · architectural acoustics · spatial installations · monograph editions · zurich &amp; kyoto ·
            </span>
          </div>
        </div>

        {/* Selected Works Bento Grid */}
        <section
          id="works"
          aria-labelledby="works-heading"
          className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-24"
        >
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[#E4E4E7] pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium text-[#52525B]">01. Curated Archive</p>
              <h2
                id="works-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl"
              >
                Selected Works &amp; Commissions
              </h2>
            </div>

            {/* Interactive Category Filter Segmented Control */}
            <div
              className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-[#F4F4F5] p-1"
              role="group"
              aria-label="Filter selected works by discipline"
            >
              {FILTER_OPTIONS.map((option) => {
                const isActive = activeCategory === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setActiveCategory(option.id)}
                    className={`min-h-[38px] shrink-0 whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E] ${
                      isActive
                        ? 'bg-white text-[#111111] shadow-sm'
                        : 'text-[#52525B] hover:text-[#111111]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work, idx) => {
              const spanFeature = activeCategory === 'all' && idx === 0;
              return (
                <article
                  key={work.id}
                  className={`flex flex-col overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white transition-colors duration-200 hover:border-[#111111] ${
                    spanFeature ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedWork(work)}
                    className="group flex h-full w-full flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E]"
                  >
                    <div
                      className={`w-full overflow-hidden bg-[#141416] ${
                        spanFeature ? 'aspect-[16/9]' : 'aspect-[4/3]'
                      }`}
                    >
                      <ResilientImage
                        src={work.image}
                        alt={work.imageAlt}
                        fallbackTitle={work.title}
                        fallbackSubtitle={`${work.categoryLabel} · ${work.year}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#52525B]">
                          <span>{work.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{work.year}</span>
                          <span aria-hidden="true">·</span>
                          <span>{work.location}</span>
                        </div>

                        <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-[#111111]">
                          {work.title}
                        </h3>
                        <p className="mt-1 font-serif-editorial text-base italic text-[#52525B]">
                          {work.subtitle}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-[#F4F4F5] pt-4 text-xs font-medium text-[#111111]">
                        <span className="font-mono tabular-nums text-[#52525B]">
                          {work.dimensions}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#C8281E] group-hover:underline group-hover:underline-offset-4">
                          <span>Inspect Dossier</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Interactive Acoustic & Optical Bench */}
        <div className="border-t border-[#E4E4E7] bg-white">
          <LightSoundInstrument
            apertureDeg={apertureDeg}
            onApertureChange={setApertureDeg}
            frequencyHz={frequencyHz}
            onFrequencyChange={setFrequencyHz}
            material={material}
            onMaterialChange={setMaterial}
            isAudioPlaying={isAudioPlaying}
            onToggleAudio={handleToggleAudio}
            onReset={handleResetInstrument}
          />
        </div>

        {/* Exhibitions & Residencies Schedule */}
        <section
          id="exhibitions"
          aria-labelledby="exhibitions-heading"
          className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-24"
        >
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#E4E4E7] pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium text-[#52525B]">03. Exhibition Index</p>
              <h2
                id="exhibitions-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl"
              >
                Current &amp; Forthcoming Presentations
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#52525B]">
              Select any presentation row to read curatorial notes and acoustic calibration details.
            </p>
          </div>

          <div className="divide-y divide-[#E4E4E7] border-b border-[#E4E4E7]">
            {EXHIBITIONS.map((item) => {
              const isOpen = expandedExhibitionId === item.id;
              return (
                <div key={item.id} className="py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpandedExhibitionId(isOpen ? null : item.id)}
                    className="grid w-full grid-cols-1 items-center gap-3 text-left transition-colors hover:text-[#C8281E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8281E] md:grid-cols-12 md:gap-6"
                  >
                    <div className="font-mono text-xs tabular-nums text-[#52525B] md:col-span-2">
                      {item.year} · {item.city}
                    </div>
                    <div className="font-display text-lg font-medium text-[#111111] md:col-span-5">
                      {item.title}
                    </div>
                    <div className="text-sm text-[#52525B] md:col-span-3">{item.venue}</div>
                    <div className="flex items-center justify-between text-xs font-medium md:col-span-2 md:justify-end md:gap-3">
                      <span
                        className={
                          item.status === 'On View'
                            ? 'text-[#C8281E]'
                            : item.status === 'Upcoming'
                            ? 'text-[#111111]'
                            : 'text-[#71717A]'
                        }
                      >
                        {item.status}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-[#52525B]" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-[#52525B]" aria-hidden="true" />
                      )}
                    </div>
                  </button>

                  {isOpen ? (
                    <div className="mt-4 grid grid-cols-1 gap-4 pt-2 text-sm text-[#52525B] md:grid-cols-12 md:gap-6">
                      <div className="font-mono text-xs tabular-nums text-[#71717A] md:col-span-2">
                        {item.dates}
                      </div>
                      <div className="leading-relaxed text-[#27272A] md:col-span-10">
                        {item.notes}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* Studio Principals & Disciplines */}
        <section
          id="studio"
          aria-labelledby="studio-heading"
          className="border-t border-[#E4E4E7] bg-white"
        >
          <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-24">
            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#E4E4E7] pb-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium text-[#52525B]">04. Practice &amp; Leadership</p>
                <h2
                  id="studio-heading"
                  className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl"
                >
                  Principals &amp; Disciplines
                </h2>
              </div>
              <p className="max-w-md text-sm text-[#52525B]">
                Operating jointly between Limmatquai, Zurich and Sakyo Ward, Kyoto with an eight-person team of fabricators, acousticians, and bookbinders.
              </p>
            </div>

            {/* 2-Column Principal Partners */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {PRINCIPALS.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => setSelectedPrincipal(person)}
                  className="group flex flex-col items-start gap-5 rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9] p-6 text-left transition-colors duration-150 hover:border-[#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E] sm:flex-row sm:items-center"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#E4E4E7]">
                    <ResilientImage
                      src={person.portrait}
                      alt={person.portraitAlt}
                      fallbackTitle={person.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-[#52525B]">
                      {person.city} Studio · Co-Founder
                    </div>
                    <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-[#111111]">
                      {person.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-[#52525B]">{person.role}</p>
                    <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#C8281E] group-hover:underline group-hover:underline-offset-4">
                      <span>Read Biography</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* 3-Column Disciplines */}
            <div className="mt-14 grid grid-cols-1 gap-8 border-t border-[#E4E4E7] pt-12 md:grid-cols-3">
              {DISCIPLINES.map((disc) => (
                <div key={disc.index}>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-[#111111]">
                    {disc.index}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#52525B]">{disc.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-[#E4E4E7] bg-[#FAFAF9]">
        <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="font-display text-lg font-semibold tracking-tight text-[#111111]">
                Kestrel Atelier
              </div>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#52525B]">
                Architectural kinetic optics, acoustic stone chambers, and monograph publishing.
              </p>
            </div>

            <div className="text-sm text-[#52525B] md:col-span-3">
              <div className="font-medium text-[#111111]">Zurich Studio</div>
              <p className="mt-1">Limmatquai 92, 8001 Zürich</p>
              <p className="mt-0.5 font-mono text-xs">zurich@kestrel-atelier.example</p>
            </div>

            <div className="text-sm text-[#52525B] md:col-span-4 md:text-right">
              <div className="font-medium text-[#111111]">Kyoto Workshop</div>
              <p className="mt-1">Sakyo-ku, Yoshida 14, Kyoto</p>
              <button
                type="button"
                onClick={() => openInquiry()}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#C8281E] hover:underline hover:underline-offset-4"
              >
                <span>Open Commission Brief</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[#E4E4E7] pt-6 text-xs text-[#71717A] sm:flex-row sm:items-center">
            <span>© 2026 Kestrel Atelier. All rights reserved.</span>
            <span>Zurich · Kyoto · Basel</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WorkLightboxModal
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
        onInquire={(title) => openInquiry(title)}
      />

      <InquiryModal
        isOpen={inquiryOpen}
        initialSubject={inquirySubject}
        onClose={() => setInquiryOpen(false)}
      />

      <PrincipalModal
        principal={selectedPrincipal}
        onClose={() => setSelectedPrincipal(null)}
      />
    </div>
  );
}
