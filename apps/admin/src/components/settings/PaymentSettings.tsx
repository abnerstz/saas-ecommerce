import { Switch, Button, Badge } from '@ecommerce/ui'
import { Save } from 'lucide-react'

export function PaymentSettings() {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium text-foreground">Métodos de Pagamento</h3>
      
      <div className="space-y-4 p-4 rounded-lg border bg-card">
        <h4 className="text-sm font-medium text-foreground">Gateways de Pagamento</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg bg-background">
            <div className="flex items-center space-x-3">
              <Switch defaultChecked />
              <div>
                <h5 className="font-medium text-sm text-foreground">PIX</h5>
                <p className="text-xs text-muted-foreground">Taxa: 0% • Recebimento instantâneo</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">Ativo</Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg bg-background">
            <div className="flex items-center space-x-3">
              <Switch defaultChecked />
              <div>
                <h5 className="font-medium text-sm text-foreground">Cartão de Crédito</h5>
                <p className="text-xs text-muted-foreground">Taxa: 3.5% • Parcelamento até 12x</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">Ativo</Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg bg-background">
            <div className="flex items-center space-x-3">
              <Switch />
              <div>
                <h5 className="font-medium text-sm text-foreground">Cartão de Débito</h5>
                <p className="text-xs text-muted-foreground">Taxa: 2.5% • Desconto à vista</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">Inativo</Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg bg-background">
            <div className="flex items-center space-x-3">
              <Switch defaultChecked />
              <div>
                <h5 className="font-medium text-sm text-foreground">Boleto Bancário</h5>
                <p className="text-xs text-muted-foreground">Taxa: R$ 2,49 • Vencimento em 3 dias</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">Ativo</Badge>
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
