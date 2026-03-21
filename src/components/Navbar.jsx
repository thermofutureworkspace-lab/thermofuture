import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const WA = 'https://wa.me/393792064226?text=Ciao,%20vorrei%20un%20preventivo%20gratuito'

const navLinks = [
  { label: 'Servizi',   href: '/#services' },
  { label: 'Progetti',  href: '/#projects' },
  { label: 'Chi siamo', href: '/#about' },
  { label: 'Contatti',  href: '/#contacts' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const transparent = isHome && !scrolled

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      transparent ? 'bg-transparent' : 'bg-white border-b border-stone-200 shadow-sm'
    }`}>
      <div className="section-padding max-w-7xl mx-auto flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src="/assets/logo.png" alt="ThermoFuture" className="h-9 sm:h-10 w-auto" />
          <div className="leading-tight hidden sm:block">
            <div className={`text-sm sm:text-base font-bold transition-colors ${transparent ? 'text-white' : 'text-stone-900'}`}>
              ThermoFuture
            </div>
            <div className={`text-[10px] transition-colors ${transparent ? 'text-white/60' : 'text-stone-400'}`}>
              Impianti Energetici · dal 1990
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(l => (
            <a key={l.label} href={l.href}
              className={`text-sm font-medium transition-colors ${
                transparent ? 'text-white/80 hover:text-white' : 'text-stone-500 hover:text-stone-900'
              }`}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+393792064226"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              transparent ? 'text-white/70 hover:text-white' : 'text-stone-500 hover:text-stone-900'
            }`}>
            <Phone className="w-4 h-4" />
            379 206 4226
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="btn-primary text-sm">
            Preventivo gratuito
          </a>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-3">
          <a href="tel:+393792064226" className={`transition-colors ${transparent ? 'text-white/80' : 'text-stone-600'}`}>
            <Phone className="w-5 h-5" />
          </a>
          <button onClick={() => setOpen(!open)}
            className={`p-1 transition-colors ${transparent ? 'text-white' : 'text-stone-700'}`}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-stone-100 shadow-lg">
          <div className="section-padding py-4 flex flex-col gap-1">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-stone-700 hover:text-stone-900 border-b border-stone-100 last:border-0">
                {l.label}
              </a>
            ))}
            <a href={WA} target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 btn-primary justify-center">
              💬 Preventivo gratuito su WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
