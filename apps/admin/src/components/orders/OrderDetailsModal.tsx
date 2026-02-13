import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Badge,
  Button,
  Separator
} from '@ecommerce/ui'
import { User, Calendar, CreditCard, Package } from 'lucide-react'
import { OrderTimeline } from './OrderTimeline'
import { Order } from '../../utils/mockData'

interface OrderDetailsModalProps {
  order: Order
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido {order.orderNumber}</DialogTitle>
          <DialogDescription>
            Informações completas do pedido
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 overflow-y-auto flex-1 pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Informações do Cliente</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-slate-400" />
                  {order.customerName}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                  {order.date.toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-slate-400" />
                  {order.paymentMethod}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Resumo do Pedido</h4>
              <div className="space-y-1 text-sm">
                <div>Status: <Badge variant="outline">{order.status}</Badge></div>
                <div>Valor: <span className="font-semibold">R$ {order.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
                <div>Itens: {order.itemCount}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Lista de Produtos */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Produtos do Pedido
            </h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg bg-muted/30">
                  <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                    {item.productImage ? (
                      <img 
                        src={item.productImage} 
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-foreground truncate">{item.productName}</h5>
                      <span className="font-semibold text-green-600">
                        R$ {item.totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>SKU: {item.sku}</span>
                      <div className="flex items-center space-x-2">
                        <span>Qtd: {item.quantity}</span>
                        <span>•</span>
                        <span>Unit: R$ {item.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total de itens:</span>
                <span className="font-medium">{order.itemCount} {order.itemCount === 1 ? 'item' : 'itens'}</span>
              </div>
              <div className="flex justify-between items-center text-base font-semibold mt-1">
                <span>Valor total:</span>
                <span className="text-green-600">R$ {order.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-foreground mb-3">Timeline do Pedido</h4>
            <OrderTimeline order={order} />
          </div>

        </div>
        
        <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button>
            Atualizar Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
