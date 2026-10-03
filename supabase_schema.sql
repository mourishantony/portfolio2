-- ─────────────────────────────────────────────────────────────────────────────
-- Mourish Antony C — ML Portfolio: Supabase SQL Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Enable UUID extension (usually pre-enabled) ───────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE 1: projects
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS projects (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT        NOT NULL,
  description     TEXT,
  github_url      TEXT,
  live_demo_url   TEXT,
  tech_stack      TEXT[]      NOT NULL DEFAULT '{}',
  metrics_summary TEXT,
  category        TEXT        NOT NULL DEFAULT 'other'
                              CHECK (category IN ('llm', 'cv', 'mlops', 'rl', 'other')),
  featured        BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS projects_featured_created_at_idx
  ON projects (featured DESC, created_at DESC);

-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE 2: model_logs
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS model_logs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name  TEXT        NOT NULL,
  latency_ms  NUMERIC     NOT NULL CHECK (latency_ms >= 0),
  status      TEXT        NOT NULL DEFAULT 'success'
                          CHECK (status IN ('success', 'error')),
  timestamp   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS model_logs_timestamp_idx ON model_logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS model_logs_model_name_idx ON model_logs (model_name);

-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE 3: achievements
-- ═══════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS achievements (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  description TEXT,
  date        DATE,
  badge_type  TEXT        NOT NULL DEFAULT 'award'
                          CHECK (badge_type IN ('gold', 'silver', 'bronze', 'award')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS achievements_date_idx ON achievements (date DESC NULLS LAST);

-- ═══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════════════════
ALTER TABLE projects     ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_logs   ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read projects"     ON projects     FOR SELECT USING (TRUE);
CREATE POLICY "Public can read model_logs"   ON model_logs   FOR SELECT USING (TRUE);
CREATE POLICY "Public can read achievements" ON achievements FOR SELECT USING (TRUE);

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED DATA — Delete after confirming UI works
-- ═══════════════════════════════════════════════════════════════════════════
INSERT INTO projects (title, description, github_url, tech_stack, metrics_summary, category, featured)
VALUES
  (
    'LLM Fine-Tuning Pipeline',
    'End-to-end pipeline for fine-tuning large language models on domain-specific datasets using LoRA/QLoRA. Includes data preprocessing, PEFT training, evaluation, and model serving via vLLM.',
    'https://github.com/mourish',
    ARRAY['PyTorch', 'Hugging Face', 'LoRA', 'vLLM', 'FastAPI', 'Docker'],
    'Achieves 94.7% domain task accuracy · 3.8x faster inference than full fine-tune · serving 15K req/day',
    'llm', TRUE
  ),
  (
    'Real-Time Object Detection System',
    'Production-grade computer vision pipeline using YOLOv9 + ByteTrack for real-time multi-object tracking. Deployed on edge hardware with TensorRT optimization achieving sub-30ms latency.',
    'https://github.com/mourish',
    ARRAY['YOLOv9', 'TensorRT', 'ByteTrack', 'OpenCV', 'CUDA', 'Triton'],
    '<28ms inference on RTX 4090 · 99.1% mAP@0.5 · deployed to 12 edge devices',
    'cv', TRUE
  ),
  (
    'MLOps Monitoring Platform',
    'Comprehensive MLOps observability stack tracking model drift, data quality, inference latency percentiles, and automatic retraining triggers.',
    NULL,
    ARRAY['Prometheus', 'Grafana', 'Kafka', 'Airflow', 'PostgreSQL', 'Kubernetes'],
    'Monitors 8 production models · detects drift within 2h · saved 40% compute on retraining',
    'mlops', FALSE
  ),
  (
    'Multi-Modal RAG System',
    'Retrieval-Augmented Generation system combining text and image embeddings for enterprise document Q&A.',
    NULL,
    ARRAY['LangChain', 'CLIP', 'pgvector', 'GPT-4o', 'FastAPI', 'Redis'],
    '91% accuracy on held-out eval · P95 latency: 1.8s · 50K+ documents indexed',
    'llm', FALSE
  );

INSERT INTO achievements (title, description, date, badge_type)
VALUES
  ('1st Place — National AI Hackathon 2025', 'Built a real-time sign language translation system using transformer-based models in 36 hours.', '2025-03-15', 'gold'),
  ('Top 5% — Kaggle LLM Science Exam', 'Ranked in top 5% globally with a fine-tuned DeBERTa ensemble.', '2024-11-01', 'silver'),
  ('Best Paper Award — ICML Workshop', 'Recognized for research on efficient attention mechanisms for long-context LLM inference.', '2025-07-01', 'award');

-- 200 sample model logs spread over last 24 hours
INSERT INTO model_logs (model_name, latency_ms, status, timestamp)
SELECT
  (ARRAY['gpt-4-finetuned', 'yolov9-edge', 'deberta-v3', 'clip-vit-l'])[floor(random()*4+1)::int],
  50 + floor(random() * 200),
  CASE WHEN random() > 0.05 THEN 'success' ELSE 'error' END,
  NOW() - (random() * interval '24 hours')
FROM generate_series(1, 200);
