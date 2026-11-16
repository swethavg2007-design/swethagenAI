export type StreamCategory =
  | 'All'
  | 'Computing & AI'
  | 'Commerce & Finance'
  | 'Management'
  | 'Life Sciences'
  | 'Humanities & Media';

export type DegreeLevel = 'All' | 'UG' | 'PG' | 'Research';

export interface AcademicProgram {
  id: string;
  code: string;
  title: string;
  degreeType: 'UG' | 'PG' | 'Research';
  stream: Exclude<StreamCategory, 'All'>;
  duration: string;
  department: string;
  intake: number;
  eligibility: string;
  overview: string;
  coreModules: string[];
  careerPathways: string[];
}

export interface CohortPlacementRecord {
  year: string;
  placementRate: string;
  totalOffers: string;
  recruitersCount: string;
  highestCtc: string;
  medianCtc: string;
  higherStudiesShare: string;
  topSectors: { sector: string; share: string; offers: string }[];
}

export interface GraduateOutcome {
  name: string;
  degree: string;
  cohort: string;
  role: string;
  company: string;
  story: string;
}

export interface InstitutionalDisclosure {
  id: 'iqac' | 'nirf' | 'anti-ragging' | 'calendar';
  title: string;
  kicker: string;
  summary: string;
  rows: { label: string; value: string }[];
}

export const HERO_IMAGE = '/src/assets/images/skasc_campus_hero_clean_1794810313592.jpg';
export const LIBRARY_IMAGE = '/src/assets/images/skasc_library_commons_1794810293874.jpg';
export const COMPUTING_LAB_IMAGE = '/src/assets/images/skasc_computing_lab_1794810293788.jpg';
export const BIOTECH_LAB_IMAGE = '/src/assets/images/skasc_biotech_lab_1794810294205.jpg';
export const AUDITORIUM_IMAGE = '/src/assets/images/skasc_auditorium_seminar_1794811153957.jpg';
export const STUDENT_QUAD_IMAGE = '/src/assets/images/skasc_student_quad_clean_1794811171892.jpg';

export interface CampusSpace {
  id: string;
  figure: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  description: string;
  highlights: { label: string; value: string }[];
}

export const CAMPUS_SPACES: CampusSpace[] = [
  {
    id: 'student-quad',
    figure: 'Fig. 2',
    title: 'Colonnade & Campus Life',
    subtitle: 'Kuniamuthur Green Campus',
    image: STUDENT_QUAD_IMAGE,
    alt: 'Students walking and conversing along the shaded stone colonnade pathway at Sri Krishna Arts and Science College in Coimbatore',
    description:
      'Set across lush landscaped courtyards in Sugunapuram, the campus supports 24+ student clubs, NSS/NCC units, fine arts ensembles, and inter-collegiate athletics.',
    highlights: [
      { label: 'Student Clubs & Cells', value: '24 Active Societies' },
      { label: 'Campus Transit Network', value: '38 Dedicated Bus Routes' },
      { label: 'Residential Hostels', value: 'Separate Men & Women Blocks' },
    ],
  },
  {
    id: 'auditorium',
    figure: 'Fig. 3',
    title: 'Convocation & Convention Auditorium',
    subtitle: '1,200-Seat Acoustic Hall',
    image: AUDITORIUM_IMAGE,
    alt: 'Students and faculty attending an academic symposium inside the timber-paneled Convocation Auditorium',
    description:
      'Hosts national academic symposia, annual convocation ceremonies, industry leadership colloquia, and inter-departmental cultural festivals.',
    highlights: [
      { label: 'Seating Capacity', value: '1,200 Tiered Seats' },
      { label: 'Audio-Visual Rig', value: '4K Projection & Studio Acoustics' },
      { label: 'Annual Colloquia', value: '40+ National Seminars / Yr' },
    ],
  },
  {
    id: 'library',
    figure: 'Fig. 4',
    title: 'Central Library & Digital Commons',
    subtitle: '68,400+ Print & Digital Volumes',
    image: LIBRARY_IMAGE,
    alt: 'Sunlit teakwood reading tables and stacked book galleries inside the Central Library',
    description:
      'Seats 450 scholars across quiet reading rooms and digital research bays with campus-wide subscriptions to IEEE Xplore, DELNET, JSTOR, and N-LIST.',
    highlights: [
      { label: 'Print & Reference Books', value: '68,400+ Volumes' },
      { label: 'Digital Databases', value: 'IEEE · DELNET · INFLIBNET' },
      { label: 'Reading Hours', value: '08:00 – 20:00 IST' },
    ],
  },
  {
    id: 'computing-lab',
    figure: 'Fig. 5',
    title: 'Computing & Cognitive Systems Lab',
    subtitle: '1,100+ Networked Workstations',
    image: COMPUTING_LAB_IMAGE,
    alt: 'Students collaborating with a faculty mentor at workstations in the Computing and AI Laboratory',
    description:
      'High-speed fiber-backed Linux and Windows workstations equipped with GPU compute nodes, cloud sandboxes, and full-stack capstone project studios.',
    highlights: [
      { label: 'Workstation Nodes', value: '1,100+ Systems' },
      { label: 'Specialized Tracks', value: 'AI, Cloud & Cybersecurity' },
      { label: 'Campus Fiber', value: '1 Gbps Redundant Leased Line' },
    ],
  },
  {
    id: 'biotech-lab',
    figure: 'Fig. 6',
    title: 'DST-FIST Life Sciences Wing',
    subtitle: 'Molecular Biology & Instrumentation',
    image: BIOTECH_LAB_IMAGE,
    alt: 'Researchers working with optical microscopes and analytical instruments in the Biotechnology Laboratory',
    description:
      'Equipped with PCR thermal cyclers, UV-Vis spectrophotometers, laminar airflow cabinets, and bioreactors supporting molecular diagnostics and bioprocessing.',
    highlights: [
      { label: 'Grant Recognition', value: 'DST-FIST & DBT Supported' },
      { label: 'Core Equipment', value: 'RT-PCR, HPLC & Bioreactors' },
      { label: 'Research Output', value: 'Patents & Peer-Reviewed Thesis' },
    ],
  },
];

