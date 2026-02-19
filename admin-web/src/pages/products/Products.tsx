import { Helmet } from 'react-helmet-async'
import { Badge, Button } from '@/components/ui'
import { Plus, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { products, categories, Product } from '../../utils/mockData'
import { PageHeader } from '../../components/shared/PageHeader'
import { ProductStats } from '../../components/products/ProductStats'
import { ProductFilters } from '../../components/products/ProductFilters'
import { ProductsTable } from '../../components/products/ProductsTable'
import { ProductModal } from '../../components/products/ProductModal'
import { CategoriesSection } from '../../components/products/CategoriesSection'

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [selectedStatus, setSelectedStatus] = useState('todos')
  const [selectedStock, setSelectedStock] = useState('todos')
  const [showProductDialog, setShowProductDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'todas' || product.category === selectedCategory
    const matchesStatus = selectedStatus === 'todos' || product.status === selectedStatus
    const matchesStock = selectedStock === 'todos' ||
                        (selectedStock === 'baixo' && product.stock <= 10) ||
                        (selectedStock === 'zero' && product.stock === 0) ||
                        (selectedStock === 'ok' && product.stock > 10)

    return matchesSearch && matchesCategory && matchesStatus && matchesStock
  })

  // Calculated statistics
  const stats = {
    total: products.length,
    ativos: products.filter(p => p.status === 'active').length,
    estoqueBaixo: products.filter(p => p.stock <= 10 && p.stock > 0).length,
    semEstoque: products.filter(p => p.stock === 0).length,
    valorTotal: products.reduce((sum, p) => sum + p.totalValue, 0)
  }

  const limparFiltros = () => {
    setSearchTerm('')
    setSelectedCategory('todas')
    setSelectedStatus('todos')
    setSelectedStock('todos')
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsEditing(false)
    setShowProductDialog(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsEditing(true)
    setShowProductDialog(true)
  }

  const handleNewProduct = () => {
    setSelectedProduct(null)
    setIsEditing(false)
    setShowProductDialog(true)
  }

  const hasActiveFilters = searchTerm || selectedCategory !== 'todas' || selectedStatus !== 'todos' || selectedStock !== 'todos'

  return (
    <>
      <Helmet>
        <title>Produtos - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <PageHeader
          title="Produtos"
          description="Gerencie seu catálogo de produtos"
          action={{
            label: 'Novo Produto',
            icon: <Plus className="w-4 h-4 mr-2" />,
            onClick: handleNewProduct
          }}
        />

        <ProductStats stats={stats} filteredCount={filteredProducts.length} />

        <ProductFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedStock={selectedStock}
          setSelectedStock={setSelectedStock}
          categorias={categories}
          onClearFilters={limparFiltros}
        />

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-medium text-foreground">Lista de Produtos</h2>
              <Badge variant="secondary" className="text-xs">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Exportar
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Excluir em Massa
              </Button>
            </div>
          </div>
          
                    <ProductsTable
            products={filteredProducts}
            onView={handleViewProduct}
            onEdit={handleEditProduct}
            onClearFilters={limparFiltros}
            hasActiveFilters={!!hasActiveFilters}
          />
        </div>

        <CategoriesSection />

        <ProductModal
          isOpen={showProductDialog}
          onClose={() => setShowProductDialog(false)}
          product={selectedProduct}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          categorias={categories}
        />
      </div>
    </>
  )
}