const MOBILE_BULLETS_VISIBLE = 4
const CV_URL = 'https://github.com/susanavenda/professional-portfolio/blob/main/Susana_Venda_-_Solution_Architect_and_DevOps_Team_Lead%20(1).pdf'

import { useState } from 'react'

export function JobCard({ item, showAllBulletsOnMobile = true }) {
  const points = Array.isArray(item.responsibilities) ? item.responsibilities : item.responsibilities ? [item.responsibilities] : []
  const [expanded, setExpanded] = useState(false)
  const isCollapsed = !showAllBulletsOnMobile && points.length > MOBILE_BULLETS_VISIBLE
  const visiblePoints = isCollapsed && !expanded ? points.slice(0, MOBILE_BULLETS_VISIBLE) : points
  const hasMore = isCollapsed && !expanded && points.length > MOBILE_BULLETS_VISIBLE

  return (
    <article className="template-card template-card--no-visual">
      <div className="template-card__left">
        <h3 className="template-card__title">{item.jobTitle}</h3>
        <p className="template-card__subtitle">{item.company}</p>
        <p className="template-card__meta">{item.duration}</p>
        <div className="template-card__body">
          <ul className="template-card__list">
            {visiblePoints.filter(Boolean).map((d, i) => (
              <li key={i} className="template-card__text">{d}</li>
            ))}
          </ul>
          {hasMore && (
            <button
              type="button"
              className="template-card__show-more"
              onClick={() => setExpanded(true)}
              aria-expanded="false"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export function Experience({ jobs, loading, subSlideIndex = 0, itemsPerPage = 2, isMobile = false, isCvPrint = false }) {
  const start = subSlideIndex * itemsPerPage
  const pageJobs = Array.isArray(jobs) ? jobs.slice(start, start + itemsPerPage) : []
  return (
    <section className="block block--fit-screen" aria-labelledby="experience-heading" id="experience-section">
      <div className="block-inner">
        <div className="experience-header-row">
          <h2 id="experience-heading" className="block-title">Experience</h2>
          {!isCvPrint && (
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="experience-cv-download"
            >
              <i className="fas fa-file-pdf" aria-hidden />
              Download CV (PDF)
            </a>
          )}
        </div>
        {loading && <p className="loading-placeholder" role="status" aria-live="polite">Loading…</p>}
        {!loading && pageJobs.length === 0 && jobs?.length === 0 && (
          <p className="empty-state" role="status">No experience entries to show.</p>
        )}
        {!loading && pageJobs.map((job, i) => (
          <JobCard key={start + i} item={job} showAllBulletsOnMobile={!isMobile} />
        ))}
      </div>
    </section>
  )
}
