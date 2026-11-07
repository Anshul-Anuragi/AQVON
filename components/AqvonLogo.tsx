import React from "react";

interface AqvonLogoProps {
  className?: string;
  showBadge?: boolean;
  badgeText?: string;
}

export function AqvonLogo({
  className = "",
  showBadge = true,
  badgeText = "RESEARCH",
}: AqvonLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric AQVON Wordmark */}
      <svg
        viewBox="0 0 152 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-auto text-[var(--ink-primary)] fill-current transition-colors"
        aria-label="AQVON"
      >
        {/* 'A' - Triangle-stencil chevron without horizontal crossbar */}
        <polygon
          points="12,1.5 24,23 18.2,23 12,8.8 5.8,23 0,23"
        />

        {/* 'Q' - Geometric ring with 45-degree stencil cut & technical tail */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.5 1.5C38.4 1.5 33.5 6.4 33.5 12.5C33.5 18.6 38.4 23.5 44.5 23.5C47.3 23.5 49.9 22.4 51.9 20.6L55.7 24.4L59 21.1L55.2 17.3C56.3 15.9 57 14.3 57 12.5C57 6.4 52.1 1.5 44.5 1.5ZM38.7 12.5C38.7 9.3 41.3 6.7 44.5 6.7C47.7 6.7 50.3 9.3 50.3 12.5C50.3 14.2 49.6 15.8 48.4 16.9L46.6 15.1L44 17.7L45.7 19.4C45.3 19.5 44.9 19.5 44.5 19.5C41.3 19.5 38.7 16.9 38.7 12.5Z"
        />

        {/* 'V' - Sharp downward vertex chevron mirroring 'A' inverted */}
        <polygon
          points="65,1.5 70.8,1.5 77,15.7 83.2,1.5 89,1.5 79.8,23 74.2,23"
        />

        {/* 'O' - Symmetrical geometric ring */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M109 1.5C102.9 1.5 98 6.4 98 12.5C98 18.6 102.9 23.5 109 23.5C115.1 23.5 120 18.6 120 12.5C120 6.4 115.1 1.5 109 1.5ZM103.2 12.5C103.2 9.3 105.8 6.7 109 6.7C112.2 6.7 114.8 9.3 114.8 12.5C114.8 15.7 112.2 18.3 109 18.3C105.8 18.3 103.2 15.7 103.2 12.5Z"
        />

        {/* 'N' - Dual vertical stems with bold sharp diagonal */}
        <polygon
          points="129,1.5 134.2,1.5 134.2,15.5 145.8,1.5 151,1.5 151,23 145.8,23 145.8,8.8 134.2,23 129,23"
        />
      </svg>

      {/* Monospace Badge */}
      {showBadge && (
        <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono tracking-widest uppercase text-[var(--ink-muted)] bg-[var(--bg-surface)] border border-[var(--border-grid)] rounded-none font-semibold transition-colors">
          {badgeText}
        </span>
      )}
    </div>
  );
}

// Alias export for backward compatibility
export const ArqonLogo = AqvonLogo;

