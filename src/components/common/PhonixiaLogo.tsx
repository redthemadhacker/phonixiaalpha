// PHONIXIA - Official Logo Component based on logo.jpeg
// The glowing pixel-art Phoenix in the carved stone portal with two-tone pixel typography

import React from 'react';

interface PhonixiaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showFrame?: boolean;
}

export const PhonixiaLogo: React.FC<PhonixiaLogoProps> = ({
  className = '',
  size = 'md',
  showFrame = true,
}) => {
  const sizeClasses = {
    sm: 'h-10 w-auto',
    md: 'h-14 w-auto',
    lg: 'h-24 w-auto',
    xl: 'h-36 w-auto',
    hero: 'h-52 md:h-64 w-auto',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* High-fidelity Logo Image based directly on logo.jpeg */}
      <img
        src="/logo.jpeg"
        alt="PHONIXIA"
        className={`object-contain rounded-xl select-none ${sizeClasses[size]} ${
          showFrame ? 'shadow-2xl shadow-orange-500/20 drop-shadow-[0_4px_16px_rgba(249,115,22,0.35)]' : ''
        }`}
      />
    </div>
  );
};
