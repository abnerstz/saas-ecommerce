import { Switch, Button } from '@ecommerce/ui'
import { Save } from 'lucide-react'

export function NotificationSettings() {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium text-foreground">Configurações de Notificação</h3>
      
      <div className="space-y-4 p-4 rounded-lg border bg-card">
        <h4 className="text-sm font-medium text-foreground">Notificações por Email</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-sm text-foreground">Novos Pedidos</h5>
              <p className="text-xs text-muted-foreground">Notificar quando um novo pedido for recebido</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-sm text-foreground">Estoque Baixo</h5>
              <p className="text-xs text-muted-foreground">Alertar quando produtos estiverem com estoque baixo</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-sm text-foreground">Relatórios Semanais</h5>
              <p className="text-xs text-muted-foreground">Receber resumo semanal de vendas e métricas</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="text-xs h-8">
          <Save className="w-3 h-3 mr-1" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