export const STREAM_FILTERS: StreamCategory[] = [
  'All',
  'Computing & AI',
  'Commerce & Finance',
  'Management',
  'Life Sciences',
  'Humanities & Media',
];

export const DEGREE_LEVELS: DegreeLevel[] = ['All', 'UG', 'PG', 'Research'];

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: 'bsc-cs-ai',
    code: 'SK-UG-101',
    title: 'B.Sc. Computer Science with Cognitive Systems',
    degreeType: 'UG',
    stream: 'Computing & AI',
    duration: '3 Years (6 Semesters)',
    department: 'School of Computing',
    intake: 120,
    eligibility: 'Higher Secondary (10+2) with Mathematics or Computer Science',
    overview:
      'Built around foundational computer architecture, statistical learning, and applied software engineering with mandatory industry capstone sprints in semesters five and six.',
    coreModules: [
      'Data Structures & Algorithm Analysis',
      'Applied Machine Learning & Neural Models',
      'Distributed Cloud Architecture',
      'Relational & Graph Database Systems',
    ],
    careerPathways: ['Software Development Engineer', 'ML Operations Analyst', 'Data Platform Engineer'],
  },
  {
    id: 'bca',
    code: 'SK-UG-102',
    title: 'Bachelor of Computer Applications (BCA)',
    degreeType: 'UG',
    stream: 'Computing & AI',
    duration: '3 Years (6 Semesters)',
    department: 'Department of Computer Applications',
    intake: 180,
    eligibility: 'Higher Secondary (10+2) in any stream with Mathematics / Business Math',
    overview:
      'Practice-oriented undergraduate curriculum emphasizing full-stack web engineering, enterprise Java/Python frameworks, and mobile application development.',
    coreModules: [
      'Object-Oriented Systems in Java',
      'Full-Stack Web Engineering',
      'Cloud DevOps & Containerization',
      'Enterprise Information Security',
    ],
    careerPathways: ['Full-Stack Developer', 'Cloud Support Associate', 'QA Automation Engineer'],
  },
  {
    id: 'bsc-ds',
    code: 'SK-UG-103',
    title: 'B.Sc. Data Science & Analytics',
    degreeType: 'UG',
    stream: 'Computing & AI',
    duration: '3 Years (6 Semesters)',
    department: 'School of Computing',
    intake: 60,
    eligibility: 'Higher Secondary (10+2) with Mathematics / Statistics',
    overview:
      'Integrates mathematical statistics, Python computation, econometrics, and visual storytelling for enterprise decision systems.',
    coreModules: [
      'Probability & Statistical Inference',
      'Big Data Engineering with Spark',
      'Time-Series Forecasting',
      'Business Intelligence & Tableau',
    ],
    careerPathways: ['Data Analyst', 'Business Intelligence Specialist', 'Quantitative Researcher'],
  },
  {
    id: 'msc-cs',
    code: 'SK-PG-201',
    title: 'M.Sc. Computer Science',
    degreeType: 'PG',
    stream: 'Computing & AI',
    duration: '2 Years (4 Semesters)',
    department: 'School of Computing',
    intake: 40,
    eligibility: 'B.Sc. Computer Science / BCA / B.Sc. IT with minimum 55% aggregate',
    overview:
      'Advanced postgraduate study covering compiler theory, high-performance computing, network security, and peer-reviewed thesis work.',
    coreModules: [
      'Advanced Operating Systems',
      'Deep Learning & Computer Vision',
      'Cryptography & Network Defense',
      'Graduate Research Thesis',
    ],
    careerPathways: ['Systems Architect', 'Applied AI Engineer', 'Doctoral Research Fellow'],
  },
  {
    id: 'bcom-pa',
    code: 'SK-UG-104',
    title: 'B.Com. Professional Accounting',
    degreeType: 'UG',
    stream: 'Commerce & Finance',
    duration: '3 Years (6 Semesters)',
    department: 'School of Commerce',
    intake: 120,
    eligibility: 'Higher Secondary (10+2) with Commerce & Accountancy',
    overview:
      'Designed in alignment with CA, CMA, and ACCA professional syllabi, pairing statutory Indian accounting standards with corporate taxation.',
    coreModules: [
      'Corporate Accounting & Ind AS',
      'Direct & Indirect Taxation (GST)',
      'Auditing & Assurance Standards',
      'Financial Reporting & Valuation',
    ],
    careerPathways: ['Audit Associate', 'Tax Advisory Analyst', 'Corporate Financial Controller'],
  },
  {
    id: 'bcom-af',
    code: 'SK-UG-105',
    title: 'B.Com. Accounting & Finance',
    degreeType: 'UG',
    stream: 'Commerce & Finance',
    duration: '3 Years (6 Semesters)',
    department: 'School of Commerce',
    intake: 180,
    eligibility: 'Higher Secondary (10+2) with Commerce / Mathematics',
    overview:
      'Comprehensive undergraduate grounding in capital markets, corporate finance, cost accounting, and financial modelling.',
    coreModules: [
      'Cost & Management Accounting',
      'Security Analysis & Portfolio Management',
      'Banking Law & Treasury Operations',
      'Financial Modelling in Excel',
    ],
    careerPathways: ['Investment Operations Analyst', 'Credit Underwriter', 'Treasury Executive'],
  },
  {
    id: 'mcom-ib',
    code: 'SK-PG-202',
    title: 'M.Com. International Business',
    degreeType: 'PG',
    stream: 'Commerce & Finance',
    duration: '2 Years (4 Semesters)',
    department: 'School of Commerce',
    intake: 40,
    eligibility: 'Any Bachelor’s degree in Commerce or Management',
    overview:
      'Focused on cross-border trade documentation, foreign exchange risk, WTO frameworks, and South Indian textile and manufacturing exports.',
    coreModules: [
      'Global Trade Logistics & Customs',
      'Foreign Exchange & Derivatives',
      'International Marketing Strategy',
      'Export Documentation Practicum',
    ],
    careerPathways: ['Export-Import Manager', 'Trade Finance Specialist', 'Global Supply Analyst'],
  },
  {
    id: 'bba-ca',
    code: 'SK-UG-106',
    title: 'BBA Computer Applications',
    degreeType: 'UG',
    stream: 'Management',
    duration: '3 Years (6 Semesters)',
    department: 'Department of Management Sciences',
    intake: 120,
    eligibility: 'Higher Secondary (10+2) in any recognized discipline',
    overview:
      'Blends organizational leadership, operations management, and ERP/CRM enterprise software tools for technology-driven enterprises.',
    coreModules: [
      'Organizational Behavior & HR Systems',
      'Operations & Supply Chain Analytics',
      'Enterprise Resource Planning (SAP Basics)',
      'Digital Brand Strategy',
    ],
    careerPathways: ['Operations Associate', 'Business Analyst', 'Product Marketing Coordinator'],
  },
  {
    id: 'bba-general',
    code: 'SK-UG-107',
    title: 'Bachelor of Business Administration (BBA)',
    degreeType: 'UG',
    stream: 'Management',
    duration: '3 Years (6 Semesters)',
    department: 'Department of Management Sciences',
    intake: 120,
    eligibility: 'Higher Secondary (10+2) in any recognized discipline',
    overview:
      'Case-study driven undergraduate business program covering managerial economics, venture creation, and strategic management.',
    coreModules: [
      'Managerial Economics',
      'Financial & Cost Decision Making',
      'Consumer Behavior & Market Research',
      'New Venture Lab',
    ],
    careerPathways: ['Management Trainee', 'Retail Operations Lead', 'MBA Candidate'],
  },
  {
    id: 'bsc-biotech',
    code: 'SK-UG-108',
    title: 'B.Sc. Biotechnology',
    degreeType: 'UG',
    stream: 'Life Sciences',
    duration: '3 Years (6 Semesters)',
    department: 'Department of Biotechnology',
    intake: 60,
    eligibility: 'Higher Secondary (10+2) with Biology / Botany & Zoology / Chemistry',
    overview:
      'Laboratory-intensive undergraduate program spanning molecular biology, recombinant DNA techniques, bioprocess engineering, and bioinformatics.',
    coreModules: [
      'Cell & Molecular Biology',
      'Genetic Engineering & Genomics',
      'Industrial Bioprocess Technology',
      'Bioinformatics & Sequence Analysis',
    ],
    careerPathways: ['Clinical Research Associate', 'Bioprocess Technician', 'Quality Control Microbiologist'],
  },
  {
    id: 'msc-biotech',
    code: 'SK-PG-203',
    title: 'M.Sc. Biotechnology',
    degreeType: 'PG',
    stream: 'Life Sciences',
    duration: '2 Years (4 Semesters)',
    department: 'Department of Biotechnology',
    intake: 30,
    eligibility: 'B.Sc. Biotechnology / Microbiology / Biochemistry / Life Sciences',
    overview:
      'Postgraduate laboratory training featuring RT-PCR diagnostics, downstream protein purification, and a six-month research dissertation.',
    coreModules: [
      'Recombinant DNA & Proteomics',
      'Immunology & Immunotechnology',
      'Pharmaceutical Bioprocessing',
      'Six-Month Research Dissertation',
    ],
    careerPathways: ['R&D Biochemist', 'Regulatory Affairs Specialist', 'Ph.D. Scholar'],
  },
  {
    id: 'bsc-micro',
    code: 'SK-UG-109',
    title: 'B.Sc. Microbiology',
    degreeType: 'UG',
    stream: 'Life Sciences',
    duration: '3 Years (6 Semesters)',
    department: 'Department of Microbiology',
    intake: 60,
    eligibility: 'Higher Secondary (10+2) with Biology and Chemistry',
    overview:
      'Covers medical bacteriology, food safety testing, environmental bioremediation, and clinical diagnostic instrumentation.',
    coreModules: [
      'General & Medical Bacteriology',
      'Food & Dairy Microbiology',
      'Microbial Genetics',
      'Clinical Diagnostic Techniques',
    ],
    careerPathways: ['Medical Lab Microbiologist', 'Food Safety QA Officer', 'Environmental Analyst'],
  },
  {
    id: 'ba-english',
    code: 'SK-UG-110',
    title: 'B.A. English Literature',
    degreeType: 'UG',
    stream: 'Humanities & Media',
    duration: '3 Years (6 Semesters)',
    department: 'Department of English',
    intake: 60,
    eligibility: 'Higher Secondary (10+2) in any discipline',
    overview:
      'Critical reading across British, Indian Writing in English, postcolonial theory, comparative translation, and editorial publishing.',
    coreModules: [
      'Indian Writing in English & Translation',
      'Literary Criticism & Critical Theory',
      'Academic Writing & Copyediting',
      'Comparative World Drama',
    ],
    careerPathways: ['Editorial Writer', 'Technical Communicator', 'Civil Services / Academia'],
  },
  {
    id: 'bsc-viscom',
    code: 'SK-UG-111',
    title: 'B.Sc. Visual Communication',
    degreeType: 'UG',
    stream: 'Humanities & Media',
    duration: '3 Years (6 Semesters)',
    department: 'Department of Visual Communication',
    intake: 60,
    eligibility: 'Higher Secondary (10+2) in any discipline',
    overview:
      'Studio-driven curriculum in documentary filmmaking, editorial photography, typography, broadcast production, and digital storytelling.',
    coreModules: [
      'Still Photography & Lighting Studio',
      'Graphic Design & Editorial Typography',
      'Digital Cinematography & Editing',
      'Media Law & Documentary Production',
    ],
    careerPathways: ['Visual Designer', 'Film Editor', 'Brand Art Director'],
  },
  {
    id: 'phd-cs-commerce',
    code: 'SK-RES-301',
    title: 'Ph.D. Programmes (Computer Science, Commerce & Biotechnology)',
    degreeType: 'Research',
    stream: 'Computing & AI',
    duration: 'Full-Time / Part-Time (Bharathiar University Norms)',
    department: 'Recognized Research Centres',
    intake: 24,
    eligibility: 'Master’s Degree with minimum 55% + Bharathiar University CET / NET / SET',
    overview:
      'Doctoral research supervised by approved Bharathiar University guides with access to IEEE/Elsevier repositories, central instrumentation, and patent filing support.',
    coreModules: [
      'Research Methodology & Publication Ethics',
      'Domain Literature Colloquium',
      'Sponsored Lab & Field Investigation',
      'Doctoral Thesis Defense',
    ],
    careerPathways: ['University Faculty', 'Principal Research Scientist', 'R&D Policy Fellow'],
  },
];

