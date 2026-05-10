import 'server-only'

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  language: string | null
  topics: string[]
  updated_at: string
  fork: boolean
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME

  if (!GITHUB_USERNAME) {
    console.error(
      '[github] Missing GITHUB_USERNAME environment variable. ' +
        'Copy .env.local.example to .env.local and fill in your values. ' +
        'The GitHub repos section will be hidden until this is set.'
    )
    return []
  }

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=updated&per_page=20&type=owner`,
      {
        headers,
        next: {
          revalidate: 3600,
          tags: ['github-repos'], // enables on-demand revalidation via revalidateTag('github-repos')
        },
      }
    )

    if (!res.ok) {
      console.error('GitHub API error:', res.status, res.statusText)
      return []
    }

    const repos: GitHubRepo[] = await res.json()
    return repos.filter((r) => !r.fork)
  } catch (err) {
    console.error('Failed to fetch GitHub repos:', err)
    return []
  }
}
