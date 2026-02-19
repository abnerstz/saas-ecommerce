import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Card, CardContent, Input, Label, Button } from '@/components/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { Search, Store, ChevronLeft, ChevronRight } from 'lucide-react'
import { useProducts } from '@/api/hooks/products'
import { useCategories } from '@/api/hooks/categories'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') ?? searchParams.get('busca') ?? '')
  const [categoryId, setCategoryId] = useState(searchParams.get('category') ?? searchParams.get('categoria') ?? 'all')
  const [page, setPage] = useState(Number(searchParams.get('page') ?? searchParams.get('pagina')) || 1)

  const { data, isLoading, isError } = useProducts({
    search: search || undefined,
    category_id: categoryId === 'all' || categoryId === 'todas' ? undefined : categoryId,
    page,
    limit: 12,
  })
  const { data: categoriesData } = useCategories({})

  const products = data?.data ?? []
  const meta = data?.meta
  const categories = categoriesData?.data ?? []
  const totalPages = meta?.totalPages ?? 1

  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (categoryId !== 'all') params.set('category', categoryId)
    if (page > 1) params.set('page', String(page))
    setSearchParams(params, { replace: true })
  }, [search, categoryId, page, setSearchParams])

  const getImageUrl = (p: { images?: { url: string }[] }) => p.images?.[0]?.url

  return (
    <>
      <Helmet>
        <title>Catálogo - Loja de Bebidas</title>
        <meta name="description" content="Confira nosso catálogo de bebidas." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            Catálogo
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Escolha os produtos e adicione ao carrinho
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="products-search" className="text-xs text-muted-foreground font-normal">
              Buscar
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="products-search"
                type="search"
                placeholder="Nome do produto..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5 sm:w-48">
            <Label className="text-xs text-muted-foreground font-normal">Categoria</Label>
            <Select value={categoryId} onValueChange={(v) => { setCategoryId(v); setPage(1) }}>
              <SelectTrigger className="h-9 text-sm font-normal">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((c: { id: string; name: string }) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isError ? (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <Store className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Erro ao carregar produtos. Tente novamente.</p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-square bg-muted animate-pulse" />
                <CardContent className="p-3">
                  <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <Store className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Nenhum produto encontrado.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSearch(''); setCategoryId('all'); setPage(1) }}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p: { id: string; name: string; price: number; images?: { url: string }[] }) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <Card className="overflow-hidden hover:shadow-sm transition-shadow h-full">
                    <div className="aspect-square bg-muted relative">
                      {getImageUrl(p) ? (
                        <img src={getImageUrl(p)} alt={p.name} className="w-full h-full object-cover" />
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

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="tabular-nums">Página {page} de {totalPages}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  aria-label="Próxima página"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
