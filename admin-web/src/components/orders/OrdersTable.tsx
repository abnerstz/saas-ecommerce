import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
  Badge,
  Button
} from '@/components/ui'
import { User, Calendar, CreditCard, Eye, Edit, Package, ChevronLeft, ChevronRight } from 'lucide-react'
import { Order } from '../../utils/mockData'
import { getOrderStatusLabel, getOrderStatusBadgeVariant } from '../../utils/statusHelpers'

const DEFAULT_PAGE_SIZE = 10

interface OrdersTableProps {
  orders: Order[]
  onView: (order: Order) => void
  onEdit?: (order: Order) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function OrdersTable({ orders, onView, onEdit, onClearFilters, hasActiveFilters }: OrdersTableProps) {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(DEFAULT_PAGE_SIZE)

  const total = orders.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize
  const end = Math.min(start + pageSize, total)
  const pageOrders = orders.slice(start, end)

  useEffect(() => {
    setPage(1)
  }, [orders.length])

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
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Pedido</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Cliente</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Data</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Valor</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Status</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Pagamento</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageOrders.map((order) => (
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
                <Badge variant={getOrderStatusBadgeVariant(order.status)}>
                  {getOrderStatusLabel(order.status)}
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} className="p-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>
                  Mostrando {total === 0 ? 0 : start + 1}–{end} de {total} pedido{total !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    aria-label="Página anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="min-w-[80px] text-center tabular-nums">
                    Página {page} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    aria-label="Próxima página"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
