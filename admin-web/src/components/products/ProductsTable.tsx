import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
  Badge,
  Avatar,
  Button
} from '@/components/ui'
import { Package, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { ActionDropdown } from './ActionDropdown'
import { EstoqueIndicator } from './EstoqueIndicator'
import { Product } from '../../utils/mockData'
import { getProductStatusLabel } from '../../utils/statusHelpers'

const DEFAULT_PAGE_SIZE = 10

interface ProductsTableProps {
  products: Product[]
  onView: (product: Product) => void
  onEdit: (product: Product) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function ProductsTable({ products, onView, onEdit, onClearFilters, hasActiveFilters }: ProductsTableProps) {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(DEFAULT_PAGE_SIZE)

  const total = products.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize
  const end = Math.min(start + pageSize, total)
  const pageProducts = products.slice(start, end)

  useEffect(() => {
    setPage(1)
  }, [products.length])

  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-base font-medium text-foreground mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          {hasActiveFilters
            ? 'Tente ajustar os filtros de busca para encontrar produtos.'
            : 'Você ainda não tem produtos cadastrados.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          {hasActiveFilters && (
            <Button variant="outline" onClick={onClearFilters} className="text-xs">
              Limpar Filtros
            </Button>
          )}
          <Button className="text-xs">
            <Plus className="w-3 h-3 mr-1" />
            Adicionar Produto
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="border-b bg-muted/20">
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Produto</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Categoria</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Preço</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Estoque</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">Status</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left w-[80px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageProducts.map((produto) => (
            <TableRow key={produto.id} className="border-b hover:bg-muted/50 transition-colors">
              <TableCell className="p-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <Package className="w-5 h-5 text-slate-400" />
                    </div>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">{produto.name}</div>
                    <div className="text-sm text-muted-foreground">SKU: {produto.sku}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="p-2">
                <Badge variant="outline">{produto.category}</Badge>
              </TableCell>
              <TableCell className="p-2 font-medium">
                R$ {produto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="p-2">
                <EstoqueIndicator
                  stock={produto.stock}
                  sales30d={produto.sales30d}
                />
              </TableCell>
              <TableCell className="p-2">
                <Badge
                  variant={produto.status === 'active' ? 'default' : 'secondary'}
                  className={produto.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}
                >
                  {getProductStatusLabel(produto.status)}
                </Badge>
              </TableCell>
              <TableCell className="p-2">
                <ActionDropdown
                  product={produto}
                  onView={onView}
                  onEdit={onEdit}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="p-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>
                  Mostrando {total === 0 ? 0 : start + 1}–{end} de {total} produto{total !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    aria-label="Página anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="min-w-[80px] text-center tabular-nums">
                    Página {page} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    aria-label="Próxima página"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
