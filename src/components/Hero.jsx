function getBase() {
  if (typeof window === 'undefined') {
    // Support both Vite (import.meta.env) and Jest (process.env or fallback)
    try {
      return import.meta.env.BASE_URL || './';
    } catch (e) {
      return process.env.BASE_URL || './';
    }
  }
  const p = window.location.pathname
  return p.endsWith('/') ? p : p + '/'
}

export function Hero({ labels, stats }) {
  if (!labels) return null
  const oneLiner = labels.heroOneLiner || labels.roleTagline
  const aboutMeText = labels.aboutMe && typeof labels.aboutMe === 'string' ? labels.aboutMe.trim() : ''
  const aboutBullets = aboutMeText
    ? aboutMeText.split(/(?<=[.])\s+/).filter((s) => s.trim().length > 0).map((s) => s.trim())
    : []
  const workValues = labels.workValues?.trim()

  return (
    <header className="block block-hero hero-two-col" id="about">
      <div className="hero-left-col">
        <img
          src={`${getBase()}profile.jpg`}
          alt="Susana Venda"
          className="hero-photo"
          width={200}
          height={200}
          loading="eager"
          decoding="async"
        />
        <h1 className="hero-name"><span className="hero-name-bg">{labels.name}</span></h1>
        <div className="hero-name-line" aria-hidden />
        <div className="hero-left-rest">
          <p className="hero-role">{labels.roleTagline}</p>
          {stats && (
            <div className="hero-stats" aria-label="Profile highlights">
              {stats.yearsExperience != null && (
                <span className="hero-stat">
                  <i className="fas fa-award" aria-hidden />
                  {stats.yearsExperience}+ years
                </span>
              )}
              {stats.certCount != null && stats.certCount > 0 && (
                <span className="hero-stat">
                  <i className="fas fa-medal" aria-hidden />
                  {stats.certCount} certifications
                </span>
              )}
              {stats.recommendationCount != null && stats.recommendationCount > 0 && (
                <span className="hero-stat">
                  <i className="fas fa-quote-left" aria-hidden />
                  <a
                    href="https://www.linkedin.com/in/susana-venda-3b355b40/details/recommendations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-stat__link"
                    title="View recommendations on LinkedIn"
                  >
                    {stats.recommendationCount} recommendations
                  </a>
                </span>
              )}
            </div>
          )}
          <div className="hero-social">
            <a href="https://www.linkedin.com/in/susana-venda-3b355b40" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <i className="fab fa-linkedin-in" aria-hidden />
            </a>
            {labels.contactEmail && (
              <a href={`mailto:${labels.contactEmail}`} title="Email me">
                <i className="fas fa-envelope" aria-hidden />
              </a>
            )}
            {labels.contactPhone && (
              <a href={`tel:${labels.contactPhone.replace(/\s/g, '')}`} title="Call me">
                <i className="fas fa-phone" aria-hidden />
              </a>
            )}
            <a href="https://github.com/susanavenda" target="_blank" rel="noopener noreferrer" title="GitHub">
              <i className="fab fa-github" aria-hidden />
            </a>
          </div>
        </div>
      </div>
      <div className="hero-right-col">
        <div className="hero-right-spacer" aria-hidden />
        <p className="hero-oneliner">{oneLiner}</p>
        <div className="hero-title-line" aria-hidden />
        <div className="hero-intro hero-bio-block">
          <div className="hero-bio-wrap">
            {aboutBullets.length > 0 ? (
              <ul className="hero-bio-list">
                {aboutBullets.map((line, i) => (
                  <li key={i} className="hero-bio">{line}</li>
                ))}
              </ul>
            ) : aboutMeText ? (
              <p className="hero-bio">{aboutMeText}</p>
            ) : null}
          </div>
        </div>
        {workValues && (
          <section className="hero-values" aria-labelledby="hero-values-heading">
            <h2 id="hero-values-heading" className="hero-values__title">How I work</h2>
            <p className="hero-values__text">{workValues}</p>
          </section>
        )}
      </div>
    </header>
  )
}
