import { Helmet } from 'react-helmet-async'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui'
import {
  DollarSign,
  ShoppingCart,
  Package,
  Store,
  Globe,
  Users,
  Building2,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import {
  dashboardMetrics,
  salesChannels,
  inventoryStatus,
  orders,
  storeInfo,
  teamMembers
} from '../../utils/mockData'
import { MetricCard } from '../../components/dashboard/MetricCard'

export default function Dashboard() {
  const activeOrdersCount = orders.filter(
    (p) => p.status === 'pending' || p.status === 'processing'
  ).length

  return (
    <>
      <Helmet>
        <title>Início - Painel</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            Visão geral
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Resumo de vendas e estoque da loja
          </p>
        </div>

        <section>
          <h2 className="text-xs font-normal text-muted-foreground mb-3 uppercase tracking-wide">
            Principais números
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <MetricCard
              title="Receita no período"
              value={dashboardMetrics.totalRevenue}
              previousValue={dashboardMetrics.previousRevenue}
              icon={DollarSign}
              format="currency"
            />
            <Card className="hover:shadow-sm transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Pedidos ativos
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-foreground tabular-nums">{activeOrdersCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Aguardando ou em preparo
                </p>
              </CardContent>
            </Card>
            <MetricCard
              title="Ticket médio"
              value={dashboardMetrics.averageOrderValue}
              previousValue={dashboardMetrics.previousAverageOrderValue}
              icon={DollarSign}
              format="currency"
            />
            <Card className="hover:shadow-sm transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Estoque em falta
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-foreground tabular-nums">
                  {inventoryStatus.outOfStock}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {inventoryStatus.lowStock} com estoque baixo
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-sm transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wide">
                  <Store className="w-4 h-4 shrink-0" />
                  Vendas por canal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salesChannels.map((channel) => (
                    <div key={channel.name} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {channel.name === 'Loja física' ? (
                          <Store className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        ) : (
                          <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        )}
                        <span className="text-xs truncate">{channel.name}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-medium tabular-nums">
                          R$ {(channel.value / 1000).toFixed(0)}k
                        </span>
                        <Badge variant="secondary" className="ml-1 text-[10px] px-1">
                          {channel.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-normal text-muted-foreground mb-3 uppercase tracking-wide">
            Informações gerais
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Building2 className="w-4 h-4 shrink-0" />
                  Informações da loja
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="font-medium text-foreground">{storeInfo.name}</p>
                <p className="text-muted-foreground">{storeInfo.cnpj}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a href={`mailto:${storeInfo.email}`} className="hover:text-foreground">
                    {storeInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 shrink-0" />
                  {storeInfo.phone}
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{storeInfo.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Users className="w-4 h-4 shrink-0" />
                  Equipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div
                      key={member.email}
                      className="flex items-center justify-between gap-2 py-2 border-b border-border/60 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-xs text-muted-foreground hover:text-foreground truncate max-w-[140px]"
                      >
                        {member.email}
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Package className="w-4 h-4 shrink-0" />
                  Resumo do catálogo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Produtos ativos</span>
                  <span className="text-sm font-medium tabular-nums">{dashboardMetrics.activeProducts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total de clientes</span>
                  <span className="text-sm font-medium tabular-nums">{dashboardMetrics.totalCustomers.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pedidos no período</span>
                  <span className="text-sm font-medium tabular-nums">{dashboardMetrics.totalOrders.toLocaleString('pt-BR')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  )
}
