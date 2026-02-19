import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button } from '@/components/ui'
import { Search, Filter } from 'lucide-react'

interface OrderFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  statusPedidos: string[]
  onClearFilters: () => void
}

export function OrderFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  statusPedidos,
  onClearFilters
}: OrderFiltersProps) {
  const hasActiveFilters = searchTerm || selectedStatus !== 'todos'

  return (
    <div className="space-y-3 p-4 bg-muted/20 rounded-lg border">
      <h2 className="text-base font-medium text-foreground">Filtrar e Buscar Pedidos</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar por número do pedido ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9 text-sm bg-background"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[140px] h-9 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos" className="text-xs">Todos</SelectItem>
              {statusPedidos.map(status => (
                <SelectItem key={status} value={status} className="text-xs">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="h-9 text-xs">
            <Filter className="w-3 h-3 mr-1" />
            Mais Filtros
          </Button>

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
