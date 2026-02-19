import { Link } from 'react-router-dom'
import { Store, Mail, Phone } from 'lucide-react'

const STORE_NAME = 'Loja de Bebidas'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{STORE_NAME}</span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link to="/products" className="hover:text-foreground transition-colors">
              Catálogo
            </Link>
            <Link to="/orders" className="hover:text-foreground transition-colors">
              Acompanhar pedido
            </Link>
          </nav>
        </div>
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} {STORE_NAME}. Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="mailto:contato@lojadebebidas.com.br" className="flex items-center gap-1.5 hover:text-foreground">
              <Mail className="w-3.5 h-3.5" />
              contato@lojadebebidas.com.br
            </a>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              (11) 3456-7890
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
