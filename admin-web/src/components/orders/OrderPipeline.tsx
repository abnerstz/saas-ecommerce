import { Card, CardContent, CardHeader, CardTitle, Progress } from '@/components/ui'
import { AlertCircle, CheckCircle, Package, Truck, XCircle } from 'lucide-react'
import { Order } from '../../utils/mockData'

interface OrderPipelineProps {
  orders: Order[]
  statusPedidos: string[]
}

export function OrderPipeline({ orders, statusPedidos }: OrderPipelineProps) {
  const statusData = statusPedidos.map(status => {
    const count = orders.filter(p => p.status === status).length
    const percentage = (count / orders.length) * 100
    
    return { status, count, percentage }
  })

  const getStatusConfig = (status: string) => {
    const configs = {
      pendente: { color: 'bg-orange-500', icon: AlertCircle, label: 'Pendente' },
      confirmado: { color: 'bg-blue-500', icon: CheckCircle, label: 'Confirmado' },
      processando: { color: 'bg-purple-500', icon: Package, label: 'Processando' },
      enviado: { color: 'bg-indigo-500', icon: Truck, label: 'Enviado' },
      entregue: { color: 'bg-green-500', icon: CheckCircle, label: 'Entregue' },
      cancelado: { color: 'bg-red-500', icon: XCircle, label: 'Cancelado' }
    }
    return configs[status as keyof typeof configs] || { color: 'bg-gray-500', icon: AlertCircle, label: status }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {statusData.map(({ status, count, percentage }) => {
        const config = getStatusConfig(status)
        const Icon = config.icon
        
        return (
          <Card key={status} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {config.label}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
              <div className="mt-2">
                <Progress value={percentage} className="h-2" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {percentage.toFixed(1)}% do total
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
