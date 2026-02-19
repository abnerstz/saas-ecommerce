import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react'

export default function Home() {
  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Smartphone Premium',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      name: 'Fone Bluetooth',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      name: 'Relógio Inteligente',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      rating: 4.3,
      reviews: 234,
    },
    {
      id: 4,
      name: 'Câmera Digital',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop',
      rating: 4.6,
      reviews: 156,
    },
  ]

  const categories = [
    { name: 'Eletrônicos', count: 120, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop' },
    { name: 'Roupas', count: 89, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop' },
    { name: 'Casa e Jardim', count: 156, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop' },
    { name: 'Esportes', count: 67, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop' },
  ]

  const benefits = [
    {
      icon: Truck,
      title: 'Frete Grátis',
      description: 'Em compras acima de R$ 199',
    },
    {
      icon: Shield,
      title: 'Compra Segura',
      description: 'Seus dados protegidos',
    },
    {
      icon: Headphones,
      title: 'Suporte 24/7',
      description: 'Atendimento sempre disponível',
    },
  ]

  return (
    <>
      <Helmet>
        <title>Início - Loja</title>
        <meta name="description" content="Encontre os melhores produtos com preços incríveis em nossa loja online" />
      </Helmet>

      <div className="space-y-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold">
                  Sua Loja
                  <span className="block text-yellow-300">Online Favorita</span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100">
                  Descubra produtos incríveis com os melhores preços e qualidade garantida.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary" className="text-primary font-semibold">
                    Ver Produtos
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    Ofertas Especiais
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop"
                  alt="Hero"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compre por Categoria
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encontre exatamente o que você está procurando navegando por nossas categorias
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to="/produtos" className="group">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                    />
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.count} produtos</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Selecionamos os melhores produtos com ofertas especiais para você
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/produto/${product.id}`} className="group">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/produtos">
              <Button size="lg">
                Ver Todos os Produtos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Fique por Dentro das Novidades
              </h2>
              <p className="text-gray-600 mb-8">
                Receba ofertas exclusivas e novidades diretamente no seu email
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button size="lg">
                  Inscrever-se
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
