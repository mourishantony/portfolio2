// lib/mock-data.ts
// ─────────────────────────────────────────────────────────────────────────────
// Default fallback data when Supabase is not yet configured or unreachable.
// Projects mirror real repositories on github.com/mourishantony.
// ─────────────────────────────────────────────────────────────────────────────
import type { Project, Achievement, ModelLog } from './types'

const gh = (repo: string) => `https://github.com/mourishantony/${repo}`
const daysAgo = (d: number) => new Date(Date.now() - 1000 * 60 * 60 * 24 * d).toISOString()

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-sih-contact-tracing',
    title: 'Hospital Contact Tracing System — SIH 2025 Winner',
    description:
      'Dual-camera system that traces contacts of multi-drug-resistant (MDR) patients across hospital CCTV. YOLOv8 detection with DeepSORT + OSNet re-identification and mask-aware InsightFace recognition keep one identity per person across feeds; camera-calibrated distance estimation flags anyone within 1.5 m and accumulates exposure-risk scores. Marking a patient as MDR emails every traced contact.',
    github_url: gh('SIH2K25'),
    live_demo_url: null,
    tech_stack: ['YOLOv8', 'DeepSORT', 'OSNet', 'InsightFace', 'FastAPI', 'React', 'MongoDB', 'WebSockets'],
    metrics_summary:
      'Joint winner, Smart India Hackathon 2025 Grand Finale · 75 REST endpoints · WebSocket live video · JWT auth for 3 roles',
    category: 'cv',
    featured: true,
    created_at: '2026-01-31T00:00:00Z',
  },
  {
    id: 'proj-pothole-cnn',
    title: 'Pothole & Road Damage Detection',
    description:
      'Upload a road video and the system flags potholes and cracks frame by frame. An EfficientNetV2-S classifier fine-tuned from ImageNet on RDD2022 plus a custom dashcam dataset, served through a Flask web app. Supports SDG 11 (Sustainable Cities).',
    github_url: gh('pothole-cnn'),
    live_demo_url: null,
    tech_stack: ['TensorFlow', 'Keras', 'EfficientNetV2-S', 'OpenCV', 'Flask'],
    metrics_summary:
      '90.0% accuracy / 0.90 macro-F1 on 3,408 held-out RDD2022 crops · improved 59% → 77% on a harder cross-camera set',
    category: 'cv',
    featured: true,
    created_at: daysAgo(14),
  },
  {
    id: 'proj-proofpay',
    title: 'ProofPay — AI-Verified Milestone Payments',
    description:
      'Escrow for freelance work that only pays out once the deliverable is verified. PayPal authorises and holds the client’s money; an AI review agent checks the submission (code, designs, documents or steel shop drawings) against the client’s own acceptance criteria, then funds are captured and split between payees. Built for the PayPal AI Hackathon 2026 on the PayPal sandbox.',
    github_url: gh('proofpay'),
    live_demo_url: null,
    tech_stack: ['Python', 'Gemini API', 'PayPal Orders v2', 'Payouts', 'Webhooks', 'Docker'],
    metrics_summary:
      'Authorize → AI verify → capture → split payout · per-requirement met / not-met evidence · signature-verified webhooks',
    category: 'llm',
    featured: true,
    created_at: '2026-11-11T00:00:00Z',
  },
  {
    id: 'proj-smart-policing',
    title: 'Smart Policing System — PyExpo 2025 Winner',
    description:
      'Real-time suspect identification from live video. MediaPipe face detection and FaceNet embeddings with video-based enrolment (up to 500 face samples per suspect) and a live Flask dashboard. Alerting runs on a background worker queue so the stream never blocks: each sighting is logged to MongoDB with a snapshot and triggers email and Twilio voice-call alerts with a per-suspect cooldown.',
    github_url: gh('T080_TECHTRAILBLAZERS'),
    live_demo_url: null,
    tech_stack: ['MediaPipe', 'FaceNet', 'OpenCV', 'Flask', 'MongoDB', 'Twilio'],
    metrics_summary: 'Winner, PyExpo 2025 (₹50,000) · non-blocking alert queue · email + voice-call alerts',
    category: 'cv',
    featured: true,
    created_at: '2025-04-30T00:00:00Z',
  },
  {
    id: 'proj-deepfake-bmcs',
    title: 'DeepFake Detection via Biological Motion',
    description:
      'Research-grade detector that scores the biological plausibility of facial motion — symmetry, blink dynamics, mouth-corner delay and trajectory smoothness. 468-point MediaPipe landmarks feed a two-branch LSTM + MLP fusion model with interpretable BMCS scores and a Streamlit demo.',
    github_url: gh('deepfake'),
    live_demo_url: null,
    tech_stack: ['PyTorch', 'MediaPipe', 'LSTM', 'OpenCV', 'Streamlit'],
    metrics_summary:
      'Loaders for FaceForensics++, DFDC and Celeb-DF · explainable per-component BMCS breakdown',
    category: 'cv',
    featured: false,
    created_at: daysAgo(140),
  },
  {
    id: 'proj-signflow',
    title: 'SignFlow — Indian Sign Language Translator',
    description:
      'Web app that translates Indian Sign Language gestures from a webcam or uploaded video into text and speech. MediaPipe hand landmarks drive a scikit-learn classifier, with translation and TTS layered on top and an ISL dictionary in MongoDB.',
    github_url: gh('signflow'),
    live_demo_url: null,
    tech_stack: ['MediaPipe', 'scikit-learn', 'Flask', 'MongoDB', 'gTTS'],
    metrics_summary: 'Real-time webcam inference · text-to-speech + multilingual translation',
    category: 'cv',
    featured: false,
    created_at: daysAgo(145),
  },
  {
    id: 'proj-face-attendance',
    title: 'Face Recognition Attendance System',
    description:
      'Mobile-friendly kiosk that auto-detects and matches faces to mark attendance. Facenet512 embeddings are served from a FastAPI inference service on Hugging Face Spaces so the Flask app stays light; scheduling, admin controls and monthly CSV reports included.',
    github_url: gh('face_attendance_flask'),
    live_demo_url: null,
    tech_stack: ['DeepFace', 'FastAPI', 'Flask', 'MongoDB Atlas', 'Docker', 'HF Spaces'],
    metrics_summary: 'Decoupled inference service · 512-d embeddings · auto-absent via APScheduler',
    category: 'mlops',
    featured: false,
    created_at: daysAgo(230),
  },
  {
    id: 'proj-crowd-detection',
    title: 'Crowd Detection System',
    description:
      'Two-service architecture for counting people in images: a Flask web app with an admin panel, and a standalone model API on Hugging Face Spaces running YOLOv8m body detection with YuNet face detection. Annotated results are stored on Cloudinary and MongoDB Atlas.',
    github_url: gh('crowd_detection2'),
    live_demo_url: null,
    tech_stack: ['YOLOv8', 'YuNet', 'Flask', 'MongoDB', 'Cloudinary', 'HF Spaces'],
    metrics_summary: 'Body + face detection fusion · annotated output with confidence badges',
    category: 'cv',
    featured: false,
    created_at: daysAgo(236),
  },
  {
    id: 'proj-masked-face',
    title: 'Masked Face Recognition',
    description:
      'Real-time identity registration and recognition that still works when people wear masks. Uses InsightFace ArcFace embeddings with configurable similarity thresholds, re-identification options and optional GPU acceleration through ONNX Runtime.',
    github_url: gh('NeuraX_KPR'),
    live_demo_url: null,
    tech_stack: ['InsightFace', 'ArcFace', 'ONNX Runtime', 'OpenCV', 'Python'],
    metrics_summary: 'Real-time webcam / video recognition · CPU or CUDA execution',
    category: 'cv',
    featured: false,
    created_at: daysAgo(147),
  },
  {
    id: 'proj-ai-threat',
    title: 'AI Threat Detector',
    description:
      'Web application that detects AI-generated content in voice recordings, emails and chat messages to help users spot deepfake calls, AI-written phishing and bot conversations. Includes authentication, confidence scoring and analysis history.',
    github_url: gh('Sophisticated-AI-Cyber-Threats'),
    live_demo_url: null,
    tech_stack: ['Python', 'OpenAI API', 'Hugging Face', 'Flask'],
    metrics_summary: 'Voice, email and chat analysis · per-result confidence scores',
    category: 'llm',
    featured: false,
    created_at: daysAgo(254),
  },
  {
    id: 'proj-linkedin-ai',
    title: 'AI Event Content Generator for LinkedIn',
    description:
      'Automates the 2–3 hour chore of curating event photos: scores images on sharpness, composition and lighting, removes blurry and duplicate shots, picks the top 10 and posts them to LinkedIn through OAuth — with manual override and audit logging.',
    github_url: gh('AI-Driven-LinkedIn-Event-Content-Generation'),
    live_demo_url: null,
    tech_stack: ['FastAPI', 'OpenCV', 'SQLAlchemy', 'LinkedIn API', 'OAuth 2.0'],
    metrics_summary: 'Automated quality ranking, de-duplication and publishing',
    category: 'other',
    featured: false,
    created_at: daysAgo(363),
  },
  {
    id: 'proj-academic-scheduler',
    title: 'Faculty Scheduling Platform',
    description:
      'Role-based platform for running a C-programming course: faculty portal for daily class logs and syllabus progress, a public admin dashboard, super-admin CRUD over every table, and an FAQ chatbot for schedule and lab questions.',
    github_url: gh('C_Academic_Scheduler'),
    live_demo_url: null,
    tech_stack: ['FastAPI', 'SQLAlchemy', 'SQLite', 'JavaScript'],
    metrics_summary: '14 faculty accounts · three role levels · database-backed chatbot',
    category: 'other',
    featured: false,
    created_at: daysAgo(236),
  },
  {
    id: 'proj-know-your-candidates',
    title: 'Know Your Candidates',
    description:
      'React single-page app that helps voters look up and compare election candidates in one place. Built with Vite and deployed on Vercel.',
    github_url: gh('know-your-candidates'),
    live_demo_url: 'https://know-your-candidates-seven.vercel.app',
    tech_stack: ['React', 'Vite', 'JavaScript', 'Vercel'],
    metrics_summary: null,
    category: 'other',
    featured: false,
    created_at: daysAgo(191),
  },
]

