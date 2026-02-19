import { Bell, Search } from 'lucide-react'
import { Input, Button, Avatar, AvatarFallback, Badge } from '@/components/ui'

export default function DesktopHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center">
            3
          </Badge>
        </Button>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900">Admin</p>
            <p className="text-xs text-gray-500">admin@empresa.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}
