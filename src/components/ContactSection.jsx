import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'

const WA = 'https://wa.me/393792064226?text=Ciao,%20vorrei%20un%20preventivo%20gratuito'

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
          <div className="flex flex-col gap-8">
            <p className="text-stone-600 leading-relaxed">
              Contattaci per un preventivo gratuito e senza impegno.
              Rispondiamo entro 24 ore, spesso in pochi minuti su WhatsApp.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: MapPin,  label: 'Sede',     value: 'Via L. Albenavolo\n81057 Teano (CE), Campania', href: null },
                { icon: Phone,   label: 'Telefono', value: '379 206 4226',   href: 'tel:+393792064226' },
                { icon: Phone,   label: 'Termoricambi', value: '366 290 9732', href: 'tel:+393662909732' },
                { icon: Clock,   label: 'Orari',    value: 'Lun–Ven: 8:00–18:00\nSab: 8:00–13:00', href: null },
              ].map(item => {
                const Icon = item.icon
                const inner = (
                  <div className="flex items-start gap-4 bg-white border border-stone-200 rounded-sm p-5 hover:border-orange-700 transition-colors h-full">
                    <div className="w-9 h-9 rounded-sm bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-orange-700" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-400 uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-sm font-semibold text-stone-800 whitespace-pre-line">{item.value}</div>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} className="block">{inner}</a>
                ) : (
                  <div key={item.label}>{inner}</div>
                )
              })}
            </div>

            {/* WhatsApp CTA */}
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b859] text-white font-bold px-7 py-4 rounded-sm text-sm transition-colors">
              <MessageCircle className="w-5 h-5" />
              Scrivici su WhatsApp — Preventivo gratuito
            </a>

            {/* Company info */}
            <div className="text-xs text-stone-400 border-t border-stone-200 pt-5 leading-relaxed">
              <strong className="text-stone-600">Termoricambi</strong> · Via L. Albenavolo, 81057 Teano (CE)<br />
              P.IVA 04694560618 · Cell. 366 290 9732
            </div>
          </div>

          {/* Map */}
          <div className="flex flex-col gap-3">
            <div className="rounded-sm overflow-hidden border border-stone-200 shadow-sm" style={{ height: '420px' }}>
              <iframe
                title="ThermoFuture sede"
                src="https://maps.google.com/maps?q=Via+Luigi+Albenavolo,+Teano+CE,+Italy&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
              className="btn-primary text-center text-sm w-full group">
              Apri in Google Maps
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
