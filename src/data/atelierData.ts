import heroKineticLightImg from '../assets/images/hero_kinetic_light_1795373797289.jpg';
import workBasaltSoundImg from '../assets/images/work_basalt_sound_1795373797521.jpg';
import workBorosilicatePrismImg from '../assets/images/work_borosilicate_prism_1795373797797.jpg';
import workMonographBookImg from '../assets/images/work_monograph_book_1795373797081.jpg';
import portraitDirectorOneImg from '../assets/images/portrait_director_one_1795373796759.jpg';
import portraitDirectorTwoImg from '../assets/images/portrait_director_two_1795373797667.jpg';

export type WorkCategory = 'all' | 'kinetic-light' | 'spatial-sound' | 'monographs';

export interface AtelierWork {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<WorkCategory, 'all'>;
  categoryLabel: string;
  year: string;
  location: string;
  dimensions: string;
  materials: string;
  acousticProfile: string;
  curator: string;
  featured: boolean;
  image: string;
  imageAlt: string;
  summary: string;
  architecturalNote: string;
}

export interface ExhibitionItem {
  id: string;
  year: string;
  title: string;
  venue: string;
  city: string;
  status: 'On View' | 'Upcoming' | 'Archive';
  dates: string;
  notes: string;
}

export interface PrincipalProfile {
  id: string;
  name: string;
  role: string;
  city: string;
  portrait: string;
  portraitAlt: string;
  education: string;
  bio: string;
  selectedWorks: string[];
}

export const ATELIER_WORKS: AtelierWork[] = [
  {
    id: 'heliostat-vii',
    title: 'Heliostat VII (Zurich Kunsthalle)',
    subtitle: 'Suspended counterweighted brass array & daylight caustic aperture',
    category: 'kinetic-light',
    categoryLabel: 'Kinetic Light',
    year: '2026',
    location: 'Zurich, Switzerland',
    dimensions: '9.4 × 4.2 × 5.8 m',
    materials: 'Unlacquered brushed brass, frosted borosilicate panes, steel tension cable',
    acousticProfile: 'Passive wind-driven micro-pendulum · 18 dBA floor',
    curator: 'Dr. Helena Vance',
    featured: true,
    image: heroKineticLightImg,
    imageAlt: 'Suspended brushed brass and frosted glass kinetic sculpture casting geometric amber light beams across a concrete gallery wall',
    summary:
      'Commissioned for the main concrete nave of Zurich Kunsthalle, Heliostat VII tracks solar azimuth across twenty-eight balanced brass arms, translating afternoon daylight into slow architectural geometry.',
    architecturalNote:
      'Engineered without exposed motors; thermal convection currents from gallery skylights gently rotate the lower glass vanes by 0.4 degrees per minute.',
  },
  {
    id: 'kyoto-basalt-pavilion',
    title: 'Resonance Chamber IV — Basalt Colonade',
    subtitle: 'Eighteen monolithic basalt acoustic resonators in quiet courtyard light',
    category: 'spatial-sound',
    categoryLabel: 'Spatial Sound',
    year: '2025',
    location: 'Kyoto, Japan',
    dimensions: '16.0 × 8.5 × 4.6 m',
    materials: 'Hand-split Komatsu basalt, honed travertine, concealed transducers',
    acousticProfile: 'RT60 2.4s · Fundamental 110 Hz harmonic drone',
    curator: 'Kenjiro Takahashi',
    featured: false,
    image: workBasaltSoundImg,
    imageAlt: 'Minimalist Kyoto museum hall with matte dark basalt acoustic columns and warm floor-level lighting',
    summary:
      'An architectural listening sanctuary set beside a moss courtyard in northern Kyoto. Each split basalt pier conceals a low-frequency surface transducer tuned to the hall’s standing-wave ratio.',
    architecturalNote:
      'As visitors walk between columns, acoustic phase shifts create quiet pockets of silence alternating with warm fifth intervals.',
  },
  {
    id: 'refraction-study-iv',
    title: 'Refraction Study No. 4 (Vermilion Optics)',
    subtitle: 'Machined borosilicate condenser lenses on matte anodized aluminum',
    category: 'kinetic-light',
    categoryLabel: 'Kinetic Light',
    year: '2025',
    location: 'Basel, Switzerland',
    dimensions: '3.2 × 0.6 × 1.3 m',
    materials: 'Optical borosilicate glass, bead-blasted dark aluminum, warm tungsten-LEDs',
    acousticProfile: 'Silent solid-state optical bench',
    curator: 'Matteo Bellini',
    featured: false,
    image: workBorosilicatePrismImg,
    imageAlt: 'Seven cylindrical borosilicate glass lenses mounted on a matte dark plinth refracting warm vermilion light shafts onto a plaster wall',
    summary:
      'Seven precision-ground borosilicate cylinders pivot in slow harmonic ratios, overlapping vermilion and amber caustics across lime-plaster gallery walls.',
    architecturalNote:
      'Lenses were annealed over 96 hours in Murano and ground in Jena to eliminate chromatic haloing while preserving crisp edge dispersion.',
  },
  {
    id: 'concrete-form-monograph',
    title: 'Monograph Vol. III — Concrete Form & Silence',
    subtitle: '280-page Swiss-bound archival publication on acoustic Brutalism',
    category: 'monographs',
    categoryLabel: 'Monographs',
    year: '2026',
    location: 'Zurich & Tokyo',
    dimensions: '240 × 310 × 28 mm',
    materials: 'Munken Polar Rough 150gsm, linen thread exposed spine, duotone plates',
    acousticProfile: 'Includes lossless field-recording archive code',
    curator: 'Kestrel Press',
    featured: false,
    image: workMonographBookImg,
    imageAlt: 'Open Swiss-bound architectural hardcover monograph resting on pale limestone showing black and white concrete plates',
    summary:
      'Our third hardcover monograph documents twelve permanent spatial commissions across Europe and Japan, pairing architectural sections with impulse-response acoustic diagrams.',
    architecturalNote:
      'Printed in an edition of 1,500 numbered copies in Basel using soy-based carbon inks on uncoated archival stock.',
  },
];

