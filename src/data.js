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
  resume: 'https://rahulsangral.me/assets/Rahul_Sangral_Resume-CGtWhv3-.pdf',
  languages: ['English', 'Hindi', 'Dogri'],
  stats: [
    { value: '3+', label: 'Years building' },
    { value: '10+', label: 'Certifications' },
    { value: '60%', label: 'Analysis time cut' },
    { value: '40%', label: 'Fewer reports' },
  ],
}

export const socials = [
  { id: 'github', name: 'GitHub', handle: 'sangralrahul', url: 'https://github.com/sangralrahul', hue: [220, 260] },
  { id: 'linkedin', name: 'LinkedIn', handle: 'rahul-sangral', url: 'https://www.linkedin.com/in/rahul-sangral/', hue: [205, 225] },
  { id: 'leetcode', name: 'LeetCode', handle: 'rahulsangral', url: 'https://leetcode.com/u/rahulsangral/', hue: [32, 48] },
  { id: 'codeforces', name: 'Codeforces', handle: 'rahulsangral', url: 'https://codeforces.com/profile/rahulsangral', hue: [210, 0] },
  { id: 'gfg', name: 'GeeksforGeeks', handle: 'rahulsangral', url: 'https://www.geeksforgeeks.org/user/rahulsangral/', hue: [140, 160] },
  { id: 'hackerrank', name: 'HackerRank', handle: 'rahulsangral', url: 'https://www.hackerrank.com/rahulsangral', hue: [130, 170] },
  { id: 'huggingface', name: 'Hugging Face', handle: 'sangralrahul', url: 'https://huggingface.co/sangralrahul', hue: [45, 25] },
  { id: 'codedex', name: 'Codédex', handle: '@rahulsangral', url: 'https://www.codedex.io/@rahulsangral', hue: [270, 300] },
]

export const projects = [
  {
    id: 'aethex',
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
  { id: 'oracle', title: 'Agentic AI Certified Foundations Associate', org: 'Oracle', year: '2026', hue: [5, 20] },
  { id: 'mckinsey', title: 'McKinsey Forward Program', org: 'McKinsey & Company', year: '2026', hue: [220, 240] },
  { id: 'claude-api', title: 'Building with the Claude API', org: 'Anthropic', year: '2026', hue: [20, 35] },
  { id: 'bedrock', title: 'Claude in Amazon Bedrock', org: 'Anthropic', year: '2026', hue: [30, 45] },
  { id: 'vertex', title: 'Claude with Vertex AI', org: 'Anthropic', year: '2026', hue: [15, 40] },
  { id: 'gda', title: 'Advanced Data Analytics', org: 'Google · Coursera', year: '', hue: [140, 210] },
  { id: 'msaiml', title: 'AI & ML Engineering', org: 'Microsoft · Coursera', year: '', hue: [195, 215] },
  { id: 'msalgo', title: 'AI & ML Algorithms and Techniques', org: 'Microsoft · Coursera', year: '', hue: [200, 230] },
  { id: 'msexcel', title: 'Preparing Data for Analysis with Excel', org: 'Microsoft · Coursera', year: '', hue: [140, 160] },
  { id: 'cisco', title: 'Introduction to Data Science', org: 'Cisco', year: '2026', hue: [190, 205] },
  { id: 'jpmc-cert', title: 'Software Engineering Virtual Experience', org: 'JPMorgan Chase · Forage', year: '2026', hue: [210, 200] },
]

export const education = [
  {
    id: 'uu',
    title: 'Bachelor of Computer Applications',
    org: 'Uttaranchal University',
    period: '2023 – 2026',
    place: 'Dehradun, India',
    hue: [250, 280],
    description: 'BCA with a focus on software engineering, databases, data science and CS fundamentals.',
  },
  {
    id: 'mvis',
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
  { id: 'recruiter', name: 'Recruiter', hue: [0, 20], icon: 'briefcase',
    rows: ['experience', 'top10', 'skills', 'certifications', 'education', 'profiles'] },
  { id: 'developer', name: 'Developer', hue: [205, 235], icon: 'code',
    rows: ['top10', 'skills', 'profiles', 'experience', 'certifications', 'education'] },
  { id: 'founder', name: 'Founder', hue: [265, 295], icon: 'rocket',
    rows: ['top10', 'experience', 'skills', 'certifications', 'profiles', 'education'] },
  { id: 'explorer', name: 'Explorer', hue: [140, 170], icon: 'compass',
    rows: ['profiles', 'top10', 'certifications', 'skills', 'experience', 'education'] },
]
