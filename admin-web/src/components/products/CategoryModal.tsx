import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,

} from '@/components/ui'

interface Category {
  id: string
  name: string
  description: string
  active: boolean
  productsCount?: number
}

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category?: Category | null
  onSave: (category: Partial<Category>) => void
  isEditing: boolean
}

export function CategoryModal({ isOpen, onClose, category, onSave, isEditing }: CategoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: true
  })

  useEffect(() => {
    if (category && isEditing) {
      setFormData({
        name: category.name,
        description: category.description,
        active: category.active
      })
    } else {
      setFormData({
        name: '',
        description: '',
        active: true
      })
    }
  }, [category, isEditing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      id: isEditing ? category?.id : undefined
    })
    onClose()
  }

  const handleClose = () => {
    setFormData({ name: '', description: '', active: true })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Edite as informações da categoria de produtos'
              : 'Crie uma nova categoria para organizar seus produtos'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Nome da Categoria</Label>
            <Input
              id="category-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Eletrônicos, Roupas, Casa..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-description">Descrição</Label>
            <textarea
              id="category-description"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Descreva brevemente esta categoria..."
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="category-active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="category-active">Categoria ativa</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? 'Salvar Alterações' : 'Criar Categoria'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
