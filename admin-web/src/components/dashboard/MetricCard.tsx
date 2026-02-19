import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { TrendingUp, TrendingDown } from 'lucide-react'

import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: number
  previousValue: number
  icon: LucideIcon
  format?: 'currency' | 'number' | 'percentage'
}

export function MetricCard({ 
  title, 
  value, 
  previousValue, 
  icon: Icon, 
  format = 'currency' 
}: MetricCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      case 'percentage':
        return `${val.toFixed(1)}%`
      default:
        return val.toLocaleString('pt-BR')
    }
  }

  const percentChange = ((value - previousValue) / previousValue) * 100
  const isPositive = percentChange >= 0

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold text-foreground tabular-nums">
          {formatValue(value)}
        </div>
        <div className="flex items-center text-xs mt-1">
          {isPositive ? (
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
          )}
          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
            {isPositive ? '+' : ''}{percentChange.toFixed(1)}%
          </span>
          <span className="text-muted-foreground ml-1">vs mês anterior</span>
        </div>
      </CardContent>
    </Card>
  )
}
