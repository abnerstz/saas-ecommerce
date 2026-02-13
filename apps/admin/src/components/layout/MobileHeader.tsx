import { Bell, Search, Menu, X } from 'lucide-react'
import { Input, Button, Avatar, AvatarFallback, Badge } from '@ecommerce/ui'

interface MobileHeaderProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function MobileHeader({ isSidebarOpen, onToggleSidebar }: MobileHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      {/* Mobile menu button */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
        
        {/* Logo for mobile when sidebar is closed */}
        <div className="lg:hidden ml-2 flex items-center">
          <span className="text-lg font-semibold text-gray-900">Admin</span>
        </div>
      </div>

      {/* Search - hidden on mobile, shown on tablet+ */}
      <div className="hidden sm:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-10 w-full h-9"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        {/* Search button for mobile */}
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Search className="w-5 h-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center">
            3
          </Badge>
        </Button>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">A</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">Admin</p>
            <p className="text-xs text-gray-500">admin@empresa.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}
