import { useMemo, useRef, useState, type FormEvent } from 'react';
import { MotionConfig, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
  MapPin,
  Clock,
  Phone,
  Mail,
  Maximize2,
} from 'lucide-react';
import { Header } from './components/Header';
import { ResilientImage } from './components/ResilientImage';
import { ProgramModal } from './components/ProgramModal';
import { DisclosureModal } from './components/DisclosureModal';
import { CampusSpaceModal } from './components/CampusSpaceModal';
import {
  ACADEMIC_PROGRAMS,
  CAMPUS_SPACES,
  DEGREE_LEVELS,
  GRADUATE_OUTCOMES,
  HERO_IMAGE,
  INSTITUTIONAL_DISCLOSURES,
  PLACEMENT_COHORTS,
  RECRUITER_DIRECTORY,
  STREAM_FILTERS,
  type AcademicProgram,
  type CampusSpace,
  type DegreeLevel,
  type InstitutionalDisclosure,
  type StreamCategory,
} from './data/collegeData';

interface InquiryFormState {
  fullName: string;
  email: string;
  phone: string;
  qualifyingScore: string;
  preferredProgram: string;
  accommodation: 'Day Scholar' | 'Campus Hostel';
  notes: string;
}

interface InquiryErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  qualifyingScore?: string;
  preferredProgram?: string;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function App() {
  const [selectedStream, setSelectedStream] = useState<StreamCategory>('All');
  const [selectedLevel, setSelectedLevel] = useState<DegreeLevel>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProgram, setActiveProgram] = useState<AcademicProgram | null>(null);
  const [activeCampusSpace, setActiveCampusSpace] = useState<CampusSpace | null>(null);

  const [selectedCohortYear, setSelectedCohortYear] = useState<string>('2025–26');
  const [activeDisclosure, setActiveDisclosure] = useState<InstitutionalDisclosure | null>(null);

  const [formState, setFormState] = useState<InquiryFormState>({
    fullName: '',
    email: '',
    phone: '',
    qualifyingScore: '',
    preferredProgram: ACADEMIC_PROGRAMS[0].title,
    accommodation: 'Day Scholar',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<InquiryErrors>({});
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  const admissionsRef = useRef<HTMLElement | null>(null);

  const filteredPrograms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ACADEMIC_PROGRAMS.filter((prog) => {
      const matchesStream = selectedStream === 'All' || prog.stream === selectedStream;
      const matchesLevel = selectedLevel === 'All' || prog.degreeType === selectedLevel;
      const matchesQuery =
        !q ||
        prog.title.toLowerCase().includes(q) ||
        prog.department.toLowerCase().includes(q) ||
        prog.code.toLowerCase().includes(q) ||
        prog.stream.toLowerCase().includes(q);
      return matchesStream && matchesLevel && matchesQuery;
    });
  }, [selectedStream, selectedLevel, searchQuery]);

  const activeCohort = PLACEMENT_COHORTS[selectedCohortYear];

  const scrollToAdmissions = () => {
    admissionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInquireProgram = (programTitle: string) => {
    setActiveProgram(null);
    setSubmittedRefId(null);
    setFormState((prev) => ({ ...prev, preferredProgram: programTitle }));
    setTimeout(() => {
      admissionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const resetCatalogFilters = () => {
    setSelectedStream('All');
    setSelectedLevel('All');
    setSearchQuery('');
  };

  const validateForm = (): InquiryErrors => {
    const errors: InquiryErrors = {};
    if (formState.fullName.trim().length < 2) {
      errors.fullName = 'Please enter the applicant’s full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    const cleanPhone = formState.phone.replace(/[\s\-+]/g, '');
    if (!/^(91)?[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }
    const scoreNum = Number(formState.qualifyingScore);
    if (
      !formState.qualifyingScore.trim() ||
      Number.isNaN(scoreNum) ||
      scoreNum < 35 ||
      scoreNum > 100
    ) {
      errors.qualifyingScore = 'Enter aggregate percentage between 35 and 100.';
    }
    if (!formState.preferredProgram) {
      errors.preferredProgram = 'Please select a preferred programme.';
    }
    return errors;
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setSubmittedRefId(`SKASC-2026-${randomDigits}`);
  };

  const [quadSpace, auditoriumSpace, librarySpace, computingSpace, biotechSpace] = CAMPUS_SPACES;

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
        <Header onApplyClick={scrollToAdmissions} />

        <main className="flex-1">
          {/* CINEMATIC FULL-BLEED ARCHITECTURAL HERO */}
          <section className="relative bg-[#0B1120] text-[#F8FAFC] overflow-hidden">
            <div className="absolute inset-0">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Main academic quadrangle and clock tower at Sri Krishna Arts and Science College campus in Coimbatore with Western Ghats mountains behind"
                fallbackTitle="Kuniamuthur Academic Quadrangle"
                className="w-full h-full object-cover object-center"
              />
              {/* Measured directional scrim ensuring >7:1 text contrast */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#0B1120]/95 via-[#0B1120]/78 to-[#0B1120]/30"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-transparent to-[#0B1120]/25"
              />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-16">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="max-w-2xl"
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#FBBF24]">
                  Est. 1997 · Autonomous · Affiliated to Bharathiar University · Coimbatore
                </p>

                <h1 className="mt-4 font-serif font-semibold text-[#F8FAFC] tracking-tight leading-[1.06] text-[clamp(2.35rem,4.5vw,3.85rem)] [text-wrap:balance]">
                  Scholarship, Industry Practice, and Character in Coimbatore.
                </h1>

                <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#E2E8F0] max-w-xl">
                  Set in Kuniamuthur along the foothills of the Western Ghats, Sri Krishna Arts
                  and Science College unites autonomous academic rigor, recognized doctoral
                  research centres, and structured career preparation across five faculties.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={scrollToAdmissions}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#0B1120] bg-[#FBBF24] hover:bg-[#F59E0B] rounded-md shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBBF24]"
                  >
                    <span>Explore 2026 Admissions</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <a
                    href="#academics"
                    className="inline-flex items-center gap-1.5 py-2.5 text-sm font-medium text-[#F8FAFC] border-b border-white/40 hover:border-[#FBBF24] hover:text-[#FBBF24] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FBBF24]"
                  >
                    <span>Browse Academic Catalog</span>
                  </a>
                </div>
              </motion.div>

              {/* Anchored 4-Column Institutional Proof Ribbon */}
              <div className="mt-14 lg:mt-20 border border-white/15 bg-[#0F172A]/82 backdrop-blur-md rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
                  <div className="p-5 sm:p-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
                      Accreditation
                    </p>
                    <p className="mt-1.5 font-serif text-xl font-semibold text-[#F8FAFC]">
                      NAAC ‘A’ Grade
                    </p>
                    <p className="mt-1 text-xs text-[#CBD5E1]">
                      Autonomous Institution since 2011
                    </p>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
                      National Standing
                    </p>
                    <p className="mt-1.5 font-serif text-xl font-semibold text-[#FBBF24] tabular-nums">
                      NIRF Top 50
                    </p>
                    <p className="mt-1 text-xs text-[#CBD5E1]">
                      Colleges Category, Ministry of Education
                    </p>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
                      Academic Breadth
                    </p>
                    <p className="mt-1.5 font-serif text-xl font-semibold text-[#F8FAFC] tabular-nums">
                      42+ Programmes
                    </p>
                    <p className="mt-1 text-xs text-[#CBD5E1]">
                      UG, PG, M.Phil. & Doctoral Tracks
                    </p>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
                      Career Outcomes
                    </p>
                    <p className="mt-1.5 font-serif text-xl font-semibold text-[#F8FAFC] tabular-nums">
                      94.2% Placement
                    </p>
                    <p className="mt-1 text-xs text-[#CBD5E1]">
                      2025–26 Cohort · 1,480 Offers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 01: ACADEMIC CATALOG & DEPARTMENT EXPLORER */}
          <section
            id="academics"
            className="bg-[#FBF9F5] py-16 lg:py-24 border-b border-[#E5DFD5]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5DFD5]">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#92400E]">
                    01. Academic Catalog
                  </p>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] [text-wrap:balance]">
                    Undergraduate, Postgraduate, and Doctoral Programmes
                  </h2>
                  <p className="mt-3 text-base text-[#44403C] leading-relaxed">
                    Outcome-based autonomous syllabi revised annually with Boards of Studies
                    comprising Bharathiar University nominees and industry practitioners.
                  </p>
                </div>

                <div className="w-full lg:w-80 shrink-0">
                  <label htmlFor="program-search" className="sr-only">
                    Search academic programmes
                  </label>
                  <div className="relative">
                    <Search
                      className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="program-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search degree, code, or department"
                      className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#F3EFE7]/80 border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#1E3A8A] focus:bg-[#FFFFFF] transition-colors duration-150"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search query"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#78716C] hover:text-[#1C1917] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Filter Toolbar */}
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5DFD5]">
                <div
                  role="group"
                  aria-label="Filter by academic stream"
                  className="flex flex-wrap items-center gap-1.5"
                >
                  {STREAM_FILTERS.map((stream) => {
                    const active = selectedStream === stream;
                    return (
                      <button
                        key={stream}
                        type="button"
                        onClick={() => setSelectedStream(stream)}
                        className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                          active
                            ? 'bg-[#1E3A8A] text-[#FBF9F5]'
                            : 'bg-[#F3EFE7] text-[#44403C] hover:bg-[#EBE6DF] hover:text-[#1C1917]'
                        }`}
                      >
                        {stream === 'All' ? 'All Streams' : stream}
                      </button>
                    );
                  })}
                </div>

                <div
                  role="group"
                  aria-label="Filter by degree level"
                  className="inline-flex items-center p-1 bg-[#F3EFE7] border border-[#E5DFD5] rounded-md self-start md:self-auto shrink-0"
                >
                  {DEGREE_LEVELS.map((level) => {
                    const active = selectedLevel === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSelectedLevel(level)}
                        className={`px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs border border-[#D6CEBE]'
                            : 'text-[#57534E] hover:text-[#1C1917]'
                        }`}
                      >
                        {level === 'All' ? 'All Levels' : level}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Program Results Summary */}
              <div className="pt-5 pb-5 flex items-center justify-between text-xs text-[#57534E]">
                <span className="tabular-nums">
                  Showing {filteredPrograms.length} of {ACADEMIC_PROGRAMS.length} featured
                  programmes
                </span>
                {(selectedStream !== 'All' || selectedLevel !== 'All' || searchQuery) && (
                  <button
                    type="button"
                    onClick={resetCatalogFilters}
                    className="font-medium text-[#1E3A8A] hover:underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Program Cards Grid */}
              {filteredPrograms.length === 0 ? (
                <div className="py-16 px-6 text-center border border-[#E5DFD5] rounded-lg bg-[#F3EFE7]/40">
                  <p className="font-serif text-xl font-medium text-[#1C1917]">
                    No programmes match your current selection.
                  </p>
                  <p className="mt-2 text-sm text-[#57534E]">
                    Try clearing the search query or switching to another academic stream.
                  </p>
                  <button
                    type="button"
                    onClick={resetCatalogFilters}
                    className="mt-5 px-4 py-2 text-sm font-medium text-[#FBF9F5] bg-[#1E3A8A] hover:bg-[#172D6B] rounded-md transition-colors duration-150 cursor-pointer"
                  >
                    Show All Programmes
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredPrograms.map((program) => (
                    <article
                      key={program.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveProgram(program)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveProgram(program);
                        }
                      }}
                      className="group p-6 sm:p-7 rounded-lg border border-[#E5DFD5] bg-[#FFFFFF] hover:border-[#1E3A8A]/45 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-16px_rgba(30,58,138,0.2)] transition-all duration-200 flex flex-col justify-between gap-5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                          <span className="font-semibold text-[#92400E]">{program.degreeType}</span>
                          <span aria-hidden="true">·</span>
                          <span>{program.stream}</span>
                          <span aria-hidden="true">·</span>
                          <span>{program.duration}</span>
                        </div>

                        <h3 className="mt-2.5 font-serif text-xl font-semibold text-[#1C1917] group-hover:text-[#1E3A8A] transition-colors duration-150 leading-snug">
                          {program.title}
                        </h3>

                        <p className="mt-2 text-sm text-[#44403C] leading-relaxed">
                          {program.overview}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#EFEAE1] flex items-center justify-between gap-4">
                        <span className="font-mono text-xs text-[#78716C] tabular-nums">
                          {program.code} · {program.intake} Seats
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E3A8A] whitespace-nowrap shrink-0">
                          <span>Syllabus & Eligibility</span>
                          <ArrowUpRight
                            className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* SECTION 02: PLACEMENT OUTCOMES — DEEP MIDNIGHT INDIGO CONTRAST BAND */}
          <section
            id="placements"
            className="bg-[#0F172A] text-[#F8FAFC] py-16 lg:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/15">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FBBF24]">
                    02. Placement Outcomes
                  </p>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#F8FAFC] [text-wrap:balance]">
                    Verified Campus Recruitment & Career Progression
                  </h2>
                  <p className="mt-3 text-base text-[#CBD5E1] leading-relaxed">
                    The Training and Placement Cell coordinates technical bootcamps, aptitude
                    assessments, and direct campus drives with product engineering, financial
                    services, and life science employers across South India.
                  </p>
                </div>

                <div
                  role="group"
                  aria-label="Select graduating cohort year"
                  className="inline-flex items-center p-1 bg-[#1E293B] border border-white/15 rounded-md self-start md:self-auto shrink-0"
                >
                  {Object.keys(PLACEMENT_COHORTS).map((year) => {
                    const active = selectedCohortYear === year;
                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => setSelectedCohortYear(year)}
                        className={`px-3.5 py-1.5 text-xs sm:text-sm font-mono font-medium rounded transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                          active
                            ? 'bg-[#FBBF24] text-[#0F172A]'
                            : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tabular KPI Grid */}
              <motion.div
                key={selectedCohortYear}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l border-white/15 bg-[#1E293B]/45"
              >
                <div className="p-5 border-r border-b border-white/15">
                  <p className="text-xs text-[#94A3B8]">Placement Rate</p>
                  <p className="mt-2 font-mono text-2xl font-medium text-[#FBBF24] tabular-nums">
                    {activeCohort.placementRate}
                  </p>
                </div>
                <div className="p-5 border-r border-b border-white/15">
                  <p className="text-xs text-[#94A3B8]">Total Offers</p>
                  <p className="mt-2 font-mono text-2xl font-medium text-[#F8FAFC] tabular-nums">
                    {activeCohort.totalOffers}
                  </p>
                </div>
                <div className="p-5 border-r border-b border-white/15">
                  <p className="text-xs text-[#94A3B8]">Recruiters Visited</p>
                  <p className="mt-2 font-mono text-2xl font-medium text-[#F8FAFC] tabular-nums">
                    {activeCohort.recruitersCount}
                  </p>
                </div>
                <div className="p-5 border-r border-b border-white/15">
                  <p className="text-xs text-[#94A3B8]">Highest Package</p>
                  <p className="mt-2 font-mono text-2xl font-medium text-[#FBBF24] tabular-nums">
                    {activeCohort.highestCtc}
                  </p>
                </div>
                <div className="p-5 border-r border-b border-white/15">
                  <p className="text-xs text-[#94A3B8]">Median Package</p>
                  <p className="mt-2 font-mono text-2xl font-medium text-[#F8FAFC] tabular-nums">
                    {activeCohort.medianCtc}
                  </p>
                </div>
                <div className="p-5 border-r border-b border-white/15">
                  <p className="text-xs text-[#94A3B8]">Higher Studies</p>
                  <p className="mt-2 font-mono text-2xl font-medium text-[#F8FAFC] tabular-nums">
                    {activeCohort.higherStudiesShare}
                  </p>
                </div>
              </motion.div>

              {/* Sector Breakdown + Recruiter Directory */}
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                  <h3 className="font-serif text-xl font-semibold text-[#F8FAFC]">
                    Offers by Industry Sector ({activeCohort.year})
                  </h3>
                  <p className="mt-1 text-xs text-[#94A3B8]">
                    Distribution across registered final-year UG and PG cohorts.
                  </p>

                  <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
                    {activeCohort.topSectors.map((row) => (
                      <div key={row.sector} className="py-3.5">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-sm font-medium text-[#F8FAFC]">{row.sector}</span>
                          <span className="font-mono text-xs text-[#CBD5E1] tabular-nums shrink-0">
                            {row.offers} offers · {row.share}
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FBBF24] transition-all duration-300"
                            style={{ width: row.share }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <h3 className="font-serif text-xl font-semibold text-[#F8FAFC]">
                    Participating Campus Recruiters
                  </h3>
                  <p className="mt-1 text-xs text-[#94A3B8]">
                    Representative employers hiring regularly from Kuniamuthur campus drives.
                  </p>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {RECRUITER_DIRECTORY.map((emp) => (
                      <div
                        key={emp.name}
                        className="p-4 rounded-md border border-white/10 bg-[#1E293B]/65 hover:border-[#FBBF24]/45 transition-colors duration-150 flex flex-col justify-between"
                      >
                        <p className="text-sm font-semibold text-[#F8FAFC]">{emp.name}</p>
                        <p className="mt-1 text-xs text-[#94A3B8]">{emp.domain}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attributable Graduate Outcomes */}
              <div className="mt-12 pt-10 border-t border-white/15 grid grid-cols-1 md:grid-cols-2 gap-8">
                {GRADUATE_OUTCOMES.map((alum) => (
                  <blockquote
                    key={alum.name}
                    className="bg-[#1E293B]/70 border border-white/10 rounded-lg p-6 sm:p-7 flex flex-col justify-between gap-5"
                  >
                    <p className="font-serif text-lg leading-relaxed text-[#F1F5F9]">
                      “{alum.story}”
                    </p>
                    <footer className="pt-4 border-t border-white/10">
                      <p className="text-sm font-semibold text-[#FBBF24]">{alum.name}</p>
                      <p className="text-xs text-[#CBD5E1] mt-0.5">
                        {alum.role}, {alum.company} · {alum.degree} ({alum.cohort})
                      </p>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 03: CAMPUS INFRASTRUCTURE & RESEARCH — ASYMMETRIC BENTO GALLERY */}
          <section id="campus" className="bg-[#FBF9F5] py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#92400E]">
                    03. Campus & Research Infrastructure
                  </p>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] [text-wrap:balance]">
                    Libraries, Laboratories, and Scholarly Commons
                  </h2>
                </div>
                <p className="text-sm text-[#57534E] max-w-sm">
                  Select any campus facility photograph below to inspect equipment capacity and
                  operational timings.
                </p>
              </div>

              {/* Row 1 Asymmetric Bento Pair: 5 + 7 columns */}
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <button
                  type="button"
                  onClick={() => setActiveCampusSpace(quadSpace)}
                  className="lg:col-span-5 group relative overflow-hidden rounded-lg border border-[#E5DFD5] bg-[#1C1917] text-left aspect-[4/3] lg:aspect-auto lg:min-h-[380px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                >
                  <ResilientImage
                    src={quadSpace.image}
                    alt={quadSpace.alt}
                    fallbackTitle={quadSpace.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-[#FBBF24] uppercase tracking-wider">
                        {quadSpace.figure} · {quadSpace.subtitle}
                      </p>
                      <h3 className="mt-1 font-serif text-xl sm:text-2xl font-semibold text-white">
                        {quadSpace.title}
                      </h3>
                    </div>
                    <Maximize2
                      className="w-5 h-5 text-white/80 group-hover:text-[#FBBF24] shrink-0 transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveCampusSpace(auditoriumSpace)}
                  className="lg:col-span-7 group relative overflow-hidden rounded-lg border border-[#E5DFD5] bg-[#1C1917] text-left aspect-[16/10] lg:aspect-auto lg:min-h-[380px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                >
                  <ResilientImage
                    src={auditoriumSpace.image}
                    alt={auditoriumSpace.alt}
                    fallbackTitle={auditoriumSpace.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                    <div className="max-w-lg">
                      <p className="font-mono text-xs text-[#FBBF24] uppercase tracking-wider">
                        {auditoriumSpace.figure} · {auditoriumSpace.subtitle}
                      </p>
                      <h3 className="mt-1 font-serif text-xl sm:text-2xl font-semibold text-white">
                        {auditoriumSpace.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[#E2E8F0] hidden sm:block">
                        {auditoriumSpace.description}
                      </p>
                    </div>
                    <Maximize2
                      className="w-5 h-5 text-white/80 group-hover:text-[#FBBF24] shrink-0 transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              </div>

              {/* Row 2 Academic & Lab Triad */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[librarySpace, computingSpace, biotechSpace].map((space) => (
                  <article
                    key={space.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveCampusSpace(space)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveCampusSpace(space);
                      }
                    }}
                    className="group rounded-lg border border-[#E5DFD5] bg-[#FFFFFF] overflow-hidden hover:border-[#1E3A8A]/45 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-16px_rgba(30,58,138,0.18)] transition-all duration-200 flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#F3EFE7]">
                      <ResilientImage
                        src={space.image}
                        alt={space.alt}
                        fallbackTitle={space.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs text-[#92400E] uppercase tracking-wider">
                          {space.figure} · {space.subtitle}
                        </p>
                        <h3 className="mt-1.5 font-serif text-xl font-semibold text-[#1C1917] group-hover:text-[#1E3A8A] transition-colors">
                          {space.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#44403C] leading-relaxed">
                          {space.description}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
                        <span>Inspect Facility Specs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Research & Innovation Anchor */}
              <div
                id="research"
                className="mt-14 pt-12 border-t border-[#E5DFD5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#92400E]">
                    Research & IPR Cell
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1C1917]">
                    Recognized Doctoral Centres & Funded Grants
                  </h3>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 border-t border-l border-[#E5DFD5] bg-[#F3EFE7]/55">
                  <div className="p-5 border-r border-b border-[#E5DFD5]">
                    <p className="font-mono text-2xl font-medium text-[#1E3A8A] tabular-nums">5</p>
                    <p className="mt-1 text-sm font-semibold text-[#1C1917]">
                      Bharathiar Research Centres
                    </p>
                    <p className="mt-1 text-xs text-[#57534E]">
                      Computer Science, Commerce, Biotechnology, Microbiology, English
                    </p>
                  </div>
                  <div className="p-5 border-r border-b border-[#E5DFD5]">
                    <p className="font-mono text-2xl font-medium text-[#1E3A8A] tabular-nums">
                      180+
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#1C1917]">
                      Indexed Publications / Year
                    </p>
                    <p className="mt-1 text-xs text-[#57534E]">
                      Scopus, Web of Science, and UGC-CARE listed journals
                    </p>
                  </div>
                  <div className="p-5 border-r border-b border-[#E5DFD5]">
                    <p className="font-mono text-2xl font-medium text-[#1E3A8A] tabular-nums">32</p>
                    <p className="mt-1 text-sm font-semibold text-[#1C1917]">
                      Published Patents & IPR
                    </p>
                    <p className="mt-1 text-xs text-[#57534E]">
                      Faculty-student inventions supported by the Institution’s Innovation Council
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 04: ADMISSIONS 2026–27 & INQUIRY FORM */}
          <section
            id="admissions"
            ref={admissionsRef}
            className="border-t border-[#E5DFD5] bg-[#F3EFE7]/75 py-16 lg:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Merit Process & Campus Desk */}
                <div className="lg:col-span-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#92400E]">
                    04. Admissions 2026–27
                  </p>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] [text-wrap:balance]">
                    Transparent Merit-Based Enrollment
                  </h2>
                  <p className="mt-3 text-base text-[#44403C] leading-relaxed">
                    Applications for the 2026–27 academic session are open for Undergraduate,
                    Postgraduate, and Doctoral tracks. Selection follows Tamil Nadu state norms and
                    qualifying board merit.
                  </p>

                  <ol className="mt-8 space-y-5 border-t border-[#D6CEBE] pt-6">
                    <li className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-semibold text-[#1E3A8A] tabular-nums shrink-0">
                        01.
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#1C1917]">
                          Submit Admissions Inquiry & Mark Details
                        </p>
                        <p className="text-xs text-[#57534E] mt-0.5 leading-relaxed">
                          Register your preferred degree stream and qualifying +2 or undergraduate
                          percentage.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-semibold text-[#1E3A8A] tabular-nums shrink-0">
                        02.
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#1C1917]">
                          Merit Shortlist & Document Verification
                        </p>
                        <p className="text-xs text-[#57534E] mt-0.5 leading-relaxed">
                          Original transfer certificate, mark statements, and community certificate
                          verification.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-semibold text-[#1E3A8A] tabular-nums shrink-0">
                        03.
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#1C1917]">
                          Department Faculty Counseling
                        </p>
                        <p className="text-xs text-[#57534E] mt-0.5 leading-relaxed">
                          One-on-one academic advising at the Kuniamuthur campus with Head of
                          Department.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-semibold text-[#1E3A8A] tabular-nums shrink-0">
                        04.
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#1C1917]">
                          Seat Confirmation & Hostel / Bus Allocation
                        </p>
                        <p className="text-xs text-[#57534E] mt-0.5 leading-relaxed">
                          Complete tuition remittance and collect your institutional identity and
                          transport pass.
                        </p>
                      </div>
                    </li>
                  </ol>

                  <div className="mt-8 p-6 bg-[#FFFFFF] border border-[#D6CEBE] rounded-lg space-y-3 text-sm">
                    <p className="font-serif text-base font-semibold text-[#1C1917]">
                      Admissions Office — Coimbatore Campus
                    </p>
                    <div className="flex items-start gap-2.5 text-[#44403C]">
                      <MapPin
                        className="w-4 h-4 mt-0.5 text-[#78716C] shrink-0"
                        aria-hidden="true"
                      />
                      <span>Sugunapuram, Kuniamuthur, Coimbatore, Tamil Nadu 641008</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[#44403C]">
                      <Clock className="w-4 h-4 text-[#78716C] shrink-0" aria-hidden="true" />
                      <span className="tabular-nums">Mon – Sat · 09:00 – 17:00 IST</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[#44403C]">
                      <Phone className="w-4 h-4 text-[#78716C] shrink-0" aria-hidden="true" />
                      <span className="font-mono text-xs tabular-nums">+91 422 267 8400</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[#44403C]">
                      <Mail className="w-4 h-4 text-[#78716C] shrink-0" aria-hidden="true" />
                      <span>admissions@skasc.ac.in</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Validated Admissions Inquiry Form */}
                <div className="lg:col-span-7">
                  <div className="bg-[#FFFFFF] border border-[#D6CEBE] rounded-lg p-6 sm:p-8 shadow-xs">
                    {submittedRefId ? (
                      <div className="py-8 space-y-5">
                        <div className="flex items-start gap-3">
                          <CheckCircle2
                            className="w-6 h-6 text-[#14532D] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <div>
                            <p className="text-xs font-mono uppercase tracking-wider text-[#14532D] tabular-nums">
                              Inquiry Registered · Reference {submittedRefId}
                            </p>
                            <h3 className="mt-1 font-serif text-2xl font-semibold text-[#1C1917]">
                              Thank you, {formState.fullName}.
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed text-[#44403C]">
                          Your 2026–27 admissions inquiry for{' '}
                          <span className="font-semibold text-[#1C1917]">
                            {formState.preferredProgram}
                          </span>{' '}
                          has been logged with the Admissions Counseling Desk at Kuniamuthur,
                          Coimbatore. A prospectus and counseling slot schedule will be sent to{' '}
                          <span className="font-medium text-[#1C1917]">{formState.email}</span>{' '}
                          within one working day.
                        </p>

                        <dl className="divide-y divide-[#E5DFD5] border-y border-[#E5DFD5] text-sm">
                          <div className="py-3 flex justify-between gap-4">
                            <dt className="text-[#78716C]">Reference ID</dt>
                            <dd className="font-mono font-medium text-[#1C1917] tabular-nums">
                              {submittedRefId}
                            </dd>
                          </div>
                          <div className="py-3 flex justify-between gap-4">
                            <dt className="text-[#78716C]">Qualifying Aggregate</dt>
                            <dd className="font-mono font-medium text-[#1C1917] tabular-nums">
                              {formState.qualifyingScore}%
                            </dd>
                          </div>
                          <div className="py-3 flex justify-between gap-4">
                            <dt className="text-[#78716C]">Accommodation Preference</dt>
                            <dd className="font-medium text-[#1C1917]">
                              {formState.accommodation}
                            </dd>
                          </div>
                        </dl>

                        <button
                          type="button"
                          onClick={() => {
                            setSubmittedRefId(null);
                            setFormState((prev) => ({
                              ...prev,
                              fullName: '',
                              email: '',
                              phone: '',
                              qualifyingScore: '',
                              notes: '',
                            }));
                            setFormErrors({});
                          }}
                          className="px-5 py-2.5 text-sm font-medium text-[#1C1917] bg-[#F3EFE7] border border-[#D6CEBE] hover:bg-[#EBE6DF] rounded-md transition-colors duration-150 cursor-pointer"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} noValidate className="space-y-5">
                        <div className="pb-4 border-b border-[#E5DFD5]">
                          <h3 className="font-serif text-2xl font-semibold text-[#1C1917]">
                            Admissions Inquiry & Prospectus Request
                          </h3>
                          <p className="mt-1 text-sm text-[#57534E]">
                            Receive programme fee structure, scholarship eligibility, and counseling
                            dates.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label
                              htmlFor="full-name"
                              className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
                            >
                              Applicant Full Name
                            </label>
                            <input
                              id="full-name"
                              type="text"
                              required
                              value={formState.fullName}
                              onChange={(e) => {
                                setFormState((p) => ({ ...p, fullName: e.target.value }));
                                if (formErrors.fullName) {
                                  setFormErrors((p) => ({ ...p, fullName: undefined }));
                                }
                              }}
                              placeholder="e.g., Dharshini Ramesh"
                              className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1E3A8A]"
                            />
                            {formErrors.fullName && (
                              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#991B1B]">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                <span>{formErrors.fullName}</span>
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="email-address"
                              className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
                            >
                              Email Address
                            </label>
                            <input
                              id="email-address"
                              type="email"
                              required
                              value={formState.email}
                              onChange={(e) => {
                                setFormState((p) => ({ ...p, email: e.target.value }));
                                if (formErrors.email) {
                                  setFormErrors((p) => ({ ...p, email: undefined }));
                                }
                              }}
                              placeholder="applicant@example.com"
                              className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1E3A8A]"
                            />
                            {formErrors.email && (
                              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#991B1B]">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                <span>{formErrors.email}</span>
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="mobile-number"
                              className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
                            >
                              Mobile Number (India)
                            </label>
                            <input
                              id="mobile-number"
                              type="tel"
                              required
                              value={formState.phone}
                              onChange={(e) => {
                                setFormState((p) => ({ ...p, phone: e.target.value }));
                                if (formErrors.phone) {
                                  setFormErrors((p) => ({ ...p, phone: undefined }));
                                }
                              }}
                              placeholder="98422 00000"
                              className="w-full px-3.5 py-2.5 text-sm font-mono bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1E3A8A]"
                            />
                            {formErrors.phone && (
                              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#991B1B]">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                <span>{formErrors.phone}</span>
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="qualifying-score"
                              className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
                            >
                              Qualifying Exam Aggregate (%)
                            </label>
                            <input
                              id="qualifying-score"
                              type="number"
                              min={35}
                              max={100}
                              step="0.1"
                              required
                              value={formState.qualifyingScore}
                              onChange={(e) => {
                                setFormState((p) => ({ ...p, qualifyingScore: e.target.value }));
                                if (formErrors.qualifyingScore) {
                                  setFormErrors((p) => ({ ...p, qualifyingScore: undefined }));
                                }
                              }}
                              placeholder="e.g., 88.5"
                              className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1E3A8A]"
                            />
                            {formErrors.qualifyingScore && (
                              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#991B1B]">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                <span>{formErrors.qualifyingScore}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="preferred-program"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
                          >
                            Preferred Academic Programme
                          </label>
                          <select
                            id="preferred-program"
                            value={formState.preferredProgram}
                            onChange={(e) =>
                              setFormState((p) => ({ ...p, preferredProgram: e.target.value }))
                            }
                            className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] focus:outline-none focus:border-[#1E3A8A]"
                          >
                            {ACADEMIC_PROGRAMS.map((prog) => (
                              <option key={prog.id} value={prog.title}>
                                {prog.degreeType} — {prog.title}
                              </option>
                            ))}
                          </select>
                          {formErrors.preferredProgram && (
                            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#991B1B]">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                              <span>{formErrors.preferredProgram}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-2">
                            Residence & Commute Preference
                          </span>
                          <div className="inline-flex items-center p-1 bg-[#F3EFE7] border border-[#E5DFD5] rounded-md">
                            {(['Day Scholar', 'Campus Hostel'] as const).map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() =>
                                  setFormState((p) => ({ ...p, accommodation: option }))
                                }
                                className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                                  formState.accommodation === option
                                    ? 'bg-[#FFFFFF] text-[#1C1917] shadow-xs border border-[#D6CEBE]'
                                    : 'text-[#57534E] hover:text-[#1C1917]'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="applicant-notes"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
                          >
                            Questions on Scholarships, Sports Quota, or Transport (Optional)
                          </label>
                          <textarea
                            id="applicant-notes"
                            rows={3}
                            value={formState.notes}
                            onChange={(e) => setFormState((p) => ({ ...p, notes: e.target.value }))}
                            placeholder="Mention state-level sports representation, merit scholarship inquiry, or preferred bus route in Coimbatore."
                            className="w-full px-3.5 py-2.5 text-sm bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1E3A8A]"
                          />
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <p className="text-xs text-[#78716C]">
                            Direct Kuniamuthur Admissions Desk · Zero third-party agents.
                          </p>
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-[#FBF9F5] bg-[#1E3A8A] hover:bg-[#172D6B] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                          >
                            <span>Request Prospectus & Counseling</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* GROUNDED INSTITUTIONAL FOOTER */}
        <footer className="bg-[#1C1917] text-[#E7E5E4] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
              <div className="md:col-span-5">
                <p className="font-serif text-xl font-semibold text-[#FBF9F5]">
                  Sri Krishna Arts and Science College
                </p>
                <p className="mt-2.5 text-sm text-[#A8A29E] leading-relaxed max-w-sm">
                  An Autonomous Institution affiliated to Bharathiar University, accredited with ‘A’
                  Grade by NAAC. Sugunapuram, Kuniamuthur, Coimbatore – 641008, Tamil Nadu.
                </p>
              </div>

              <div className="md:col-span-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                  Navigation
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[#D6D3D1]">
                  <li>
                    <a href="#academics" className="hover:text-[#FBBF24] transition-colors">
                      Academic Programmes
                    </a>
                  </li>
                  <li>
                    <a href="#placements" className="hover:text-[#FBBF24] transition-colors">
                      Placement Outcomes
                    </a>
                  </li>
                  <li>
                    <a href="#campus" className="hover:text-[#FBBF24] transition-colors">
                      Campus & Libraries
                    </a>
                  </li>
                  <li>
                    <a href="#research" className="hover:text-[#FBBF24] transition-colors">
                      Doctoral Research
                    </a>
                  </li>
                  <li>
                    <a href="#admissions" className="hover:text-[#FBBF24] transition-colors">
                      Admissions 2026–27
                    </a>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                  Statutory Disclosures & Governance
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[#D6D3D1]">
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveDisclosure(INSTITUTIONAL_DISCLOSURES.iqac)}
                      className="hover:text-[#FBBF24] transition-colors text-left cursor-pointer"
                    >
                      IQAC & NAAC Accreditation Record
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveDisclosure(INSTITUTIONAL_DISCLOSURES.nirf)}
                      className="hover:text-[#FBBF24] transition-colors text-left cursor-pointer"
                    >
                      NIRF India Rankings Disclosure
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveDisclosure(INSTITUTIONAL_DISCLOSURES['anti-ragging'])}
                      className="hover:text-[#FBBF24] transition-colors text-left cursor-pointer"
                    >
                      Anti-Ragging & Student Welfare Cell
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveDisclosure(INSTITUTIONAL_DISCLOSURES.calendar)}
                      className="hover:text-[#FBBF24] transition-colors text-left cursor-pointer"
                    >
                      Academic Calendar 2026–27
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A8A29E]">
              <p>© 2026 Sri Krishna Arts and Science College, Coimbatore. All rights reserved.</p>
              <p className="font-mono tabular-nums">Kuniamuthur · Coimbatore 641008 · Tamil Nadu</p>
            </div>
          </div>
        </footer>

        <ProgramModal
          program={activeProgram}
          onClose={() => setActiveProgram(null)}
          onInquire={handleInquireProgram}
        />
        <CampusSpaceModal
          space={activeCampusSpace}
          onClose={() => setActiveCampusSpace(null)}
        />
        <DisclosureModal
          disclosure={activeDisclosure}
          onClose={() => setActiveDisclosure(null)}
        />
      </div>
    </MotionConfig>
  );
}
