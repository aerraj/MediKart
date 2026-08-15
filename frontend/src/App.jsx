import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { CartProvider } from './components/ContextReducer'
import Home from './screens/Home'

const Catalog = lazy(() => import('./screens/Catalog'))
const ProductDetails = lazy(() => import('./screens/ProductDetails'))
const Login = lazy(() => import('./screens/Login'))
const Signup = lazy(() => import('./screens/Signup'))
const MyOrder = lazy(() => import('./screens/MyOrder'))
const Support = lazy(() => import('./screens/Support'))

function PageLoader() {
  return <div className="page-loader" role="status"><span /><p>Preparing your care experience…</p></div>
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  )
}
