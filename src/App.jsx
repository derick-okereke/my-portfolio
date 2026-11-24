import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import HomePage from './pages/Home/HomePage'
import AboutPage from './pages/About/AboutPage'
import ContactPage from './pages/Contact/ContactPage'
import ProjectPage from './pages/Project/ProjectPage'
import NotFound from './pages/NotFound/NotFound'
import { projectData } from './data/projects'

export default function App() {
  return (
    <BrowserRouter>
      {/* Skip-to-content link — first focusable element */}
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Nav />

      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/work/peekytoe"
            element={<ProjectPage slug="peekytoe" data={projectData.peekytoe} />}
          />
          <Route
            path="/work/author-bookstore"
            element={<ProjectPage slug="author-bookstore" data={projectData.authorBookstore} />}
          />
          <Route
            path="/work/onetax-pipeline"
            element={<ProjectPage slug="onetax-pipeline" data={projectData.onetaxPipeline} />}
          />
          <Route
            path="/work/cashpod"
            element={<ProjectPage slug="cashpod" data={projectData.cashpod} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}
