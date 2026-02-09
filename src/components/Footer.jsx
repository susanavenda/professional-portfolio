export function Footer({ labels }) {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="copy">&copy; {year} Susana Venda. All rights reserved.</p>
        <div className="footer-links">
          <a href="mailto:susanavenda@outlook.com">Contact</a>
          <a href="https://www.linkedin.com/in/susana-venda-3b355b40" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/susanavenda" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
