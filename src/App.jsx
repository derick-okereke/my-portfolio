import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { WatchupProvider, WatchupErrorBoundary, useWatchup } from '@watchupltd/react'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import HomePage from './pages/Home/HomePage'
import AboutPage from './pages/About/AboutPage'
import ContactPage from './pages/Contact/ContactPage'
import ProjectPage from './pages/Project/ProjectPage'
import NotFound from './pages/NotFound/NotFound'
import { projectData } from './data/projects'

/** Fires a Watchup pageview on every client-side route change */
function RouteTracker() {
  const location = useLocation()
  const watchup = useWatchup()
  useEffect(() => {
    watchup.track('pageview', { path: location.pathname })
  }, [location.pathname, watchup])
  return null
}

export default function App() {
  return (
    <WatchupProvider
      apiKey={import.meta.env.VITE_WATCHUP_API_KEY}
      options={{ environment: import.meta.env.MODE }}
    >
      <WatchupErrorBoundary fallback={<p>Something went wrong.</p>}>
        <BrowserRouter>
          {/* Skip-to-content link — first focusable element */}
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>

          <RouteTracker />
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
      </WatchupErrorBoundary>
    </WatchupProvider>
  )
}
