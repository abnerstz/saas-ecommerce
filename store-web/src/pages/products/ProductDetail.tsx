import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Label } from '@/components/ui'
import { Store, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useProduct } from '@/api/hooks/products'
import { useCartStore } from '@/stores/cartStore'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((s) => s.addItem)

  const { data: product, isLoading } = useProduct(id ?? '')

  const imageUrl = product?.images?.[0]?.url
  const inStock = product && (product.inventory_qty ?? 0) > 0
  const maxQty = product?.inventory_qty ?? 0

  const handleAddToCart = () => {
    if (!product) return
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl,
    })
    navigate('/cart')
  }

  if (!id) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-muted-foreground">
        Produto não encontrado.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted rounded-lg animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-muted rounded w-24 animate-pulse" />
            <div className="h-4 bg-muted rounded w-full animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <Store className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">Produto não encontrado.</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/products')}>
          Voltar ao catálogo
        </Button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{product?.name ? `${product.name} - Loja de Bebidas` : 'Loja de Bebidas'}</title>
        <meta name="description" content={String(product?.short_description || product?.description || product?.name || '')} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Store className="w-24 h-24 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-primary tabular-nums mt-2">
                R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              {(product.short_description || product.description) && (
                <p className="text-sm text-muted-foreground mt-3">
                  {product.short_description || product.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              {inStock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <span className="text-muted-foreground">
                    Em estoque {maxQty > 0 ? `(${maxQty} un.)` : ''}
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-destructive shrink-0" />
                  <span className="text-muted-foreground">Indisponível</span>
                </>
              )}
            </div>

            {inStock && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-normal">Quantidade</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Diminuir"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center text-sm tabular-nums">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setQuantity((q) => Math.min(maxQty || 99, q + 1))}
                      disabled={quantity >= (maxQty || 99)}
                      aria-label="Aumentar"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 gap-2"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Adicionar ao carrinho
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      addItem({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity,
                        imageUrl,
                      })
                      navigate('/checkout')
                    }}
                  >
                    Comprar agora
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
