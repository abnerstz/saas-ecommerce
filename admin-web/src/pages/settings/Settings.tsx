import { Helmet } from 'react-helmet-async'
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui'
import { 
  Store,
  CreditCard,
  Truck,
  Bell,
  Users,
  Server
} from 'lucide-react'
import { useState } from 'react'
import { PageHeader } from '../../components/shared/PageHeader'
import { SettingsStats } from '../../components/settings/SettingsStats'
import { StoreSettings } from '../../components/settings/StoreSettings'
import { PaymentSettings } from '../../components/settings/PaymentSettings'
import { ShippingSettings } from '../../components/settings/ShippingSettings'
import { NotificationSettings } from '../../components/settings/NotificationSettings'
import { TeamSettings } from '../../components/settings/TeamSettings'
import { SystemSettings } from '../../components/settings/SystemSettings'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('store')

  return (
    <>
      <Helmet>
        <title>Configurações - Admin</title>
      </Helmet>

      <div className="space-y-4">
        <PageHeader
          title="Configurações"
          description="Configure sua loja e preferências do sistema"
        />

        <SettingsStats />

        <div className="space-y-3">
          <h2 className="text-base font-medium text-foreground">Seções de Configuração</h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto p-1">
              <TabsTrigger value="store" className="text-xs h-9">
                <Store className="w-3 h-3 mr-1" />
                Loja
              </TabsTrigger>
              <TabsTrigger value="payments" className="text-xs h-9">
                <CreditCard className="w-3 h-3 mr-1" />
                Pagamentos
              </TabsTrigger>
              <TabsTrigger value="shipping" className="text-xs h-9">
                <Truck className="w-3 h-3 mr-1" />
                Envio
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs h-9">
                <Bell className="w-3 h-3 mr-1" />
                Notificações
              </TabsTrigger>
              <TabsTrigger value="team" className="text-xs h-9">
                <Users className="w-3 h-3 mr-1" />
                Equipe
              </TabsTrigger>
              <TabsTrigger value="system" className="text-xs h-9">
                <Server className="w-3 h-3 mr-1" />
                Sistema
              </TabsTrigger>
            </TabsList>

            <TabsContent value="store" className="space-y-4">
              <StoreSettings />
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
              <PaymentSettings />
            </TabsContent>

            <TabsContent value="shipping" className="space-y-4">
              <ShippingSettings />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <NotificationSettings />
            </TabsContent>

            <TabsContent value="team" className="space-y-4">
              <TeamSettings />
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              <SystemSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
