import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardContent, Badge, Input } from '@/components/ui'
import { Filter, Grid, List, Star, Search } from 'lucide-react'

export default function Products() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock products data
  const productImages = [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop'
  ]
  
  const productNames = [
    'Smartphone Premium', 'Fone Bluetooth', 'Relógio Inteligente', 'Câmera Digital',
    'Tênis Esportivo', 'Mochila Urbana', 'Camiseta Premium', 'Óculos de Sol',
    'Notebook Gamer', 'Cadeira Ergonômica', 'Luminária LED', 'Planta Decorativa'
  ]

  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: productNames[i],
    price: Math.random() * 500 + 50,
    originalPrice: Math.random() * 600 + 100,
    image: productImages[i],
    rating: Math.random() * 2 + 3,
    reviews: Math.floor(Math.random() * 200) + 10,
    category: ['Eletrônicos', 'Roupas', 'Casa', 'Esportes'][Math.floor(Math.random() * 4)],
  }))

  const categories = ['Todos', 'Eletrônicos', 'Roupas', 'Casa', 'Esportes']

  return (
    <>
      <Helmet>
        <title>Produtos - Loja</title>
        <meta name="description" content="Explore nossa coleção completa de produtos com os melhores preços" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Produtos</h1>
          <p className="text-gray-600">
            Encontre exatamente o que você está procurando em nossa coleção completa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categorias
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        className="mr-2"
                        defaultChecked={category === 'Todos'}
                      />
                      <span className="text-sm text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faixa de Preço
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="Mín" />
                  <Input type="number" placeholder="Máx" />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avaliação
                </label>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          {rating}+ estrelas
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                Aplicar Filtros
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Mostrando {products.length} produtos
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Mais Relevantes</option>
                  <option>Menor Preço</option>
                  <option>Maior Preço</option>
                  <option>Mais Vendidos</option>
                  <option>Melhor Avaliados</option>
                </select>
                
                <div className="flex border border-gray-300 rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/produto/${product.id}`}
                  className="group"
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className={viewMode === 'grid' ? 'p-0' : 'p-4'}>
                      {viewMode === 'grid' ? (
                        // Grid View
                        <>
                          <div className="relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                            />
                            {product.originalPrice > product.price && (
                              <Badge className="absolute top-2 left-2 bg-red-500">
                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                              </Badge>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center space-x-1 mb-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">
                                {product.rating.toFixed(1)} ({product.reviews})
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-primary">
                                R$ {product.price.toFixed(2)}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  R$ {product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        // List View
                        <div className="flex space-x-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            {product.originalPrice > product.price && (
                              <Badge className="absolute -top-1 -right-1 bg-red-500 text-xs">
                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {product.category}
                            </p>
                            <div className="flex items-center space-x-1 mb-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">
                                {product.rating.toFixed(1)} ({product.reviews} avaliações)
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-primary">
                                R$ {product.price.toFixed(2)}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  R$ {product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline" disabled>
                  Anterior
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">
                  Próximo
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
