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
  ChevronDown,
  X,
  BarChart3
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui'
import { useIsDesktop } from '../../hooks/useMediaQuery'

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
    { name: 'Equipe', href: '/settings/equipe', icon: Users }
  ]
}

interface ResponsiveSidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed?: boolean
}

export default function ResponsiveSidebar({
  isOpen,
  onClose,
  isCollapsed = false
}: ResponsiveSidebarProps) {
  const isDesktop = useIsDesktop()
  const [productsMenuOpen, setProductsMenuOpen] = useState(false)
  const [ordersMenuOpen, setOrdersMenuOpen] = useState(false)
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)

  const navLinkClass =
    'flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  const navSubLinkClass =
    'flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  const navButtonClass =
    'flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900'

  const handleNavClick = () => {
    if (!isDesktop) onClose()
  }

  return (
    <>
      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
          aria-hidden
        />
      )}

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200',
          'transition-[transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <Store className="w-7 h-7 text-primary" />
              <span className="ml-3 text-base font-medium text-gray-900 tracking-tight">
                Painel Loja
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <Link to={menuHome.href} onClick={handleNavClick} className={navLinkClass}>
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
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={handleNavClick}
                      className={navSubLinkClass}
                    >
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
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={handleNavClick}
                      className={navSubLinkClass}
                    >
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
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={handleNavClick}
                      className={navSubLinkClass}
                    >
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
    </>
  )
}
