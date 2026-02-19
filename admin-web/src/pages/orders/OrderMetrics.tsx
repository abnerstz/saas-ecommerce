import { Helmet } from 'react-helmet-async'
import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { TrendingUp, Globe, Package } from 'lucide-react'
import {
  orders as ordersData,
  orderStatuses,
  salesData,
  salesChannels
} from '../../utils/mockData'
import { Order } from '../../utils/mockData'
import { OrderPipeline } from '../../components/orders/OrderPipeline'
import { OrderStats } from '../../components/orders/OrderStats'

const PERIOD_OPTIONS = [
  { value: '7d', label: 'Últimos 7 dias' },
  { value: '30d', label: 'Últimos 30 dias' },
  { value: '3m', label: 'Últimos 3 meses' },
  { value: '12m', label: 'Últimos 12 meses' }
] as const

type PeriodKey = (typeof PERIOD_OPTIONS)[number]['value']

function getPeriodStart(period: PeriodKey): Date {
  const now = new Date()
  const d = new Date(now)
  if (period === '7d') d.setDate(d.getDate() - 7)
  else if (period === '30d') d.setDate(d.getDate() - 30)
  else if (period === '3m') d.setMonth(d.getMonth() - 3)
  else d.setFullYear(d.getFullYear() - 1)
  return d
}

function filterOrdersByPeriod(orders: Order[], period: PeriodKey): Order[] {
  const start = getPeriodStart(period)
  return orders.filter((o) => new Date(o.date) >= start)
}

function sliceSalesDataByPeriod(period: PeriodKey): { month: string; sales: number; orders: number }[] {
  const n = period === '12m' ? 12 : period === '3m' ? 3 : 1
  return salesData.slice(-n)
}

function buildOrdersStats(orders: Order[]) {
  const ordersWithProcessingTime = orders.filter(
    (p) => p.processingTime && p.processingTime > 0
  )
  return {
    total: orders.length,
    totalAmount: orders.reduce((sum, p) => sum + p.amount, 0),
    averageProcessingTimeHours:
      ordersWithProcessingTime.length > 0
        ? ordersWithProcessingTime.reduce((sum, p) => sum + (p.processingTime ?? 0), 0) /
          ordersWithProcessingTime.length
        : 0,
    ordersToday: orders.filter(
      (p) => p.date.toDateString() === new Date().toDateString()
    ).length
  }
}

function buildTopProductsFromOrders(orders: Order[]) {
  const countByProduct: Record<string, { name: string; quantity: number; revenue: number }> = {}
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const key = item.productId
      if (!countByProduct[key]) {
        countByProduct[key] = { name: item.productName, quantity: 0, revenue: 0 }
      }
      countByProduct[key].quantity += item.quantity
      countByProduct[key].revenue += item.totalPrice
    })
  })
  return Object.entries(countByProduct)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 8)
}

export default function OrderMetrics() {
  const [period, setPeriod] = useState<PeriodKey>('12m')

  const filteredOrders = useMemo(
    () => filterOrdersByPeriod(ordersData, period),
    [period]
  )
  const chartData = useMemo(() => sliceSalesDataByPeriod(period), [period])
  const stats = useMemo(() => buildOrdersStats(filteredOrders), [filteredOrders])
  const topProducts = useMemo(
    () => buildTopProductsFromOrders(filteredOrders),
    [filteredOrders]
  )

  return (
    <>
      <Helmet>
        <title>Métricas e vendas - Pedidos</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
              Métricas e vendas
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Análise de vendas, pedidos e produtos mais vendidos
            </p>
          </div>
          <Select value={period} onValueChange={(v) => setPeriod(v as PeriodKey)}>
            <SelectTrigger className="w-[180px] h-9 text-sm font-normal">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <section>
          <h2 className="text-xs font-normal text-muted-foreground mb-3 uppercase tracking-wide">
            Resumo por status
          </h2>
          <OrderPipeline orders={filteredOrders} orderStatuses={orderStatuses} />
        </section>

        <section>
          <h2 className="text-xs font-normal text-muted-foreground mb-3 uppercase tracking-wide">
            Números gerais
          </h2>
          <OrderStats stats={stats} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-4 h-4 shrink-0" />
                Vendas no período
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(value: number | undefined) =>
                      value != null
                        ? [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Vendas']
                        : null
                    }
                    labelFormatter={(label) => label}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 3 }}
                    name="Vendas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground">Pedidos no período</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value: number | undefined) =>
                      value != null ? [value, 'Pedidos'] : null
                    }
                    labelFormatter={(label) => label}
                  />
                  <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} name="Pedidos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <Globe className="w-4 h-4 shrink-0" />
                Vendas por canal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={salesChannels}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {salesChannels.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number | undefined) =>
                      value != null
                        ? [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Valor']
                        : null
                    }
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <Package className="w-4 h-4 shrink-0" />
                Produtos mais vendidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {topProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum pedido com itens no período.</p>
              ) : (
                <div className="space-y-0 max-h-[240px] overflow-y-auto">
                  {topProducts.map((p, i) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between py-2.5 border-b border-border/60 last:border-0"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs text-muted-foreground w-6 tabular-nums">
                          {i + 1}°
                        </span>
                        <span className="text-sm truncate">{p.name}</span>
                      </div>
                      <div className="text-right flex-shrink-0 text-sm text-muted-foreground">
                        <span className="tabular-nums">{p.quantity} un.</span>
                        <span className="ml-2 text-foreground">
                          R$ {p.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  )
}
