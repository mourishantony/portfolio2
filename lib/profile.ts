// lib/profile.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for portfolio content (bio, links, skills,
// experience, education, gallery). Projects/achievements come from Supabase
// with real fallbacks in lib/mock-data.ts.
// Sources: résumé (public/Mourish_Antony_C_Resume.pdf), LinkedIn, GitHub.
// ─────────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'Mourish Antony C',
  shortName: 'Mourish',
  headline: 'Software Engineer · AI / ML Engineer',
  tagline:
    'I build end-to-end AI products — from training and evaluating computer vision models to shipping the FastAPI backends and React dashboards that put them in front of users.',
  location: 'Coimbatore, India',
  email: 'mourishantonyc@gmail.com',
  availability: 'Open to SDE, AI & ML engineering internships and roles',
  highlight: 'Smart India Hackathon 2025 Winner · 5 first-place wins',
  resume: '/Mourish_Antony_C_Resume.pdf',
  summary: [
    'I am a B.Tech Artificial Intelligence & Data Science student at KGiSL Institute of Technology (CGPA 8.00/10) and a Backend & AI Developer at the IPS Tech Community, where I build REST APIs and the backends for the community’s real-time computer vision projects. I have also interned as a backend developer (FastAPI, PostgreSQL on AWS RDS / Aurora) and in AI engineering roles.',
    'My team won the Smart India Hackathon 2025 Grand Finale with a hospital contact-tracing system that re-identifies people across CCTV feeds. I care about honest evaluation on held-out data, clear architecture, and systems that are simple to deploy and maintain.',
  ],
}

export const LINKS = {
  github: 'https://github.com/mourishantony',
  linkedin: 'https://www.linkedin.com/in/mourishantonyc/',
  leetcode: 'https://leetcode.com/u/mourish_antony_c/',
  stackoverflow: 'https://stackoverflow.com/users/29658133',
  email: `mailto:${PROFILE.email}`,
}

export const GITHUB_USERNAME = 'mourishantony'

export const FOCUS_AREAS = [
  {
    title: 'Computer Vision',
    desc: 'Detection, tracking and re-identification with YOLOv8, DeepSORT, OSNet, InsightFace, FaceNet and MediaPipe.',
  },
  {
    title: 'Deep Learning',
    desc: 'Transfer learning (EfficientNetV2), custom LSTM + MLP fusion models and rigorous cross-domain evaluation.',
  },
  {
    title: 'Applied AI',
    desc: 'LLM-assisted review agents, AI-content detection and AI features integrated into real products.',
  },
  {
    title: 'Backend & Full-Stack',
    desc: 'FastAPI / Flask services, WebSockets, JWT auth, MongoDB & SQL data layers, React dashboards.',
  },
]

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'C'],
  },
  {
    group: 'Machine Learning',
    items: ['TensorFlow', 'Keras', 'PyTorch', 'scikit-learn', 'NumPy', 'Pandas', 'Kaggle'],
  },
  {
    group: 'Computer Vision',
    items: ['OpenCV', 'YOLOv8', 'DeepSORT', 'OSNet', 'InsightFace', 'FaceNet', 'MediaPipe', 'EfficientNetV2'],
  },
  {
    group: 'Applied AI',
    items: ['Gemini API', 'OpenAI API', 'Hugging Face', 'Prompt Engineering'],
  },
  {
    group: 'Backend',
    items: ['FastAPI', 'Flask', 'Frappe', 'REST APIs', 'WebSockets', 'JWT Auth', 'SQLAlchemy'],
  },
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'Streamlit'],
  },
  {
    group: 'Data & Cloud',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Docker', 'Git', 'AWS RDS', 'HF Spaces', 'Render', 'Vercel'],
  },
]

