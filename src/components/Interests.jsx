export function Interests({ labels }) {
  const text = labels?.interestsLabel1
  if (!text) return null
  return (
    <section className="block" aria-labelledby="interests-heading">
      <div className="block-inner">
        <h2 id="interests-heading" className="block-title">Interests</h2>
        <div className="interests-visual" aria-hidden>
          <span className="interests-icon" title="DIY & creativity"><i className="fas fa-paint-brush" /></span>
          <span className="interests-icon" title="Hot yoga"><i className="fas fa-spa" /></span>
          <span className="interests-icon" title="Travel"><i className="fas fa-plane-departure" /></span>
          <span className="interests-icon" title="Exploring"><i className="fas fa-globe-europe" /></span>
        </div>
        <p>{text}</p>
      </div>
    </section>
  )
}
