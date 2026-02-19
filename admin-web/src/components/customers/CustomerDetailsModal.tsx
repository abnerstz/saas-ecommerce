import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Badge,
  Button
} from '@/components/ui'
import { Customer } from '../../utils/mockData'

interface CustomerDetailsModalProps {
  customer: Customer
  isOpen: boolean
  onClose: () => void
  getStatusBadgeVariant: (status: string) => "default" | "destructive" | "outline" | "secondary"
}

export function CustomerDetailsModal({ customer, isOpen, onClose, getStatusBadgeVariant }: CustomerDetailsModalProps) {
  if (!customer) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Cliente</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do cliente
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Nome Completo</label>
                <div className="mt-1 p-2 bg-muted rounded-md text-sm">{customer.name}</div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</label>
                <div className="mt-1 p-2 bg-muted rounded-md text-sm">{customer.email}</div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Telefone</label>
                <div className="mt-1 p-2 bg-muted rounded-md text-sm">{customer.phone || 'Não informado'}</div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</label>
                <div className="mt-1">
                  <Badge variant={getStatusBadgeVariant(customer.status)}>
                    {customer.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Gasto</label>
                <div className="mt-1 p-2 bg-muted rounded-md text-sm font-semibold text-green-600">
                  R$ {customer.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">LTV (Lifetime Value)</label>
                <div className="mt-1 p-2 bg-muted rounded-md text-sm font-semibold">
                  R$ {customer.ltv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Último Pedido</label>
                <div className="mt-1 p-2 bg-muted rounded-md text-sm">
                  {customer.lastOrder.toLocaleDateString('pt-BR')}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Data de Cadastro</label>
                <div className="mt-1 p-2 bg-muted rounded-md text-sm">
                  {customer.registrationDate.toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Frequência de Compra</label>
            <div className="mt-1 p-2 bg-muted rounded-md text-sm">
              {customer.purchaseFrequency.toFixed(1)} compras por mês
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button>
            Editar Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
