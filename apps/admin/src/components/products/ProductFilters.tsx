import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button } from '@ecommerce/ui'
import { Search } from 'lucide-react'

interface ProductFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  selectedStock: string
  setSelectedStock: (value: string) => void
  categorias: string[]
  onClearFilters: () => void
}

export function ProductFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedStock,
  setSelectedStock,
  categorias,
  onClearFilters
}: ProductFiltersProps) {
  const hasActiveFilters = searchTerm || selectedCategory !== 'todas' || selectedStatus !== 'todos' || selectedStock !== 'todos'

  return (
    <div className="space-y-3 p-4 bg-muted/20 rounded-lg border">
      <h2 className="text-base font-medium text-foreground">Filtrar e Buscar Produtos</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar produtos por nome ou SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9 text-sm bg-background"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px] h-9 text-xs">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas" className="text-xs">Todas</SelectItem>
              {categorias.map(categoria => (
                <SelectItem key={categoria} value={categoria} className="text-xs">
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[100px] h-9 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos" className="text-xs">Todos</SelectItem>
              <SelectItem value="ativo" className="text-xs">Ativo</SelectItem>
              <SelectItem value="inativo" className="text-xs">Inativo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStock} onValueChange={setSelectedStock}>
            <SelectTrigger className="w-[120px] h-9 text-xs">
              <SelectValue placeholder="Estoque" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos" className="text-xs">Todos</SelectItem>
              <SelectItem value="ok" className="text-xs">OK (&gt;10)</SelectItem>
              <SelectItem value="baixo" className="text-xs">Baixo (≤10)</SelectItem>
              <SelectItem value="zero" className="text-xs">Zero (0)</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClearFilters}
              className="h-9 text-xs text-muted-foreground hover:text-foreground"
            >
              Limpar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
