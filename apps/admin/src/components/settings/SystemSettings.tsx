import { Button, Badge } from '@ecommerce/ui'
import { Server, Save } from 'lucide-react'

export function SystemSettings() {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium text-foreground">Configurações do Sistema</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4 p-4 rounded-lg border bg-card">
          <h4 className="text-sm font-medium text-foreground">Informações do Sistema</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Versão do Sistema:</span>
              <Badge variant="outline" className="text-xs">v1.0.0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Último Backup:</span>
              <span className="text-xs text-foreground">Hoje, 03:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Uptime:</span>
              <span className="text-xs text-foreground">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Espaço Usado:</span>
              <span className="text-xs text-foreground">2.3 GB / 10 GB</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4 rounded-lg border bg-card">
          <h4 className="text-sm font-medium text-foreground">Manutenção</h4>
          <div className="space-y-3">
            <Button variant="outline" className="w-full text-xs h-8">
              <Server className="w-3 h-3 mr-1" />
              Gerar Backup
            </Button>
            <Button variant="outline" className="w-full text-xs h-8">
              Limpar Cache
            </Button>
            <Button variant="outline" className="w-full text-xs h-8">
              Verificar Atualizações
            </Button>
            <Button variant="destructive" className="w-full text-xs h-8">
              Modo Manutenção
            </Button>
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
