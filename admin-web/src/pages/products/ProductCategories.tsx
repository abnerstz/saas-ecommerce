import { Helmet } from 'react-helmet-async'
import { PageHeader } from '../../components/shared/PageHeader'
import { CategoriesSection } from '../../components/products/CategoriesSection'

export default function ProductCategories() {
  return (
    <>
      <Helmet>
        <title>Categorias - Produtos</title>
      </Helmet>
      <div className="space-y-6">
        <PageHeader
          title="Categorias"
          description="Organize os produtos por categorias (ex.: cervejas, vinhos, destilados)"
        />
        <CategoriesSection />
      </div>
    </>
  )
}
