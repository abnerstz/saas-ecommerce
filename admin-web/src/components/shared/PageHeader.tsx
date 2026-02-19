import { Button } from '@/components/ui'
import { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description: string
  action?: {
    label: string
    icon: ReactNode
    onClick: () => void
  }
  children?: ReactNode
}

export function PageHeader({ title, description, action, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
        {action && (
          <Button onClick={action.onClick} className="w-full sm:w-auto">
            {action.icon}
            <span className="ml-1">{action.label}</span>
          </Button>
        )}
        {children}
      </div>
    </div>
  )
}
