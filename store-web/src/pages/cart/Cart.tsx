import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Button, Card, CardContent, Separator } from '@/components/ui'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export default function Cart() {
  // Mock cart data - in real app this would come from a store/context
  const cartItems = [
    {
      id: 1,
      name: 'Smartphone Premium',
      price: 299.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Fone Bluetooth',
      price: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 199 ? 0 : 15.99
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Carrinho - Loja</title>
        </Helmet>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Seu carrinho está vazio
          </h1>
          <p className="text-gray-600 mb-8">
            Adicione alguns produtos ao seu carrinho para continuar
          </p>
          <Link to="/produtos">
            <Button size="lg">
              Continuar Comprando
            </Button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Carrinho ({cartItems.length}) - Loja</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Carrinho de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-lg font-bold text-primary">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900 mb-2">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Link to="/produtos">
                <Button variant="outline">
                  Continuar Comprando
                </Button>
              </Link>
              
              <Button variant="ghost" className="text-red-600 hover:text-red-700">
                Limpar Carrinho
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Resumo do Pedido
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete:</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {shipping === 0 && (
                    <p className="text-sm text-green-600">
                      ✓ Frete grátis em compras acima de R$ 199
                    </p>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-primary">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link to="/checkout" className="block">
                    <Button className="w-full" size="lg">
                      Finalizar Compra
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="w-full">
                    Calcular Frete
                  </Button>
                </div>

                {/* Security Info */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    🔒 Compra 100% segura e protegida
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Você também pode gostar
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Relógio Inteligente', price: 149.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
              { name: 'Câmera Digital', price: 89.99, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop' },
              { name: 'Tênis Esportivo', price: 199.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
              { name: 'Mochila Urbana', price: 79.99, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop' },
            ].map((product, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-primary font-bold">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
