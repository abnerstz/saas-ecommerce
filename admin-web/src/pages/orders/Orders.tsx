import { Helmet } from 'react-helmet-async'
import { Badge } from '@/components/ui'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { orders as ordersData, orderStatuses, Order } from '../../utils/mockData'
import { PageHeader } from '../../components/shared/PageHeader'
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'todos' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  const handleNewOrder = () => {
    setShowNewOrderModal(true)
  }

  const handleSaveNewOrder = (newOrderData: {
    customerName: string
    customerEmail: string
    items: Array<{ id: string; name: string; price: number; quantity: number }>
    paymentMethod: string
    shippingAddress: string
    total: number
  }) => {
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
        <title>Lista de pedidos - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <PageHeader
          title="Lista de pedidos"
          description="Gerencie e consulte todos os pedidos"
          action={{
            label: 'Novo pedido',
            icon: <Plus className="w-4 h-4 mr-2" />,
            onClick: handleNewOrder
          }}
        />

        <OrderFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          orderStatuses={orderStatuses}
          onClearFilters={() => {
            setSearchTerm('')
            setSelectedStatus('todos')
          }}
        />

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-normal text-muted-foreground uppercase tracking-wide">Pedidos</h2>
            <Badge variant="secondary" className="text-xs">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'pedido' : 'pedidos'}
            </Badge>
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
