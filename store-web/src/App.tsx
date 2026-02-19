import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import ProductDetail from './pages/products/ProductDetail'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import OrderTracking from './pages/orders/OrderTracking'

function RedirectProductId() {
  const { id } = useParams<{ id: string }>()
  return <Navigate to={id ? `/product/${id}` : '/products'} replace />
}

function App() {
  return (
    <>
      <Helmet>
        <title>Loja de Bebidas</title>
        <meta name="description" content="Compre bebidas com praticidade. Retirada no balcão ou entrega." />
      </Helmet>

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/account" element={<Navigate to="/orders" replace />} />
          <Route path="/produtos" element={<Navigate to="/products" replace />} />
          <Route path="/produto/:id" element={<RedirectProductId />} />
          <Route path="/carrinho" element={<Navigate to="/cart" replace />} />
          <Route path="/pedidos" element={<Navigate to="/orders" replace />} />
          <Route path="/conta" element={<Navigate to="/orders" replace />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
