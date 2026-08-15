import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Card from '../components/Card'
import Layout from '../components/Layout'
import { fetchCatalog } from '../lib/api'

export default function Catalog() {
  const { category } = useParams()
  const [params] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [query, setQuery] = useState(params.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(category ? decodeURIComponent(category) : 'All')
  const [sort, setSort] = useState('featured')
  const searchRef = useRef(null)
  useEffect(() => { fetchCatalog().then(({ products, categories }) => { setProducts(products); setCategories(categories) }).catch(console.error) }, [])
  useEffect(() => { if (params.get('focus') === 'search') searchRef.current?.focus() }, [params])
  const filtered = useMemo(() => products.filter((p) => (activeCategory === 'All' || p.CategoryName.toLowerCase().includes(activeCategory.toLowerCase())) && p.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => { const pa = Number(Object.values(a.options?.[0] || { a: 0 })[0]); const pb = Number(Object.values(b.options?.[0] || { a: 0 })[0]); return sort === 'low' ? pa - pb : sort === 'high' ? pb - pa : 0 }), [products, activeCategory, query, sort])
  return <Layout className="catalog-page"><Toaster position="bottom-center" /><section className="catalog-hero"><span className="eyebrow">The MediKart shelf</span><h1>Everyday care, clearly organised.</h1><p>Browse trusted health and wellness essentials without the noise.</p><div className="catalog-search"><Search /><input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the shelf" />{query && <button onClick={() => setQuery('')}><X size={18} /></button>}</div></section><section className="catalog-body"><aside><h3><SlidersHorizontal size={18} /> Categories</h3>{['All', ...categories.map((c) => c.CategoryName)].map((name) => <button className={activeCategory === name ? 'active' : ''} key={name} onClick={() => setActiveCategory(name)}>{name}</button>)}</aside><div className="catalog-results"><div className="catalog-toolbar"><p><strong>{filtered.length}</strong> products {activeCategory !== 'All' && `in ${activeCategory}`}</p><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>{filtered.length ? <div className="product-grid">{filtered.map((product) => <Card key={product._id || product.name} medItem={product} />)}</div> : <div className="empty-state"><Search /><h2>No exact match</h2><p>Try a broader search or explore another category.</p><button onClick={() => { setQuery(''); setActiveCategory('All') }}>Clear filters</button></div>}</div></section></Layout>
}
