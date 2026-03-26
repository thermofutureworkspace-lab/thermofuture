import { MapPin, Phone, Clock, MessageCircle, Building2 } from 'lucide-react'

const WA = 'https://wa.me/393792064226?text=Ciao,%20vorrei%20un%20preventivo%20gratuito'

const contacts = [
  {
    icon: MapPin,
    label: 'Sede',
    value: 'Via L. Albenavolo\n81057 Teano (CE), Campania',
    href: 'https://maps.google.com/?q=Via+L.+Albenavolo,+81057+Teano+CE',
  },
  {
    icon: Phone,
    label: 'Cellulare',
    value: '379 206 4226',
    href: 'tel:+393792064226',
  },
  {
    icon: Building2,
    label: 'Ufficio',
    value: '329 219 7867',
    href: 'tel:+393292197867',
  },
  {
    icon: Phone,
    label: 'Ufficio 2',
    value: '0823 657232',
    href: 'tel:+390823657232',
  },
  {
    icon: Clock,
    label: 'Orari',
    value: 'Lun–Ven: 8:00–18:00\nSab: 8:00–13:00',
    href: null,
  },
]

export default function ContactSection() {
  return (
    <section id="contacts" className="py-20 sm:py-28 bg-stone-50 border-t border-stone-200">
      <div className="section-padding max-w-7xl mx-auto">

        <div className="mb-12">
          <div className="section-tag">
            <span className="w-6 h-px bg-orange-700" />
            Contattaci
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
            Siamo qui per aiutarti
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Info column */}
          <div className="flex flex-col gap-6">
            <p className="text-stone-600 leading-relaxed">
              Contattaci per un preventivo gratuito e senza impegno.
              Rispondiamo entro 24 ore, spesso in pochi minuti su WhatsApp.
            </p>

            {/* Contact cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contacts.map(item => {
                const Icon = item.icon
                const inner = (
                  <div className="flex items-start gap-3 bg-white border border-stone-200 rounded-sm p-4 hover:border-orange-700 transition-colors h-full">
                    <div className="w-8 h-8 rounded-sm bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-orange-700" />
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-sm font-semibold text-stone-800 whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                )
              })}
            </div>

            {/* WhatsApp CTA */}
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b859] text-white font-bold px-7 py-4 rounded-sm text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
              <MessageCircle className="w-5 h-5" />
              Scrivici su WhatsApp — Preventivo gratuito
            </a>

            {/* Company info */}
            <div className="text-xs text-stone-400 border-t border-stone-200 pt-4 leading-relaxed">
              <strong className="text-stone-600">Termoricambi</strong> · Via L. Albenavolo, 81057 Teano (CE)<br />
              P.IVA 04694560618 · Cell. 379 206 4226 · Ufficio 329 219 7867 · 0823 657232

            </div>
          </div>

          {/* Map */}
          <div className="flex flex-col gap-3">
            <div className="rounded-sm overflow-hidden border border-stone-200 shadow-sm" style={{ height: '420px' }}>
              <iframe
                title="ThermoFuture — Via L. Albenavolo, Teano CE"
                src="https://maps.google.com/maps?q=Via+L.+Albenavolo,+81057+Teano+CE,+Italy&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href="https://maps.google.com/?q=Via+L.+Albenavolo,+81057+Teano+CE"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary text-center text-sm w-full">
              Apri in Google Maps
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
