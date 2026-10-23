// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Rahul Sangral',
  role: 'Full-Stack Developer & AI Developer',
  tagline:
    'Founding developer shipping production SaaS end to end — React, FastAPI, PostgreSQL and AI tooling. Graduating 2026 and available now for SDE-1 / New Grad roles and freelance work.',
  location: 'Jammu, India',
  email: 'hello@rahulsangral.me',
  phone: '+91 96823 94363',
  // Drop your photo at /public/profile.jpg — it is used automatically.
  photo: '/profile.jpg',
  resume: '/resume.pdf',
  logo: '/logos/rahul.webp',
  languages: ['English', 'Hindi', 'Dogri'],
  stats: [
    { value: '3+', label: 'Years building' },
    { value: '10+', label: 'Certifications' },
    { value: '60%', label: 'Analysis time cut' },
    { value: '40%', label: 'Fewer reports' },
  ],
}

export const socials = [
  { id: 'github', logo: '/logos/github.webp', name: 'GitHub', handle: 'sangralrahul', url: 'https://github.com/sangralrahul', hue: [220, 260] },
  { id: 'linkedin', logo: '/logos/linkedin.webp', name: 'LinkedIn', handle: 'rahulsangral', url: 'https://www.linkedin.com/in/rahulsangral/', hue: [205, 225] },
  { id: 'leetcode', logo: '/logos/leetcode.webp', name: 'LeetCode', handle: 'rahulsangral', url: 'https://leetcode.com/u/rahulsangral/', hue: [32, 48] },
  { id: 'codeforces', logo: '/logos/codeforces.webp', name: 'Codeforces', handle: 'rahulsangral', url: 'https://codeforces.com/profile/rahulsangral', hue: [210, 0] },
  { id: 'gfg', logo: '/logos/geeksforgeeks.webp', name: 'GeeksforGeeks', handle: 'rahulsangral', url: 'https://www.geeksforgeeks.org/user/rahulsangral/', hue: [140, 160] },
  { id: 'hackerrank', logo: '/logos/hackerrank.webp', name: 'HackerRank', handle: 'rahulsangral', url: 'https://www.hackerrank.com/rahulsangral', hue: [130, 170] },
  { id: 'huggingface', logo: '/logos/huggingface.webp', name: 'Hugging Face', handle: 'sangralrahul', url: 'https://huggingface.co/sangralrahul', hue: [45, 25] },
  { id: 'codedex', logo: '/logos/codedex.webp', name: 'Codédex', handle: '@rahulsangral', url: 'https://www.codedex.io/@rahulsangral', hue: [270, 300] },
]

