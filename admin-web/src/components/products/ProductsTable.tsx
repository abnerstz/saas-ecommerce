import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Avatar, Button } from '@/components/ui'
import { Package, TrendingUp, Plus } from 'lucide-react'
import { ActionDropdown } from './ActionDropdown'
import { EstoqueIndicator } from './EstoqueIndicator'
import { Product } from '../../utils/mockData'

interface ProductsTableProps {
  products: Product[]
  onView: (product: Product) => void
  onEdit: (product: Product) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function ProductsTable({ products, onView, onEdit, onClearFilters, hasActiveFilters }: ProductsTableProps) {
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
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left w-[50px]">
              <input type="checkbox" className="rounded" />
            </TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">PRODUTO</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">CATEGORIA</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">PREÇO / CUSTO / MARGEM</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">ESTOQUE</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">VENDAS 30D</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">STATUS</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground p-2 text-left">AÇÕES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((produto) => {
            const margem = ((produto.price - produto.cost) / produto.price) * 100
            
            return (
              <TableRow key={produto.id} className="border-b hover:bg-muted/50 transition-colors">
                <TableCell className="p-2">
                  <input type="checkbox" className="rounded" />
                </TableCell>
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
                <TableCell className="p-2">
                  <div className="space-y-1">
                    <div className="font-semibold text-green-600">
                      R$ {produto.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Custo: R$ {produto.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-slate-400">
                      Margem: {margem.toFixed(1)}%
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-2">
                  <EstoqueIndicator 
                    stock={produto.stock} 
                    sales30d={produto.sales30d}
                  />
                </TableCell>
                <TableCell className="p-2">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="font-medium">{produto.sales30d}</span>
                  </div>
                </TableCell>
                <TableCell className="p-2">
                  <Badge 
                    variant={produto.status === 'active' ? 'default' : 'secondary'}
                    className={produto.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}
                  >
                    {produto.status === 'active' ? 'Ativo' : 'Inativo'}
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
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
