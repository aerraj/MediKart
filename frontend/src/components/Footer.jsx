import { ArrowRight, Globe2, HeartPulse, MessageCircle, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="newsletter">
        <div><span className="eyebrow">The better-health letter</span><h2>Useful care. Zero clutter.</h2><p>Practical wellness notes, considered products, and no miracle claims.</p></div>
        <form><input type="email" aria-label="Email address" placeholder="you@example.com" /><button aria-label="Subscribe"><ArrowRight /></button></form>
      </div>
      <div className="footer-grid">
        <div><Link className="brand brand-light" to="/"><span className="brand-mark">M</span><span>MediKart<small>Care, made simple.</small></span></Link><p>A more human way to shop for everyday health, with clear information and dependable support.</p></div>
        <div><h4>Explore</h4><Link to="/products">All products</Link><Link to="/category/medicine">Medicines</Link><Link to="/category/wellness">Wellness</Link><Link to="/myorder">My orders</Link></div>
        <div><h4>Help</h4><Link to="/support">Care support</Link><a href="mailto:medikart@gmail.com">Contact us</a><span>Delivery & returns</span><span>Privacy</span></div>
        <div><h4>Our promise</h4><p className="footer-promise"><ShieldCheck /> Verified partners</p><p className="footer-promise"><HeartPulse /> Responsible care</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} MediKart. Built with care in India.</span><div><Globe2 size={18} /><MessageCircle size={18} /></div></div>
    </footer>
  )
}