export const projects = [
  {
    id: 'aethex-suite',
    logo: '/logos/aethex.webp',
    title: 'AETHEX — PC · HC · MC',
    kicker: 'Founder · Medical workspace for India',
    year: '2026',
    match: 99,
    rating: 'v0.1.70',
    status: 'Live · v0.1.70',
    domain: 'hms.aethex.in',
    genres: ['Desktop apps', 'Healthcare', 'Hospital systems'],
    hue: [175, 200],
    description:
      'Three desktop apps on one aethex.in sign-in: AETHEX PC for doctors and students, AETHEX HC for hospitals and clinics, and AETHEX MC for medical colleges — each with Cadus and the offline medical library built in. HC runs a hospital from the front desk to discharge: OPD, admissions, wards, lab, pharmacy, GST billing with UPI and insurance claims.',
    stats: [
      { value: '30+', label: 'hospital modules' },
      { value: '25+', label: 'college modules' },
      { value: '15,515', label: 'offline library articles' },
      { value: '3', label: 'apps, one sign-in' },
    ],
    tech: ['Windows x64 · ARM', 'Linux', 'Google sign-in', 'Cloudflare', 'Offline-first', 'Cadus built in'],
    links: [{ label: 'Visit hms.aethex.in', url: 'https://hms.aethex.in/' }],
  },
  {
    id: 'cadus',
    logo: '/logos/cadus.svg',
    title: 'Cadus',
    kicker: 'Clinical AI assistant',
    year: '2026',
    match: 98,
    rating: 'AI',
    status: 'Live',
    domain: 'cadus.aethex.in',
    genres: ['AI', 'Healthcare', 'LLM'],
    hue: [160, 190],
    description:
      'A clinical AI for doctors and medical students: answers come with sources and a safety review for doses and red flags, plus drug-interaction checks, lab interpretation, dose cards and an offline medical library. Runs on the Medius 3.1 and Magnus 3.6 models.',
    tech: ['LLM', 'Safety review', 'Sources on every answer', 'Offline library'],
    links: [{ label: 'Open cadus.aethex.in', url: 'https://cadus.aethex.in/' }],
  },
  {
    id: 'cadus-desktop',
    logo: '/logos/cadus.svg',
    title: 'Cadus Desktop',
    kicker: 'Desktop app · v1.0.2',
    year: '2026',
    match: 97,
    rating: 'v1.0.2',
    status: 'v1.0.2',
    domain: 'downloads.aethex.in',
    genres: ['Desktop', 'Windows', 'Linux'],
    hue: [195, 220],
    description:
      'Cadus in its own window for Windows (x64 and ARM64) and Linux. Ctrl+Shift+Space opens a new chat from any app, it waits in the tray with reminders, can start with Windows, and checks daily for updates. Same aethex.in account as the web.',
    tech: ['Windows x64 · ARM64', 'Linux', 'Global shortcut', 'Auto-update'],
    links: [{ label: 'Open downloads.aethex.in', url: 'https://downloads.aethex.in/' }],
  },
  {
    id: 'aethex',
    logo: '/logos/aethex.webp',
    title: 'aethex.in',
    kicker: 'Medical platform · Web',
    year: '2025',
    match: 98,
    rating: 'PROD',
    status: 'Live',
    domain: 'aethex.in',
    genres: ['SaaS', 'Full-Stack', 'Payments'],
    hue: [350, 15],
    description:
      'The web platform behind it all — a medical store, study hub and Cadus for doctors and students across India. Built end to end as the sole developer: React frontend, FastAPI API, PostgreSQL/Firestore, role-based auth, Razorpay payments and CI/CD.',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Razorpay'],
    links: [{ label: 'Visit aethex.in', url: 'https://aethex.in/' }],
  },
  {
    id: 'zyphix',
    logo: '/logos/zyphix.webp',
    title: 'Zyphix',
    kicker: 'Founder & Engineer · Full-Stack Product',
    year: '2025',
    match: 97,
    rating: 'LIVE',
    genres: ['Product', 'REST APIs', 'CI/CD'],
    hue: [265, 300],
    description:
      'A product designed, built and deployed from the ground up — modular REST APIs, a clean SQL schema, a React interface and fully automated CI/CD.',
    tech: ['React', 'TypeScript', 'Python', 'REST APIs', 'SQL', 'CI/CD'],
    links: [{ label: 'Visit Live', url: 'https://zyphix.in/' }],
  },
  {
    id: 'sqlfixenv',
    logo: '/logos/huggingface.webp',
    title: 'SQLFixEnv v2.0',
    kicker: 'Meta × Hugging Face · PyTorch OpenEnv Hackathon',
    year: '2025',
    match: 95,
    rating: 'AI',
    genres: ['LLM', 'Hackathon', 'Dev Tools'],
    hue: [40, 20],
    description:
      'An LLM-powered environment that detects SQL errors, explains what went wrong in plain language, and suggests a corrected query.',
    tech: ['Python', 'LLM', 'Hugging Face', 'FastAPI'],
    links: [
      { label: 'GitHub', url: 'https://github.com/sangralrahul' },
      { label: 'Hugging Face', url: 'https://huggingface.co/sangralrahul' },
    ],
  },
  {
    id: 'insights',
    title: 'AI Data Insights Engine',
    kicker: 'AI Backend · Analytics',
    year: '2025',
    match: 94,
    rating: 'AI',
    genres: ['AI', 'Data', 'Backend'],
    hue: [185, 215],
    description:
      'Upload a CSV or Excel file and get back summaries, charts and anomaly alerts. Cut manual analysis time by roughly 60%.',
    tech: ['Python', 'FastAPI', 'Pandas', 'OpenAI'],
    links: [{ label: 'GitHub', url: 'https://github.com/sangralrahul' }],
  },
  {
    id: 'kpi',
    title: 'KPI Performance Dashboard',
    kicker: 'Data Engineering · BI',
    year: '2025',
    match: 92,
    rating: 'BI',
    genres: ['Dashboards', 'SQL', 'Tableau'],
    hue: [150, 190],
    description:
      'A pipeline feeding live SQL into an interactive dashboard with drill-down filters — reduced repetitive reporting requests by about 40%.',
    tech: ['SQL', 'Tableau', 'Python'],
    links: [{ label: 'GitHub', url: 'https://github.com/sangralrahul' }],
  },
]

