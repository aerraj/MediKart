import { ShieldCheck } from 'lucide-react'
import Layout from '../components/Layout'

export default function Privacy() {
  return (
    <Layout className="legal-page">
      <header className="legal-hero">
        <span className="eyebrow"><ShieldCheck /> Privacy at MediKart</span>
        <h1>Privacy Policy</h1>
        <p>Last updated: 15 August 2026. This policy explains what the MediKart online store collects, why we use it, and the choices available to you.</p>
      </header>

      <article className="legal-content">
        <section>
          <h2>1. Introduction</h2>
          <p>MediKart (“MediKart”, “we”, “us”) operates this online health-and-wellness store in India. By using MediKart, you acknowledge the practices described in this policy. This policy is a practical template for the current service and should be reviewed by qualified counsel before commercial use.</p>
        </section>

        <section>
          <h2>2. Information we collect</h2>
          <ul>
            <li><strong>Account information:</strong> your name and email address, plus a securely hashed password when you create a password account.</li>
            <li><strong>Google sign-in information:</strong> when you choose Google sign-in, we receive the basic profile details contained in the verified Google identity token, such as your name and email address.</li>
            <li><strong>Order and delivery information:</strong> your shipping address, contact number, selected products, and order history so we can fulfil and support purchases.</li>
            <li><strong>Payment information:</strong> Stripe processes card payments directly. MediKart does not store your full card number; we retain transaction references, totals, and payment status.</li>
            <li><strong>Usage and security information:</strong> basic technical information such as browser, device, requested pages, and security events used to operate and protect the service.</li>
          </ul>
        </section>

        <section>
          <h2>3. How we use your information</h2>
          <p>We use this information to create and manage your account, authenticate sessions, provide the cart and checkout, process and deliver orders, show order history, provide customer support, prevent fraud and abuse, improve reliability, and meet legal obligations. We do not sell your personal information.</p>
        </section>

        <section>
          <h2>4. Cookies and local storage</h2>
          <p>MediKart uses a secure <code>medikart_session</code> cookie to keep you signed in. It is unavailable to page scripts and normally expires after about seven days. The browser also stores limited account-display and cart-related information so the interface can work as expected. You can control cookies in your browser, but blocking them may prevent account and checkout features from working.</p>
        </section>

        <section>
          <h2>5. How we share information</h2>
          <p>We share information only when needed to operate the store. Relevant providers can include Stripe for payment processing, Google for identity sign-in and reCAPTCHA, MongoDB Atlas for database hosting, our website and API hosting providers, delivery partners, and support or analytics services that we enable. We may also disclose information when required by law or to protect users and the service.</p>
        </section>

        <section>
          <h2>6. Payment security</h2>
          <p>Card transactions are encrypted and handled through Stripe’s hosted payment experience. Sensitive card information goes directly to the payment processor and is not retained by MediKart. Cash-on-delivery orders retain only the information needed to fulfil and record the order.</p>
        </section>

        <section>
          <h2>7. Data retention</h2>
          <p>We keep account and order records while your account is active and for as long as needed to provide the service or meet legal, accounting, fraud-prevention, and reporting requirements. Retention periods can vary by record type. You may request account deletion using the contact details below.</p>
        </section>

        <section>
          <h2>8. Data security</h2>
          <p>We use measures including HTTPS, secure password hashing, signed session cookies, access controls, rate limiting, and server-side checkout validation. No transmission or storage method is completely secure, so we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2>9. Your rights and choices</h2>
          <p>Depending on where you live, you may have rights to access, correct, delete, or restrict the use of your personal information, or to object to certain processing. To make a request, email <a href="mailto:medikart@gmail.com">medikart@gmail.com</a>. We may need to verify your identity before completing it.</p>
        </section>

        <section>
          <h2>10. Children’s privacy</h2>
          <p>MediKart is not directed to children under 18, and we do not knowingly collect their personal information. If you believe a child has provided information to us, contact us so we can investigate and delete it where appropriate.</p>
        </section>

        <section>
          <h2>11. Health-related content disclaimer</h2>
          <p>Product information on MediKart is for general informational purposes and is not a substitute for professional medical advice, diagnosis, or treatment. Read labels carefully and consult a qualified healthcare professional before using medicines or supplements when appropriate.</p>
        </section>

        <section>
          <h2>12. Changes to this policy</h2>
          <p>We may update this policy as the service or legal requirements change. Material updates will be posted on this page with a revised “Last updated” date.</p>
        </section>

        <section>
          <h2>13. Contact us</h2>
          <p>Questions about this policy or your information can be sent to <a href="mailto:medikart@gmail.com">medikart@gmail.com</a>, or by post to MediKart, Plot No. FA7, Zone P1, GT Karnal Road, Delhi 110036, India.</p>
        </section>
      </article>
    </Layout>
  )
}
