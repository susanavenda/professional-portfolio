export function Recommendations({ recommendations, loading, subSlideIndex = 0, itemsPerPage = 2 }) {
  const list = Array.isArray(recommendations) ? recommendations : []
  const start = subSlideIndex * itemsPerPage
  const pageItems = list.slice(start, start + itemsPerPage)
  return (
    <section className="block" id="recommendations">
      <div className="block-inner">
        <h2 className="block-title">Recommendations</h2>
        {loading && <p className="loading-placeholder" role="status" aria-live="polite">Loading…</p>}
        <div className="recommendations-grid">
          {!loading && pageItems.map((rec, i) => (
            <blockquote key={start + i} className="recommendation-card">
              <p className="recommendation-card__quote">{rec.text}</p>
              <footer className="recommendation-card__author">
                <strong>{rec.author}</strong>
                {(rec.role || rec.company) && (
                  <span className="recommendation-card__meta">
                    {[rec.role, rec.company].filter(Boolean).join(' · ')}
                  </span>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
