import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, CardContent, Input, Label, Button } from '@/components/ui'
import { Package, Search } from 'lucide-react'

const STORAGE_KEY = 'store_orders'

function getStoredOrders(): { order_number: string; email: string; order: Record<string, unknown> }[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function findOrder(orderNumber: string, email: string) {
  const normalized = orderNumber.trim().toLowerCase()
  const emailNorm = email.trim().toLowerCase()
  const orders = getStoredOrders()
  return orders.find(
    (o) =>
      String(o.order_number).toLowerCase() === normalized &&
      o.email.toLowerCase() === emailNorm
  )
}

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  processing: 'Em preparo',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
}

export default function OrderTracking() {
  const location = useLocation()
  const stateOrderNumber = (location.state as { orderNumber?: string })?.orderNumber
  const stateEmail = (location.state as { email?: string })?.email

  const [orderNumber, setOrderNumber] = useState(stateOrderNumber ?? '')
  const [email, setEmail] = useState(stateEmail ?? '')
  const [searched, setSearched] = useState(false)
  const [found, setFound] = useState<{ order_number: string; email: string; order: Record<string, unknown> } | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim() || !email.trim()) return
    const order = findOrder(orderNumber, email)
    setFound(order ?? null)
    setSearched(true)
  }

  const status = found?.order?.status as string | undefined
  const statusLabel = status ? STATUS_LABEL[status] ?? status : '-'

  return (
    <>
      <Helmet>
        <title>Acompanhar pedido - Loja de Bebidas</title>
        <meta name="description" content="Consulte seu pedido pelo número e e-mail." />
      </Helmet>

      <div className="max-w-md mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-6 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            Acompanhar pedido
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Informe o número do pedido e o e-mail usado na compra.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="order-number" className="text-xs font-normal text-muted-foreground">
                  Número do pedido
                </Label>
                <Input
                  id="order-number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Ex: PED-12345"
                  className="h-9"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-email" className="text-xs font-normal text-muted-foreground">
                  E-mail
                </Label>
                <Input
                  id="order-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="h-9"
                />
              </div>
              <Button type="submit" className="w-full gap-2" size="lg">
                <Search className="w-4 h-4" />
                Buscar
              </Button>
            </form>
          </CardContent>
        </Card>

        {searched && (
          <Card className="mt-6">
            <CardContent className="p-6">
              {found ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Pedido {String(found.order_number)}
                      </p>
                      <p className="text-xs text-muted-foreground">Status: {statusLabel}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Em caso de dúvida, entre em contato com a loja informando o número do pedido.
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Package className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nenhum pedido encontrado com esse número e e-mail.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Verifique os dados ou entre em contato com a loja.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
