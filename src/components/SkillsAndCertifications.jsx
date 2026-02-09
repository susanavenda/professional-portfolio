import { useState, useMemo } from 'react'
import { usePortfolioRepos } from '../hooks/usePortfolioRepos'

function RepoList({ repos }) {
  if (!repos || repos.length === 0) return null
  return (
    <ul className="theme-block__repos" aria-label="Repositories">
      {repos.map((repo) => (
        <li key={repo.id} className="portfolio-repo">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-repo__link"
          >
            <span className="portfolio-repo__name">{repo.name}</span>
            {repo.description && (
              <span className="portfolio-repo__desc">{repo.description}</span>
            )}
            {repo.language && (
              <span className="portfolio-repo__lang" aria-hidden>{repo.language}</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

function isInProgress(item) {
  const d = (item.description || '').toLowerCase()
  const n = (item.name || '').toLowerCase()
  return d.includes('in progress') || n.includes('in progress') || item.status === 'in_progress'
}

function CertList({ certs }) {
  if (!certs || certs.length === 0) return null
  return (
    <ul className="theme-block__certs" aria-label="Certifications">
      {certs.map((item, j) => (
        <li key={j} className={`cert-badge ${isInProgress(item) ? 'cert-badge--inprogress' : ''}`}>
          {isInProgress(item) && <span className="cert-badge__pill" aria-hidden>In progress</span>}
          <span className="cert-badge__icon" aria-hidden>
            <i className="fas fa-trophy" />
          </span>
          <span className="cert-badge__name">{item.name}</span>
          {item.issuer && <span className="cert-badge__issuer">{item.issuer}</span>}
          {item.description && <p className="cert-badge__desc">{item.description}</p>}
        </li>
      ))}
    </ul>
  )
}

function GoalList({ goals }) {
  if (!goals || goals.length === 0) return null
  return (
    <ul className="theme-block__goals" aria-label="Want to do">
      {goals.map((item, j) => (
        <li key={j} className="goal-item">
          <span className="goal-item__icon" aria-hidden><i className="fas fa-arrow-right" /></span>
          <span className="goal-item__label">{item.label}</span>
        </li>
      ))}
    </ul>
  )
}

export function SkillsAndCertifications({ techskills, certifications, portfolioConfig, goals, loading, labels, expandAllForPrint = false }) {
  const entries = !techskills ? [] : typeof techskills === 'object' && !Array.isArray(techskills)
    ? Object.entries(techskills)
    : techskills.map((text, i) => [`Skill ${i + 1}`, text])

  const { grouped, error: reposError, loading: reposLoading } = usePortfolioRepos(portfolioConfig)

  const getReposForSkill = (skillName) => {
    const found = grouped.find((g) => g.label === skillName)
    return found ? found.repos : []
  }
  const getCertsForSkill = (skillName) => {
    if (!Array.isArray(certifications)) return []
    return certifications.filter((c) => (c.category || '').trim() === skillName)
  }
  const getGoalsForSkill = (skillName) => {
    if (!Array.isArray(goals)) return []
    return goals.filter((g) => (g.category || '').trim() === skillName)
  }
  const uncategorizedCerts = Array.isArray(certifications)
    ? certifications.filter((c) => !(c.category || '').trim())
    : []
  const uncategorizedGoals = Array.isArray(goals)
    ? goals.filter((g) => !(g.category || '').trim())
    : []
  const otherGroup = grouped.find((g) => g.label === 'Other')

  const FOCUSED_THEMES = ['Data science & AI', 'Solution & enterprise architecture']
  const { focusedEntries, workingKnowledgeEntries } = useMemo(() => {
    const focused = []
    const working = []
    entries.forEach((entry, i) => {
      if (FOCUSED_THEMES.includes(entry[0])) focused.push({ entry, originalIndex: i })
      else working.push({ entry, originalIndex: i })
    })
    return { focusedEntries: focused, workingKnowledgeEntries: working }
  }, [entries])

  const defaultOpenIndices = useMemo(
    () => new Set(focusedEntries.map(({ originalIndex }) => originalIndex)),
    [focusedEntries]
  )
  const allIndices = useMemo(() => new Set(entries.map((_, i) => i)), [entries])
  const [openThemes, setOpenThemes] = useState(() =>
    expandAllForPrint ? allIndices : defaultOpenIndices
  )
  const toggleTheme = (i) => {
    setOpenThemes((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <section className="block block--scrollable block--skills-fit" aria-labelledby="skills-heading">
      <div className="block-inner block-inner--scrollable">
        <h2 id="skills-heading" className="block-title">{labels?.skillsLabel || 'Expertise & Certifications'}</h2>
        {loading && <p className="loading-placeholder" role="status" aria-live="polite">Loading…</p>}
        {!loading && (
          <>
            <p className="block-sub">Portfolio</p>
            <a
              href="https://github.com/susanavenda"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
            >
              <span className="portfolio-link__icon" aria-hidden>
                <i className="fab fa-github" />
              </span>
              <span className="portfolio-link__label">GitHub</span>
              <span className="portfolio-link__desc">Repositories and code</span>
            </a>
            {reposError && (
              <p className="portfolio-repos__message" role="status">
                Repos unavailable (try again later).
              </p>
            )}
            <div className="skills-layout">
              {focusedEntries.length > 0 && (
                <div className="skills-group">
                  <h3 className="skills-group__title">Focused</h3>
                  <div className="theme-blocks theme-blocks--list">
                    {focusedEntries.map(({ entry, originalIndex: i }) => {
                      const [name, desc] = entry
                      const repos = !reposLoading ? getReposForSkill(name) : []
                      const certs = getCertsForSkill(name)
                      const skillGoals = getGoalsForSkill(name)
                      const hasRepos = repos.length > 0
                      const hasCerts = certs.length > 0
                      const hasGoals = skillGoals.length > 0
                      const isOpen = openThemes.has(i)
                      const summary = [hasRepos && `${repos.length} repo${repos.length !== 1 ? 's' : ''}`, hasCerts && `${certs.length} cert${certs.length !== 1 ? 's' : ''}`, hasGoals && 'Want to do'].filter(Boolean).join(' · ')
                      return (
                        <article
                          key={i}
                          className={`theme-block theme-block--accordion theme-block--focus ${isOpen ? 'theme-block--open' : 'theme-block--closed'}`}
                          aria-labelledby={`theme-heading-${i}`}
                        >
                          <span className="theme-block__status theme-block__status--focus">Focused</span>
                          <button
                            type="button"
                            className="theme-block__trigger"
                            onClick={() => toggleTheme(i)}
                            aria-expanded={isOpen}
                            aria-controls={`theme-content-${i}`}
                            id={`theme-trigger-${i}`}
                          >
                            <h3 id={`theme-heading-${i}`} className="theme-block__title">{name}</h3>
                            {desc && <p className="theme-block__desc">{desc}</p>}
                            <span className="theme-block__trigger-row">
                              {!isOpen && summary && <span className="theme-block__summary">{summary}</span>}
                              <span className="theme-block__chevron" aria-hidden>
                                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} />
                              </span>
                            </span>
                          </button>
                          <div
                            id={`theme-content-${i}`}
                            className="theme-block__content"
                            role="region"
                            aria-labelledby={`theme-heading-${i}`}
                            hidden={!isOpen}
                          >
                            {hasRepos && (
                              <div className="theme-block__section">
                                <span className="theme-block__label">Repositories</span>
                                <RepoList repos={repos} />
                              </div>
                            )}
                            {hasCerts && (
                              <div className="theme-block__section">
                                <span className="theme-block__label">Certifications</span>
                                <CertList certs={certs} />
                              </div>
                            )}
                            {hasGoals && (
                              <div className="theme-block__section">
                                <span className="theme-block__label">Want to do</span>
                                <GoalList goals={skillGoals} />
                              </div>
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>
              )}
              {workingKnowledgeEntries.length > 0 && (
                <div className="skills-group">
                  <h3 className="skills-group__title">Working knowledge</h3>
                  <div className="theme-blocks theme-blocks--list">
                    {workingKnowledgeEntries.map(({ entry, originalIndex: i }) => {
                      const [name, desc] = entry
                      const repos = !reposLoading ? getReposForSkill(name) : []
                      const certs = getCertsForSkill(name)
                      const skillGoals = getGoalsForSkill(name)
                      const hasRepos = repos.length > 0
                      const hasCerts = certs.length > 0
                      const hasGoals = skillGoals.length > 0
                      const isOpen = openThemes.has(i)
                      const summary = [hasRepos && `${repos.length} repo${repos.length !== 1 ? 's' : ''}`, hasCerts && `${certs.length} cert${certs.length !== 1 ? 's' : ''}`, hasGoals && 'Want to do'].filter(Boolean).join(' · ')
                      return (
                        <article
                          key={i}
                          className={`theme-block theme-block--accordion ${isOpen ? 'theme-block--open' : 'theme-block--closed'}`}
                          aria-labelledby={`theme-heading-${i}`}
                        >
                          <span className="theme-block__status theme-block__status--generalist">Working knowledge</span>
                          <button
                            type="button"
                            className="theme-block__trigger"
                            onClick={() => toggleTheme(i)}
                            aria-expanded={isOpen}
                            aria-controls={`theme-content-${i}`}
                            id={`theme-trigger-${i}`}
                          >
                            <h3 id={`theme-heading-${i}`} className="theme-block__title">{name}</h3>
                            {desc && <p className="theme-block__desc">{desc}</p>}
                            <span className="theme-block__trigger-row">
                              {!isOpen && summary && <span className="theme-block__summary">{summary}</span>}
                              <span className="theme-block__chevron" aria-hidden>
                                <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} />
                              </span>
                            </span>
                          </button>
                          <div
                            id={`theme-content-${i}`}
                            className="theme-block__content"
                            role="region"
                            aria-labelledby={`theme-heading-${i}`}
                            hidden={!isOpen}
                          >
                            {hasRepos && (
                              <div className="theme-block__section">
                                <span className="theme-block__label">Repositories</span>
                                <RepoList repos={repos} />
                              </div>
                            )}
                            {hasCerts && (
                              <div className="theme-block__section">
                                <span className="theme-block__label">Certifications</span>
                                <CertList certs={certs} />
                              </div>
                            )}
                            {hasGoals && (
                              <div className="theme-block__section">
                                <span className="theme-block__label">Want to do</span>
                                <GoalList goals={skillGoals} />
                              </div>
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
            {!reposLoading && otherGroup && otherGroup.repos.length > 0 && (
              <div className="theme-block theme-block--other">
                <h3 className="theme-block__title">Other repositories</h3>
                <RepoList repos={otherGroup.repos} />
              </div>
            )}
            {uncategorizedCerts.length > 0 && (
              <div className="theme-block theme-block--uncategorized">
                <span className="theme-block__label">Certifications</span>
                <CertList certs={uncategorizedCerts} />
              </div>
            )}
            {uncategorizedGoals.length > 0 && (
              <div className="theme-block theme-block--goals">
                <h3 className="theme-block__title">What I want to do</h3>
                <GoalList goals={uncategorizedGoals} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