export const EXPERIENCE: {
  role: string
  org: string
  period: string
  location?: string
  points: string[]
}[] = [
  {
    role: 'Backend & AI Developer',
    org: 'IPS Tech Community, KGiSL Institute of Technology',
    period: 'Mar 2025 — Present',
    location: 'Coimbatore · On-site',
    points: [
      'Built REST APIs in Flask and FastAPI with MySQL / MongoDB persistence, serving as the backend for the community’s real-time computer vision projects.',
      'Built a crowd-detection platform as two services: a Flask web app (Docker on Render) calling a YOLOv8m + YuNet detection API on Hugging Face Spaces, with MongoDB Atlas records, Cloudinary images and an admin analytics dashboard.',
      'Presented our AI-powered healthcare project at the inauguration of KGiSL’s Centre of Excellence for AI in Healthcare.',
    ],
  },
  {
    role: 'Back End Developer Intern',
    org: 'Pinesphere',
    period: 'Jun 2026 — Jul 2026',
    location: 'Coimbatore · Hybrid',
    points: [
      'Developed and deployed PostgreSQL databases on Amazon RDS and Aurora, improving data management for the product.',
      'Built an ERP project backend with FastAPI, streamlining backend processes and application performance.',
      'Worked with cross-functional teams to integrate backend services end to end.',
    ],
  },
  {
    role: 'Software Builder 1 — Intern',
    org: 'Zapper Edge',
    period: 'May 2026 — Jun 2026',
    location: 'Bengaluru · Remote',
    points: ['Contributed to AI and full-stack development work on product features.'],
  },
  {
    role: 'Artificial Intelligence Engineer Intern',
    org: 'KlyONIX Tech',
    period: 'May 2026 — Jun 2026',
    location: 'Pollachi · Hybrid',
    points: ['Built on the Frappe framework for AI-enabled business applications.'],
  },
  {
    role: 'Community Volunteer',
    org: 'BrewingSec — Coimbatore Chapter',
    period: 'Jun 2026 — Present',
    points: ['Help organise BrewingSec cybersecurity events and hackathons.'],
  },
]

export const EDUCATION: {
  degree: string
  school: string
  period: string
  detail?: string
}[] = [
  {
    degree: 'B.Tech, Artificial Intelligence & Data Science',
    school: 'KGiSL Institute of Technology, Coimbatore',
    period: 'Jun 2024 — May 2028 (expected)',
    detail:
      'CGPA 8.00 / 10 · Coursework: DSA, OOP, DBMS, Operating Systems, Computer Networks, Machine Learning, Deep Learning',
  },
  {
    degree: 'Honours Diploma in Full Stack Development (HDFD)',
    school: 'CSC Computer Software College',
    period: 'Apr 2024 — Apr 2025',
  },
]

export const GALLERY: { src: string; width: number; height: number; title: string; caption: string }[] = [
  {
    src: '/gallery/sih-2025-finale-team.webp',
    width: 1280,
    height: 720,
    title: 'Smart India Hackathon 2025 — Joint Winners',
    caption: 'Grand Finale, 9 Dec 2025 · Team NeuraX25AM05 · Hospital Contact Tracing System',
  },
  {
    src: '/gallery/pyexpo-2025-stage.webp',
    width: 1280,
    height: 960,
    title: 'PyExpo 2025 — Winner',
    caption: 'Team Tech Trail Blazers · ₹50,000 prize for the Smart Policing System',
  },
  {
    src: '/gallery/ai-healthcare-coe.webp',
    width: 1280,
    height: 720,
    title: 'Centre of Excellence for AI in Healthcare',
    caption: 'Presenting our AI healthcare project to dignitaries at the KGiSL inauguration',
  },
  {
    src: '/gallery/kgisl-certificate-of-honour.webp',
    width: 960,
    height: 1280,
    title: 'Certificate of Honour',
    caption: 'Awarded by KGiSL Institute of Technology',
  },
  {
    src: '/gallery/sih-2025-joint-winners.webp',
    width: 900,
    height: 1600,
    title: 'SIH 2025 Grand Finale',
    caption: 'Software Edition · Joint winners cheque',
  },
  {
    src: '/gallery/webforge-fiesta-2026.webp',
    width: 816,
    height: 896,
    title: 'WebForge, Fiesta 2026 — Winner',
    caption: 'KPR Institutions',
  },
  {
    src: '/gallery/protospark-2026.webp',
    width: 1280,
    height: 589,
    title: 'Protospark 2026 — 3rd Place',
    caption: 'National-level project competition, Velammal Institute of Technology',
  },
  {
    src: '/gallery/pyexpo-2025-team.webp',
    width: 1280,
    height: 575,
    title: 'PyExpo 2025 — Team Tech Trail Blazers',
    caption: 'KGiSL Institute of Technology · IPS Tech Community',
  },
]

export type CertificateKind = 'win' | 'participation' | 'course'

