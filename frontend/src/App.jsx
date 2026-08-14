import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './components/ContextReducer'
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import MyOrder from './screens/MyOrder'
import Support from './screens/Support'
import Catalog from './screens/Catalog'
import ProductDetails from './screens/ProductDetails'

function AppRoutes() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/category/:category" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<Signup />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  return clientId ? (
    <GoogleOAuthProvider clientId={clientId}><AppRoutes /></GoogleOAuthProvider>
  ) : <AppRoutes />
}
