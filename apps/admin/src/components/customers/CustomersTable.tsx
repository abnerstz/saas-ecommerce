import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow, 
  Badge, 
  Button, 
  Avatar 
} from '@ecommerce/ui'
import { User, Calendar, Eye, Users } from 'lucide-react'
import { Customer } from '../../utils/mockData'

interface CustomersTableProps {
  customers: Customer[]
  onView: (customer: Customer) => void
  getStatusBadgeVariant: (status: string) => "default" | "destructive" | "outline" | "secondary"
}

export function CustomersTable({ customers, onView, getStatusBadgeVariant }: CustomersTableProps) {
  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-2 text-sm font-medium text-foreground">
          Nenhum cliente encontrado
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Tente ajustar os filtros de busca.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b bg-muted/20">
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">CLIENTE</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">STATUS</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">TOTAL GASTO</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">ÚLTIMO PEDIDO</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">LTV</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">AÇÕES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} className="border-b hover:bg-muted/50 transition-colors">
              <TableCell className="p-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="p-2">
                <Badge variant={getStatusBadgeVariant(customer.status)}>
                  {customer.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="p-2">
                <div className="font-semibold text-green-600">
                  R$ {customer.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </TableCell>
              <TableCell className="p-2">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                  {customer.lastOrder.toLocaleDateString('pt-BR')}
                </div>
              </TableCell>
              <TableCell className="p-2">
                <div className="font-medium">
                  R$ {customer.ltv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </TableCell>
              <TableCell className="p-2">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onView(customer)}>
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
