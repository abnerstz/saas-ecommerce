import { CheckCircle } from 'lucide-react'
import { Order } from '../../utils/mockData'
import { getOrderTimelineSteps } from '../../utils/statusHelpers'

interface OrderTimelineProps {
  order: Order
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  const timelineSteps = getOrderTimelineSteps(order.status)

  return (
    <div className="space-y-4">
      {timelineSteps.map((step, index) => (
        <div key={step.status} className="flex items-center">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
            step.completed ? 'bg-green-500 text-white' : 'bg-slate-200'
          }`}>
            {step.completed && <CheckCircle className="w-3 h-3" />}
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
              {step.label}
            </p>
          </div>
          {index < timelineSteps.length - 1 && (
            <div className={`w-px h-8 ml-2 ${step.completed ? 'bg-green-200' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
