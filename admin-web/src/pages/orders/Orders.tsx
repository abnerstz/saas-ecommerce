import { Helmet } from 'react-helmet-async'
import { Badge, Button } from '@/components/ui'
import { BarChart3, TrendingUp, Plus } from 'lucide-react'
import { useState } from 'react'
import { orders as ordersData, orderStatuses, Order } from '../../utils/mockData'
import { PageHeader } from '../../components/shared/PageHeader'
import { OrderPipeline } from '../../components/orders/OrderPipeline'
import { OrderStats } from '../../components/orders/OrderStats'
import { OrderFilters } from '../../components/orders/OrderFilters'
import { OrdersTable } from '../../components/orders/OrdersTable'
import { OrderDetailsModal } from '../../components/orders/OrderDetailsModal'
import { NewOrderModal } from '../../components/orders/NewOrderModal'

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('todos')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [orders, setOrders] = useState(ordersData)

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'todos' || order.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // Calculated statistics
  const stats = {
    total: orders.length,
    valorTotal: orders.reduce((sum, p) => sum + p.amount, 0),
    tempoMedioProcessamento: orders.filter(p => p.processingTime).reduce((sum, p) => sum + (p.processingTime || 0), 0) / orders.filter(p => p.processingTime).length,
    pedidosHoje: orders.filter(p => p.date.toDateString() === new Date().toDateString()).length
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  const handleNewOrder = () => {
    setShowNewOrderModal(true)
  }

  const handleSaveNewOrder = (newOrderData: { customerName: string; customerEmail: string; items: Array<{ id: string; name: string; price: number; quantity: number }>; paymentMethod: string; shippingAddress: string; total: number }) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber: `PED-${Date.now()}`,
      customerName: newOrderData.customerName,
      customerId: '',
      date: new Date(),
      amount: newOrderData.total,
      status: 'pending',
      itemCount: newOrderData.items.length,
      items: newOrderData.items.map((item, index) => ({
        id: `${Date.now()}-${index}`,
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
        sku: `SKU-${item.id}`
      })),
      paymentMethod: newOrderData.paymentMethod,
      shippingAddress: newOrderData.shippingAddress
    }
    setOrders([newOrder, ...orders])
  }

  return (
    <>
      <Helmet>
        <title>Pedidos - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <PageHeader
          title="Pedidos"
          description="Gerencie todos os pedidos da sua loja"
        >
          <div className="flex flex-wrap md:items-center gap-2">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Relatórios
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={handleNewOrder}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Pedido
            </Button>
          </div>
        </PageHeader>

        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">Pipeline de Pedidos</h2>
          <OrderPipeline orders={orders} statusPedidos={orderStatuses} />
        </div>

        <OrderStats stats={stats} />

        <OrderFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          statusPedidos={orderStatuses}
          onClearFilters={() => {
            setSearchTerm('')
            setSelectedStatus('todos')
          }}
        />

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-medium text-foreground">Lista de Pedidos</h2>
              <Badge variant="secondary" className="text-xs">
                {filteredOrders.length} {filteredOrders.length === 1 ? 'pedido' : 'pedidos'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <BarChart3 className="w-3 h-3 mr-1" />
                Relatórios
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Exportar
              </Button>
            </div>
          </div>
          
          <OrdersTable
            orders={filteredOrders}
            onView={handleViewOrder}
            onClearFilters={() => {
              setSearchTerm('')
              setSelectedStatus('todos')
            }}
            hasActiveFilters={searchTerm !== '' || selectedStatus !== 'todos'}
          />
        </div>

        {selectedOrder && (
          <OrderDetailsModal 
            order={selectedOrder}
            isOpen={showOrderDetails}
            onClose={() => setShowOrderDetails(false)}
          />
        )}

        <NewOrderModal
          isOpen={showNewOrderModal}
          onClose={() => setShowNewOrderModal(false)}
          onSave={handleSaveNewOrder}
        />
      </div>
    </>
  )
}