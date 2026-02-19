import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Button, Card, CardContent, Separator } from '@/components/ui'
import { Minus, Plus, Trash2, ShoppingBag, Store } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'

export default function Cart() {
  const { items, updateQuantity, removeItem, clear } = useCartStore()
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Carrinho - Loja de Bebidas</title>
        </Helmet>
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <ShoppingBag className="mx-auto w-14 h-14 text-muted-foreground mb-4" />
          <h1 className="text-xl font-semibold text-foreground mb-2">
            Carrinho vazio
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Adicione produtos pelo catálogo para continuar.
          </p>
          <Link to="/products">
            <Button>Ver catálogo</Button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{`Carrinho (${items.length}) - Loja de Bebidas`}</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            Carrinho
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {items.reduce((acc, i) => acc + i.quantity, 0)} item(ns)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.productId}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg bg-muted shrink-0 overflow-hidden">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Store className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-2">{item.name}</p>
                      <p className="text-sm font-semibold text-primary tabular-nums mt-1">
                        R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          aria-label="Diminuir"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </Button>
                        <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          aria-label="Aumentar"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-destructive ml-2"
                          onClick={() => removeItem(item.productId)}
                          aria-label="Remover"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold tabular-nums">
                        R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex flex-wrap gap-3">
              <Link to="/products">
                <Button variant="outline" size="sm">Continuar comprando</Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={clear}>
                Limpar carrinho
              </Button>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-sm font-medium text-foreground mb-4">Resumo</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="tabular-nums">R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="tabular-nums text-primary">R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Forma de pagamento e entrega/retirada serão definidos no próximo passo.
                </p>
                <Link to="/checkout" className="block mt-6">
                  <Button className="w-full" size="lg">
                    Finalizar pedido
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