// Scanned certificates in public/certificates (originals: Pictures/24UAD201)
export const CERTIFICATES: {
  src: string
  width: number
  height: number
  title: string
  issuer: string
  date: string
  kind: CertificateKind
}[] = [
  { src: 'sih-2025-winner', width: 1100, height: 758, title: 'Winner — Smart India Hackathon 2025', issuer: 'Ministry of Education, Govt. of India · Grand Finale, Software Edition', date: 'Dec 2025', kind: 'win' },
  { src: 'pyexpo-2025-winner-cheque', width: 998, height: 480, title: 'Winner — PyExpo 2025 (₹50,000)', issuer: 'KGiSL Institute of Technology · Team Tech Trail Blazers', date: 'Mar 2025', kind: 'win' },
  { src: 'pyexpo-2025-appreciation', width: 1400, height: 914, title: 'PyExpo ’25 — Certificate of Appreciation', issuer: 'KGiSL Institute of Technology', date: 'Mar 2025', kind: 'win' },
  { src: 'webforge-fiestaa-2026-first', width: 541, height: 371, title: '1st Prize — WebForge, FIESTAA ’26', issuer: 'KPR Institute of Engineering and Technology', date: 'Feb 2026', kind: 'win' },
  { src: 'spectra-2k25-paper-first', width: 617, height: 447, title: '1st Place — Paper Presentation, SPECTRA 2K25', issuer: 'KGiSL Institute of Technology · Dept. of ECE', date: 'Mar 2025', kind: 'win' },
  { src: 'spectra-2k25-project-first', width: 638, height: 450, title: '1st Place — Project Presentation, SPECTRA 2K25', issuer: 'KGiSL Institute of Technology · Dept. of ECE', date: 'Mar 2025', kind: 'win' },
  { src: 'protospark-2026-third', width: 1280, height: 959, title: '3rd Prize — Protospark 2026', issuer: 'Velammal Institute of Technology · Vadiva Creative Labs', date: '2026', kind: 'win' },
  { src: 'reels-making-second', width: 602, height: 448, title: '2nd Place — Reels Making Competition', issuer: 'KGiSL Institute of Technology · Dept. of Science & Humanities', date: '1st year', kind: 'win' },
  { src: 'ips-tech-community-recognition', width: 608, height: 431, title: 'Certificate of Recognition — IPS Tech Community', issuer: 'KGiSL Institute of Technology', date: '2025', kind: 'win' },
  { src: 'nasa-space-apps-2025', width: 523, height: 403, title: 'Galactic Problem Solver — NASA Space Apps Challenge', issuer: 'NASA International Space Apps Challenge', date: 'Oct 2025', kind: 'participation' },
  { src: 'cybersec-bootcamp-kanam-2025', width: 564, height: 398, title: 'Cybersec Bootcamp: Ethical Hacking & Security Essentials', issuer: 'Dr. N.G.P. Institute of Technology · KANAM ’25', date: 'Feb 2025', kind: 'participation' },
  { src: 'interfest-2k25-sree-sakthi', width: 474, height: 686, title: 'INTEROFEST 2K25 — National Technical Symposium', issuer: 'Sree Sakthi Engineering College', date: 'Nov 2024', kind: 'participation' },
  { src: 'fiestaa-2026-open-innovation', width: 403, height: 303, title: 'Open Innovation Hackathon — FIESTAA ’26', issuer: 'KPR Institute of Engineering and Technology', date: 'Feb 2026', kind: 'participation' },
  { src: 'fiestaa-2026-project-presentation', width: 405, height: 304, title: 'Project Presentation — FIESTAA ’26', issuer: 'KPR Institute of Engineering and Technology', date: 'Feb 2026', kind: 'participation' },
  { src: 'fiestaa-2026-webforge-participation', width: 396, height: 297, title: 'WebForge — FIESTAA ’26', issuer: 'KPR Institute of Engineering and Technology', date: 'Feb 2026', kind: 'participation' },
  { src: 'csc-hdfd-diploma', width: 800, height: 1031, title: 'Honours Diploma in Full Stack Developer (HDFD)', issuer: 'CSC Computer Software College', date: 'Apr 2025', kind: 'course' },
  { src: 'csc-dmo-diploma', width: 800, height: 1038, title: 'Diploma in MS-Office (DMO)', issuer: 'CSC Computer Software College', date: 'Jun 2024', kind: 'course' },
]
