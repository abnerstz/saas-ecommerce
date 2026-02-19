import { useState } from 'react'
import { 
  Button, 
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui'
import { Save, Eye, Trash2, Edit, Plus } from 'lucide-react'
import { TeamMemberModal } from './TeamMemberModal'

interface TeamMember {
  id: string
  nome: string
  email: string
  cargo: string
  permissoes: string[]
  ativo: boolean
  avatar?: string
}

const teamMembersInitial: TeamMember[] = [
  {
    id: '1',
    nome: 'Admin Santos',
    email: 'admin@saasecommerce.com',
    cargo: 'administrador',
    permissoes: ['produtos', 'pedidos', 'clientes', 'relatorios', 'configuracoes', 'usuarios'],
    ativo: true
  },
  {
    id: '2',
    nome: 'Maria Garcia',
    email: 'maria@saasecommerce.com',
    cargo: 'operador',
    permissoes: ['produtos', 'pedidos', 'clientes'],
    ativo: true
  },
  {
    id: '3',
    nome: 'João Silva',
    email: 'joao@saasecommerce.com',
    cargo: 'operador',
    permissoes: ['produtos', 'pedidos'],
    ativo: true
  }
]

export function TeamSettings() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(teamMembersInitial)
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null)

  const handleNewMember = () => {
    setSelectedMember(null)
    setModalMode('create')
    setShowMemberModal(true)
  }

  const handleViewMember = (member: TeamMember) => {
    setSelectedMember(member)
    setModalMode('view')
    setShowMemberModal(true)
  }

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member)
    setModalMode('edit')
    setShowMemberModal(true)
  }

  const handleDeleteMember = (member: TeamMember) => {
    setMemberToDelete(member)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (memberToDelete) {
      setTeamMembers(teamMembers.filter(m => m.id !== memberToDelete.id))
      setShowDeleteDialog(false)
      setMemberToDelete(null)
    }
  }

  const handleSaveMember = (memberData: Partial<TeamMember>) => {
    if (modalMode === 'edit' && selectedMember) {
      // Editar membro existente
      setTeamMembers(teamMembers.map(m => 
        m.id === selectedMember.id 
          ? { ...m, ...memberData }
          : m
      ))
    } else if (modalMode === 'create') {
      // Criar novo membro
      const newMember: TeamMember = {
        id: Date.now().toString(),
        nome: memberData.nome || '',
        email: memberData.email || '',
        cargo: memberData.cargo || '',
        permissoes: memberData.permissoes || [],
        ativo: memberData.ativo ?? true
      }
      setTeamMembers([...teamMembers, newMember])
    }
  }

  const getCargoLabel = (cargo: string) => {
    const cargos: Record<string, string> = {
      administrador: 'Administrador',
      gerente: 'Gerente',
      operador: 'Operador',
      vendedor: 'Vendedor',
      suporte: 'Suporte'
    }
    return cargos[cargo] || cargo
  }

  const getCargoVariant = (cargo: string) => {
    if (cargo === 'administrador') return 'default'
    return 'secondary'
  }

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium text-foreground">Gerenciamento de Equipe</h3>
      
      <div className="space-y-4 p-4 rounded-lg border bg-card">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Membros da Equipe</h4>
          <Button className="text-xs h-8" onClick={handleNewMember}>
            <Plus className="w-3 h-3 mr-1" />
            Adicionar Membro
          </Button>
        </div>
        
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg bg-background">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">
                    {getInitials(member.nome)}
                  </span>
                </div>
                <div>
                  <h5 className="font-medium text-sm text-foreground">{member.nome}</h5>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={getCargoVariant(member.cargo)} className="text-xs">
                  {getCargoLabel(member.cargo)}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-6 text-xs px-2"
                  onClick={() => handleViewMember(member)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Ver
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-6 text-xs px-2"
                  onClick={() => handleEditMember(member)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>
                {member.cargo !== 'administrador' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-6 text-xs px-2 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteMember(member)}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Remover
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="text-xs h-8">
          <Save className="w-3 h-3 mr-1" />
          Salvar Configurações
        </Button>
      </div>

      {/* Team Member Modal */}
      <TeamMemberModal
        isOpen={showMemberModal}
        onClose={() => setShowMemberModal(false)}
        member={selectedMember}
        onSave={handleSaveMember}
        mode={modalMode}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Remoção</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover "{memberToDelete?.nome}" da equipe? 
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
