import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Atelier Plate',
  fallbackSubtitle = 'Archival Documentation',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFECE6] via-[#E5E2DC] to-[#D6D2C9] p-6 text-center text-[#111111] ${className}`}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden="true"
          className="mb-3 text-[#C8281E]"
        >
          <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1.25" />
          <line x1="4" y1="26" x2="32" y2="10" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="18" cy="18" r="4" stroke="#111111" strokeWidth="1.25" />
        </svg>
        <span className="font-display text-sm font-medium tracking-tight">{fallbackTitle}</span>
        <span className="mt-1 text-xs text-[#52525B]">{fallbackSubtitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
