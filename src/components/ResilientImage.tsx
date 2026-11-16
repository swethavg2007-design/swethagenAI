import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EBE6DF] via-[#F3EFE7] to-[#E2DBD0] text-[#57534E] p-8 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 mb-3 text-[#1E3A8A]/60" aria-hidden="true" />
        <p className="font-serif text-base font-medium text-[#1C1917]">{fallbackTitle}</p>
        <p className="text-xs text-[#57534E] mt-1">Sri Krishna Arts and Science College, Coimbatore</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