// Case studies for the "studio" design — real screenshots live in /public/shots.
export const caseStudies = {
  'aethex-suite': {
    role: 'Founder · sole developer',
    shots: [
      { src: '/shots/hc-wards.webp', label: 'AETHEX HC · Wards & beds' },
      { src: '/shots/pc-cadus.webp', label: 'AETHEX PC · Cadus' },
      { src: '/shots/mc-attendance.webp', label: 'AETHEX MC · Attendance' },
    ],
    problem: "Hospitals, clinics and medical colleges in India often run on paper registers and separate tools that don't talk to each other — and doctors and students juggle yet more apps for references and study.",
    built: 'Three desktop apps on one aethex.in account with Google sign-in. HC runs a hospital from OPD to discharge — wards, nursing, lab, pharmacy, GST billing with UPI and insurance claims. MC runs a college — timetable, attendance with the 75% / 80% rule, CBME logbook, exams and fees. PC gives doctors Cadus, the offline library and My Clinic for their own practice.',
    outcome: 'Live at v0.1.70 for Windows (x64 and ARM) and Linux, with 30+ hospital modules, 25+ college modules and a 15,515-article library that works offline.',
  },
  cadus: {
    role: 'Founder · sole developer',
    shots: [{ src: '/shots/cadus-chat.webp', label: 'Cadus · cited answer with safety review' }],
    problem: 'Clinicians need answers they can trust in seconds — with sources they can check, and no dosing mistakes.',
    built: 'A clinical assistant on the Medius 3.1 and Magnus 3.6 models. Every answer is cited and passes a safety review for doses and red flags before it is shown, alongside drug-interaction checks, lab interpretation, dose cards, clinical calculators and an offline library.',
    outcome: 'Live at cadus.aethex.in and built into every AETHEX app, with one account across the web and the desktop.',
  },
  'cadus-desktop': {
    role: 'Founder · sole developer',
    shots: [{ src: '/shots/cadus-desktop.webp', label: 'downloads.aethex.in' }],
    problem: 'Doctors spend the day inside hospital software — a browser tab gets lost between patients.',
    built: 'A native window for Windows (x64 and ARM64) and Linux. Ctrl + Shift + Space opens a new chat from any app, a tray menu keeps tools one click away, reminders surface due flashcards and ward jobs, and the app checks daily for updates.',
    outcome: 'Version 1.0.2 shipped at downloads.aethex.in, signed in with the same aethex.in account. macOS is next.',
  },
  aethex: {
    role: 'Sole developer',
    shots: [{ src: '/shots/aethex-web.webp', label: 'aethex.in' }],
  },
}

export const experience = [
  {
    id: 'clavix',
    logo: '/logos/aethex.webp',
    title: 'Founding Software Engineer',
    org: 'Clavix Technologies (Aethex)',
    period: 'Nov 2025 – Present',
    place: 'Remote',
    progress: 72,
    hue: [355, 20],
    description:
      'Sole developer behind aethex.in and its products — the Cadus clinical AI (web and desktop) and the AETHEX PC, HC and MC desktop apps. API design, authentication, database schema, Razorpay payments, analytics and CI/CD.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Firebase', 'Razorpay', 'GA4'],
  },
  {
    id: 'freelance',
    title: 'Freelance Software Developer',
    org: 'Independent',
    period: '2023 – Present',
    place: 'Remote',
    progress: 88,
    hue: [210, 250],
    description: 'Built web apps, REST APIs and automation scripts for clients across domains.',
    tech: ['React', 'Python', 'REST APIs', 'Automation'],
  },
  {
    id: 'snd',
    title: 'Business Development Executive (Intern)',
    org: 'SND Technologies',
    period: 'Jan – Feb 2026',
    place: 'Remote',
    progress: 100,
    hue: [30, 50],
    description:
      'Automated KPI reporting with Python and built SQL/Excel lead and conversion reports.',
    tech: ['Python', 'SQL', 'Excel'],
  },
  {
    id: 'jpmc',
    logo: '/logos/jpmorgan.webp',
    title: 'Software Engineering Virtual Experience',
    org: 'JPMorgan Chase & Deloitte Australia (Forage)',
    period: 'Feb 2026',
    place: 'Remote',
    progress: 100,
    hue: [200, 180],
    description:
      'Processed financial data feeds for anomalies with Python and cleaned multi-source data for dashboards.',
    tech: ['Python', 'Data Cleaning', 'Dashboards'],
  },
]