// Sourced from résumé + linkedin.com/in/mourishantonyc
export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-sih-2025',
    title: 'Joint Winner — Smart India Hackathon 2025',
    description:
      "Grand Finale (Software Edition), Government of India's national hackathon. Team NeuraX25AM05 built the Hospital Contact Tracing System for MDR patients.",
    date: '2025-12-09',
    badge_type: 'gold',
    created_at: '2025-12-09T00:00:00Z',
  },
  {
    id: 'ach-pyexpo-2025',
    title: 'Winner — PyExpo 2025',
    description:
      'KGiSL Institute of Technology. Team Tech Trail Blazers won ₹50,000 for the Smart Policing System.',
    date: '2025-03-01',
    badge_type: 'gold',
    created_at: '2025-03-01T00:00:00Z',
  },
  {
    id: 'ach-spectra-2k25',
    title: '1st Place ×2 — SPECTRA 2K25',
    description:
      'Won first place in both Paper Presentation and Project Presentation at the national-level technical symposium by the Dept. of ECE, KGiSL Institute of Technology.',
    date: '2025-03-11',
    badge_type: 'gold',
    created_at: '2025-03-11T00:00:00Z',
  },
  {
    id: 'ach-webforge-2026',
    title: 'Winner — WebForge, Fiesta 2026',
    description: 'First prize in the web development event at FIESTAA ’26, KPR Institute of Engineering and Technology.',
    date: '2026-02-20',
    badge_type: 'gold',
    created_at: '2026-03-01T00:00:00Z',
  },
  {
    id: 'ach-protospark-2026',
    title: '3rd Place — Protospark 2026',
    description:
      'National-level project competition at Velammal Institute of Technology, Chennai, representing the IPS Tech Community.',
    date: null,
    badge_type: 'bronze',
    created_at: '2026-07-01T00:00:00Z',
  },
  {
    id: 'ach-nasa-pycon',
    title: 'NASA Space Apps Challenge · PyCon India 2025',
    description: 'Participant in the NASA Space Apps Challenge; attendee at PyCon India 2025.',
    date: null,
    badge_type: 'award',
    created_at: '2025-10-05T00:00:00Z',
  },
  {
    id: 'cert-google-cyber',
    title: 'Foundations of Cybersecurity — Google',
    description: 'Credential ID ZZAMP5JM07H0.',
    date: '2025-08-01',
    badge_type: 'award',
    created_at: '2025-08-01T00:00:00Z',
  },
  {
    id: 'cert-upenn-ct',
    title: 'Computational Thinking for Problem Solving — University of Pennsylvania',
    description: 'Credential ID 3S8WJMK39N3R.',
    date: '2025-01-01',
    badge_type: 'award',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'cert-ibm-data',
    title: 'Data Analysis with Python — IBM',
    description: 'Credential ID BJ26RF89TRIB.',
    date: '2025-01-01',
    badge_type: 'award',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'cert-coursera-pandas',
    title: 'Python for Data Analysis: Pandas & NumPy — Coursera',
    description: 'Coursera Project Network. Credential ID PVFUPZV62CRC.',
    date: '2025-01-01',
    badge_type: 'award',
    created_at: '2025-01-01T00:00:00Z',
  },
]

// Generate realistic mock model logs spread over last 24 hours
export function generateMockModelLogs(): ModelLog[] {
  const models = ['gpt-4-finetuned', 'yolov9-edge', 'deberta-v3', 'clip-vit-l']
  const logs: ModelLog[] = []
  const now = Date.now()

  for (let i = 0; i < 200; i++) {
    const model = models[Math.floor(Math.random() * models.length)]
    const baseLatency =
      model === 'yolov9-edge' ? 25 : model === 'gpt-4-finetuned' ? 140 : 80
    const latency = Math.round(baseLatency + Math.random() * 80)
    const isError = Math.random() < 0.04
    const offsetMs = Math.floor(Math.random() * 24 * 60 * 60 * 1000)

    logs.push({
      id: `mock-log-${i}`,
      model_name: model,
      latency_ms: latency,
      status: isError ? 'error' : 'success',
      timestamp: new Date(now - offsetMs).toISOString(),
    })
  }

  return logs.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}
