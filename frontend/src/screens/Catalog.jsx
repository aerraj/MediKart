import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Card from '../components/Card'
import Layout from '../components/Layout'
import { fetchCatalog } from '../lib/api'

function normalizedCategory(value) {
  const normalized = String(value || '').trim().toLowerCase()
  return normalized === 'medicine' ? 'medicines' : normalized
}

function categoryPath(name) {
  return name === 'All' ? '/products' : `/category/${encodeURIComponent(name.toLowerCase())}`
}

export default function Catalog() {
  const { category } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const routeCategory = category ? decodeURIComponent(category) : 'All'
  const routeQuery = params.get('q') || ''
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [query, setQuery] = useState(routeQuery)
  const [sort, setSort] = useState('featured')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    fetchCatalog()
      .then((catalog) => {
        if (!active) return
        setProducts(catalog.products)
        setCategories(catalog.categories)
      })
      .catch(() => {
        if (active) setError('The catalog could not be loaded. Please try again in a moment.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  useEffect(() => { setQuery(routeQuery) }, [routeQuery])
  useEffect(() => { if (params.get('focus') === 'search') searchRef.current?.focus() }, [params])

  const categoryNames = useMemo(() => {
    const names = categories.map((item) => item.CategoryName).filter(Boolean)
    return ['All', ...new Set(names)]
  }, [categories])

  const visibleProducts = useMemo(() => {
    const selectedCategory = normalizedCategory(routeCategory)
    const search = query.trim().toLowerCase()
    const visible = products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || normalizedCategory(product.CategoryName) === selectedCategory
      const searchable = `${product.name} ${product.description || ''}`.toLowerCase()
      return matchesCategory && searchable.includes(search)
    })

    return visible.sort((a, b) => {
      const firstPrice = Number(Object.values(a.options?.[0] || { Standard: 0 })[0])
      const secondPrice = Number(Object.values(b.options?.[0] || { Standard: 0 })[0])
      if (sort === 'low') return firstPrice - secondPrice
      if (sort === 'high') return secondPrice - firstPrice
      return 0
    })
  }, [products, query, routeCategory, sort])

  const clearFilters = () => {
    setQuery('')
    navigate('/products')
  }

  return (
    <Layout className="catalog-page">
      <Toaster position="bottom-center" />
      <section className="catalog-hero">
        <span className="eyebrow">The MediKart shelf</span>
        <h1>Everyday care, clearly organised.</h1>
        <p>Browse trusted health and wellness essentials without the noise.</p>
        <div className="catalog-search">
          <Search />
          <input aria-label="Search products" ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the shelf" />
          {query && <button aria-label="Clear search" onClick={() => setQuery('')}><X size={18} /></button>}
        </div>
      </section>

      <section className="catalog-body">
        <aside aria-label="Product categories">
          <h3><SlidersHorizontal size={18} /> Categories</h3>
          {categoryNames.map((name) => {
            const isActive = normalizedCategory(routeCategory) === normalizedCategory(name)
            return <Link aria-current={isActive ? 'page' : undefined} className={isActive ? 'active' : ''} key={name} to={categoryPath(name)}>{name}</Link>
          })}
        </aside>

        <div className="catalog-results">
          <div className="catalog-toolbar">
            <p>{loading ? 'Loading products…' : <><strong>{visibleProducts.length}</strong> products {routeCategory !== 'All' && `in ${routeCategory}`}</>}</p>
            <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>

          {loading ? (
            <div className="product-grid" aria-label="Loading products">
              {Array.from({ length: 8 }, (_, index) => <div className="product-skeleton" key={index} />)}
            </div>
          ) : error ? (
            <div className="empty-state"><Search /><h2>Catalog unavailable</h2><p>{error}</p><button onClick={() => window.location.reload()}>Try again</button></div>
          ) : visibleProducts.length ? (
            <div className="product-grid">{visibleProducts.map((product) => <Card key={product._id || product.name} medItem={product} />)}</div>
          ) : (
            <div className="empty-state"><Search /><h2>No exact match</h2><p>Try a broader search or explore another category.</p><button onClick={clearFilters}>Clear filters</button></div>
          )}
        </div>
      </section>
    </Layout>
  )
}
