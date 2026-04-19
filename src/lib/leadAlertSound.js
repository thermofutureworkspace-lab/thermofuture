const STORAGE_KEY = 'tf-admin-sound'

export function isLeadSoundEnabled() {
  if (typeof window === 'undefined') return true
  return localStorage.getItem(STORAGE_KEY) !== '0'
}

export function setLeadSoundEnabled(on) {
  localStorage.setItem(STORAGE_KEY, on ? '1' : '0')
}

/** Due toni corti — gratis, solo Web Audio API (nessun server). */
export function playLeadAlertSound() {
  if (typeof window === 'undefined') return
  if (!isLeadSoundEnabled()) return
  try {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    const ctx = new AC()
    const gain = ctx.createGain()
    gain.connect(ctx.destination)
    gain.gain.value = 0.09

    function beep(freq, start, dur) {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq
      osc.connect(gain)
      osc.start(start)
      osc.stop(start + dur)
    }

    const now = ctx.currentTime
    beep(880, now, 0.12)
    beep(1174, now + 0.14, 0.14)

    ctx.resume?.().catch(() => {})
    setTimeout(() => ctx.close?.(), 600)
  } catch {
    /* autoplay bloccato finché non c’è interazione utente */
  }
}