export const skills = [
  { id: 'lang', title: 'Languages', hue: [350, 10], items: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'SQL', 'HTML/CSS'] },
  { id: 'frontend', title: 'Frontend', hue: [195, 225], items: ['React.js', 'Tailwind CSS', 'Streamlit'] },
  { id: 'backend', title: 'Backend', hue: [140, 170], items: ['FastAPI', 'REST APIs', 'Firebase Auth', 'Node basics'] },
  { id: 'ai', title: 'AI & ML', hue: [270, 310], items: ['Machine Learning', 'Deep Learning', 'NLP', 'RAG Pipelines', 'Prompt Engineering', 'Claude API', 'Amazon Bedrock', 'Vertex AI'] },
  { id: 'db', title: 'Databases', hue: [30, 50], items: ['PostgreSQL', 'MySQL', 'Firestore', 'Firebase'] },
  { id: 'cloud', title: 'Cloud', hue: [205, 185], items: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Vercel', 'Railway'] },
  { id: 'data', title: 'Data Engineering', hue: [170, 200], items: ['Pandas', 'NumPy', 'Scikit-learn', 'ETL', 'Data Modeling', 'KPI Dashboards', 'Tableau', 'Power BI', 'Matplotlib', 'Excel'] },
  { id: 'devops', title: 'DevOps', hue: [10, 35], items: ['Git/GitHub', 'Docker', 'CI/CD', 'Linux'] },
  { id: 'cs', title: 'CS Fundamentals', hue: [230, 270], items: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'System Design'] },
  { id: 'tools', title: 'Tools', hue: [320, 345], items: ['Postman', 'VS Code', 'pytest'] },
]

