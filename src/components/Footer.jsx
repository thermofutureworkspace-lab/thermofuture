import { Link } from 'react-router-dom'
import { Phone, MapPin, Mail } from 'lucide-react'

const WA = 'https://wa.me/393292197867'

const services = [
  'Impianti Termoidraulici',
  'Impianti a Pavimento Riscaldato',
  'Impianti Fotovoltaici',
  'Pannelli Solari Acqua',
  'Climatizzatori e Pompe di Calore',
]

export default function Footer() {
  return (
    <footer className="bg-stone-950">

      {/* Top */}
      <div className="section-padding max-w-7xl mx-auto py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-5">
            <img src="/assets/logo.png" alt="ThermoFuture" className="h-10 w-auto" />
            <div className="leading-tight">
              <div className="text-base font-bold text-white">Thermo<span className="text-orange-700">Future</span></div>
              <div className="text-[10px] text-stone-500">Impianti Energetici</div>
            </div>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed mb-5">
            Impianti fotovoltaici, termoidraulici, climatizzatori e pannelli solari.
            Professionisti al tuo servizio dal 2009.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b859] text-white text-xs font-bold px-4 py-2.5 rounded-sm transition-colors">
            💬 WhatsApp — Preventivo gratuito
          </a>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Servizi</h4>
          <ul className="space-y-2.5">
            {services.map(s => (
              <li key={s}>
                <a href={`${WA}?text=Ciao,%20vorrei%20informazioni%20su%20${encodeURIComponent(s)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm text-stone-400 hover:text-white transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Link utili</h4>
          <ul className="space-y-2.5">
            <li><a href="/#services" className="text-sm text-stone-400 hover:text-white transition-colors">I nostri servizi</a></li>
            <li><a href="/#projects" className="text-sm text-stone-400 hover:text-white transition-colors">Progetti realizzati</a></li>
            <li><a href="/#about" className="text-sm text-stone-400 hover:text-white transition-colors">Chi siamo</a></li>
            <li><a href="/#contacts" className="text-sm text-stone-400 hover:text-white transition-colors">Contatti</a></li>
            <li>
              <a href="https://ebay.us/m/bzefRF" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[#e53238] hover:text-red-400 transition-colors font-medium">
                🛒 Ricambi su eBay
              </a>
            </li>
            <li><Link to="/privacy-policy" className="text-sm text-stone-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/cookie-policy" className="text-sm text-stone-400 hover:text-white transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Contatti</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-orange-700 mt-0.5 shrink-0" />
              <span className="text-sm text-stone-400">Viale Contrada Santa Reparata</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-orange-700 shrink-0" />
              <a href="tel:+393292197867" className="text-sm text-stone-400 hover:text-white transition-colors">329 219 7867 (Ufficio)</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-orange-700 shrink-0" />
              <a href="tel:+390823657232" className="text-sm text-stone-400 hover:text-white transition-colors">0823 657232 (Ufficio)</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-stone-800 py-5">
        <div className="section-padding max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <span>© 2026 ThermoFuture</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-stone-400 transition-colors">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-stone-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
