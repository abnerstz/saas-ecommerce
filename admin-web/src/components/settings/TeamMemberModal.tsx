import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch
} from '@/components/ui'

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  permissions: string[]
  active: boolean
  avatar?: string
}

interface TeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  member?: TeamMember | null
  onSave: (member: Partial<TeamMember>) => void
  mode: 'create' | 'edit' | 'view'
}

const availableRoles = [
  { value: 'administrador', label: 'Administrador' },
  { value: 'gerente', label: 'Gerente' },
  { value: 'operador', label: 'Operador' },
  { value: 'vendedor', label: 'Vendedor' },
  { value: 'suporte', label: 'Suporte' }
]

const availablePermissions = [
  { id: 'produtos', label: 'Gerenciar Produtos' },
  { id: 'pedidos', label: 'Gerenciar Pedidos' },
  { id: 'relatorios', label: 'Visualizar Relatórios' },
  { id: 'configuracoes', label: 'Acessar Configurações' },
  { id: 'usuarios', label: 'Gerenciar Usuários' }
]

export function TeamMemberModal({ isOpen, onClose, member, onSave, mode }: TeamMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    permissions: [] as string[],
    active: true
  })

  useEffect(() => {
    if (member && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: member.name,
        email: member.email,
        role: member.role,
        permissions: member.permissions ?? [],
        active: member.active
      })
    } else {
      setFormData({
        name: '',
        email: '',
        role: '',
        permissions: [],
        active: true
      })
    }
  }, [member, mode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'view') return
    onSave({
      ...formData,
      id: mode === 'edit' ? member?.id : undefined
    })
    onClose()
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId]
      })
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permissionId)
      })
    }
  }

  const handleClose = () => {
    setFormData({ name: '', email: '', role: '', permissions: [], active: true })
    onClose()
  }

  const isReadOnly = mode === 'view'

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' && 'Novo Membro'}
            {mode === 'edit' && 'Editar Membro'}
            {mode === 'view' && 'Detalhes do Membro'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' && 'Adicione um novo membro à equipe'}
            {mode === 'edit' && 'Edite as informações do membro da equipe'}
            {mode === 'view' && 'Visualize as informações do membro da equipe'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member-name">Nome Completo</Label>
            <Input
              id="member-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite o nome completo"
              required
              disabled={isReadOnly}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Digite o email"
              required
              disabled={isReadOnly}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="member-role">Cargo</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cargo" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((roleOption) => (
                  <SelectItem key={roleOption.value} value={roleOption.value}>
                    {roleOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Permissões</Label>
            <div className="space-y-2">
              {availablePermissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={permission.id}
                    checked={formData.permissions.includes(permission.id)}
                    onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                    disabled={isReadOnly}
                    className="rounded"
                  />
                  <Label htmlFor={permission.id} className="text-sm font-normal">
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="member-active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              disabled={isReadOnly}
            />
            <Label htmlFor="member-active">Membro ativo</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              {mode === 'view' ? 'Fechar' : 'Cancelar'}
            </Button>
            {mode !== 'view' && (
              <Button type="submit">
                {mode === 'create' ? 'Adicionar Membro' : 'Salvar Alterações'}
              </Button>
            )}
            {mode === 'view' && (
              <Button type="button" onClick={() => {
                handleClose()
                // Trigger edit mode - this would need to be handled by parent component
              }}>
                Editar
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
