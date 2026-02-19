import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Server, Store, Bell } from 'lucide-react'

export function SettingsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <Card className="hover:shadow-sm transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Status do Sistema
          </CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">Online</div>
          <p className="text-xs text-muted-foreground">
            Sistema funcionando normalmente
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-sm transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Versão Atual
          </CardTitle>
          <Store className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">v1.0.0</div>
          <p className="text-xs text-muted-foreground">
            Última atualização
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-sm transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Produtos Ativos
          </CardTitle>
          <Store className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">1,523</div>
          <p className="text-xs text-muted-foreground">
            Produtos cadastrados
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-sm transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Configurações
          </CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">85%</div>
          <p className="text-xs text-muted-foreground">
            Configuração completa
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
