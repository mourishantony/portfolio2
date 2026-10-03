// lib/mock-data.ts
// ─────────────────────────────────────────────────────────────────────────────
// Default fallback data when Supabase is not yet configured or unreachable.
// Mirrors the schema and seed data in supabase_schema.sql.
// ─────────────────────────────────────────────────────────────────────────────
import type { Project, Achievement, ModelLog } from './types'

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'mock-proj-1',
    title: 'LLM Fine-Tuning Pipeline',
    description:
      'End-to-end pipeline for fine-tuning large language models on domain-specific datasets using LoRA/QLoRA. Includes data preprocessing, PEFT training, evaluation, and model serving via vLLM.',
    github_url: 'https://github.com/mourish',
    live_demo_url: null,
    tech_stack: ['PyTorch', 'Hugging Face', 'LoRA', 'vLLM', 'FastAPI', 'Docker'],
    metrics_summary:
      'Achieves 94.7% domain task accuracy · 3.8x faster inference than full fine-tune · serving 15K req/day',
    category: 'llm',
    featured: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 'mock-proj-2',
    title: 'Real-Time Object Detection System',
    description:
      'Production-grade computer vision pipeline using YOLOv9 + ByteTrack for real-time multi-object tracking. Deployed on edge hardware with TensorRT optimization achieving sub-30ms latency.',
    github_url: 'https://github.com/mourish',
    live_demo_url: null,
    tech_stack: ['YOLOv9', 'TensorRT', 'ByteTrack', 'OpenCV', 'CUDA', 'Triton'],
    metrics_summary:
      '<28ms inference on RTX 4090 · 99.1% mAP@0.5 · deployed to 12 edge devices',
    category: 'cv',
    featured: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  },
  {
    id: 'mock-proj-3',
    title: 'MLOps Monitoring Platform',
    description:
      'Comprehensive MLOps observability stack tracking model drift, data quality, inference latency percentiles, and automatic retraining triggers.',
    github_url: 'https://github.com/mourish',
    live_demo_url: null,
    tech_stack: ['Prometheus', 'Grafana', 'Kafka', 'Airflow', 'PostgreSQL', 'Kubernetes'],
    metrics_summary:
      'Monitors 8 production models · detects drift within 2h · saved 40% compute on retraining',
    category: 'mlops',
    featured: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
  {
    id: 'mock-proj-4',
    title: 'Multi-Modal RAG System',
    description:
      'Retrieval-Augmented Generation system combining text and image embeddings for enterprise document Q&A.',
    github_url: 'https://github.com/mourish',
    live_demo_url: null,
    tech_stack: ['LangChain', 'CLIP', 'pgvector', 'GPT-4o', 'FastAPI', 'Redis'],
    metrics_summary:
      '91% accuracy on held-out eval · P95 latency: 1.8s · 50K+ documents indexed',
    category: 'llm',
    featured: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
]

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'mock-ach-1',
    title: '1st Place — National AI Hackathon 2025',
    description:
      'Built a real-time sign language translation system using transformer-based models in 36 hours.',
    date: '2025-03-15',
    badge_type: 'gold',
    created_at: '2025-03-15T00:00:00Z',
  },
  {
    id: 'mock-ach-2',
    title: 'Top 5% — Kaggle LLM Science Exam',
    description:
      'Ranked in top 5% globally with a fine-tuned DeBERTa ensemble.',
    date: '2024-11-01',
    badge_type: 'silver',
    created_at: '2024-11-01T00:00:00Z',
  },
  {
    id: 'mock-ach-3',
    title: 'Best Paper Award — ICML Workshop',
    description:
      'Recognized for research on efficient attention mechanisms for long-context LLM inference.',
    date: '2025-07-01',
    badge_type: 'award',
    created_at: '2025-07-01T00:00:00Z',
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
