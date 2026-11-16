import { useEffect } from 'react';
import { X } from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import type { CampusSpace } from '../data/collegeData';

interface CampusSpaceModalProps {
  space: CampusSpace | null;
  onClose: () => void;
}

export function CampusSpaceModal({ space, onClose }: CampusSpaceModalProps) {
  useEffect(() => {
    if (!space) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [space, onClose]);

  if (!space) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1120]/70 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="campus-space-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#FBF9F5] border border-[#D6CEBE] rounded-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#E5DFD5] flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-[#92400E]">
              {space.figure} · {space.subtitle}
            </p>
            <h3
              id="campus-space-title"
              className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mt-0.5"
            >
              {space.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close facility view"
            className="inline-flex items-center justify-center w-10 h-10 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE7] rounded-md transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <div className="aspect-[16/10] w-full bg-[#F3EFE7] overflow-hidden">
            <ResilientImage
              src={space.image}
              alt={space.alt}
              fallbackTitle={space.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 space-y-5">
            <p className="text-base leading-relaxed text-[#44403C]">{space.description}</p>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E5DFD5]">
              {space.highlights.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs uppercase tracking-wider text-[#78716C]">{item.label}</dt>
                  <dd className="mt-1 font-mono text-sm font-medium text-[#1C1917] tabular-nums">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
