export const API_URL = import.meta.env.VITE_API_URL || 'https://medi-kart.vercel.app/api'

let fallbackCatalogPromise

function loadFallbackCatalog() {
  if (!fallbackCatalogPromise) {
    fallbackCatalogPromise = fetch('/catalog.json', { cache: 'force-cache' }).then((response) => {
      if (!response.ok) throw new Error('Unable to load the local catalog')
      return response.json()
    })
  }
  return fallbackCatalogPromise
}

export async function fetchCatalog() {
  try {
    const response = await fetch(`${API_URL}/displayData`)
    if (!response.ok) throw new Error('Unable to load the catalog')
    const [products = [], categories = []] = await response.json()
    if (products.length && categories.length) return { products, categories }
  } catch {
    // The local catalog keeps browsing and cart-building usable during an API outage.
  }

  return loadFallbackCatalog()
}

export async function googleLogin(credential) {
  const response = await fetch(`${API_URL}/auth/google`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential }),
  })
  const data = await response.json()
  if (!response.ok || !data.success) throw new Error(data.error || 'Google sign-in failed')
  return data
}

export async function authorizedFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  if (response.status === 401) clearSession()
  return response
}

export function persistSession(data) {
  localStorage.setItem('userEmail', data.user.email)
  localStorage.setItem('user', JSON.stringify(data.user))
}

export function clearSession() {
  localStorage.removeItem('userEmail')
  localStorage.removeItem('user')
}

export async function logout() {
  try { await authorizedFetch('/logout', { method: 'POST' }) } finally { clearSession() }
}
