import { Link } from 'react-router-dom'
import { cn } from '@/components/ui'
import {
  LayoutDashboard,
  Package,
  List,
  FolderTree,
  ShoppingCart,
  Settings,
  Store,
  Users,
  Server,
  ChevronDown,
  BarChart3
} from 'lucide-react'
import { useState } from 'react'

const menuHome = { name: 'Início', href: '/dashboard', icon: LayoutDashboard }

const menuProducts = {
  name: 'Produtos',
  icon: Package,
  items: [
    { name: 'Lista de produtos', href: '/products', icon: List },
    { name: 'Categorias', href: '/products/categorias', icon: FolderTree }
  ]
}

const menuOrders = {
  name: 'Pedidos',
  icon: ShoppingCart,
  items: [
    { name: 'Métricas e vendas', href: '/orders/metricas', icon: BarChart3 },
    { name: 'Lista de pedidos', href: '/orders', icon: List }
  ]
}

const menuSettings = {
  name: 'Configurações',
  icon: Settings,
  items: [
    { name: 'Loja', href: '/settings/loja', icon: Store },
    { name: 'Equipe', href: '/settings/equipe', icon: Users },
    { name: 'Sistema', href: '/settings/sistema', icon: Server }
  ]
}

export default function Sidebar() {
  const [productsMenuOpen, setProductsMenuOpen] = useState(false)
  const [ordersMenuOpen, setOrdersMenuOpen] = useState(false)
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)

const navLinkClass =
    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  const navSubLinkClass =
    'flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  const navButtonClass =
    'flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900'

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Store className="w-8 h-8 text-primary" />
          <span className="ml-3 text-xl font-semibold text-gray-900">
            Painel Loja
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link to={menuHome.href} className={navLinkClass}>
            <menuHome.icon className="w-5 h-5 mr-3" />
            {menuHome.name}
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setProductsMenuOpen(!productsMenuOpen)}
              className={navButtonClass}
            >
              <span className="flex items-center">
                <menuProducts.icon className="w-5 h-5 mr-3" />
                {menuProducts.name}
              </span>
              <ChevronDown
                className={cn('w-4 h-4 transition-transform', productsMenuOpen && 'rotate-180')}
              />
            </button>
            {productsMenuOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-2">
                {menuProducts.items.map((item) => (
                  <Link key={item.href} to={item.href} className={navSubLinkClass}>
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => setOrdersMenuOpen(!ordersMenuOpen)}
              className={navButtonClass}
            >
              <span className="flex items-center">
                <menuOrders.icon className="w-5 h-5 mr-3" />
                {menuOrders.name}
              </span>
              <ChevronDown
                className={cn('w-4 h-4 transition-transform', ordersMenuOpen && 'rotate-180')}
              />
            </button>
            {ordersMenuOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-2">
                {menuOrders.items.map((item) => (
                  <Link key={item.href} to={item.href} className={navSubLinkClass}>
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
              className={navButtonClass}
            >
              <span className="flex items-center">
                <menuSettings.icon className="w-5 h-5 mr-3" />
                {menuSettings.name}
              </span>
              <ChevronDown
                className={cn('w-4 h-4 transition-transform', settingsMenuOpen && 'rotate-180')}
              />
            </button>
            {settingsMenuOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-2">
                {menuSettings.items.map((item) => (
                  <Link key={item.href} to={item.href} className={navSubLinkClass}>
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}
