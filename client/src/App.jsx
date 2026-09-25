import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { LeftSidebar, RightSidebar } from './components/PageSidebar'
import { Footer } from './components/Footer'
import { RouteEffects } from './components/RouteEffects'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import { HomePage } from './pages/HomePage'

const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })))
const ResumePage = lazy(() => import('./pages/ResumePage').then(m => ({ default: m.ResumePage })))
const HistoryPage = lazy(() => import('./pages/HistoryPage').then(m => ({ default: m.HistoryPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

export default function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 font-mono-label text-xs"
        style={{ background: 'var(--accent-dev)', color: '#0B0B0F' }}
      >
        Skip to content
      </a>
      <RouteEffects />
      <NavBar />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 xl:px-8 flex-1 w-full">
        <div className="flex gap-6 xl:gap-8 py-0">
          {!isHome && <LeftSidebar />}
          <main id="main-content" className="flex-1 min-w-0">
            <ErrorBoundary key={pathname}>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/resume" element={<ResumePage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          {!isHome && <RightSidebar />}
        </div>
      </div>
      <Footer />
    </div>
  )
}