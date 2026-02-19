import { Menu, X } from 'lucide-react'
import { Button, Avatar, AvatarFallback } from '@/components/ui'

interface MobileHeaderProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function MobileHeader({ isSidebarOpen, onToggleSidebar }: MobileHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
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
      </div>

      <div className="flex items-center space-x-2">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="text-xs">A</AvatarFallback>
        </Avatar>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-900">Administrador</p>
          <p className="text-xs text-gray-500">admin@empresa.com</p>
        </div>
      </div>
    </header>
  )
}
