import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Layout from '../components/Layout'
import { useDispatchCart } from '../components/ContextReducer'
import { fetchCatalog } from '../lib/api'

function itemId(item) {
  return String(item?._id || item?.id || item?.name || '')
}

export default function ProductDetails() {
  const { productId } = useParams()
  const location = useLocation()
  const dispatch = useDispatchCart()
  const requestedId = decodeURIComponent(productId)
  const routeProduct = itemId(location.state?.product) === requestedId ? location.state.product : null
  const [product, setProduct] = useState(routeProduct)
  const [loading, setLoading] = useState(!routeProduct)
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('')

  useEffect(() => {
    let active = true
    const productFromRoute = itemId(location.state?.product) === requestedId ? location.state.product : null
    setQty(1)
    setSize('')

    if (productFromRoute) {
      setProduct(productFromRoute)
      setLoading(false)
      return () => { active = false }
    }

    setProduct(null)
    setLoading(true)
    fetchCatalog()
      .then(({ products }) => {
        if (active) setProduct(products.find((item) => itemId(item) === requestedId) || null)
      })
      .catch(() => {
        if (active) setProduct(null)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [location.state, requestedId])

  if (loading) return <Layout><div className="page-loader" role="status"><span />Finding your product…</div></Layout>
  if (!product) return <Layout><div className="empty-state product-missing"><h2>Product not found</h2><p>This product may have moved or is no longer available.</p><Link to="/products">Back to the shelf</Link></div></Layout>

  const options = product.options?.[0] || { Standard: 0 }
  const selected = size || Object.keys(options)[0]
  const unitPrice = Number(options[selected])
  const id = product._id || product.id || product.name
  const add = () => {
    dispatch({ type: 'ADD', id, name: product.name, image: product.img, price: unitPrice * qty, unitPrice, qty, size: selected })
    toast.success('Added to your cart')
  }

  return (
    <Layout className="product-page">
      <Toaster position="bottom-center" />
      <div className="product-detail">
        <Link className="back-link" to="/products"><ArrowLeft /> Back to all products</Link>
        <div className="product-detail-grid">
          <div className="product-detail-image">
            <span><ShieldCheck /> Verified product</span>
            <img src={product.img} alt={product.name} width="720" height="720" decoding="async" />
          </div>
          <div className="product-info">
            <span className="eyebrow">{product.CategoryName || 'Everyday health'}</span>
            <h1>{product.name}</h1>
            <div className="detail-rating">★★★★★ <span>4.8 · 120+ verified purchases</span></div>
            <p className="detail-description">{product.description || 'A trusted everyday essential selected from verified pharmacy partners. Product information is presented clearly so you can make a confident choice.'}</p>
            <div className="variant-group">
              <label>Choose pack size</label>
              <div>{Object.keys(options).map((option) => <button className={selected === option ? 'active' : ''} key={option} onClick={() => setSize(option)}>{option}<small>₹{Number(options[option]).toFixed(2)}</small></button>)}</div>
            </div>
            <div className="detail-purchase">
              <div className="quantity"><button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity"><Minus /></button><span>{qty}</span><button onClick={() => setQty(qty + 1)} aria-label="Increase quantity"><Plus /></button></div>
              <button className="primary-button" onClick={add}><ShoppingBag /> Add to cart · ₹{(unitPrice * qty).toFixed(2)}</button>
            </div>
            <div className="detail-promises">
              <p><Truck /><span><strong>Fast doorstep delivery</strong>Free above ₹499</span></p>
              <p><ShieldCheck /><span><strong>Quality checked</strong>From verified partners</span></p>
            </div>
            <div className="product-note"><Check /> Always follow the label and consult a qualified professional when needed.</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
