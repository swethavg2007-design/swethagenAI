import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { InstitutionalDisclosure } from '../data/collegeData';

interface DisclosureModalProps {
  disclosure: InstitutionalDisclosure | null;
  onClose: () => void;
}

export function DisclosureModal({ disclosure, onClose }: DisclosureModalProps) {
  useEffect(() => {
    if (!disclosure) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [disclosure, onClose]);

  if (!disclosure) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/55 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclosure-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#FBF9F5] border border-[#D6CEBE] rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-[#E5DFD5] flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#92400E]">
              {disclosure.kicker}
            </p>
            <h3
              id="disclosure-modal-title"
              className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] mt-1"
            >
              {disclosure.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close disclosure"
            className="inline-flex items-center justify-center w-10 h-10 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE7] rounded-md transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-sm leading-relaxed text-[#44403C]">{disclosure.summary}</p>
          <dl className="divide-y divide-[#E5DFD5] border-y border-[#E5DFD5]">
            {disclosure.rows.map((row) => (
              <div
                key={row.label}
                className="py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4"
              >
                <dt className="text-xs font-medium uppercase tracking-wider text-[#78716C]">
                  {row.label}
                </dt>
                <dd className="text-sm font-medium text-[#1C1917] tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="px-6 py-4 bg-[#F3EFE7] border-t border-[#E5DFD5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#1C1917] bg-[#FBF9F5] border border-[#D6CEBE] hover:bg-[#EBE6DF] rounded-md transition-colors duration-150 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
