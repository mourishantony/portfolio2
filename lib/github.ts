// lib/github.ts
// ─────────────────────────────────────────────────────────────────────────────
// Public GitHub stats for the hero section (cached for 1 hour).
// Falls back to null on any failure so the page still renders.
// ─────────────────────────────────────────────────────────────────────────────
import { GITHUB_USERNAME } from './profile'

export interface GithubStats {
  publicRepos: number
  followers: number
}

export async function getGithubStats(): Promise<GithubStats | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null

    const user = (await res.json()) as { public_repos: number; followers: number }
    return { publicRepos: user.public_repos, followers: user.followers }
  } catch {
    return null
  }
}
