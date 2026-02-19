import { Avatar, AvatarFallback } from '@/components/ui'

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-900">Administrador</p>
          <p className="text-xs text-gray-500">admin@empresa.com</p>
        </div>
      </div>
    </header>
  )
}
