import { ArrowRight, Zap, Layers, Sun, Droplets, Wind } from 'lucide-react'

const WA_BASE = 'https://wa.me/393292197867?text=Ciao,%20vorrei%20informazioni%20su%20'

const categories = [
  {
    icon: Droplets,
    tag: 'TERMOIDRAULICA',
    title: 'Impianti Termoidraulici',
    description: 'Installazione e manutenzione di caldaie, riscaldamento, sanitari e tubazioni. Interventi rapidi e certificati a norma.',
    wa: WA_BASE + 'impianti%20termoidraulici',
    img: '/assets/proj-boiler.png',
  },
  {
    icon: Layers,
    tag: 'PAVIMENTO RISCALDATO',
    title: 'Impianti a Pavimento Riscaldato',
    description: 'Sistemi di riscaldamento radiante a pavimento per massima efficienza energetica e comfort termico in ogni ambiente.',
    wa: WA_BASE + 'impianti%20a%20pavimento%20riscaldato',
    img: '/assets/proj-floor.png',
  },
  {
    icon: Zap,
    tag: 'FOTOVOLTAICO',
    title: 'Impianti Fotovoltaici',
    description: 'Progettazione e installazione di impianti solari fotovoltaici per abitazioni e aziende. Risparmio immediato in bolletta.',
    wa: WA_BASE + 'impianti%20fotovoltaici',
    img: '/assets/proj-solar-2.png',
  },
  {
    icon: Sun,
    tag: 'SOLARE TERMICO',
    title: 'Pannelli Solari Acqua',
    description: 'Collettori solari termici per la produzione di acqua calda sanitaria. Zero costi energetici, massima efficienza.',
    wa: WA_BASE + 'pannelli%20solari%20acqua',
    img: '/assets/proj-solar-thermal.png',
  },
  {
    icon: Wind,
    tag: 'CLIMATIZZAZIONE',
    title: 'Climatizzatori e Pompe di Calore',
    description: 'Installazione e assistenza di climatizzatori e pompe di calore di ultima generazione per riscaldamento e raffrescamento.',
    wa: WA_BASE + 'climatizzatori%20e%20pompe%20di%20calore',
    img: '/assets/proj-aircon.png',
  },
]

export default function Solutions() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <div className="section-padding max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="section-tag">
            <span className="w-6 h-px bg-orange-700" />
            I nostri servizi
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Soluzioni per ogni esigenza
          </h2>
          <p className="mt-3 text-stone-500 text-base max-w-xl leading-relaxed">
            Clicca sulla categoria per ricevere informazioni e un preventivo gratuito su WhatsApp.
          </p>
        </div>

        {/* Row 1: 2 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {categories.slice(0, 2).map((c) => <ServiceCard key={c.tag} c={c} tall />)}
        </div>

        {/* Row 2: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.slice(2).map((c) => <ServiceCard key={c.tag} c={c} />)}
        </div>

      </div>
    </section>
  )
}

function ServiceCard({ c, tall }) {
  const Icon = c.icon
  return (
    <a href={c.wa} target="_blank" rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-sm block cursor-pointer">
      <div className={`relative overflow-hidden ${tall ? 'aspect-[16/9] sm:aspect-[3/2]' : 'aspect-[4/3]'}`}>
        <img src={c.img} alt={c.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/50 to-stone-900/10" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold text-orange-400 tracking-widest">{c.tag}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">{c.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4 max-h-0 overflow-hidden group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {c.description}
          </p>
          <div className="flex items-center gap-2 bg-orange-700 group-hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-sm w-fit transition-all duration-200 group-hover:shadow-lg group-hover:shadow-orange-700/25 group-hover:-translate-y-0.5">
            Informazioni e preventivo
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </a>
  )
}
