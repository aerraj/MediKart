import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Layout from '../components/Layout'
import { useDispatchCart } from '../components/ContextReducer'
import { fetchCatalog } from '../lib/api'

export default function ProductDetails() {
  const { productId } = useParams(); const location = useLocation(); const dispatch = useDispatchCart()
  const [product, setProduct] = useState(location.state?.product || null); const [qty, setQty] = useState(1); const [size, setSize] = useState('')
  useEffect(() => { if (!product) fetchCatalog().then(({ products }) => setProduct(products.find((p) => String(p._id || p.id || p.name) === decodeURIComponent(productId)))); }, [product, productId])
  if (!product) return <Layout><div className="empty-state product-missing"><h2>Finding your product…</h2><Link to="/products">Back to the shelf</Link></div></Layout>
  const options = product.options?.[0] || { Standard: 0 }; const selected = size || Object.keys(options)[0]; const unitPrice = Number(options[selected]); const id = product._id || product.id || product.name
  const add = () => { dispatch({ type: 'ADD', id, name: product.name, image: product.img, price: unitPrice * qty, unitPrice, qty, size: selected }); toast.success('Added to your cart') }
  return <Layout className="product-page"><Toaster position="bottom-center" /><div className="product-detail"><Link className="back-link" to="/products"><ArrowLeft /> Back to all products</Link><div className="product-detail-grid"><div className="product-detail-image"><span><ShieldCheck /> Verified product</span><img src={product.img} alt={product.name} width="720" height="720" decoding="async" referrerPolicy="no-referrer" /></div><div className="product-info"><span className="eyebrow">{product.CategoryName || 'Everyday health'}</span><h1>{product.name}</h1><div className="detail-rating">★★★★★ <span>4.8 · 120+ verified purchases</span></div><p className="detail-description">A trusted everyday essential selected from verified pharmacy partners. Product information is presented clearly so you can make a confident choice.</p><div className="variant-group"><label>Choose pack size</label><div>{Object.keys(options).map((option) => <button className={selected === option ? 'active' : ''} key={option} onClick={() => setSize(option)}>{option}<small>₹{Number(options[option]).toFixed(2)}</small></button>)}</div></div><div className="detail-purchase"><div className="quantity"><button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity"><Minus /></button><span>{qty}</span><button onClick={() => setQty(qty + 1)} aria-label="Increase quantity"><Plus /></button></div><button className="primary-button" onClick={add}><ShoppingBag /> Add to cart · ₹{(unitPrice * qty).toFixed(2)}</button></div><div className="detail-promises"><p><Truck /><span><strong>Fast doorstep delivery</strong>Free above ₹499</span></p><p><ShieldCheck /><span><strong>Quality checked</strong>From verified partners</span></p></div><div className="product-note"><Check /> Always follow the label and consult a qualified professional when needed.</div></div></div></div></Layout>
}
