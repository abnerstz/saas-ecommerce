import { Helmet } from 'react-helmet-async'
import { Badge, Button } from '@/components/ui'
import { TrendingUp, Award } from 'lucide-react'
import { useState } from 'react'
import { customers, Customer } from '../../utils/mockData'
import { PageHeader } from '../../components/shared/PageHeader'
import { CustomerStats } from '../../components/customers/CustomerStats'
import { CustomerFilters } from '../../components/customers/CustomerFilters'
import { CustomersTable } from '../../components/customers/CustomersTable'
import { CustomerDetailsModal } from '../../components/customers/CustomerDetailsModal'

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showClientDialog, setShowClientDialog] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Customer | null>(null)

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Calculated statistics
  const stats = {
    total: customers.length,
    novos: customers.filter(c => c.status === 'new').length,
    recorrentes: customers.filter(c => c.status === 'recurring').length,
    vips: customers.filter(c => c.status === 'vip').length,
    inativos: customers.filter(c => c.status === 'inactive').length,
    ltvMedio: customers.reduce((sum, c) => sum + c.ltv, 0) / customers.length,
    totalGasto: customers.reduce((sum, c) => sum + c.totalSpent, 0)
  }

  const getStatusBadgeVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    const variants = {
      vip: 'default' as const,
      recorrente: 'secondary' as const, 
      novo: 'outline' as const,
      inativo: 'destructive' as const
    }
    return variants[status as keyof typeof variants] || 'outline'
  }

  const handleViewClient = (client: Customer) => {
    setSelectedClient(client)
    setShowClientDialog(true)
  }

  return (
    <>
      <Helmet>
        <title>Clientes - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <PageHeader
          title="Clientes"
          description="Gerencie sua base de clientes"
        />

        <CustomerStats stats={stats} />

        <CustomerFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClearFilters={() => setSearchTerm('')}
        />

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-medium text-foreground">Lista de Clientes</h2>
              <Badge variant="secondary" className="text-xs">
                {filteredCustomers.length} {filteredCustomers.length === 1 ? 'cliente' : 'clientes'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Exportar
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Award className="w-3 h-3 mr-1" />
                Segmentar
              </Button>
            </div>
          </div>
          
          <CustomersTable
            customers={filteredCustomers}
            onView={handleViewClient}
            getStatusBadgeVariant={getStatusBadgeVariant}
          />
        </div>

        {selectedClient && (
          <CustomerDetailsModal
            customer={selectedClient}
            isOpen={showClientDialog}
            onClose={() => setShowClientDialog(false)}
            getStatusBadgeVariant={getStatusBadgeVariant}
          />
        )}
      </div>
    </>
  )
}
