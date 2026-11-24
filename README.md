# Derick Okereke — Portfolio

Personal portfolio website for **Derick Okereke**, a front-end developer who builds web products and adds AI features where they help.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS with CSS Custom Properties (Design Tokens) & CSS Modules
- **Typography**: Bricolage Grotesque (Headlines) & Hanken Grotesk (Body/UI)
- **Visuals & Motion**: Canvas API for organic dot-network background, CSS transitions & transforms
- **Linting & Code Quality**: Oxlint

## Project Structure

```text
derick-portfolio/
├── public/              # Static assets, project mockups, icons, and PDF CV
├── src/
│   ├── components/      # Reusable UI components (Hero, Nav, Footer, Cards, etc.)
│   ├── data/            # Project case studies and metadata
│   ├── pages/           # Route views (Home, About, Contact, Project, NotFound)
│   ├── tokens.css       # Design tokens (colors, typography, spacing, shadows)
│   └── App.jsx          # Client-side router and root layout
└── vite.config.js       # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

### Production Build

Build the project for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```
