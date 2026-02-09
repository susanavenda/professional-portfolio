# Professional Portfolio

> A modern, responsive portfolio website showcasing professional experience, skills, and achievements. Built with React and Vite, featuring a clean design optimized for both desktop and mobile viewing.

## 🌐 Live Demo

**Website:** [https://susanavenda.github.io/professional-portfolio/](https://susanavenda.github.io/professional-portfolio/)

## 📋 Overview

This portfolio website presents a comprehensive view of professional background, including work experience, education, technical skills, certifications, and recommendations. The application features a single-page design with smooth navigation and responsive layouts that adapt seamlessly to different screen sizes.

### Key Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Single-Page Application**: Smooth scrolling navigation with all content accessible from one page
- **JSON-Driven Content**: Easy content management through structured JSON files
- **Modern UI/UX**: Clean, professional design with Bootstrap styling
- **Fast Performance**: Built with Vite for optimal build times and runtime performance
- **GitHub Pages Integration**: Automated deployment workflow

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 6
- **Styling**: Bootstrap 5, Custom CSS
- **Icons**: Font Awesome
- **Fonts**: Google Fonts
- **Deployment**: GitHub Pages with automated CI/CD

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/susanavenda/professional-portfolio.git
cd professional-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173/professional-portfolio/`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory. Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
professional-portfolio/
├── src/
│   ├── components/          # React components (Header, Hero, Experience, etc.)
│   ├── hooks/               # Custom React hooks for data fetching
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets and JSON data files
│   ├── profile.jpg          # Profile image
│   ├── favicon.ico          # Site favicon
│   ├── labels.json          # Personal information and navigation
│   ├── jobs.json            # Work experience data
│   ├── education.json       # Educational background
│   ├── certifications.json  # Professional certifications
│   ├── techskills.json      # Technical skills inventory
│   └── recommendations.json # Professional recommendations
├── docs/                    # Built files for GitHub Pages deployment
├── infrastructure/          # Infrastructure as Code (Terraform)
└── package.json             # Project dependencies and scripts
```

## 📝 Content Management

All content is managed through JSON files in the `public/` directory:

- **`labels.json`**: Name, tagline, bio, and navigation labels
- **`jobs.json`**: Work experience entries with roles, companies, and responsibilities
- **`education.json`**: Educational qualifications and institutions
- **`certifications.json`**: Professional certifications and credentials
- **`techskills.json`**: Technical skills categorized by domain
- **`recommendations.json`**: Professional recommendations and testimonials

Simply edit these JSON files and rebuild the application to update the content.

## 🚢 Deployment

The project uses GitHub Actions for automated deployment to GitHub Pages. The workflow automatically builds and deploys on every push to `main`.

**Configuration:**
- Source: Deploy from a branch (`main`)
- Folder: `/docs`
- Uses reusable workflow from [devops-toolkit](https://github.com/susanavenda/devops-toolkit)

## 📄 License

This project is private and proprietary.

## 👤 Author

**Susana Venda**
- GitHub: [@susanavenda](https://github.com/susanavenda)
- Portfolio: [https://susanavenda.github.io/professional-portfolio/](https://susanavenda.github.io/professional-portfolio/)

---

*Last updated: February 2026*
