import { Link, useLocation } from 'react-router-dom'
import { cn } from '@ecommerce/ui'
import { 
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Store,
  X
} from 'lucide-react'
import { Button } from '@ecommerce/ui'
import { useIsDesktop } from '../../hooks/useMediaQuery'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Produtos', href: '/products', icon: Package },
  { name: 'Pedidos', href: '/orders', icon: ShoppingCart },
  { name: 'Clientes', href: '/customers', icon: Users },
  { name: 'Configurações', href: '/settings', icon: Settings },
]

interface ResponsiveSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function ResponsiveSidebar({ isOpen, onClose }: ResponsiveSidebarProps) {
  const location = useLocation()
  const isDesktop = useIsDesktop()

  const handleNavClick = () => {
    // Close sidebar on mobile when navigation item is clicked
    if (!isDesktop) {
      onClose()
    }
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && !isDesktop && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out",
        "lg:translate-x-0 lg:transform-none",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <Store className="w-8 h-8 text-primary" />
              <span className="ml-3 text-xl font-semibold text-gray-900">
                Admin
              </span>
            </div>
            
            {/* Close button for mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">A</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">admin@empresa.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
