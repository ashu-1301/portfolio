export type ProjectId = 'treebug' | 'ibm-bob'

export interface Skill {
  name: string
  /** Projects this skill is connected to. Empty = plain, non-interactive skill. */
  projects: ProjectId[]
  group: 'languages' | 'web' | 'tools' | 'ai' | 'core'
}

export interface Project {
  id: ProjectId
  number: string
  title: string
  kicker: string
  tagline: string
  year: string
  tags: string[]
  problem: string
  built: string
  how: string[]
  features: string[]
  contribution: string
}

export interface EducationEntry {
  period: string
  institution: string
  degree: string
  detail: string
}

export interface ExperienceEntry {
  year: string
  role: string
  org: string
  summary: string
}

export interface Award {
  title: string
  images?: string[]
}

export interface Certification {
  title: string
  href?: string
}

export const profile = {
  name: 'Ashritha S Manjunath',
  shortName: 'ASHRITHA S MANJUNATH',
  role: 'Computer Science / AI & DATA',
  email: 'ashritha.s.manjunath@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ashritha-s-manjunath',
  github: 'https://github.com/ashu-1301',
  resume: 'https://pdflink.to/b2fcb70f/',
  location: 'Bengaluru, Karnataka, India',
  site: 'www.ashritha.dev',
}

