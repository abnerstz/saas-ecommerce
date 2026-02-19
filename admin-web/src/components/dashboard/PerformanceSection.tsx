import { Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '@/components/ui'
import { 
  DollarSign, 
  Package, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Gauge
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MetricCard } from './MetricCard'
import { DashboardMetrics, Order, ConversionFunnelStep, SalesChannel, MonthlyGoal } from '../../utils/mockData'

interface PerformanceSectionProps {
  dashboardMetrics: DashboardMetrics
  orders: Order[]
  salesData: Array<{ month: string; sales: number; orders: number }>
  conversionFunnel: ConversionFunnelStep[]
  salesChannels: SalesChannel[]
  monthlyGoal: MonthlyGoal
}

export function PerformanceSection({ 
  dashboardMetrics, 
  orders, 
  salesData, 
  conversionFunnel, 
  salesChannels, 
  monthlyGoal 
}: PerformanceSectionProps) {
  return (
    <div className="space-y-6">
      
      {/* Métricas Diretas */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Métricas Estratégicas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Vendas Totais"
            value={dashboardMetrics.totalRevenue}
            previousValue={dashboardMetrics.previousRevenue}
            icon={DollarSign}
            format="currency"
          />
          
          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Pedidos Cancelados
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {orders.filter(p => p.status === 'cancelled').length}
              </div>
              <div className="flex items-center text-xs mt-1">
                <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                <span className="text-red-600">
                  +{Math.floor(Math.random() * 3)}
                </span>
                <span className="text-muted-foreground ml-1">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Pedidos Entregues
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {orders.filter(p => p.status === 'delivered').length}
              </div>
              <div className="flex items-center text-xs mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-600">
                  +{Math.floor(Math.random() * 5) + 1}
                </span>
                <span className="text-muted-foreground ml-1">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Análises Avançadas */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Análises de Crescimento</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Vendas vs Meta */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-base">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Vendas vs Meta Mensal
                </CardTitle>
                <Badge 
                  variant={monthlyGoal.progress >= 100 ? 'default' : monthlyGoal.progress >= 80 ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {monthlyGoal.progress >= 100 ? 'Meta Atingida' : monthlyGoal.progress >= 80 ? 'Próximo da Meta' : 'Abaixo da Meta'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'vendas' ? `R$ ${Number(value).toLocaleString('pt-BR')}` : value,
                      name === 'vendas' ? 'Vendas' : 'Meta'
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="vendas" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="meta" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#10b981' }}
                    data={salesData.map(d => ({ ...d, meta: 66667 }))}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Funil de Conversão */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Funil de Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnel.map((etapa) => (
                  <div key={etapa.stage}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-foreground">{etapa.stage}</span>
                      <span className="text-muted-foreground">{etapa.conversionRate}%</span>
                    </div>
                    <Progress 
                      value={etapa.conversionRate} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {etapa.value.toLocaleString('pt-BR')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Canais de Vendas */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Performance por Canal</h4>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Gauge className="w-4 h-4 mr-2" />
              Distribuição de Receita por Canal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {salesChannels.map((canal) => (
                <div key={canal.name} className="text-center">
                  <div className="mb-2">
                    <span className="text-2xl font-bold" style={{ color: canal.color }}>{canal.percentage}%</span>
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">{canal.name}</div>
                  <div className="text-xs text-muted-foreground">
                    R$ {canal.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <Progress 
                    value={canal.percentage} 
                    className="h-2 mt-2"
                    style={{ 
                      '--progress-foreground': canal.color,
                    } as React.CSSProperties}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
