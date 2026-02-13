import { Card, CardContent, CardHeader, CardTitle, Badge } from '@ecommerce/ui'
import { AlertTriangle, Activity, Users } from 'lucide-react'
import { RecentActivity, CustomerAnalysis, Product, Order } from '../../utils/mockData'

interface CriticalAlert {
  id: string
  type: string
  title: string
  description: string
  priority: string
  date: Date
}

interface MonitoringSectionProps {
  criticalAlerts: CriticalAlert[]
  recentActivity: RecentActivity[]
  customerAnalysis: CustomerAnalysis
  topProducts: Product[]
  recentOrders: Order[]
}

export function MonitoringSection({ 
  criticalAlerts, 
  recentActivity, 
  customerAnalysis, 
  topProducts, 
  recentOrders 
}: MonitoringSectionProps) {
  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Central de Alertas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600 text-base">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Central de Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalAlerts.map(alert => (
                <div key={alert.id} className="p-3 border rounded-lg bg-red-50 border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-red-800">{alert.title}</span>
                    <Badge 
                      variant={alert.priority === 'alta' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-red-700">{alert.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividade Recente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Activity className="w-4 h-4 mr-2" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-1 ${
                    activity.type === 'sales' ? 'bg-green-500' :
                    activity.type === 'inventory' ? 'bg-red-500' :
                    activity.type === 'customer' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Análise de Clientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Users className="w-4 h-4 mr-2" />
              Análise de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ativos (30 dias)</span>
                <span className="font-bold text-lg">{customerAnalysis.activeLast30d}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Novos Clientes</span>
                <Badge className="bg-green-100 text-green-800 text-sm">
                  +{customerAnalysis.newCustomers}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Recorrentes</span>
                <span className="font-medium">{customerAnalysis.returningCustomers}</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total de Clientes</span>
                  <span className="font-bold text-lg">{customerAnalysis.activeLast30d + customerAnalysis.newCustomers}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Produtos e Pedidos Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Produtos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">🏆 Top Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-foreground">{product.sales30d} vendas</p>
                    <p className="text-xs text-muted-foreground">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pedidos Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">📦 Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map(order => (
                <div key={order.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-sm text-foreground">{order.orderNumber}</span>
                    <Badge 
                      variant={
                        order.status === 'delivered' ? 'default' :
                        order.status === 'shipped' ? 'secondary' :
                        'outline'
                      }
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{order.customerName}</p>
                  <p className="font-medium text-sm text-foreground">
                    R$ {order.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
