import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button, Label } from '@/components/ui'
import { Search } from 'lucide-react'
import { getOrderStatusLabel } from '../../utils/statusHelpers'

interface OrderFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedStatus: string
  setSelectedStatus: (value: string) => void
  orderStatuses: string[]
  onClearFilters: () => void
}

export function OrderFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  orderStatuses,
  onClearFilters
}: OrderFiltersProps) {
  const hasActiveFilters = searchTerm !== '' || selectedStatus !== 'todos'

  return (
    <div className="space-y-3 p-4 bg-muted/20 rounded-lg border">
      <h2 className="text-sm font-normal text-muted-foreground uppercase tracking-wide">Filtrar e buscar pedidos</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="order-search" className="text-xs text-muted-foreground font-normal">
            Buscar
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="order-search"
              type="text"
              placeholder="Número do pedido ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9 text-sm bg-background"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <div className="space-y-1.5">
            <Label htmlFor="order-status" className="text-xs text-muted-foreground font-normal">
              Status
            </Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger id="order-status" className="w-[140px] h-9 text-sm font-normal">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos" className="text-sm">Todos</SelectItem>
                {orderStatuses.map((status) => (
                  <SelectItem key={status} value={status} className="text-sm">
                    {getOrderStatusLabel(status)}
                  </SelectItem>
                ))}
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
