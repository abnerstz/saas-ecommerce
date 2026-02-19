import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { Store, Users } from 'lucide-react'
import { PageHeader } from '../../components/shared/PageHeader'
import { StoreSettings } from '../../components/settings/StoreSettings'
import { TeamSettings } from '../../components/settings/TeamSettings'

const VALID_TABS = ['loja', 'equipe'] as const
type SettingsTab = typeof VALID_TABS[number]

function isValidTab(tab: string | undefined): tab is SettingsTab {
  return tab !== undefined && VALID_TABS.includes(tab as SettingsTab)
}

export default function Settings() {
  const { tab } = useParams<{ tab: string }>()
  const navigate = useNavigate()
  const activeTab = isValidTab(tab) ? tab : 'loja'

  useEffect(() => {
    if (!isValidTab(tab)) {
      navigate('/settings/loja', { replace: true })
    }
  }, [tab, navigate])

  const setActiveTab = (value: string) => {
    if (VALID_TABS.includes(value as SettingsTab)) {
      navigate(`/settings/${value}`, { replace: true })
    }
  }

  return (
    <>
      <Helmet>
        <title>Configurações - Painel</title>
      </Helmet>

      <div className="space-y-4">
        <PageHeader
          title="Configurações"
          description="Dados da loja e equipe"
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1 max-w-md">
            <TabsTrigger value="loja" className="text-xs h-9">
              <Store className="w-3 h-3 mr-1" />
              Loja
            </TabsTrigger>
            <TabsTrigger value="equipe" className="text-xs h-9">
              <Users className="w-3 h-3 mr-1" />
              Equipe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="loja" className="space-y-4 mt-4">
            <StoreSettings />
          </TabsContent>

          <TabsContent value="equipe" className="space-y-4 mt-4">
            <TeamSettings />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