export const STUDIO_METRICS = [
  { value: '42', label: 'Permanent Architectural Works' },
  { value: '14', label: 'International Biennales' },
  { value: '180,000+', label: 'Exhibition Visitors Annually' },
  { value: '2018', label: 'Founded · Zurich & Kyoto' },
];

export const EXHIBITIONS: ExhibitionItem[] = [
  {
    id: 'ex-zurich-2026',
    year: '2026',
    title: 'Heliostat VII: Daylight as Weight',
    venue: 'Kunsthalle Zürich',
    city: 'Zurich',
    status: 'On View',
    dates: 'Oct 14, 2026 — Feb 08, 2027',
    notes: 'Main gallery solo presentation featuring suspended brass optics and a 4-channel room-tone score.',
  },
  {
    id: 'ex-kyoto-2026',
    year: '2026',
    title: 'Basalt & Stillness: Acoustic Tectonics',
    venue: 'Kyoto Art Center',
    city: 'Kyoto',
    status: 'On View',
    dates: 'Sep 03 — Dec 20, 2026',
    notes: 'Site-specific colonnade of eighteen Komatsu stone resonators calibrated to rain courtyard acoustics.',
  },
  {
    id: 'ex-venice-2027',
    year: '2027',
    title: 'Harmonic Apertures for Civic Timber',
    venue: 'Arsenale Nord Pavilion',
    city: 'Venice',
    status: 'Upcoming',
    dates: 'May 22 — Nov 21, 2027',
    notes: 'Commissioned architectural pavilion investigating passive acoustic dampening in mass-timber halls.',
  },
  {
    id: 'ex-basel-2025',
    year: '2025',
    title: 'Refraction Study No. 4',
    venue: 'Museum für Gegenwartskunst',
    city: 'Basel',
    status: 'Archive',
    dates: 'Mar 12 — Aug 30, 2025',
    notes: 'Optical bench series exploring borosilicate dispersion under 2400K solid-state emitters.',
  },
];

export const PRINCIPALS: PrincipalProfile[] = [
  {
    id: 'naomi-shimizu',
    name: 'Naomi Shimizu',
    role: 'Co-Founder & Principal, Kinetic Optics',
    city: 'Kyoto',
    portrait: portraitDirectorOneImg,
    portraitAlt: 'Portrait of Naomi Shimizu in a charcoal linen shirt against a warm plaster studio wall',
    education: 'M.Arch, Kyoto University · ETH Zurich Visiting Critic',
    bio: 'Naomi leads the atelier’s optical geometry and material fabrication studio in Kyoto. Her work investigates how unpowered brass counterweights, ground borosilicate glass, and daylight apertures reveal subtle atmospheric motion inside civic buildings.',
    selectedWorks: ['Heliostat VII (Zurich)', 'Refraction Study No. 4 (Basel)', 'Pavilion of Quiet Rain (Naoshima)'],
  },
  {
    id: 'lukas-brenner',
    name: 'Lukas Brenner',
    role: 'Co-Founder & Principal, Spatial Acoustics',
    city: 'Zurich',
    portrait: portraitDirectorTwoImg,
    portraitAlt: 'Portrait of Lukas Brenner in dark merino knitwear against an off-white studio wall',
    education: 'Dipl. Arch ETH · Electroacoustic Composition, Basel',
    bio: 'Lukas directs architectural acoustics and harmonic instrument design from Zurich. Combining room-mode physics with stone and timber materiality, he builds permanent sound installations that respond organically to architectural occupancy.',
    selectedWorks: ['Resonance Chamber IV (Kyoto)', 'Monograph Vol. III (Zurich)', 'Timber Reverberation Hall (Bregenz)'],
  },
];
