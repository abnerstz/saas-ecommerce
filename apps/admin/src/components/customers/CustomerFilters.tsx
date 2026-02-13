import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button } from '@ecommerce/ui'
import { Search } from 'lucide-react'

interface CustomerFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  onClearFilters: () => void
}

export function CustomerFilters({ searchTerm, setSearchTerm, onClearFilters }: CustomerFiltersProps) {
  return (
    <div className="space-y-3 p-4 bg-muted/20 rounded-lg border">
      <h2 className="text-base font-medium text-foreground">Filtrar e Buscar Clientes</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9 text-sm bg-background"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="todos">
            <SelectTrigger className="w-[120px] h-9 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos" className="text-xs">Todos</SelectItem>
              <SelectItem value="vip" className="text-xs">VIP</SelectItem>
              <SelectItem value="recorrente" className="text-xs">Recorrente</SelectItem>
              <SelectItem value="novo" className="text-xs">Novo</SelectItem>
              <SelectItem value="inativo" className="text-xs">Inativo</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="todos">
            <SelectTrigger className="w-[120px] h-9 text-xs">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos" className="text-xs">Todos</SelectItem>
              <SelectItem value="30d" className="text-xs">Últimos 30d</SelectItem>
              <SelectItem value="90d" className="text-xs">Últimos 90d</SelectItem>
              <SelectItem value="1y" className="text-xs">Último ano</SelectItem>
            </SelectContent>
          </Select>

          {searchTerm && (
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
