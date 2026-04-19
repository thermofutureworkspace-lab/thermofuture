/**
 * Banner partner Aircon — striscia scorrevole (marquee infinito).
 */
const REPEAT = 12

function Segment() {
  return (
    <div className="flex items-center gap-6 sm:gap-8 shrink-0 px-6 sm:px-10">
      <span className="text-[13px] sm:text-sm font-semibold tracking-[0.2em] uppercase text-sky-400 whitespace-nowrap">
        Partner ufficiale
      </span>
      <img
        src="/assets/aircon-partner-logo.png"
        alt=""
        className="h-9 sm:h-11 w-auto max-w-[min(220px,55vw)] object-contain object-left pointer-events-none"
      />
      <span className="hidden sm:inline text-xs text-neutral-500 max-w-[200px] leading-snug whitespace-nowrap">
        Climatizzatori e pompe di calore Aircon · Campania
      </span>
    </div>
  )
}

export default function AirconPartnerBanner() {
  const segments = (keyPrefix) =>
    Array.from({ length: REPEAT }, (_, i) => <Segment key={`${keyPrefix}-${i}`} />)

  return (
    <div className="relative bg-black border-y border-neutral-800 overflow-hidden py-3.5">
      <span className="sr-only">
        Partner ufficiale AIRCON — Professionisti del clima: installazione climatizzatori in Campania.
      </span>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Una sola riga: prima metà = seconda metà → loop seamless con translate -50% */}
      <div
        className="flex flex-nowrap w-max max-w-none animate-marquee will-change-transform motion-reduce:animate-none hover:[animation-play-state:paused]"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {segments('a')}
        <div className="contents" aria-hidden="true">
          {segments('b')}
        </div>
      </div>
    </div>
  )
}
