import { MessageCircle } from 'lucide-react'
import { useState } from 'react'

const WA = 'https://wa.me/393792064226?text=Ciao,%20vorrei%20un%20preventivo%20gratuito'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={WA}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-5 right-4 sm:right-5 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20b859] text-white shadow-xl hover:shadow-2xl hover:shadow-green-500/30 rounded-full transition-all duration-300 hover:-translate-y-1"
      style={{
        paddingLeft: hovered ? '1.1rem' : '0.8rem',
        paddingRight: '0.8rem',
        paddingTop: '0.8rem',
        paddingBottom: '0.8rem',
      }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] pulse-ring pointer-events-none" />

      <MessageCircle className="w-6 h-6 shrink-0 relative z-10" />

      <span className={`text-sm font-bold whitespace-nowrap overflow-hidden transition-all duration-300 relative z-10 ${
        hovered ? 'max-w-[180px] opacity-100 pr-1' : 'max-w-0 opacity-0'
      }`}>
        Scrivici su WhatsApp
      </span>
    </a>
  )
}
