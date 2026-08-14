import PropTypes from 'prop-types'
import { ArrowUpRight, Plus, ShieldCheck, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatchCart } from './ContextReducer'

export default function Card({ medItem }) {
  const dispatch = useDispatchCart()
  const options = medItem.options?.[0] || { Standard: 0 }
  const size = Object.keys(options)[0]
  const price = Number(options[size])
  const id = medItem._id || medItem.id || medItem.name

  const add = () => {
    dispatch({ type: 'ADD', id, name: medItem.name, image: medItem.img, price, unitPrice: price, qty: 1, size })
    toast.success(`${medItem.name} added to your cart`)
  }

  return (
    <article className="product-card">
      <Link className="product-image" to={`/products/${encodeURIComponent(id)}`} state={{ product: medItem }}>
        <span className="product-chip"><ShieldCheck size={13} /> Verified</span>
        <img src={medItem.img} alt={medItem.name} loading="lazy" />
        <span className="open-product"><ArrowUpRight size={18} /></span>
      </Link>
      <div className="product-meta">
        <p>{medItem.CategoryName || 'Everyday health'}</p>
        <h3><Link to={`/products/${encodeURIComponent(id)}`} state={{ product: medItem }}>{medItem.name}</Link></h3>
        <div className="product-rating"><Star size={14} fill="currentColor" /> 4.8 <span>• 120+ bought</span></div>
        <div className="product-buy"><div><strong>₹{price.toFixed(2)}</strong><small>{size}</small></div><button onClick={add} aria-label={`Add ${medItem.name} to cart`}><Plus size={19} /></button></div>
      </div>
    </article>
  )
}

Card.propTypes = { medItem: PropTypes.object.isRequired }
