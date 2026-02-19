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
  nome: string
  descricao: string
  ativa: boolean
  produtosCount?: number
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
    nome: '',
    descricao: '',
    ativa: true
  })

  useEffect(() => {
    if (category && isEditing) {
      setFormData({
        nome: category.nome,
        descricao: category.descricao,
        ativa: category.ativa
      })
    } else {
      setFormData({
        nome: '',
        descricao: '',
        ativa: true
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
    setFormData({ nome: '', descricao: '', ativa: true })
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
            <Label htmlFor="nome">Nome da Categoria</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: Eletrônicos, Roupas, Casa..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descreva brevemente esta categoria..."
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="ativa"
              checked={formData.ativa}
              onChange={(e) => setFormData({ ...formData, ativa: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="ativa">Categoria ativa</Label>
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