export const sections = [
  { id: 'hero', label: 'Cover' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

export const skills: Skill[] = [
  // Languages
  { name: 'Python', projects: ['treebug'], group: 'languages' },
  { name: 'R', projects: [], group: 'languages' },
  { name: 'Java', projects: [], group: 'languages' },
  { name: 'JavaScript', projects: [], group: 'languages' },
  { name: 'C', projects: ['treebug'], group: 'languages' },
  { name: 'Embedded C', projects: ['treebug'], group: 'languages' },
  // Web
  { name: 'HTML', projects: [], group: 'web' },
  { name: 'CSS', projects: [], group: 'web' },
  { name: 'React', projects: [], group: 'web' },
  { name: 'SQL', projects: [], group: 'tools' },
  { name: 'Pandas', projects: [], group: 'tools' },
  { name: 'NumPy', projects: [], group: 'tools' },
  { name: 'Power BI', projects: [], group: 'tools' },
  { name: 'Tableau', projects: [], group: 'tools' },
  { name: 'Scikit-learn', projects: [], group: 'tools' },
  // Tools & Systems
  { name: 'ESP32', projects: ['treebug'], group: 'tools' },
  { name: 'DHT11', projects: ['treebug'], group: 'tools' },
  { name: 'IoT', projects: ['treebug'], group: 'tools' },
  { name: 'Sensors', projects: ['treebug'], group: 'tools' },
  { name: 'Real-time Monitoring', projects: ['treebug'], group: 'tools' },
  { name: 'Excel', projects: [], group: 'tools' },
  { name: 'Selenium', projects: ['ibm-bob'], group: 'tools' },
  { name: 'API Testing', projects: ['ibm-bob'], group: 'tools' },
  { name: 'Testing', projects: ['ibm-bob'], group: 'tools' },
  { name: 'AWS', projects: [], group: 'tools' },
  { name: 'Docker', projects: [], group: 'tools' },
  { name: 'Git & GitHub', projects: [], group: 'tools' },
  // AI
  { name: 'AI', projects: ['ibm-bob'], group: 'ai' },
  { name: 'ChatGPT', projects: ['ibm-bob'], group: 'ai' },
  { name: 'Claude', projects: [], group: 'ai' },
  { name: 'Gemini', projects: [], group: 'ai' },
  { name: 'Copilot Studio', projects: [], group: 'ai' },
  { name: 'Google AI Studio', projects: [], group: 'ai' },
  { name: 'n8n', projects: [], group: 'ai' },
  { name: 'Prompt Engineering', projects: [], group: 'ai' },
  { name: 'OpenAI API', projects: [], group: 'ai' },
  // Core
  { name: 'Data Structures & Algorithms', projects: [], group: 'core' },
  { name: 'Computer Networks', projects: [], group: 'core' },
  { name: 'Network Security', projects: [], group: 'core' },
  { name: 'Debugging', projects: ['ibm-bob'], group: 'core' },
  { name: 'Problem Solving', projects: ['ibm-bob'], group: 'core' },
  { name: 'Communication', projects: [], group: 'core' },
  { name: 'Team Collaboration', projects: [], group: 'core' },
]

export const skillGroups: { id: Skill['group']; label: string }[] = [
  { id: 'languages', label: 'Languages' },
  { id: 'web', label: 'Web' },
  { id: 'tools', label: 'Tools & Systems' },
  { id: 'ai', label: 'AI Tooling' },
  { id: 'core', label: 'Foundations' },
]

export const projects: Project[] = [
  {
    id: 'treebug',
    number: '01',
    title: 'TreeBug',
    kicker: 'IoT / Embedded Systems',
    tagline: 'An IoT-based system for real-time tree monitoring and proactive protection.',
    year: 'Jan 2026 — Present',
    tags: [
      'ESP32',
      'Embedded C',
      'DHT11',
      'Environmental Sensors',
      'LCD',
      'Real-time Monitoring',
      'Alerts',
    ],
    problem:
      'Environmental changes and potential threats around trees can go unnoticed until damage is visible. TreeBug addresses the need for continuous, low-cost monitoring.',
    built:
      'An IoT-based tree monitoring and protection system using Embedded C and ESP32, integrating DHT11 and environmental sensors with LCD interfacing for continuous monitoring.',
    how: [
      'DHT11 and supporting sensors are polled on a fixed interval by the ESP32.',
      'Readings are smoothed, compared against configurable thresholds, and written to the LCD.',
      'When a threshold is breached, the node enters an alert state and flags the condition visually and over its output channel.',
      'Sampling cadence adapts to conserve power between events.',
    ],
    features: [
      'Live temperature and humidity readout',
      'Configurable alert thresholds',
      'Low-power sampling loop',
      'On-device LCD status display',
      'Simple, field-deployable hardware footprint',
    ],
    contribution:
      'Developed the Embedded C firmware, integrated the sensors and LCD, and implemented sensor-based detection and real-time alerts for abnormal environmental conditions.',
  },
  {
    id: 'ibm-bob',
    number: '02',
    title: 'AI-Assisted Modernization',
    kicker: 'Software / AI-assisted Engineering',
    tagline:
      'Using IBM Bob-backed by regression testing and data analysis.',
    year: 'Aug 2026',
    tags: [
      'AI-assisted Review',
      'Regression Testing',
      'API Testing',
      'Selenium',
      'Fleet History Analysis',
      'Breakdown-risk Analysis',
      'Debugging',
    ],
    problem:
      'A legacy fleet-maintenance service needed fixes to wear calculations, missing service data, reporting, and helper modules, with confidence that changes would not introduce regressions.',
    built:
      'Modernized the service using IBM Bob, analyzed fleet history to identify factors linked to breakdown risk, and validated AI-generated code through regression tests and careful review.',
    how: [
      'Reviewed the legacy codebase and identified defects in wear calculations, missing service data, reporting, and helper modules.',
      'Used IBM Bob for AI-assisted modernization while reviewing generated code and rejecting incorrect output.',
      'Analyzed fleet history to identify factors linked to breakdown risk.',
      'Backed changes with regression tests and completed the project with a 92/100 evaluation score and certificate.',
    ],
    features: [
      'Legacy service modernization',
      'Wear and service-data fixes',
      'Fleet breakdown-risk analysis',
      '92/100 evaluation score',
    ],
    contribution:
      'Modernized the service with IBM Bob, reviewed AI-generated changes, fixed defects, analyzed fleet history, and validated the final implementation with regression testing.',
  },
]

export const education: EducationEntry[] = [
  {
    period: '2023 — 2027',
    institution: 'Atria Institute of Technology',
    degree: 'Bachelor of Engineering — Computer Science and Engineering',
    detail: 'CGPA: 8.4 / 10',
  },
  {
    period: '2021 — 2023',
    institution: 'Sri Vidya Mandir Ind PU College',
    degree: 'Pre-University College (PCMC)',
    detail: '90.33%',
  },
  {
    period: '2021',
    institution: 'Sri Vidya Mandir Education Society',
    degree: '10th Standard',
    detail: '96.48%',
  },
]

export const experience: ExperienceEntry[] = [
  {
    year: 'Jul 2023 — Present',
    role: 'Student Research Fellow',
    org: 'IISc, Centre for Data Science (IISc-CDS)',
    summary:
      'Mentored by a PhD research candidate. Built a graph-based aviation anomaly-detection pipeline in Python, processing 10,000+ flight routes and translating 20+ open-ended research questions into structured graph-theory problems.',
  },
  {
    year: 'Aug 2024 — Oct 2024',
    role: 'Data Analyst Intern',
    org: 'Embrizon Technologies',
    summary:
      'Cleaned and transformed 250,000+ business records with Python, Pandas, NumPy and SQL. Built automated data-preparation workflows, analyzed 15+ business KPIs, created Power BI and Tableau dashboards, and developed predictive models with Scikit-learn.',
  },
]

export const awards: Award[] = [
  {
    title: 'Best Student Award (2026) — Indian Society for Technical Education (ISTE)',
    images: [
      '/images/Award%20Pic%201.jpg',
      '/images/Award%20Pic%202.jpeg',
    ],
  },
]

export const certifications: Certification[] = [
  { title: 'GEN AI Camp — Completing Certificate, AlgoUniversity' },
  { title: 'AWS Cloud Practitioner Essentials' },
  { title: 'Infosys Springboard — C Programming' },
  { title: 'Infosys Springboard — DevOps Fundamentals' },
  { title: 'Infosys Springboard — Network Fundamentals' },
]

export const about = {
  headline: ['CURIOUS', 'BY DEFAULT.', 'PRECISE', 'BY PRACTICE.'],
  body: 'I am a final-year Computer Science undergraduate with research experience and a strong foundation in machine learning, data science and software engineering. I build scalable analytics solutions, predictive models and data-driven applications with Python, SQL and Power BI.',
  meta: ['Final Year', 'Machine Learning', 'Data Science', 'Software Engineering'],
  interests: [
    'Analytics Solutions',
    'Predictive Models',
    'Research',
    'Data Applications',
  ],
}
