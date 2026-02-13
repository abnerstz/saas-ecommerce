import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button
} from '@ecommerce/ui'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { Product } from '../../utils/mockData'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  isEditing: boolean
  setIsEditing: (editing: boolean) => void
  categorias: string[]
}

export function ProductModal({ 
  isOpen, 
  onClose, 
  product, 
  isEditing, 
  setIsEditing, 
  categorias 
}: ProductModalProps) {
  const [productImages, setProductImages] = useState<string[]>(product?.images || [])
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = (files: FileList | null) => {
    if (!files || (!isEditing && product)) return
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          setProductImages(prev => [...prev, imageUrl])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const removeImage = (index: number) => {
    if (!isEditing && product) return
    setProductImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {!product ? 'Novo Produto' : isEditing ? 'Editar Produto' : 'Visualizar Produto'}
          </DialogTitle>
          <DialogDescription>
            {!product ? 'Adicione um novo produto ao seu catálogo' : 
             isEditing ? 'Edite as informações do produto' : 'Visualize os detalhes do produto'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Nome do Produto</label>
              <Input 
                defaultValue={product?.name || ''} 
                disabled={!isEditing && !!product}
                className="mt-1 h-9 text-sm" 
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">SKU</label>
              <Input 
                defaultValue={product?.sku || ''} 
                disabled={!isEditing && !!product}
                className="mt-1 h-9 text-sm" 
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Categoria</label>
              <Select defaultValue={product?.category || ''} disabled={!isEditing && !!product}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map(categoria => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</label>
              <Select defaultValue={product?.status || 'active'} disabled={!isEditing && product !== null}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Preço de Venda</label>
              <Input 
                type="number" 
                defaultValue={product?.price || ''} 
                disabled={!isEditing && !!product}
                className="mt-1 h-9 text-sm" 
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Custo</label>
              <Input 
                type="number" 
                defaultValue={product?.cost || ''} 
                disabled={!isEditing && !!product}
                className="mt-1 h-9 text-sm" 
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Estoque</label>
              <Input 
                type="number" 
                defaultValue={product?.stock || ''} 
                disabled={!isEditing && !!product}
                className="mt-1 h-9 text-sm" 
              />
            </div>
            {product && (
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Vendas (30 dias)</label>
                <Input 
                  type="number" 
                  defaultValue={product?.sales30d || 0} 
                  disabled
                  className="mt-1 h-9 text-sm bg-muted" 
                />
              </div>
            )}
          </div>
        </div>

        {/* Seção de Imagens */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Imagens do Produto</label>
          
          {/* Área de Upload */}
          {(!product || isEditing) && (
            <div
              className={`mt-2 border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Arraste imagens aqui ou <span className="text-blue-600 underline">clique para selecionar</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG até 5MB cada</p>
              </label>
            </div>
          )}

          {/* Galeria de Imagens */}
          {productImages.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Produto ${index + 1}`}
                    className="w-full h-20 object-cover rounded-md border"
                  />
                  {(!product || isEditing) && (
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs px-1 py-0.5 rounded-tl-md">
                      Principal
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Estado vazio quando só visualizando e sem imagens */}
          {productImages.length === 0 && product && !isEditing && (
            <div className="mt-2 border rounded-lg p-4 text-center text-gray-500">
              <ImageIcon className="w-8 h-8 mx-auto text-gray-300 mb-2" />
              <p className="text-sm">Nenhuma imagem cadastrada</p>
            </div>
          )}
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Descrição</label>
          <textarea 
            defaultValue={product?.description || ''} 
            disabled={!isEditing && !!product}
            className="mt-1 text-sm flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
            rows={3}
            placeholder="Descrição do produto..."
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {(!product || isEditing) && (
            <Button onClick={onClose}>
              {!product ? 'Criar Produto' : 'Salvar Alterações'}
            </Button>
          )}
          {product && !isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              Editar Produto
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
