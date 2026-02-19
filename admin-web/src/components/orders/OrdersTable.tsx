import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow, 
  Badge, 
  Button 
} from '@/components/ui'
import { User, Calendar, CreditCard, Eye, Edit, Package } from 'lucide-react'
import { Order } from '../../utils/mockData'

interface OrdersTableProps {
  orders: Order[]
  onView: (order: Order) => void
  onEdit?: (order: Order) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function OrdersTable({ orders, onView, onEdit, onClearFilters, hasActiveFilters }: OrdersTableProps) {
  const getStatusBadgeVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    const variants = {
      entregue: 'default' as const,
      enviado: 'secondary' as const,
      processando: 'outline' as const,
      confirmado: 'outline' as const,
      pendente: 'outline' as const,
      cancelado: 'destructive' as const
    }
    return variants[status as keyof typeof variants] || 'outline'
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-base font-medium text-foreground mb-2">
          Nenhum pedido encontrado
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          {hasActiveFilters
            ? 'Tente ajustar os filtros de busca para encontrar pedidos.'
            : 'Você ainda não tem pedidos registrados.'}
        </p>
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={onClearFilters}
            className="text-xs"
          >
            Limpar Filtros
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b bg-muted/20">
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">PEDIDO</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">CLIENTE</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">DATA</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">VALOR</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">STATUS</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">PAGAMENTO</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">AÇÕES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="border-b hover:bg-muted/50 transition-colors">
              <TableCell className="p-2">
                <div className="font-medium text-foreground">{order.orderNumber}</div>
                <div className="text-sm text-muted-foreground">{order.itemCount} itens</div>
              </TableCell>
              <TableCell className="p-2">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-slate-400" />
                  {order.customerName}
                </div>
              </TableCell>
              <TableCell className="p-2">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                  {order.date.toLocaleDateString('pt-BR')}
                </div>
              </TableCell>
              <TableCell className="p-2">
                <div className="font-semibold text-green-600">
                  R$ {order.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </TableCell>
              <TableCell className="p-2">
                <Badge variant={getStatusBadgeVariant(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="p-2">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-slate-400" />
                  <span className="text-sm">{order.paymentMethod}</span>
                </div>
              </TableCell>
              <TableCell className="p-2">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onView(order)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  {onEdit && (
                    <Button variant="outline" size="sm" onClick={() => onEdit(order)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
