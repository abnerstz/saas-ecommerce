import { Routes, Route, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import Dashboard from './pages/dashboard/Dashboard'
import Products from './pages/products/Products'
import ProductCategories from './pages/products/ProductCategories'
import Orders from './pages/orders/Orders'
import OrderMetrics from './pages/orders/OrderMetrics'
import Settings from './pages/settings/Settings'

function App() {
  return (
    <>
      <Helmet>
        <title>Painel - Loja de Bebidas</title>
        <meta name="description" content="Painel para gestão de vendas e estoque da loja" />
      </Helmet>

      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/categorias" element={<ProductCategories />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/metricas" element={<OrderMetrics />} />
          <Route path="/settings" element={<Navigate to="/settings/loja" replace />} />
          <Route path="/settings/:tab" element={<Settings />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
