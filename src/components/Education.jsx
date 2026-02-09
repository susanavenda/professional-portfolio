export function EduCard({ item }) {
  const details = Array.isArray(item.details) ? item.details : item.details ? [item.details] : []
  return (
    <article className="template-card template-card--no-visual">
      <div className="template-card__left">
        <h3 className="template-card__title">{item.degree}</h3>
        <p className="template-card__subtitle">{item.university}</p>
        <p className="template-card__meta">{item.duration}</p>
        <div className="template-card__body">
          {details.filter(Boolean).map((d, i) => (
            <p key={i} className="template-card__text">{d}</p>
          ))}
        </div>
      </div>
    </article>
  )
}

export function Education({ education, loading, subSlideIndex = 0, itemsPerPage = 2 }) {
  const list = Array.isArray(education) ? education : []
  const start = subSlideIndex * itemsPerPage
  const pageItems = list.slice(start, start + itemsPerPage)
  return (
    <section className="block block--fit-screen" aria-labelledby="education-heading">
      <div className="block-inner">
        <h2 id="education-heading" className="block-title">Education</h2>
        {loading && <p className="loading-placeholder" role="status" aria-live="polite">Loading…</p>}
        {!loading && pageItems.length === 0 && list.length === 0 && (
          <p className="empty-state" role="status">No education entries to show.</p>
        )}
        {!loading && pageItems.map((item, i) => <EduCard key={start + i} item={item} />)}
      </div>
    </section>
  )
}