export const certifications = [
  { id: 'oracle', title: 'Agentic AI Certified Foundations Associate', org: 'Oracle', year: '2026', logo: '/logos/oracle.webp', url: '/certs/oracle-agentic-ai.pdf', hue: [5, 20] },
  { id: 'mckinsey', title: 'McKinsey Forward Program', org: 'McKinsey & Company', year: '2026', logo: '/logos/mckinsey.webp', url: 'https://www.credly.com/badges/dda78901-d85d-4aeb-866e-14d54c3c4d14', hue: [220, 240] },
  { id: 'claude-api', title: 'Building with the Claude API', org: 'Anthropic', year: '2026', logo: '/logos/anthropic.webp', url: 'https://verify.skilljar.com/c/i3h2m4rcgjsm', hue: [20, 35] },
  { id: 'bedrock', title: 'Claude in Amazon Bedrock', org: 'Anthropic', year: '2026', logo: '/logos/anthropic.webp', url: 'https://verify.skilljar.com/c/7r6sf98nkkzv', hue: [30, 45] },
  { id: 'vertex', title: 'Claude with Vertex AI', org: 'Anthropic', year: '2026', logo: '/logos/anthropic.webp', url: 'https://verify.skilljar.com/c/7bbqpvc8vzxu', hue: [15, 40] },
  { id: 'gda', title: 'Google Advanced Data Analytics', org: 'Google · Coursera', year: '', logo: '/logos/google.webp', url: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/LF56ZWGJU6ZS', hue: [140, 210] },
  { id: 'msaiml', title: 'AI & ML Engineering', org: 'Microsoft · Coursera', year: '', logo: '/logos/microsoft.webp', url: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/DUA346BJ4G77', hue: [195, 215] },
  { id: 'msalgo', title: 'AI & ML Algorithms and Techniques', org: 'Microsoft · Coursera', year: '', logo: '/logos/microsoft.webp', url: 'https://www.coursera.org/account/accomplishments/verify/WHVYD6WKFM9L', hue: [200, 230] },
  { id: 'msexcel', title: 'Preparing Data for Analysis with Excel', org: 'Microsoft · Coursera', year: '', logo: '/logos/microsoft.webp', url: 'https://www.coursera.org/account/accomplishments/verify/7KYKYMY4CZWV', hue: [140, 160] },
  { id: 'cisco', title: 'Introduction to Data Science', org: 'Cisco', year: '2026', logo: '/logos/cisco.webp', url: 'https://www.credly.com/badges/86541c80-8bd8-4db6-8104-043ae00d2927/linked_in_profile', hue: [190, 205] },
  { id: 'jpmc-cert', title: 'Software Engineering Virtual Experience', org: 'JPMorgan Chase · Forage', year: '2026', logo: '/logos/jpmorgan.webp', url: 'https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_695c295addcaac68970acde1_1769701372156_completion_certificate.pdf', hue: [210, 200] },
]


export const education = [
  {
    id: 'uu',
    logo: '/logos/uttaranchal.webp',
    title: 'Bachelor of Computer Applications',
    org: 'Uttaranchal University',
    period: '2023 – 2026',
    place: 'Dehradun, India',
    hue: [250, 280],
    description: 'BCA with a focus on software engineering, databases, data science and CS fundamentals.',
  },
  {
    id: 'mvis',
    logo: '/logos/mvis.webp',
    title: 'Higher Secondary (Science)',
    org: 'MV International School',
    period: '',
    place: 'J&K, India',
    hue: [180, 210],
    description: 'Higher Secondary Certificate in the Science stream.',
  },
]

// "Who's watching?" profiles — each one reorders the rows on the browse page.
export const viewers = [
  { id: 'recruiter', name: 'Recruiter', hue: [0, 20], icon: 'briefcase', tagline: 'Founding engineer who ships production SaaS end to end — React, FastAPI, PostgreSQL and AI tooling. Graduating 2026, available immediately for SDE-1 / New Grad roles, remote or on-site.',
    rows: ['experience', 'top10', 'skills', 'certifications', 'education', 'profiles'] },
  { id: 'developer', name: 'Developer', hue: [205, 235], icon: 'code', tagline: 'Full-stack and AI engineer. Typed React frontends, FastAPI services, SQL schemas, RAG pipelines and CI/CD — built solo, shipped to real users.',
    rows: ['top10', 'skills', 'profiles', 'experience', 'certifications', 'education'] },
  { id: 'founder', name: 'Founder', hue: [265, 295], icon: 'rocket', tagline: 'Zero-to-one builder. Sole developer behind a live SaaS with auth, subscriptions and analytics — and founder of Zyphix. I turn an idea into a deployed product.',
    rows: ['top10', 'experience', 'skills', 'certifications', 'profiles', 'education'] },
  { id: 'investor', name: 'Investor', hue: [42, 28], icon: 'chart', tagline: 'Technical founder with shipped products and measurable outcomes: 60% faster analysis, 40% fewer manual reports, two live platforms. Capital-efficient by necessity — one engineer, production scale.',
    rows: ['top10', 'experience', 'certifications', 'skills', 'profiles', 'education'] },
]

// Spotlight — the featured title on the browse page.
export const spotlight = {
  id: 'aethex',
  eyebrow: 'Featured Original',
  title: 'Aethex',
  summary:
    'One engineer, one production SaaS. Aethex ships a React + TypeScript frontend, a FastAPI backend, PostgreSQL and Firestore data layers, Firebase Auth with role-based access, Razorpay subscriptions, GA4 analytics and CI/CD on Vercel and Railway.',
  highlights: [
    { value: 1, suffix: '', label: 'Engineer on the team' },
    { value: 6, suffix: '+', label: 'Integrated services' },
    { value: 100, suffix: '%', label: 'Built end to end' },
    { value: 24, suffix: 'h', label: 'Typical reply time' },
  ],
  url: 'https://aethex.in/',
}

export const marquee = [
  'React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Firebase', 'AWS', 'Google Cloud', 'Azure', 'Docker',
  'Claude API', 'RAG', 'Pandas', 'Tableau', 'Razorpay', 'Vercel', 'Railway', 'CI/CD', 'SQL', 'Tailwind',
]
