# Professional Portfolio

A modern, responsive portfolio website showcasing professional experience, skills, and achievements. Built with React and Vite, featuring a clean design optimized for desktop and mobile viewing.

**Live Demo:** [https://susanavenda.github.io/professional-portfolio/](https://susanavenda.github.io/professional-portfolio/)

## Overview

This portfolio website presents a comprehensive view of professional background, including work experience, education, technical skills, certifications, and recommendations. The application features a single-page design with smooth navigation and responsive layouts.

## Features

- Responsive design optimized for all devices
- Single-page application with smooth scrolling
- JSON-driven content management
- Modern UI/UX with Bootstrap styling
- Fast performance with Vite build tool
- Automated GitHub Pages deployment

## Tech Stack

- **Frontend:** React 18, Vite 6
- **Styling:** Bootstrap 5, Custom CSS
- **Icons:** Font Awesome
- **Deployment:** GitHub Pages with CI/CD

## Getting Started

### Prerequisites

- Node.js >=20.0.0
- npm >=10.0.0

### Installation

```bash
git clone https://github.com/susanavenda/professional-portfolio.git
cd professional-portfolio
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
professional-portfolio/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   └── ...
├── public/             # Static assets and JSON data
├── infrastructure/     # Infrastructure as Code
└── docs/              # Built files for GitHub Pages
```

## Content Management

Content is managed through JSON files in `public/`:
- `labels.json` - Personal information and navigation
- `jobs.json` - Work experience
- `education.json` - Educational background
- `certifications.json` - Professional certifications
- `techskills.json` - Technical skills
- `recommendations.json` - Professional recommendations

## Deployment

Automated deployment via GitHub Actions using reusable workflows from [devops-toolkit](https://github.com/susanavenda/devops-toolkit).

**Configuration:**
- Source: Deploy from branch (`main`)
- Folder: `/docs`

## License

Private and proprietary.

## Author

**Susana Venda**
- GitHub: [@susanavenda](https://github.com/susanavenda)
- Portfolio: [https://susanavenda.github.io/professional-portfolio/](https://susanavenda.github.io/professional-portfolio/)
