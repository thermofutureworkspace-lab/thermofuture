import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Solutions from './components/Solutions'
import Features from './components/Features'
import About from './components/About'
import Projects from './components/Projects'
import EbayStrip from './components/EbayStrip'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CookieBanner from './components/CookieBanner'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CookiePolicy from './pages/CookiePolicy'
import Climatizzatori from './pages/Climatizzatori'
import AirconPartnerBanner from './components/AirconPartnerBanner'
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function HomePage() {
  return (
    <main>
      <Hero />
      <AirconPartnerBanner />
      <Solutions />
      <Features />
      <About />
        <Projects />
        <EbayStrip />
        <ContactSection />
    </main>
  )
}

function Layout() {
  const { pathname } = useLocation()
  const hideChrome = pathname.startsWith('/nscostadmin')

  return (
    <>
      <ScrollToTop />
      {!hideChrome && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/climatizzatori" element={<Climatizzatori />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route
          path="/nscostadmin"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-stone-100">
                  <Loader2 className="w-8 h-8 text-orange-700 animate-spin" />
                </div>
              }>
              <AdminDashboard />
            </Suspense>
          }
        />
      </Routes>
      {!hideChrome && <Footer />}
      {!hideChrome && <WhatsAppButton />}
      {!hideChrome && <CookieBanner />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
