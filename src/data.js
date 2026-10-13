// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Rahul Sangral',
  role: 'Full-Stack Engineer & AI Developer',
  tagline:
    'Founding engineer shipping production SaaS end to end — React, FastAPI, PostgreSQL and AI tooling. Graduating 2026 and available now for SDE-1 / New Grad roles and freelance work.',
  location: 'Jammu, India',
  email: 'rishumvis007@gmail.com',
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
  { id: 'linkedin', logo: '/logos/linkedin.webp', name: 'LinkedIn', handle: 'rahul-sangral', url: 'https://www.linkedin.com/in/rahul-sangral/', hue: [205, 225] },
  { id: 'leetcode', logo: '/logos/leetcode.webp', name: 'LeetCode', handle: 'rahulsangral', url: 'https://leetcode.com/u/rahulsangral/', hue: [32, 48] },
  { id: 'codeforces', logo: '/logos/codeforces.webp', name: 'Codeforces', handle: 'rahulsangral', url: 'https://codeforces.com/profile/rahulsangral', hue: [210, 0] },
  { id: 'gfg', logo: '/logos/geeksforgeeks.webp', name: 'GeeksforGeeks', handle: 'rahulsangral', url: 'https://www.geeksforgeeks.org/user/rahulsangral/', hue: [140, 160] },
  { id: 'hackerrank', logo: '/logos/hackerrank.webp', name: 'HackerRank', handle: 'rahulsangral', url: 'https://www.hackerrank.com/rahulsangral', hue: [130, 170] },
  { id: 'huggingface', logo: '/logos/huggingface.webp', name: 'Hugging Face', handle: 'sangralrahul', url: 'https://huggingface.co/sangralrahul', hue: [45, 25] },
  { id: 'codedex', logo: '/logos/codedex.webp', name: 'Codédex', handle: '@rahulsangral', url: 'https://www.codedex.io/@rahulsangral', hue: [270, 300] },
]

export const projects = [
  {
    id: 'aethex',
    logo: '/logos/aethex.webp',
    title: 'Aethex',
    kicker: 'Founding Engineer · SaaS Platform',
    year: '2025',
    match: 98,
    rating: 'PROD',
    genres: ['SaaS', 'Full-Stack', 'Payments'],
    hue: [350, 15],
    description:
      'A production SaaS platform built end to end as the sole engineer — React frontend, FastAPI API, PostgreSQL/Firestore, Firebase Auth with role-based access, Razorpay subscriptions and CI/CD on Vercel and Railway.',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Firebase Auth', 'Razorpay'],
    links: [{ label: 'Visit Live', url: 'https://aethex.in/' }],
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
      'Sole engineer on a full-stack SaaS — API design, Firebase authentication, database schema, Razorpay payments, GA4 analytics and CI/CD.',
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
  { id: 'founder', name: 'Founder', hue: [265, 295], icon: 'rocket', tagline: 'Zero-to-one builder. Sole engineer behind a live SaaS with auth, subscriptions and analytics — and founder of Zyphix. I turn an idea into a deployed product.',
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
