export function Skills({ techskills, loading }) {
  const entries = !techskills ? [] : typeof techskills === 'object' && !Array.isArray(techskills)
    ? Object.entries(techskills)
    : techskills.map((text, i) => [`Skill ${i + 1}`, text])

  return (
    <section className="block" id="skills">
      <div className="block-inner">
        <h2 className="block-title">Skills</h2>
        <p className="block-sub">Programming & tools</p>
        <ul className="icon-row">
          <li><i className="fab fa-java" /></li>
          <li><i className="fas fa-database" /></li>
          <li><i className="fab fa-angular" /></li>
          <li><i className="fab fa-jira" /></li>
          <li><i className="fas fa-cloud" /></li>
          <li><i className="fab fa-docker" /></li>
        </ul>
        <p className="block-sub">Tech skills</p>
        {loading && <p className="loading-placeholder" role="status" aria-live="polite">Loading…</p>}
        <ul className="skill-cards" id="techskillsList">
          {!loading && entries.map(([name, desc], i) => (
            <li key={i} className="skill-card">
              <div className="skill-card__header">
                <span className="skill-card__name">{name}</span>
                <span className="skill-card__level" aria-hidden>Mastered</span>
              </div>
              <div className="skill-card__bar" role="presentation" aria-hidden>
                <div className="skill-card__bar-fill" style={{ width: '100%' }} />
              </div>
              {desc && <p className="skill-card__desc">{desc}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
