import { Helmet } from 'react-helmet-async'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Badge,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui'
import { 
  DollarSign, 
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  Target,
  BarChart3,
  Filter,
  Package
} from 'lucide-react'
import { 
  dashboardMetrics,
  salesData,
  conversionFunnel,
  products,
  orders,
  salesChannels,
  inventoryStatus,
  deliveryPerformance,
  customerSatisfaction,
  financialSummary,
  recentActivity,
  customerAnalysis,
  monthlyGoal,
  pendingTasks,
  systemStatus
} from '../../utils/mockData'

// Create mock alerts for compatibility
const criticalAlerts = [
  {
    id: '1',
    type: 'low_stock',
    title: 'Low Stock',
    description: '3 products with stock below 10 units',
    priority: 'alta',
    date: new Date()
  },
  {
    id: '2', 
    type: 'pending_orders',
    title: 'Pending Orders',
    description: '15 orders awaiting confirmation for more than 24h',
    priority: 'média',
    date: new Date()
  }
]
import { useState } from 'react'
import { MetricCard } from '../../components/dashboard/MetricCard'
import { ControlPanel } from '../../components/dashboard/ControlPanel'
import { PerformanceSection } from '../../components/dashboard/PerformanceSection'
import { OperationsSection } from '../../components/dashboard/OperationsSection'
import { MonitoringSection } from '../../components/dashboard/MonitoringSection'



export default function Dashboard() {
  const [periodoVendas, setPeriodoVendas] = useState('12m')

  // Top products by sales (already using 'products' directly)
  // Recent orders (already using 'orders' directly)

  // Order counters by status
  const pedidosPorStatus = {
    novos: orders.filter(p => p.status === 'pending').length,
    processando: orders.filter(p => p.status === 'processing').length,
    enviados: orders.filter(p => p.status === 'shipped').length
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Central de comando estratégica da sua loja</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={periodoVendas} onValueChange={setPeriodoVendas}>
              <SelectTrigger className="w-[160px] h-8 text-xs">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d" className="text-xs">Últimos 7 dias</SelectItem>
                <SelectItem value="30d" className="text-xs">Últimos 30 dias</SelectItem>
                <SelectItem value="3m" className="text-xs">Últimos 3 meses</SelectItem>
                <SelectItem value="12m" className="text-xs">Últimos 12 meses</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              <Filter className="w-3 h-3 mr-1" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Dashboard com Seções Navegáveis */}
        <Accordion type="multiple" defaultValue={["visao-geral"]} className="w-full space-y-4">
          
          {/* 📊 VISÃO GERAL */}
          <AccordionItem value="visao-geral" className="border rounded-lg">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center">
                <div className="text-left">
                  <div className='flex gap-2 items-center'>
                    <BarChart3 className="w-5 h-5 mr-3 text-blue-600" />
                    <h3 className="text-lg font-semibold">Visão Geral</h3>   
                  </div>
                  <p className="text-sm text-muted-foreground">Métricas principais e controle rápido</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                
                <ControlPanel 
                  monthlyGoal={monthlyGoal}
                  pendingTasks={pendingTasks}
                  systemStatus={systemStatus}
                />

                {/* Métricas Principais */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Métricas Principais</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                      title="Receita Total"
                      value={dashboardMetrics.totalRevenue}
                      previousValue={dashboardMetrics.previousRevenue}
                      icon={DollarSign}
                      format="currency"
                    />
                    
                    <Card className="hover:shadow-sm transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Pedidos Ativos
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                          {pedidosPorStatus.novos + pedidosPorStatus.processando + pedidosPorStatus.enviados}
                        </div>
                        <div className="flex items-center text-xs mt-1 space-x-3">
                          <span className="flex items-center text-muted-foreground">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                            {pedidosPorStatus.novos} novos
                          </span>
                          <span className="flex items-center text-muted-foreground">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                            {pedidosPorStatus.processando} processando
                          </span>
                          <span className="flex items-center text-muted-foreground">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            {pedidosPorStatus.enviados} enviados
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <MetricCard
                      title="Taxa de Conversão"
                      value={dashboardMetrics.conversionRate}
                      previousValue={dashboardMetrics.previousConversionRate}
                      icon={Target}
                      format="percentage"
                    />

                    <MetricCard
                      title="Ticket Médio"
                      value={dashboardMetrics.averageOrderValue}
                      previousValue={dashboardMetrics.previousAverageOrderValue}
                      icon={CreditCard}
                      format="currency"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 📈 PERFORMANCE ESTRATÉGICA */}
          <AccordionItem value="performance" className="border rounded-lg">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center">
                <div className="text-left">
                  <div className='flex gap-2 items-center'>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold">Performance Estratégica</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Métricas avançadas e análises de crescimento</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <PerformanceSection 
                dashboardMetrics={dashboardMetrics}
                orders={orders}
                salesData={salesData}
                conversionFunnel={conversionFunnel}
                salesChannels={salesChannels}
                monthlyGoal={monthlyGoal}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 🏭 OPERAÇÕES */}
          <AccordionItem value="operacoes" className="border rounded-lg">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center">
                <div className="text-left">
                  <div className='flex gap-2 items-center'>
                    <Package className="w-5 h-5 text-orange-600" />
                    <h3 className="text-lg font-semibold">Operações</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Estoque, entrega, satisfação e financeiro</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <OperationsSection 
                estoqueStatus={{
                  outOfStock: inventoryStatus.outOfStock,
                  lowStock: inventoryStatus.lowStock,
                  wellStocked: inventoryStatus.wellStocked
                }}
                performanceEntrega={{
                  onTime: deliveryPerformance.onTime,
                  averageTime: deliveryPerformance.averageTime
                }}
                customerSatisfaction={customerSatisfaction}
                financialSummary={financialSummary}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 🔔 MONITORAMENTO */}
          <AccordionItem value="monitoramento" className="border rounded-lg">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center">
                <div className="text-left">
                  <div className='flex gap-2 items-center'>
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold">Monitoramento</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Alertas, atividade recente e análise de clientes</p>
                </div>
                <Badge variant="destructive" className="ml-auto text-xs">
                  {criticalAlerts.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <MonitoringSection 
                criticalAlerts={criticalAlerts}
                recentActivity={recentActivity}
                customerAnalysis={customerAnalysis}
                topProducts={products}
                recentOrders={orders}
              />
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </>
  )
}