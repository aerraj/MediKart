import { useEffect, useState } from 'react'
import { PackageCheck, ShoppingBag } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { authorizedFetch } from '../lib/api'

export default function MyOrder() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()
    async function loadOrders() {
      try {
        const response = await authorizedFetch('/myOrderData', { method: 'GET', signal: controller.signal })
        if (response.status === 401) return navigate('/login', { replace: true })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'We could not load your orders.')
        setOrders(data.orders || [])
      } catch (requestError) { if (requestError.name !== 'AbortError') setError(requestError.message) }
      finally { setLoading(false) }
    }
    loadOrders()
    return () => controller.abort()
  }, [navigate])

  return <Layout className="orders-page"><section className="orders-shell"><span className="eyebrow"><PackageCheck /> Your MediKart account</span><h1>Order history</h1><p className="orders-intro">Track the essentials you have ordered and revisit previous purchases.</p>
    {loading ? <div className="page-loader" role="status"><span />Loading your orders…</div> : error ? <div className="order-empty"><ShoppingBag /><h2>Orders are unavailable</h2><p>{error}</p></div> : orders.length ? <div className="order-list">{orders.map((order) => <section className="order-group" key={order._id}><h2>{new Date(order.createdAt).toLocaleString('en-IN')} · {order.status}</h2>{order.items.map((item) => <article key={`${item.productId}-${item.size}`}><div><span>{order.paymentMethod === 'stripe' ? 'Paid online' : 'Cash on delivery'}</span><h3>{item.name}</h3><p>{item.quantity} × {item.size}</p></div><strong>₹{Number(item.lineTotal).toFixed(2)}</strong></article>)}<div className="order-total"><span>Order total</span><strong>₹{Number(order.total).toFixed(2)}</strong></div></section>)}</div> : <div className="order-empty"><ShoppingBag /><h2>No orders yet</h2><p>Your completed purchases will appear here.</p><Link to="/products">Explore products</Link></div>}
  </section></Layout>
}
