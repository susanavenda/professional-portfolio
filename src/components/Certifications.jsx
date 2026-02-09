export function Certifications({ certifications, loading }) {
  return (
    <section className="block" id="awards">
      <div className="block-inner">
        <h2 className="block-title">Certifications</h2>
        {loading && <p className="loading-placeholder" role="status" aria-live="polite">Loading…</p>}
        <ul className="cert-badges" id="certificationsList">
          {!loading &&
            certifications?.map((item, i) => (
              <li key={i} className="cert-badge">
                <span className="cert-badge__icon" aria-hidden>
                  <i className="fas fa-trophy" />
                </span>
                <span className="cert-badge__name">{item.name}</span>
                {item.issuer && <span className="cert-badge__issuer">{item.issuer}</span>}
                {item.description && <p className="cert-badge__desc">{item.description}</p>}
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
