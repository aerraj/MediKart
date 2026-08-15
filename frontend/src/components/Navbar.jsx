import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useCart } from './ContextReducer'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { logout as endSession } from '../lib/api'

export default function Navbar() {
  const cart = useCart()
  const navigate = useNavigate()
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isAuthenticated = Boolean(localStorage.getItem('user'))
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const closeMenu = () => setMenuOpen(false)
  const logout = async () => { closeMenu(); await endSession(); navigate('/') }

  return (
    <>
      <div className="trust-strip"><span>Free delivery above ₹499</span><span>Verified pharmacy partners</span><span>Help available 24×7</span></div>
      <header className="nav-wrap">
        <nav className="nav-container" aria-label="Primary navigation">
          <Link className="brand" to="/" aria-label="MediKart home">
            <span className="brand-mark">M</span>
            <span>MediKart<small>Care, made simple.</small></span>
          </Link>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="primary-nav-links">
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/products" onClick={closeMenu}>Shop</NavLink>
            <NavLink to="/category/medicines" onClick={closeMenu}>Medicines</NavLink>
            <NavLink to="/category/wellness" onClick={closeMenu}>Wellness</NavLink>
            <NavLink to="/support" onClick={closeMenu}>Care support</NavLink>
            <div className="mobile-auth-links" role="group" aria-label="Account actions">
              {isAuthenticated ? (
                <>
                  <span className="mobile-account-name">{user?.name || 'Your account'}</span>
                  <Link to="/myorder" onClick={closeMenu}>My orders</Link>
                  <button type="button" onClick={logout}>Sign out</button>
                </>
              ) : (
                <Link className="mobile-signin-link" to="/login" onClick={closeMenu}>
                  <UserRound size={18} /> Sign in
                </Link>
              )}
            </div>
          </div>
          <div className="nav-actions">
            <button className="icon-button desktop-only" aria-label="Search products" onClick={() => navigate('/products?focus=search')}><Search size={20} /></button>
            {isAuthenticated ? (
              <div className="account-menu">
                <button className="icon-button" aria-label="Account"><UserRound size={20} /></button>
                <div className="account-popover">
                  <strong>{user?.name || 'Your account'}</strong>
                  <Link to="/myorder">My orders</Link>
                  <button onClick={logout}>Sign out</button>
                </div>
              </div>
            ) : <Link className="login-link" to="/login">Sign in</Link>}
            <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cart.length} items`}>
              <ShoppingBag size={20} /><span className="cart-label">Cart</span>{cart.length > 0 && <b>{cart.length}</b>}
            </button>
            <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="primary-nav-links">{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </nav>
      </header>
      {cartOpen && <Modal onClose={() => setCartOpen(false)}><Cart /></Modal>}
    </>
  )
}
