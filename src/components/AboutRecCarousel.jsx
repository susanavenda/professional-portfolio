import { useState, useEffect } from 'react'

export function AboutRecCarousel({ recommendations, autoAdvanceMs = 6000 }) {
  const list = Array.isArray(recommendations) ? recommendations : []
  const [index, setIndex] = useState(0)
  const count = list.length

  useEffect(() => {
    if (count <= 1 || !autoAdvanceMs) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, autoAdvanceMs)
    return () => clearInterval(id)
  }, [count, autoAdvanceMs])

  if (count === 0) return null

  const go = (delta) => setIndex((i) => (i + delta + count) % count)

  return (
    <section className="block block-about-rec" aria-label="Recommendations">
      <h2 className="block-title">What people say</h2>
      <div className="about-rec-carousel">
        <div className="about-rec-carousel__track-wrap">
          <div
            className="about-rec-carousel__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
            aria-live="polite"
          >
            {list.map((rec, i) => (
              <div
                key={i}
                className="about-rec-carousel__slide"
                aria-hidden={i !== index}
              >
                <blockquote className="recommendation-card">
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
              </div>
            ))}
          </div>
        </div>
        <a
          href="https://www.linkedin.com/in/susana-venda-3b355b40/details/recommendations/"
          target="_blank"
          rel="noopener noreferrer"
          className="about-rec-carousel__linkedin-link"
        >
          View all recommendations on LinkedIn
        </a>
        <div className="about-rec-carousel__nav">
          <button
            type="button"
            className="about-rec-carousel__btn"
            onClick={() => go(-1)}
            disabled={count <= 1}
            aria-label="Previous recommendation"
          >
            <i className="fas fa-chevron-left" />
          </button>
          <span className="about-rec-carousel__counter" aria-live="polite">
            {index + 1} / {count}
          </span>
          <button
            type="button"
            className="about-rec-carousel__btn"
            onClick={() => go(1)}
            disabled={count <= 1}
            aria-label="Next recommendation"
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  )
}
