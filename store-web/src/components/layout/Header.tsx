import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Badge } from '@/components/ui'
import { Search, ShoppingCart, Store, Package, Menu, X } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'

const STORE_NAME = 'Loja de Bebidas'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const items = useCartStore((s) => s.items)
  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`)
      setSearch('')
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Store className="w-6 h-6 text-primary" />
            <span className="text-base font-medium text-foreground tracking-tight">
              {STORE_NAME}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/products"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Catálogo
            </Link>
            <Link
              to="/orders"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Package className="w-4 h-4" />
              Acompanhar pedido
            </Link>
          </nav>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm bg-muted/50 border-0"
              />
            </div>
          </form>

          <div className="flex items-center gap-1">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full flex items-center justify-center text-[10px] px-1"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 text-sm"
                />
              </div>
            </form>
            <nav className="flex flex-col gap-1">
              <Link
                to="/products"
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Catálogo
              </Link>
              <Link
                to="/orders"
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="w-4 h-4" />
                Acompanhar pedido
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
