import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { AtelierWork } from '../data/atelierData';
import { ResilientImage } from './ResilientImage';

interface WorkLightboxModalProps {
  work: AtelierWork | null;
  onClose: () => void;
  onInquire: (workTitle: string) => void;
}

export function WorkLightboxModal({ work, onClose, onInquire }: WorkLightboxModalProps) {
  useEffect(() => {
    if (!work) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [work, onClose]);

  if (!work) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/90 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[92vh] w-full max-w-5xl grid-cols-1 overflow-y-auto rounded-2xl border border-[#27272A] bg-[#FAFAF9] text-[#111111] shadow-2xl lg:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close work viewer"
          className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white transition-colors hover:bg-[#C8281E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="bg-[#111111] lg:col-span-7">
          <ResilientImage
            src={work.image}
            alt={work.imageAlt}
            fallbackTitle={work.title}
            fallbackSubtitle={`${work.location} · ${work.year}`}
            className="h-72 w-full object-cover sm:h-96 lg:h-full"
          />
        </div>

        <div className="flex flex-col justify-between p-6 md:p-8 lg:col-span-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#52525B]">
              <span>{work.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{work.year}</span>
              <span aria-hidden="true">·</span>
              <span>{work.location}</span>
            </div>

            <h3
              id="lightbox-title"
              className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#111111] md:text-3xl"
            >
              {work.title}
            </h3>
            <p className="mt-1 font-serif-editorial text-lg italic text-[#52525B]">
              {work.subtitle}
            </p>

            <p className="mt-5 text-sm leading-relaxed text-[#27272A]">
              {work.summary}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#52525B]">
              {work.architecturalNote}
            </p>

            <dl className="mt-6 space-y-3 border-t border-[#E4E4E7] pt-5 text-xs">
              <div className="flex justify-between gap-4">
                <dt className="text-[#71717A]">Dimensions</dt>
                <dd className="text-right font-mono tabular-nums text-[#111111]">{work.dimensions}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#71717A]">Materials</dt>
                <dd className="max-w-[65%] text-right text-[#111111]">{work.materials}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#71717A]">Acoustics</dt>
                <dd className="max-w-[65%] text-right text-[#111111]">{work.acousticProfile}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#71717A]">Curated By</dt>
                <dd className="text-right text-[#111111]">{work.curator}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex items-center gap-3 border-t border-[#E4E4E7] pt-5">
            <button
              type="button"
              onClick={() => {
                onClose();
                onInquire(work.title);
              }}
              className="min-h-[44px] flex-1 whitespace-nowrap rounded-lg bg-[#C8281E] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#A61E16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E]"
            >
              Request Technical Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
