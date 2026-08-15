import { useEffect, useState } from 'react'
import { PackageCheck, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { API_URL } from '../lib/api'

export default function MyOrder() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function loadOrders() {
      try {
        const response = await fetch(`${API_URL}/myOrderData`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: localStorage.getItem('userEmail') }), signal: controller.signal })
        if (!response.ok) throw new Error('We could not load your orders.')
        const data = await response.json()
        setOrders(data?.orderData?.order_data?.slice().reverse() || [])
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      } finally { setLoading(false) }
    }
    loadOrders()
    return () => controller.abort()
  }, [])

  return <Layout className="orders-page"><section className="orders-shell"><span className="eyebrow"><PackageCheck /> Your MediKart account</span><h1>Order history</h1><p className="orders-intro">Track the essentials you have ordered and revisit previous purchases.</p>
    {loading ? <div className="page-loader" role="status"><span />Loading your orders…</div> : error ? <div className="order-empty"><ShoppingBag /><h2>Orders are unavailable</h2><p>{error}</p></div> : orders.length ? <div className="order-list">{orders.map((order, orderIndex) => <section className="order-group" key={orderIndex}>{order.map((item, itemIndex) => item.Order_date ? <h2 key={itemIndex}>{item.Order_date}</h2> : <article key={item._id || itemIndex}><div><span>{item.CategoryName || 'MediKart order'}</span><h3>{item.name}</h3><p>{item.qty} × {item.size}</p></div><strong>₹{Number(item.price || 0).toFixed(2)}</strong></article>)}</section>)}</div> : <div className="order-empty"><ShoppingBag /><h2>No orders yet</h2><p>Your completed purchases will appear here.</p><Link to="/products">Explore products</Link></div>}
  </section></Layout>
}
