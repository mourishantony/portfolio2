// app/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Home page — Server Component
// Fetches projects + achievements from Supabase server-side (no cache),
// plus public GitHub stats (cached 1h)
// ─────────────────────────────────────────────────────────────────────────────
import { serverClient } from '@/lib/supabase'
import type { Project, Achievement } from '@/lib/types'
import { MOCK_PROJECTS, MOCK_ACHIEVEMENTS } from '@/lib/mock-data'
import { getGithubStats } from '@/lib/github'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Achievements from '@/components/sections/Achievements'
import Gallery from '@/components/sections/Gallery'
import Certificates from '@/components/sections/Certificates'
import Contact from '@/components/sections/Contact'

// Always fetch fresh data — no stale cache
export const dynamic = 'force-dynamic'

// ── Data Fetching ─────────────────────────────────────────────────────────
async function getProjects(): Promise<Project[]> {
  try {
    const supabase = serverClient()
    if (!supabase) {
      return MOCK_PROJECTS
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('[getProjects] Supabase notice (using fallback data):', error.message)
      return MOCK_PROJECTS
    }
    return (data as Project[]) ?? []
  } catch {
    console.warn('[getProjects] Supabase fetch failed, using fallback data.')
    return MOCK_PROJECTS
  }
}

async function getAchievements(): Promise<Achievement[]> {
  try {
    const supabase = serverClient()
    if (!supabase) {
      return MOCK_ACHIEVEMENTS
    }

    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.warn('[getAchievements] Supabase notice (using fallback data):', error.message)
      return MOCK_ACHIEVEMENTS
    }
    return (data as Achievement[]) ?? []
  } catch {
    console.warn('[getAchievements] Supabase fetch failed, using fallback data.')
    return MOCK_ACHIEVEMENTS
  }
}

// ── Page ──────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const [projects, achievements, githubStats] = await Promise.all([
    getProjects(),
    getAchievements(),
    getGithubStats(),
  ])

  return (
    <>
      <Hero stats={githubStats} />
      <About />
      <Experience />
      <Skills />
      <Projects projects={projects} />
      <Achievements achievements={achievements} />
      <Certificates />
      <Gallery />
      <Contact />
    </>
  )
}
