import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Send, Loader2 } from 'lucide-react'
import { getDb, isFirebaseConfigured } from '../lib/firebase'

const WA = 'https://wa.me/393292197867?text=Ciao,%20vorrei%20informazioni%20e%20un%20preventivo'

const initial = { firstName: '', lastName: '', phone: '', email: '', message: '' }

export default function LeadForm() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  if (!isFirebaseConfigured()) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 text-sm text-amber-900">
        Modulo online non configurato. Scrivici su{' '}
        <a href={WA} className="font-semibold underline" target="_blank" rel="noreferrer">
          WhatsApp
        </a>{' '}
        per un preventivo.
      </div>
    )
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const db = getDb()
    if (!db) {
      setError('Servizio temporaneamente non disponibile.')
      return
    }

    const firstName = form.firstName.trim()
    const lastName = form.lastName.trim()
    const phone = form.phone.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (!firstName || !lastName || !phone || !email) {
      setError('Compila nome, cognome, telefono e email.')
      return
    }

    setStatus('sending')
    try {
      await addDoc(collection(db, 'leads'), {
        firstName,
        lastName,
        phone,
        email,
        message: message || '',
        source: 'website',
        createdAt: serverTimestamp(),
      })
      setForm(initial)
      setStatus('ok')
    } catch (err) {
      console.error(err)
      setError('Invio non riuscito. Riprova tra poco o contattaci su WhatsApp.')
      setStatus('idle')
    }
  }

  return (
    <div className="bg-white border border-stone-200 rounded-sm p-6 sm:p-8 shadow-sm">
      <h3 className="font-display text-xl font-bold text-stone-900 mb-1">
        Richiedi informazioni e preventivo
      </h3>
      <p className="text-sm text-stone-500 mb-6">
        Compila il modulo: ti rispondiamo al più presto. I dati sono trattati come da privacy policy.
      </p>

      {status === 'ok' ? (
        <p className="text-sm font-medium text-green-800 bg-green-50 border border-green-200 rounded-sm px-4 py-3">
          Richiesta inviata correttamente. Ti contatteremo a breve.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-sm">
              <span className="text-stone-600 font-medium">Nome</span>
              <input
                required
                type="text"
                autoComplete="given-name"
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                className="mt-1.5 w-full rounded-sm border border-stone-200 px-3 py-2.5 text-stone-900 focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600"
              />
            </label>
            <label className="block text-sm">
              <span className="text-stone-600 font-medium">Cognome</span>
              <input
                required
                type="text"
                autoComplete="family-name"
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                className="mt-1.5 w-full rounded-sm border border-stone-200 px-3 py-2.5 text-stone-900 focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600"
              />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-sm">
              <span className="text-stone-600 font-medium">Telefono</span>
              <input
                required
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="mt-1.5 w-full rounded-sm border border-stone-200 px-3 py-2.5 text-stone-900 focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600"
              />
            </label>
            <label className="block text-sm">
              <span className="text-stone-600 font-medium">Email</span>
              <input
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="mt-1.5 w-full rounded-sm border border-stone-200 px-3 py-2.5 text-stone-900 focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600"
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="text-stone-600 font-medium">Messaggio (facoltativo)</span>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className="mt-1.5 w-full rounded-sm border border-stone-200 px-3 py-2.5 text-stone-900 focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600 resize-y min-h-[88px]"
            />
          </label>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:pointer-events-none"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Invio in corso…
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Invia richiesta
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
