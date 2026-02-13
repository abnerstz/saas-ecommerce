import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import Dashboard from './pages/dashboard/Dashboard'
import Products from './pages/products/Products'
import Orders from './pages/orders/Orders'
import Customers from './pages/customers/Customers'
import Settings from './pages/settings/Settings'

function App() {
  return (
    <>
      <Helmet>
        <title>Admin - SaaS Ecommerce</title>
        <meta name="description" content="Painel administrativo para gerenciamento do ecommerce" />
      </Helmet>
      
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
