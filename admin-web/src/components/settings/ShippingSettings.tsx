import { Switch, Button, Badge, Input } from '@/components/ui'
import { Save } from 'lucide-react'

export function ShippingSettings() {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium text-foreground">Configurações de Envio</h3>
      
      <div className="space-y-4 p-4 rounded-lg border bg-card">
        <h4 className="text-sm font-medium text-foreground">Métodos de Entrega</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg bg-background">
            <div className="flex items-center space-x-3">
              <Switch defaultChecked />
              <div>
                <h5 className="font-medium text-sm text-foreground">Retirada na Loja</h5>
                <p className="text-xs text-muted-foreground">Grátis • Disponível durante horário comercial</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">Ativo</Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg bg-background">
            <div className="flex items-center space-x-3">
              <Switch defaultChecked />
              <div>
                <h5 className="font-medium text-sm text-foreground">Entrega</h5>
                <p className="text-xs text-muted-foreground">Configurável por região • Custo variável</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">Ativo</Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 rounded-lg border bg-card">
        <h4 className="text-sm font-medium text-foreground">Configuração de Regiões para Entrega</h4>
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Região 1 - Centro</label>
              <div className="flex items-center space-x-2 mt-1">
                <Input placeholder="CEPs: 01000-000 a 01999-999" className="h-8 text-xs" />
                <Input placeholder="R$ 15,00" className="h-8 text-xs w-24" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Região 2 - Zona Norte</label>
              <div className="flex items-center space-x-2 mt-1">
                <Input placeholder="CEPs: 02000-000 a 02999-999" className="h-8 text-xs" />
                <Input placeholder="R$ 20,00" className="h-8 text-xs w-24" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Região 3 - Zona Sul</label>
              <div className="flex items-center space-x-2 mt-1">
                <Input placeholder="CEPs: 04000-000 a 04999-999" className="h-8 text-xs" />
                <Input placeholder="R$ 18,00" className="h-8 text-xs w-24" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Região 4 - Grande SP</label>
              <div className="flex items-center space-x-2 mt-1">
                <Input placeholder="CEPs: 08000-000 a 09999-999" className="h-8 text-xs" />
                <Input placeholder="R$ 25,00" className="h-8 text-xs w-24" />
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full text-xs h-8">
            + Adicionar Nova Região
          </Button>
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
