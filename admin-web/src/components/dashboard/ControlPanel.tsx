import { Card, CardContent, CardHeader, CardTitle, Progress, Button } from '@/components/ui'
import { Zap, Target, Calendar, Settings, Plus, FileText, CheckCircle, AlertCircle } from 'lucide-react'

interface ControlPanelProps {
  monthlyGoal: {
    progress: number
    remaining: number
    target: number
  }
  pendingTasks: Array<{
    id: string
    description: string
  }>
  systemStatus: {
    payments: string
    shipping: string
    integration: string
  }
}

export function ControlPanel({ monthlyGoal, pendingTasks, systemStatus }: ControlPanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
      case 'unstable':
        return <AlertCircle className="w-3 h-3 mr-1 text-yellow-500" />
      default:
        return <AlertCircle className="w-3 h-3 mr-1 text-red-500" />
    }
  }

  return (
    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Painel de Controle</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Ações Rápidas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm">
              <Zap className="w-4 h-4 mr-2" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button size="sm" className="w-full justify-start h-8 text-xs">
                <Plus className="w-3 h-3 mr-2" />
                Novo Produto
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start h-8 text-xs">
                <FileText className="w-3 h-3 mr-2" />
                Relatório de Vendas
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Meta do Mês */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm">
              <Target className="w-4 h-4 mr-2" />
              Meta do Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progresso</span>
                <span className="font-medium">{monthlyGoal.progress}%</span>
              </div>
              <Progress value={monthlyGoal.progress} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Faltam R$ {monthlyGoal.remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Próximas Tarefas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Próximas Tarefas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {pendingTasks.map((tarefa) => (
                <div key={tarefa.id} className="flex items-start text-xs">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground leading-tight">{tarefa.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status do Sistema */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm">
              <Settings className="w-4 h-4 mr-2" />
              Status do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Pagamentos</span>
                <div className="flex items-center">
                  {getStatusIcon(systemStatus.payments)}
                  <span className="text-muted-foreground capitalize">{systemStatus.payments}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Transportadoras</span>
                <div className="flex items-center">
                  {getStatusIcon(systemStatus.shipping)}
                  <span className="text-muted-foreground capitalize">{systemStatus.shipping}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Integração</span>
                <div className="flex items-center">
                  {getStatusIcon(systemStatus.integration)}
                  <span className="text-muted-foreground capitalize">{systemStatus.integration}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