export const PLACEMENT_COHORTS: Record<string, CohortPlacementRecord> = {
  '2025–26': {
    year: '2025–26',
    placementRate: '94.2%',
    totalOffers: '1,480',
    recruitersCount: '164',
    highestCtc: '₹14.5 LPA',
    medianCtc: '₹4.8 LPA',
    higherStudiesShare: '18.4%',
    topSectors: [
      { sector: 'Software Engineering & Cloud', share: '44%', offers: '651' },
      { sector: 'Banking, Audit & Financial Services', share: '28%', offers: '414' },
      { sector: 'Management & Operations', share: '16%', offers: '237' },
      { sector: 'Life Sciences, Biotech & Media', share: '12%', offers: '178' },
    ],
  },
  '2024–25': {
    year: '2024–25',
    placementRate: '92.8%',
    totalOffers: '1,395',
    recruitersCount: '152',
    highestCtc: '₹12.8 LPA',
    medianCtc: '₹4.5 LPA',
    higherStudiesShare: '19.1%',
    topSectors: [
      { sector: 'Software Engineering & Cloud', share: '42%', offers: '586' },
      { sector: 'Banking, Audit & Financial Services', share: '30%', offers: '418' },
      { sector: 'Management & Operations', share: '17%', offers: '237' },
      { sector: 'Life Sciences, Biotech & Media', share: '11%', offers: '154' },
    ],
  },
  '2023–24': {
    year: '2023–24',
    placementRate: '91.4%',
    totalOffers: '1,290',
    recruitersCount: '141',
    highestCtc: '₹11.6 LPA',
    medianCtc: '₹4.2 LPA',
    higherStudiesShare: '17.6%',
    topSectors: [
      { sector: 'Software Engineering & Cloud', share: '41%', offers: '529' },
      { sector: 'Banking, Audit & Financial Services', share: '29%', offers: '374' },
      { sector: 'Management & Operations', share: '18%', offers: '232' },
      { sector: 'Life Sciences, Biotech & Media', share: '12%', offers: '155' },
    ],
  },
};

