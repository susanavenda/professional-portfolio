import { useState, useEffect } from 'react'

const GITHUB_API = 'https://api.github.com'
const USER = 'susanavenda'
const REPOS_PER_PAGE = 100

function normalizeRepoName(name) {
  return typeof name === 'string' ? name.toLowerCase().trim() : ''
}

function repoMatchesTopics(repo, topicList) {
  if (!Array.isArray(repo.topics) || !Array.isArray(topicList) || topicList.length === 0) return false
  const repoTopics = new Set(repo.topics.map((t) => t.toLowerCase()))
  return topicList.some((t) => repoTopics.has(String(t).toLowerCase()))
}

function groupReposByCategory(repos, categories) {
  if (!Array.isArray(repos) || repos.length === 0) return []
  if (!Array.isArray(categories) || categories.length === 0) {
    return [{ label: null, repos }]
  }
  const assigned = new Set()
  const result = categories.map((cat) => ({ label: cat.label, repoNames: cat.repoNames || [], topics: cat.topics || [], repos: [] }))

  for (let i = 0; i < result.length; i++) {
    const cat = result[i]
    for (const repo of repos) {
      if (assigned.has(repo.id)) continue
      const fullName = (repo.full_name || '').toLowerCase()
      const inList = (cat.repoNames || []).some((n) => normalizeRepoName(n) === fullName)
      if (inList) {
        cat.repos.push(repo)
        assigned.add(repo.id)
      }
    }
    for (const repo of repos) {
      if (assigned.has(repo.id)) continue
      if (repoMatchesTopics(repo, cat.topics)) {
        cat.repos.push(repo)
        assigned.add(repo.id)
      }
    }
  }

  const other = repos.filter((r) => !assigned.has(r.id))
  const out = result.filter((r) => r.repos.length > 0).map(({ label, repos: r }) => ({ label, repos: r }))
  if (other.length > 0) out.push({ label: 'Other', repos: other })
  return out
}

export function usePortfolioRepos(portfolioConfig) {
  const [repos, setRepos] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(`${GITHUB_API}/users/${USER}/repos?sort=updated&per_page=${REPOS_PER_PAGE}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 403 ? 'Rate limited' : res.status)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setRepos(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
    return () => { cancelled = true }
  }, [])

  const categories = portfolioConfig?.categories
  const grouped =
    repos && Array.isArray(categories) && categories.length > 0
      ? groupReposByCategory(repos, categories)
      : repos
        ? [{ label: null, repos }]
        : []

  return { grouped, error, loading: repos === null }
}
