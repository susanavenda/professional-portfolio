import { useState, useEffect } from 'react'

export function Slideshow({ children, currentIndex, onIndexChange, sectionCount = 0, subSlideIndex = 0, subSlideCount = 1, onSubSlideChange }) {
  const [index, setIndex] = useState(currentIndex ?? 0)
  const rawIndex = typeof currentIndex === 'number' ? currentIndex : index
  const total = sectionCount || (Array.isArray(children) ? children.length : 1)
  const effectiveIndex = total === 0 ? 0 : Math.max(0, Math.min(rawIndex, total - 1))
  const hasSubSlides = subSlideCount > 1

  useEffect(() => {
    if (typeof currentIndex === 'number') setIndex(currentIndex)
  }, [currentIndex])

  const goSub = (i) => {
    const next = Math.max(0, Math.min(subSlideCount - 1, i))
    onSubSlideChange?.(next)
  }

  const slides = Array.isArray(children) ? children : [children]
  if (slides.length === 0) return null

  const translatePercent = total > 0 ? (effectiveIndex * 100) / total : 0

  return (
    <div className="slideshow slideshow-section">
      {hasSubSlides && (
        <div className="slideshow-sub-nav slideshow-sub-nav--top" aria-label="Page within section">
          <button
            type="button"
            className="slideshow-sub-prev"
            onClick={() => goSub(subSlideIndex - 1)}
            disabled={subSlideIndex === 0}
            aria-label="Previous page"
          >
            <i className="fas fa-chevron-left" />
          </button>
          <span className="slideshow-sub-counter" aria-live="polite">
            {subSlideIndex + 1} / {subSlideCount}
          </span>
          <button
            type="button"
            className="slideshow-sub-next"
            onClick={() => goSub(subSlideIndex + 1)}
            disabled={subSlideIndex >= subSlideCount - 1}
            aria-label="Next page"
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      )}
      <div
        className="slideshow-track"
        style={{ transform: `translateX(-${translatePercent}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="slideshow-slide"
            aria-hidden={i !== effectiveIndex}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  )
}
