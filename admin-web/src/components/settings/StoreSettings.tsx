import { Input, Switch, Button } from '@/components/ui'
import { Save } from 'lucide-react'

export function StoreSettings() {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium text-foreground">Configurações da Loja</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4 p-4 rounded-lg border bg-card">
          <h4 className="text-sm font-medium text-foreground">Informações Básicas</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Nome da Loja</label>
              <Input defaultValue="SaaS Ecommerce" className="mt-1 h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email de Contato</label>
              <Input defaultValue="contato@saasecommerce.com" type="email" className="mt-1 h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Telefone</label>
              <Input defaultValue="(11) 99999-9999" className="mt-1 h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Endereço</label>
              <Input defaultValue="Rua Example, 123 - São Paulo, SP" className="mt-1 h-9 text-sm" />
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4 rounded-lg border bg-card">
          <h4 className="text-sm font-medium text-foreground">Configurações Avançadas</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Fuso Horário</label>
              <Input defaultValue="America/Sao_Paulo" className="mt-1 h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Moeda Padrão</label>
              <Input defaultValue="BRL" className="mt-1 h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Idioma</label>
              <Input defaultValue="Português (Brasil)" className="mt-1 h-9 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status da Loja</label>
              <div className="flex items-center space-x-2">
                <Switch defaultChecked />
                <span className="text-sm text-foreground">Loja Online</span>
              </div>
            </div>
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
