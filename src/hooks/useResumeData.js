import { useState, useEffect } from 'react'

function getBase() {
  if (typeof window === 'undefined') return import.meta.env.BASE_URL || './'
  const origin = window.location.origin
  const path = window.location.pathname || '/'
  const pathBase = path.endsWith('/') ? path : path + '/'
  return origin + pathBase
}

export function useResumeData() {
  const [labels, setLabels] = useState(null)
  const [jobs, setJobs] = useState(null)
  const [education, setEducation] = useState(null)
  const [techskills, setTechskills] = useState(null)
  const [certifications, setCertifications] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [portfolioConfig, setPortfolioConfig] = useState(null)
  const [goals, setGoals] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const BASE = getBase()
    const load = async () => {
      try {
        const [labelsRes, jobsRes, educationRes, techRes, certRes, recRes, portfolioRes, goalsRes] = await Promise.all([
          fetch(new URL('labels.json', BASE).href).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }),
          fetch(new URL('jobs.json', BASE).href).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }),
          fetch(new URL('education.json', BASE).href).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }),
          fetch(new URL('techskills.json', BASE).href).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }),
          fetch(new URL('certifications.json', BASE).href).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }),
          fetch(new URL('recommendations.json', BASE).href).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }),
          fetch(new URL('portfolio.json', BASE).href).then((r) => r.ok ? r.json() : { categories: [] }),
          fetch(new URL('goals.json', BASE).href).then((r) => r.ok ? r.json() : []),
        ])
        setLabels(labelsRes)
        setJobs(jobsRes ?? [])
        setEducation(educationRes ?? [])
        const tech =
          typeof techRes === 'object' && techRes !== null && !Array.isArray(techRes)
            ? techRes
            : Array.isArray(techRes) ? techRes : []
        setTechskills(tech)
        setCertifications(certRes ?? [])
        setRecommendations(recRes ?? [])
        setPortfolioConfig(portfolioRes?.categories ? portfolioRes : { categories: [] })
        setGoals(Array.isArray(goalsRes) ? goalsRes : [])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return {
    labels,
    jobs,
    education,
    techskills,
    certifications,
    recommendations,
    portfolioConfig,
    goals,
    loading,
    error,
  }
}
