import { Helmet } from 'react-helmet-async'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { User, Package, Heart, Settings } from 'lucide-react'

export default function Account() {
  return (
    <>
      <Helmet>
        <title>Minha Conta - Loja</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Minha Conta
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <User className="mx-auto h-12 w-12 text-primary mb-2" />
              <CardTitle>Perfil</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm">
                Gerencie suas informações pessoais
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Package className="mx-auto h-12 w-12 text-primary mb-2" />
              <CardTitle>Pedidos</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm">
                Acompanhe seus pedidos
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Heart className="mx-auto h-12 w-12 text-primary mb-2" />
              <CardTitle>Favoritos</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm">
                Seus produtos favoritos
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Settings className="mx-auto h-12 w-12 text-primary mb-2" />
              <CardTitle>Configurações</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm">
                Configurações da conta
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Funcionalidades da conta serão implementadas em breve
          </p>
        </div>
      </div>
    </>
  )
}
