import { useEffect, useRef, useState } from 'react'

function easeOutQuad(t) {
  return t * (2 - t)
}

/**
 * Counts from 0 to target when the element intersects the viewport once.
 */
export function useCountUp(target, options = {}) {
  const { duration = 2200, decimals = 0 } = options
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || played.current) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return
        played.current = true

        const start = performance.now()
        const from = 0

        function frame(now) {
          const elapsed = now - start
          const t = Math.min(1, elapsed / duration)
          const eased = easeOutQuad(t)
          const current = from + (target - from) * eased
          const rounded =
            decimals > 0
              ? Math.round(current * 10 ** decimals) / 10 ** decimals
              : Math.round(current)
          setValue(rounded)
          if (t < 1) requestAnimationFrame(frame)
          else setValue(target)
        }
        requestAnimationFrame(frame)
      },
      { threshold: 0.25 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration, decimals])

  return [ref, value]
}
