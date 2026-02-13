import { AlertTriangle } from 'lucide-react'

interface StockIndicatorProps {
  stock: number
  sales30d: number
}

export function EstoqueIndicator({ stock, sales30d }: StockIndicatorProps) {
  const getColor = () => {
    if (stock === 0) return 'text-red-600 bg-red-50'
    if (stock <= 10) return 'text-amber-600 bg-amber-50'
    return 'text-green-600 bg-green-50'
  }

  const getIcon = () => {
    if (stock === 0) return <AlertTriangle className="w-3 h-3" />
    if (stock <= 10) return <AlertTriangle className="w-3 h-3" />
    return null
  }

  return (
    <div className="flex items-center space-x-2">
      <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
        {getIcon()}
        <span className="ml-1">{stock} unidades</span>
      </span>
      {sales30d > 0 && (
        <span className="text-xs text-muted-foreground">
          {sales30d} vendas/30d
        </span>
      )}
    </div>
  )
}
