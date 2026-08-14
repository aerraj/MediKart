import PropTypes from 'prop-types'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, className = '' }) {
  return (
    <div className="site-shell">
      <Navbar />
      <main className={className}>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = { children: PropTypes.node.isRequired, className: PropTypes.string }
