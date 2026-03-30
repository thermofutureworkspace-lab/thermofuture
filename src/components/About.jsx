import { ArrowRight, CheckCircle } from 'lucide-react'

const WA = 'https://wa.me/393292197867?text=Ciao,%20vorrei%20maggiori%20informazioni'

const points = [
  'Installatori certificati e qualificati',
  'Materiali e componenti di prima scelta',
  'Garanzia su tutti gli impianti installati',
  'Assistenza post-vendita rapida e puntuale',
  'Pratiche per incentivi e detrazioni fiscali',
]

export default function About() {
  return (
    <section id="about" className="bg-white border-t border-stone-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">

        {/* Photo */}
        <div className="relative min-h-[300px] lg:min-h-full order-2 lg:order-1">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85"
            alt="Team ThermoFuture"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Badge */}
          <div className="absolute bottom-6 right-6 bg-white shadow-xl rounded-sm p-4">
            <div className="text-2xl font-black text-stone-900">15+ anni</div>
            <div className="text-xs text-stone-500 mt-0.5">di esperienza nel settore</div>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2 flex items-center py-16 px-6 sm:px-10 lg:px-14">
          <div className="max-w-lg">
            <div className="section-tag">
              <span className="w-6 h-px bg-orange-700" />
              Chi siamo
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-5">
              Professionisti dell'energia <em>dal 1990</em>
            </h2>
            <div className="space-y-3 text-stone-500 leading-relaxed text-sm sm:text-base mb-7">
              <p>
                ThermoFuture nasce dall'esperienza di <strong className="text-stone-800">Termoricambi</strong>,
                azienda con sede a Teano (CE), specializzata nell'installazione e manutenzione
                di impianti energetici per abitazioni e aziende in tutta la Campania.
              </p>
              <p>
                Offriamo soluzioni complete: dal fotovoltaico al riscaldamento a pavimento,
                dai pannelli solari ai climatizzatori di ultima generazione.
              </p>
            </div>

            <ul className="space-y-2.5 mb-8">
              {points.map(p => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-stone-700">
                  <CheckCircle className="w-4 h-4 text-orange-700 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="btn-primary group">
              Contattaci ora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
