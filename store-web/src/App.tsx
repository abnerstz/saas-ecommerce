import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import ProductDetail from './pages/products/ProductDetail'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import Account from './pages/account/Account'

function App() {
  return (
    <>
      <Helmet>
        <title>Loja - SaaS Ecommerce</title>
        <meta name="description" content="Sua loja online favorita com os melhores produtos" />
      </Helmet>
      
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/conta" element={<Account />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
