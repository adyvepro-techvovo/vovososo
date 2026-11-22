import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { PrincipalProfile } from '../data/atelierData';
import { ResilientImage } from './ResilientImage';

interface PrincipalModalProps {
  principal: PrincipalProfile | null;
  onClose: () => void;
}

export function PrincipalModal({ principal, onClose }: PrincipalModalProps) {
  useEffect(() => {
    if (!principal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [principal, onClose]);

  if (!principal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="principal-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9] p-6 text-[#111111] shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close principal biography"
          className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-[#111111] transition-colors hover:bg-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#E4E4E7]">
            <ResilientImage
              src={principal.portrait}
              alt={principal.portraitAlt}
              fallbackTitle={principal.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="pr-8">
            <p className="text-xs text-[#52525B]">{principal.city} Studio</p>
            <h3
              id="principal-modal-title"
              className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#111111]"
            >
              {principal.name}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-[#52525B]">{principal.role}</p>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-[#27272A]">{principal.bio}</p>

        <div className="mt-6 border-t border-[#E4E4E7] pt-5">
          <p className="text-xs font-medium text-[#52525B]">Academic &amp; Practice Background</p>
          <p className="mt-1 text-sm text-[#111111]">{principal.education}</p>
        </div>

        <div className="mt-5 border-t border-[#E4E4E7] pt-5">
          <p className="text-xs font-medium text-[#52525B]">Selected Permanent Commissions</p>
          <ul className="mt-2 space-y-1.5 text-sm text-[#111111]">
            {principal.selectedWorks.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-[#C8281E]" aria-hidden="true">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
