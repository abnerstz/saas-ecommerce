import { Helmet } from 'react-helmet-async'
import { Badge } from '@/components/ui'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { products, categories, Product } from '../../utils/mockData'
import { PageHeader } from '../../components/shared/PageHeader'
import { ProductStats } from '../../components/products/ProductStats'
import { ProductFilters } from '../../components/products/ProductFilters'
import { ProductsTable } from '../../components/products/ProductsTable'
import { ProductModal } from '../../components/products/ProductModal'

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
    activeCount: products.filter((p) => p.status === 'active').length,
    lowStockCount: products.filter((p) => p.stock <= 10 && p.stock > 0).length,
    outOfStockCount: products.filter((p) => p.stock === 0).length,
    totalValue: products.reduce((sum, p) => sum + p.totalValue, 0)
  }

  const clearFilters = () => {
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
          categories={categories}
          onClearFilters={clearFilters}
        />

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-normal text-muted-foreground uppercase tracking-wide">Lista de produtos</h2>
            <Badge variant="secondary" className="text-xs">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
            </Badge>
          </div>

          <ProductsTable
            products={filteredProducts}
            onView={handleViewProduct}
            onEdit={handleEditProduct}
            onClearFilters={clearFilters}
            hasActiveFilters={!!hasActiveFilters}
          />
        </div>

        <ProductModal
          isOpen={showProductDialog}
          onClose={() => setShowProductDialog(false)}
          product={selectedProduct}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          categories={categories}
        />
      </div>
    </>
  )
}