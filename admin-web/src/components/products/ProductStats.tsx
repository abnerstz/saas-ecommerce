import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Package, AlertTriangle, DollarSign, Filter } from 'lucide-react'

interface ProductStatsProps {
  stats: {
    total: number
    activeCount: number
    lowStockCount: number
    outOfStockCount: number
    totalValue: number
  }
  filteredCount: number
}

export function ProductStats({ stats, filteredCount }: ProductStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Total de Produtos
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-foreground tabular-nums">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeCount} ativos
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Estoque Crítico
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-amber-600 tabular-nums">{stats.lowStockCount}</div>
          <p className="text-xs text-muted-foreground">
            Produtos abaixo de 10 unidades
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Sem Estoque
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-red-600 tabular-nums">{stats.outOfStockCount}</div>
          <p className="text-xs text-muted-foreground">
            Produtos indisponíveis
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Valor Total
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tabular-nums">
            R$ {stats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground">
            Valor em estoque
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Produtos Filtrados
          </CardTitle>
          <Filter className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold tabular-nums">{filteredCount}</div>
          <p className="text-xs text-muted-foreground">
            Resultados atuais
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
