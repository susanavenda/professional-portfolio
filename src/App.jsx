import { useState, useMemo, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Experience } from './components/Experience'
import { Education } from './components/Education'
import { SkillsAndCertifications } from './components/SkillsAndCertifications'
import { Footer } from './components/Footer'
import { Slideshow } from './components/Slideshow'
import { AboutRecCarousel } from './components/AboutRecCarousel'
import { useResumeData } from './hooks/useResumeData'
import { useMatchMedia } from './hooks/useMatchMedia'

const SECTION_IDS = ['experience', 'education', 'skills']
const ITEMS_PER_PAGE = 2
const EXPERIENCE_ITEMS_PER_PAGE = 2

function computeYearsExperience(jobs) {
  if (!Array.isArray(jobs) || jobs.length === 0) return null
  const years = jobs
    .map((j) => {
      const m = (j.duration || '').match(/\b(19|20)\d{2}\b/g)
      return m ? m.map(Number) : []
    })
    .flat()
  if (years.length === 0) return null
  const min = Math.min(...years)
  const max = Math.max(...years)
  const currentYear = new Date().getFullYear()
  return Math.max(max - min, currentYear - min, 1)
}

const MOBILE_BREAKPOINT = '(max-width: 600px)'
const SINGLE_PAGE_BREAKPOINT = '(max-width: 900px)'

export default function App() {
  const isMobile = useMatchMedia(MOBILE_BREAKPOINT)
  const isSinglePageMobile = useMatchMedia(SINGLE_PAGE_BREAKPOINT)
  const [view, setView] = useState('about')
  const [showCvForPrint, setShowCvForPrint] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [subSlideIndex, setSubSlideIndex] = useState(0)
  const [visitedSections, setVisitedSections] = useState(() => new Set(['about']))
  const {
    labels,
    jobs,
    education,
    techskills,
    certifications,
    recommendations,
    portfolioConfig,
    goals,
    loading,
    error,
  } = useResumeData()

  const sectionStarts = useMemo(() => {
    const s = {}
    SECTION_IDS.forEach((id, i) => {
      s[id] = i
    })
    return s
  }, [])

  const subSlideCounts = useMemo(
    () => [
      Math.max(1, Math.ceil((jobs?.length || 0) / EXPERIENCE_ITEMS_PER_PAGE)),
      Math.max(1, Math.ceil((education?.length || 0) / ITEMS_PER_PAGE)),
      1,
    ],
    [jobs?.length, education?.length]
  )
  const subSlideCount = subSlideCounts[slideIndex] ?? 1

  const handleNavClick = (sectionId) => {
    if (isSinglePageMobile) {
      if (sectionId === null) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const el = document.getElementById(sectionId)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }
    if (sectionId === null) {
      setView('about')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setVisitedSections((prev) => new Set([...prev, sectionId]))
      setView('content')
      setSlideIndex(sectionStarts[sectionId] ?? 0)
      setSubSlideIndex(0)
    }
  }

  useEffect(() => {
    if (view === 'content' && isMobile) {
      const id = SECTION_IDS[slideIndex]
      const el = id ? document.getElementById(id) : null
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }
    }
  }, [view, slideIndex, isMobile])

  const handleSlideChange = (i) => {
    setSlideIndex(i)
    setSubSlideIndex(0)
  }

  const currentSectionId = view === 'about' ? 'about' : SECTION_IDS[slideIndex]
  const exploredCount = SECTION_IDS.filter((id) => visitedSections.has(id)).length
  const useSinglePageLayout = showCvForPrint || isSinglePageMobile
  const heroStats = useMemo(
    () => ({
      yearsExperience: computeYearsExperience(jobs),
      certCount: certifications?.length ?? 0,
      recommendationCount: Array.isArray(recommendations) ? recommendations.length : 0,
    }),
    [jobs, certifications?.length, recommendations]
  )

  if (error) {
    return (
      <div className="app-error" id="app-error" role="alert">
        <p>We couldn’t load the content. Please check your connection and try again.</p>
        <p>
          <a href="mailto:susanavenda@outlook.com">Contact me</a> if the problem continues.
        </p>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <Header
        labels={labels}
        currentSectionId={currentSectionId}
        onNavClick={handleNavClick}
        exploredCount={exploredCount}
        totalSections={SECTION_IDS.length}
        onDownloadPdf={() => setShowCvForPrint(true)}
        showCvForPrint={showCvForPrint}
        singlePageMode={useSinglePageLayout}
      />
      <main
        id="main-content"
        className={`site-main ${useSinglePageLayout ? 'site-main--cv' : view === 'about' ? 'site-main--about' : 'site-main--content'}`}
        role="main"
        tabIndex={-1}
      >
        {useSinglePageLayout && (
          <>
            {showCvForPrint && (
              <div className="cv-print-bar no-print">
                <button type="button" className="cv-print-bar__btn cv-print-bar__btn--primary" onClick={() => window.print()}>
                  <i className="fas fa-print" aria-hidden /> Print / Save as PDF
                </button>
                <button type="button" className="cv-print-bar__btn" onClick={() => setShowCvForPrint(false)}>
                  <i className="fas fa-arrow-left" aria-hidden /> Back to site
                </button>
              </div>
            )}
            <div className="cv-print-content cv-doc">
              <Hero labels={labels} stats={heroStats} />
              <div className="cv-section" id="experience">
                <Experience jobs={jobs} loading={loading} subSlideIndex={0} itemsPerPage={999} isMobile={false} isCvPrint />
              </div>
              <div className="cv-section" id="education">
                <Education education={education} loading={loading} subSlideIndex={0} itemsPerPage={999} />
              </div>
              <div className="cv-section" id="skills">
                <SkillsAndCertifications techskills={techskills} certifications={certifications} portfolioConfig={portfolioConfig} goals={goals} loading={loading} labels={labels} expandAllForPrint />
              </div>
            </div>
          </>
        )}
        {!useSinglePageLayout && view === 'about' && (
          <>
            <Hero labels={labels} stats={heroStats} />
            {Array.isArray(recommendations) && recommendations.length > 0 && (
              <AboutRecCarousel recommendations={recommendations} autoAdvanceMs={6000} />
            )}
          </>
        )}
        {!useSinglePageLayout && view === 'content' && (
          <Slideshow
            currentIndex={slideIndex}
            onIndexChange={handleSlideChange}
            sectionCount={SECTION_IDS.length}
            subSlideIndex={subSlideIndex}
            subSlideCount={subSlideCount}
            onSubSlideChange={setSubSlideIndex}
          >
            <div className="slide-panel" id="experience">
              <Experience
                jobs={jobs}
                loading={loading}
                subSlideIndex={subSlideIndex}
                itemsPerPage={isMobile ? 999 : EXPERIENCE_ITEMS_PER_PAGE}
                isMobile={isMobile}
              />
            </div>
            <div className="slide-panel" id="education">
              <Education
                education={education}
                loading={loading}
                subSlideIndex={subSlideIndex}
                itemsPerPage={isMobile ? 999 : ITEMS_PER_PAGE}
              />
            </div>
            <div className="slide-panel" id="skills">
              <SkillsAndCertifications techskills={techskills} certifications={certifications} portfolioConfig={portfolioConfig} goals={goals} loading={loading} labels={labels} />
            </div>
          </Slideshow>
        )}
      </main>
      <Footer labels={labels} />
    </div>
  )
}
