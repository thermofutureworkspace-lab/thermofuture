import { useState, useRef, useEffect } from 'react'
import { Phone, ChevronDown } from 'lucide-react'

const NUMBERS = [
  { label: 'Ufficio 1', value: '329 219 7867', href: 'tel:+393292197867' },
  { label: 'Ufficio 2', value: '0823 657232',  href: 'tel:+390823657232' },
]

export default function CallPicker({ dark = false }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
          dark
            ? 'border border-white/30 hover:border-white/70 text-white px-5 py-3.5 rounded-sm hover:-translate-y-0.5 duration-200'
            : 'text-stone-500 hover:text-stone-900'
        }`}
      >
        <Phone className="w-4 h-4" />
        Chiama
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 bg-white border border-stone-200 rounded-sm shadow-lg py-1 min-w-[200px] z-50">
          {NUMBERS.map(n => (
            <a key={n.href} href={n.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 group transition-colors">
              <div className="w-7 h-7 rounded-sm bg-orange-100 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 text-orange-700" />
              </div>
              <div>
                <div className="text-[10px] text-stone-400 uppercase tracking-wider">{n.label}</div>
                <div className="text-sm font-semibold text-stone-800 group-hover:text-orange-700 transition-colors">{n.value}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
