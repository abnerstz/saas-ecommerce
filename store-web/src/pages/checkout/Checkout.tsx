import { Helmet } from 'react-helmet-async'
import { CreditCard } from 'lucide-react'

export default function Checkout() {
  return (
    <>
      <Helmet>
        <title>Checkout - Loja</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Finalizar Compra
        </h1>

        <div className="text-center py-16">
          <CreditCard className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Checkout em Desenvolvimento
          </h2>
          <p className="text-gray-600">
            A página de checkout será implementada em breve com todas as funcionalidades de pagamento.
          </p>
        </div>
      </div>
    </>
  )
}