export const RECRUITER_DIRECTORY = [
  { name: 'Zoho Corporation', domain: 'Product Engineering' },
  { name: 'Tata Consultancy Services', domain: 'Digital & Enterprise IT' },
  { name: 'Deloitte India', domain: 'Audit & Assurance' },
  { name: 'Infosys Limited', domain: 'Systems & Cloud' },
  { name: 'Goldman Sachs Services', domain: 'Financial Operations' },
  { name: 'Cognizant', domain: 'Application Modernization' },
  { name: 'Bosch Global Software', domain: 'Coimbatore Mobility Tech' },
  { name: 'EY Global Delivery', domain: 'Tax & Advisory' },
  { name: 'Wipro Technologies', domain: 'Infrastructure Services' },
  { name: 'HCLTech', domain: 'Engineering & R&D' },
  { name: 'Biocon Biologics', domain: 'Bioprocess Quality' },
  { name: 'Federal Bank', domain: 'Retail & Treasury Banking' },
];

export const GRADUATE_OUTCOMES: GraduateOutcome[] = [
  {
    name: 'Kavya Subramanian',
    degree: 'B.Sc. Computer Science',
    cohort: 'Class of 2025',
    role: 'Member Technical Staff',
    company: 'Zoho Corporation, Chennai',
    story:
      'Entered with zero prior systems programming experience; completed two mentored open-source builds in the Computing Lab and cleared Zoho’s product engineering track during campus recruitment.',
  },
  {
    name: 'Aravindh Natarajan',
    degree: 'B.Com. Professional Accounting',
    cohort: 'Class of 2025',
    role: 'Audit Associate',
    company: 'Deloitte India, Bengaluru',
    story:
      'Paired Ind AS coursework with intensive tally and statutory audit case clinics conducted by visiting Chartered Accountants, transitioning directly into Deloitte’s statutory audit practice.',
  },
];

