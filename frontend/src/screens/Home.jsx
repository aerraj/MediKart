import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, BadgeCheck, HeartPulse, Search, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Card from '../components/Card'
import Layout from '../components/Layout'
import { fetchCatalog } from '../lib/api'

const categoryArt = [
  { icon: 'Rx', tone: 'mint', copy: 'Everyday prescriptions' },
  { icon: 'V+', tone: 'sun', copy: 'Vitamins & nutrition' },
  { icon: '✦', tone: 'lilac', copy: 'Personal wellness' },
  { icon: '♡', tone: 'rose', copy: 'First aid & care' },
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { fetchCatalog().then(({ products, categories }) => { setProducts(products); setCategories(categories) }).catch(console.error).finally(() => setLoading(false)) }, [])
  const featured = useMemo(() => products.slice(0, 4), [products])
  const submitSearch = (event) => { event.preventDefault(); navigate(`/products?q=${encodeURIComponent(query)}`) }

  return (
    <Layout>
      <Toaster position="bottom-center" />
      <section className="hero">
        <div className="hero-orb one" /><div className="hero-orb two" />
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={15} /> Healthcare, thoughtfully delivered</span>
          <h1>Your health cabinet,<br /><em>beautifully simple.</em></h1>
          <p>Trusted essentials, clear product information, and dependable doorstep delivery—without the pharmacy aisle overwhelm.</p>
          <form className="hero-search" onSubmit={submitSearch}><Search /><input aria-label="Search products" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search medicines, wellness, personal care…" /><button>Find care <ArrowRight size={18} /></button></form>
          <div className="hero-proof"><span><ShieldCheck /> Genuine products</span><span><Truck /> Fast delivery</span><span><BadgeCheck /> Secure checkout</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-card hero-card-main"><span>Everyday wellness</span><img src="/medban1.webp" alt="A collection of healthcare essentials" width="720" height="720" /><div><strong>Care that fits real life.</strong><small>Curated for everyday routines</small></div></div>
          <div className="floating-note note-one"><HeartPulse /><span><strong>24×7</strong>Care support</span></div>
          <div className="floating-note note-two"><BadgeCheck /><span><strong>100%</strong>Verified products</span></div>
        </div>
      </section>

      <section className="section category-section">
        <div className="section-heading"><div><span className="eyebrow">Shop by need</span><h2>A calmer way to find care.</h2></div><Link to="/products">Explore everything <ArrowRight size={17} /></Link></div>
        <div className="category-grid">{(categories.length ? categories.slice(0, 4) : [{ CategoryName: 'Medicines' }, { CategoryName: 'Wellness' }, { CategoryName: 'Personal care' }, { CategoryName: 'First aid' }]).map((item, i) => <Link key={item._id || item.CategoryName} className={`category-card ${categoryArt[i].tone}`} to={`/category/${encodeURIComponent(item.CategoryName)}`}><span>{categoryArt[i].icon}</span><div><h3>{item.CategoryName}</h3><p>{categoryArt[i].copy}</p></div><ArrowRight /></Link>)}</div>
      </section>

      <section className="section product-section">
        <div className="section-heading"><div><span className="eyebrow">Community favourites</span><h2>Wellness, well chosen.</h2><p>Popular essentials from trusted brands and verified sellers.</p></div><Link to="/products">View the full shelf <ArrowRight size={17} /></Link></div>
        {loading ? <div className="product-grid">{Array.from({ length: 4 }, (_, i) => <div className="product-skeleton" key={i} />)}</div> : <div className="product-grid">{featured.map((product) => <Card key={product._id || product.name} medItem={product} />)}</div>}
      </section>

      <section className="care-banner"><div><span className="eyebrow">MediKart care</span><h2>Not sure what belongs in your routine?</h2><p>Our support team can help you navigate products and orders. For medical advice, we’ll always point you to a qualified professional.</p><Link to="/support">Talk to care support <ArrowRight /></Link></div><div className="care-illustration"><span>+</span><HeartPulse /></div></section>
    </Layout>
  )
}
