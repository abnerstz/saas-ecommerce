import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@ecommerce/ui'
import { Plus, Eye, Edit, Trash2, Tag } from 'lucide-react'
import { CategoryModal } from './CategoryModal'

interface Category {
  id: string
  nome: string
  descricao: string
  ativa: boolean
  produtosCount: number
}

// Mock data - em produção viria da API
const categoriasMock: Category[] = [
  { id: '1', nome: 'Eletrônicos', descricao: 'Smartphones, tablets, laptops e acessórios', ativa: true, produtosCount: 45 },
  { id: '2', nome: 'Roupas', descricao: 'Vestuário masculino e feminino', ativa: true, produtosCount: 123 },
  { id: '3', nome: 'Casa e Jardim', descricao: 'Móveis, decoração e utensílios domésticos', ativa: true, produtosCount: 78 },
  { id: '4', nome: 'Esportes', descricao: 'Equipamentos esportivos e fitness', ativa: false, produtosCount: 32 },
  { id: '5', nome: 'Livros', descricao: 'Literatura, técnicos e educacionais', ativa: true, produtosCount: 156 }
]

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>(categoriasMock)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)

  const handleNewCategory = () => {
    setSelectedCategory(null)
    setIsEditing(false)
    setShowCategoryModal(true)
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setIsEditing(true)
    setShowCategoryModal(true)
  }

  const handleViewCategory = (category: Category) => {
    setSelectedCategory(category)
    setShowViewDialog(true)
  }

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter(cat => cat.id !== categoryToDelete.id))
      setShowDeleteDialog(false)
      setCategoryToDelete(null)
    }
  }

  const handleSaveCategory = (categoryData: Partial<Category>) => {
    if (isEditing && selectedCategory) {
      // Editar categoria existente
      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id 
          ? { ...cat, ...categoryData }
          : cat
      ))
    } else {
      // Criar nova categoria
      const newCategory: Category = {
        id: Date.now().toString(),
        nome: categoryData.nome || '',
        descricao: categoryData.descricao || '',
        ativa: categoryData.ativa ?? true,
        produtosCount: 0
      }
      setCategories([...categories, newCategory])
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-base font-semibold flex items-center">
            <Tag className="w-4 h-4 mr-2" />
            Categorias de Produtos
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Gerencie as categorias para organizar seus produtos
          </p>
        </div>
        <Button onClick={handleNewCategory} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Nova Categoria
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.nome}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {category.descricao}
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.ativa ? "default" : "secondary"}>
                      {category.ativa ? "Ativa" : "Inativa"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {category.produtosCount} produtos
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewCategory(category)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteCategory(category)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Category Modal */}
        <CategoryModal
          isOpen={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          category={selectedCategory}
          onSave={handleSaveCategory}
          isEditing={isEditing}
        />

        {/* View Category Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes da Categoria</DialogTitle>
              <DialogDescription>
                Informações completas sobre a categoria
              </DialogDescription>
            </DialogHeader>
            
            {selectedCategory && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome</label>
                  <p className="text-sm font-semibold">{selectedCategory.nome}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Descrição</label>
                  <p className="text-sm">{selectedCategory.descricao || 'Sem descrição'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      <Badge variant={selectedCategory.ativa ? "default" : "secondary"}>
                        {selectedCategory.ativa ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Produtos</label>
                    <div className="mt-1">
                      <Badge variant="outline">
                        {selectedCategory.produtosCount} produtos
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                Fechar
              </Button>
              <Button onClick={() => {
                setShowViewDialog(false)
                if (selectedCategory) {
                  handleEditCategory(selectedCategory)
                }
              }}>
                Editar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir a categoria "{categoryToDelete?.nome}"? 
                Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
