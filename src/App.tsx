import './styles/theme.css'
import './styles/global.css'
import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Loader } from './components/Loader'
import { Footer } from './components/Footer'
import { Home } from './pages/HomeRoute'
import { RegulamentoRoute } from './pages/RegulamentoRoute'

import { NotFoundError } from './pages/NotFoundRoute'
import { LgpdRoute } from './pages/LgpdRoute'

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    let done = false

    const finish = () => {
      if (done) return
      done = true
      setLoading(false)
    }

    if (document.readyState === 'complete') {
      const t = window.setTimeout(finish, 150)
      return () => window.clearTimeout(t)
    }

    window.addEventListener('load', finish, { once: true })

    const fallback = window.setTimeout(finish, 2000)

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(fallback)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <>
      {loading && <Loader />}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/regulamento" element={<RegulamentoRoute />} />
        <Route path="/lgpd" element={<LgpdRoute />} />        
        <Route path="*" element={<NotFoundError />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
