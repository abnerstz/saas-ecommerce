import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, Avatar, AvatarFallback } from '@/components/ui'

interface DesktopHeaderProps {
  isSidebarCollapsed: boolean
  onToggleSidebarCollapsed: () => void
}

export default function DesktopHeader({
  isSidebarCollapsed,
  onToggleSidebarCollapsed
}: DesktopHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebarCollapsed}
        aria-label={isSidebarCollapsed ? 'Exibir menu' : 'Ocultar menu'}
        className="text-gray-500 hover:text-gray-900"
      >
        {isSidebarCollapsed ? (
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        ) : (
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
        )}
      </Button>
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-gray-900">Administrador</p>
          <p className="text-xs text-muted-foreground">admin@empresa.com</p>
        </div>
      </div>
    </header>
  )
}
