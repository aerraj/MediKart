export const API_URL = import.meta.env.VITE_API_URL || 'https://medi-kart.vercel.app/api'

const fallbackProducts = [
  { _id: 'daily-vitamins', name: 'Daily Multivitamin Essentials', CategoryName: 'Wellness', img: '/Hfd06.webp', options: [{ '30 tablets': 349 }] },
  { _id: 'everyday-care', name: 'Everyday Health Care Kit', CategoryName: 'Medicines', img: '/medbanner.webp', options: [{ '1 kit': 499 }] },
  { _id: 'personal-wellness', name: 'Personal Wellness Bundle', CategoryName: 'Personal care', img: '/ban1.webp', options: [{ 'Standard': 279 }] },
  { _id: 'first-aid', name: 'Home First Aid Essentials', CategoryName: 'First aid', img: '/comp1.webp', options: [{ '1 kit': 599 }] },
  { _id: 'immunity-care', name: 'Daily Immunity Support', CategoryName: 'Wellness', img: '/medban1.webp', options: [{ '60 tablets': 429 }] },
  { _id: 'family-care', name: 'Family Care Cabinet Pack', CategoryName: 'Medicines', img: '/m1.webp', options: [{ 'Value pack': 749 }] },
  { _id: 'skin-care', name: 'Sensitive Skin Care Set', CategoryName: 'Personal care', img: '/company_banner.webp', options: [{ '3 pieces': 389 }] },
  { _id: 'travel-kit', name: 'Compact Travel Health Kit', CategoryName: 'First aid', img: '/medbanner.webp', options: [{ '1 kit': 329 }] },
]
const fallbackCategories = ['Medicines', 'Wellness', 'Personal care', 'First aid'].map((CategoryName) => ({ _id: CategoryName, CategoryName }))

export async function fetchCatalog() {
  try {
    const response = await fetch(`${API_URL}/displayData`, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
    if (!response.ok) throw new Error('Unable to load the catalog')
    const [products = [], categories = []] = await response.json()
    return { products: products.length ? products : fallbackProducts, categories: categories.length ? categories : fallbackCategories }
  } catch {
    return { products: fallbackProducts, categories: fallbackCategories }
  }
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
