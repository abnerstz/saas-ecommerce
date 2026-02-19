import { Card, CardContent, CardHeader, CardTitle, Progress } from '@/components/ui'
import { Order } from '../../utils/mockData'
import { getOrderPipelineStatusConfig } from '../../utils/statusHelpers'

interface OrderPipelineProps {
  orders: Order[]
  orderStatuses: string[]
}

export function OrderPipeline({ orders, orderStatuses }: OrderPipelineProps) {
  const statusData = orderStatuses.map((status) => {
    const count = orders.filter((p) => p.status === status).length
    const percentage = orders.length > 0 ? (count / orders.length) * 100 : 0
    return { status, count, percentage }
  })

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {statusData.map(({ status, count, percentage }) => {
        const config = getOrderPipelineStatusConfig(status)
        const Icon = config.icon

        return (
          <Card key={status} className="hover:shadow-sm transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {config.label}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tabular-nums">{count}</div>
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
