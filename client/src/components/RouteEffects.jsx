import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const TITLES = {
  '/': 'Johnny Tran — Developer',
  '/about': 'About — Johnny Tran',
  '/projects': 'Projects — Johnny Tran',
  '/resume': 'Resume — Johnny Tran',
  '/history': 'History — Johnny Tran',
}

export function RouteEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
    document.title = TITLES[pathname] || 'Johnny Tran — Developer'
  }, [pathname])

  return null
}