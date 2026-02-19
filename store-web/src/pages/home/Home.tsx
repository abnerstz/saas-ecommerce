import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Button, Card, CardContent } from '@/components/ui'
import { Store } from 'lucide-react'
import { useProducts } from '@/api/hooks/products'

const STORE_NAME = 'Loja de Bebidas'

export default function Home() {
  const { data, isLoading, isError } = useProducts({ limit: 8, page: 1 })

  const products = data?.data ?? []

  return (
    <>
      <Helmet>
        <title>{STORE_NAME}</title>
        <meta name="description" content="Compre bebidas com praticidade. Retirada no balcão ou entrega." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <section>
          <h2 className="text-sm font-normal text-muted-foreground uppercase tracking-wide mb-4">
            Produtos
          </h2>
          {isError ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Store className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Não foi possível carregar o catálogo. Tente novamente.</p>
              <Link to="/products" className="inline-block mt-4">
                <Button variant="outline" size="sm">Ver catálogo</Button>
              </Link>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-square bg-muted animate-pulse" />
                  <CardContent className="p-3">
                    <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Store className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-4">Nenhum produto no catálogo no momento.</p>
              <Link to="/products">
                <Button variant="outline" size="sm">Ver catálogo</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {products.slice(0, 8).map((p: { id: string; name: string; price: number; images?: { url: string }[] }) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <Card className="overflow-hidden hover:shadow-sm transition-shadow h-full">
                    <div className="aspect-square bg-muted relative">
                      {p.images?.[0]?.url ? (
                        <img
                          src={p.images[0].url}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Store className="w-10 h-10 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <p className="text-sm font-medium text-foreground line-clamp-2 mb-1">{p.name}</p>
                      <p className="text-sm font-semibold text-primary tabular-nums">
                        R$ {Number(p.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
          {!isLoading && products.length > 0 && (
            <div className="mt-6 text-center">
              <Link to="/products">
                <Button variant="outline" size="sm">Ver todos os produtos</Button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
