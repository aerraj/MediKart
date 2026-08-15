import { Clock3, Mail, MapPin, Phone } from 'lucide-react'
import Layout from '../components/Layout'

const mapUrl = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13983.721902328205!2d77.1294815896788!3d28.811145645414022!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b1923ada2e3%3A0x1169930518add2fe!2sNational%20Institute%20of%20Technology%20Delhi!5e0!3m2!1sen!2sin!4v1676659578362!5m2!1sen!2sin'

export default function Support() {
  return <Layout className="support-page">
    <section className="support-hero"><div><span className="eyebrow"><Clock3 /> Care support, 24×7</span><h1>Questions feel lighter<br />when help is close.</h1><p>We can help with products, accounts, payments, and order updates. For medical advice, please speak with a qualified healthcare professional.</p></div><img src="/supportimg.svg" alt="MediKart customer support" width="560" height="420" /></section>
    <section className="support-content"><div className="section-heading"><div><span className="eyebrow">Reach us</span><h2>Choose what works for you.</h2></div></div><div className="support-grid">
      <article><MapPin /><h2>Visit us</h2><p>MediKart Headquarters<br />Plot No. FA7, Zone P1,<br />GT Karnal Road, Delhi 110036</p><a href="https://www.google.com/maps/dir/?api=1&destination=National+Institute+of+Technology+Delhi" target="_blank" rel="noreferrer">Open directions</a></article>
      <article><Phone /><h2>Call us</h2><p>Our care team is available around the clock.</p><a href="tel:+9101133833867">+91 011 3383 3867</a><a href="tel:+910112342345">+91 011 2342 345</a></article>
      <article><Mail /><h2>Email us</h2><p>Send the order number and account email for faster support.</p><a href="mailto:medikart@gmail.com">medikart@gmail.com</a></article>
    </div><iframe title="MediKart headquarters map" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></section>
  </Layout>
}
