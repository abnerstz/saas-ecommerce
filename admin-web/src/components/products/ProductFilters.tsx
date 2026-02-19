import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button, Label } from '@/components/ui'
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
  categories: string[]
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
  categories,
  onClearFilters
}: ProductFiltersProps) {
  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'todas' ||
    selectedStatus !== 'todos' ||
    selectedStock !== 'todos'

  return (
    <div className="space-y-3 p-4 bg-muted/20 rounded-lg border">
      <h2 className="text-sm font-normal text-muted-foreground uppercase tracking-wide">Filtrar e buscar produtos</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="product-search" className="text-xs text-muted-foreground font-normal">
            Buscar
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="product-search"
              type="text"
              placeholder="Nome ou SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9 text-sm bg-background"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <div className="space-y-1.5">
            <Label htmlFor="product-category" className="text-xs text-muted-foreground font-normal">
              Categoria
            </Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="product-category" className="w-[140px] h-9 text-sm font-normal">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas" className="text-sm">Todas</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-sm">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="product-status" className="text-xs text-muted-foreground font-normal">
              Status
            </Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger id="product-status" className="w-[100px] h-9 text-sm font-normal">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos" className="text-sm">Todos</SelectItem>
                <SelectItem value="ativo" className="text-sm">Ativo</SelectItem>
                <SelectItem value="inativo" className="text-sm">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="product-stock" className="text-xs text-muted-foreground font-normal">
              Estoque
            </Label>
            <Select value={selectedStock} onValueChange={setSelectedStock}>
              <SelectTrigger id="product-stock" className="w-[120px] h-9 text-sm font-normal">
                <SelectValue placeholder="Estoque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos" className="text-sm">Todos</SelectItem>
                <SelectItem value="ok" className="text-sm">OK (&gt;10)</SelectItem>
                <SelectItem value="baixo" className="text-sm">Baixo (≤10)</SelectItem>
                <SelectItem value="zero" className="text-sm">Zero (0)</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
