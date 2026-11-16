import { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { AcademicProgram } from '../data/collegeData';

interface ProgramModalProps {
  program: AcademicProgram | null;
  onClose: () => void;
  onInquire: (programTitle: string) => void;
}

export function ProgramModal({ program, onClose, onInquire }: ProgramModalProps) {
  useEffect(() => {
    if (!program) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [program, onClose]);

  if (!program) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/55 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FBF9F5] border border-[#D6CEBE] rounded-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-[#E5DFD5] flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#57534E] tabular-nums">
              {program.code} · {program.degreeType} · {program.stream}
            </p>
            <h3
              id="program-modal-title"
              className="font-serif text-2xl font-semibold text-[#1C1917] mt-1.5"
            >
              {program.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close program details"
            className="inline-flex items-center justify-center w-10 h-10 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE7] rounded-md transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-base leading-relaxed text-[#44403C]">{program.overview}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#E5DFD5]">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-[#78716C]">
                Department
              </dt>
              <dd className="text-sm font-medium text-[#1C1917] mt-1">{program.department}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-[#78716C]">
                Duration & Intake
              </dt>
              <dd className="text-sm font-medium text-[#1C1917] mt-1 tabular-nums">
                {program.duration} · {program.intake} Seats
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wider text-[#78716C]">
                Eligibility Criteria
              </dt>
              <dd className="text-sm text-[#1C1917] mt-1">{program.eligibility}</dd>
            </div>
          </dl>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-3">
                Core Curriculum Modules
              </h4>
              <ul className="space-y-2 text-sm text-[#1C1917]">
                {program.coreModules.map((mod, idx) => (
                  <li key={mod} className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs text-[#78716C] tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{mod}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-3">
                Graduate Pathways
              </h4>
              <ul className="space-y-2 text-sm text-[#1C1917]">
                {program.careerPathways.map((role) => (
                  <li key={role} className="py-1 border-b border-[#EFEAE1] last:border-b-0">
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#F3EFE7] border-t border-[#E5DFD5] flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-[#57534E]">
            Autonomous Curriculum · Bharathiar University Degree
          </span>
          <button
            type="button"
            onClick={() => onInquire(program.title)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#FBF9F5] bg-[#1E3A8A] hover:bg-[#172D6B] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <span>Inquire for This Program</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
