import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui'
import { Eye, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Product } from '../../utils/mockData'

interface ActionDropdownProps {
  product: Product
  onView: (product: Product) => void
  onEdit: (product: Product) => void
}

export function ActionDropdown({ product, onView, onEdit }: ActionDropdownProps) {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => onView(product)}>
          <Eye className="w-4 h-4 mr-1" />
          Ver
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
          <Edit className="w-4 h-4 mr-1" />
          Editar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-600 hover:text-red-700"
          onClick={() => setShowDialog(true)}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Excluir
        </Button>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o produto "{product.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setShowDialog(false)}>
              Excluir Produto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
