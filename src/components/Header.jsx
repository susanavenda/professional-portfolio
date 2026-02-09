import { useState } from 'react'

const NAV = [
  { href: '#about', key: 'aboutLabel', sectionId: null },
  { href: '#experience', key: 'experienceLabel', sectionId: 'experience' },
  { href: '#education', key: 'educationLabel', sectionId: 'education' },
  { href: '#skills', key: 'skillsLabel', sectionId: 'skills' },
]

export function Header({ labels, currentSectionId = 'about', onNavClick, exploredCount = 0, totalSections = 6, onDownloadPdf, showCvForPrint = false, singlePageMode = false }) {
  const [navOpen, setNavOpen] = useState(false)
  const activeId = currentSectionId ?? 'about'
  const showProgress = totalSections > 0 && exploredCount >= 0 && !showCvForPrint && !singlePageMode

  const handleClick = (item) => {
    onNavClick?.(item.sectionId)
    setNavOpen(false)
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="site-header">
        <div className="header-inner">
          {showProgress && (
            <div className="header-progress" aria-label={`${exploredCount} of ${totalSections} sections explored`}>
              <span className="header-progress__text">{exploredCount}/{totalSections}</span>
              <div className="header-progress__bar" role="presentation">
                <div
                  className="header-progress__fill"
                  style={{ width: `${totalSections ? (exploredCount / totalSections) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}
          <button
            type="button"
            className="nav-toggle"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            <i className="fas fa-bars" />
          </button>
          <nav className={`site-nav ${navOpen ? 'is-open' : ''}`} aria-label="Main">
            {NAV.map((item) => {
              const isActive = activeId === (item.sectionId ?? 'about')
              return item.sectionId === null ? (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(e) => { e.preventDefault(); handleClick(item); }}
                >
                  {labels?.[item.key] ?? item.key}
                </a>
              ) : (
                <button
                  key={item.href}
                  type="button"
                  className="site-nav-btn"
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => handleClick(item)}
                >
                  {labels?.[item.key] ?? item.key}
                </button>
              )
            })}
            {onDownloadPdf && (
              <button
                type="button"
                className="site-nav-btn site-nav-btn--pdf"
                onClick={() => onDownloadPdf()}
                aria-label="Print or save this page as PDF"
              >
                <i className="fas fa-print" aria-hidden /> Print page
              </button>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