export const INSTITUTIONAL_DISCLOSURES: Record<
  InstitutionalDisclosure['id'],
  InstitutionalDisclosure
> = {
  iqac: {
    id: 'iqac',
    title: 'Internal Quality Assurance Cell (IQAC) & NAAC',
    kicker: 'Quality Governance · Autonomous Mandate',
    summary:
      'The IQAC oversees outcome-based curriculum revision across all Boards of Studies, annual academic audits, and faculty development grants.',
    rows: [
      { label: 'NAAC Accreditation Grade', value: 'A Grade (Cycle III Re-accredited)' },
      { label: 'Autonomous Status', value: 'Conferred by UGC & Bharathiar University (2011)' },
      { label: 'Academic Audit Cycle', value: 'Bi-annual external & peer audit' },
      { label: 'IQAC Nodal Office', value: 'iqac@skasc.ac.in · Administrative Block' },
    ],
  },
  nirf: {
    id: 'nirf',
    title: 'National Institutional Ranking Framework (NIRF)',
    kicker: 'Ministry of Education, Government of India',
    summary:
      'Consistent national ranking under the Colleges category based on Teaching-Learning Resources, Research Productivity, Graduation Outcomes, and Outreach.',
    rows: [
      { label: 'Category', value: 'NIRF Colleges (India Rankings)' },
      { label: 'Rank Band', value: 'Top 50 Colleges Nationally' },
      { label: 'Median UG Graduation Rate', value: '96.4% within stipulated duration' },
      { label: 'Sponsored Research Projects', value: 'DST-FIST, DBT & UGC Minor Grants' },
    ],
  },
  'anti-ragging': {
    id: 'anti-ragging',
    title: 'Anti-Ragging & Student Welfare Charter',
    kicker: 'UGC Regulations Compliance · Zero Tolerance',
    summary:
      'Sri Krishna Arts and Science College enforces a strict zero-tolerance campus policy monitored 24x7 by the Anti-Ragging Squad and Student Counseling Cell.',
    rows: [
      { label: '24x7 Campus Helpline', value: '+91 422 267 8400 (Ext. 108)' },
      { label: 'Internal Complaints Committee', value: 'Active statutory panel with faculty & student reps' },
      { label: 'Warden & Mentor Ratio', value: '1 Faculty Mentor per 20 Students' },
      { label: 'Grievance Portal Email', value: 'welfare@skasc.ac.in' },
    ],
  },
  calendar: {
    id: 'calendar',
    title: 'Academic Calendar 2026–27',
    kicker: 'Odd & Even Semester Schedule',
    summary:
      'Key institutional milestones for incoming first-year cohorts and continuing autonomous semester examinations.',
    rows: [
      { label: 'Online Application Window', value: 'March 15 – June 10, 2026' },
      { label: 'Merit Counseling & Verification', value: 'May 20 – June 25, 2026' },
      { label: 'First-Year Induction & Bridge Course', value: 'July 06 – July 14, 2026' },
      { label: 'Odd Semester End Examinations', value: 'November 16 – December 04, 2026' },
    ],
  },
};
