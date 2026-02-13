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
} from '@ecommerce/ui'

interface TeamMember {
  id: string
  nome: string
  email: string
  cargo: string
  permissoes: string[]
  ativo: boolean
  avatar?: string
}

interface TeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  member?: TeamMember | null
  onSave: (member: Partial<TeamMember>) => void
  mode: 'create' | 'edit' | 'view'
}

const cargosDisponiveis = [
  { value: 'administrador', label: 'Administrador' },
  { value: 'gerente', label: 'Gerente' },
  { value: 'operador', label: 'Operador' },
  { value: 'vendedor', label: 'Vendedor' },
  { value: 'suporte', label: 'Suporte' }
]

const permissoesDisponiveis = [
  { id: 'produtos', label: 'Gerenciar Produtos' },
  { id: 'pedidos', label: 'Gerenciar Pedidos' },
  { id: 'clientes', label: 'Gerenciar Clientes' },
  { id: 'relatorios', label: 'Visualizar Relatórios' },
  { id: 'configuracoes', label: 'Acessar Configurações' },
  { id: 'usuarios', label: 'Gerenciar Usuários' }
]

export function TeamMemberModal({ isOpen, onClose, member, onSave, mode }: TeamMemberModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cargo: '',
    permissoes: [] as string[],
    ativo: true
  })

  useEffect(() => {
    if (member && (mode === 'edit' || mode === 'view')) {
      setFormData({
        nome: member.nome,
        email: member.email,
        cargo: member.cargo,
        permissoes: member.permissoes || [],
        ativo: member.ativo
      })
    } else {
      setFormData({
        nome: '',
        email: '',
        cargo: '',
        permissoes: [],
        ativo: true
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
        permissoes: [...formData.permissoes, permissionId]
      })
    } else {
      setFormData({
        ...formData,
        permissoes: formData.permissoes.filter(p => p !== permissionId)
      })
    }
  }

  const handleClose = () => {
    setFormData({ nome: '', email: '', cargo: '', permissoes: [], ativo: true })
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
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
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
            <Label htmlFor="cargo">Cargo</Label>
            <Select 
              value={formData.cargo} 
              onValueChange={(value) => setFormData({ ...formData, cargo: value })}
              disabled={isReadOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cargo" />
              </SelectTrigger>
              <SelectContent>
                {cargosDisponiveis.map(cargo => (
                  <SelectItem key={cargo.value} value={cargo.value}>
                    {cargo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Permissões</Label>
            <div className="space-y-2">
              {permissoesDisponiveis.map(permissao => (
                <div key={permissao.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={permissao.id}
                    checked={formData.permissoes.includes(permissao.id)}
                    onChange={(e) => handlePermissionChange(permissao.id, e.target.checked)}
                    disabled={isReadOnly}
                    className="rounded"
                  />
                  <Label htmlFor={permissao.id} className="text-sm font-normal">
                    {permissao.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="ativo"
              checked={formData.ativo}
              onCheckedChange={(checked) => setFormData({ ...formData, ativo: checked })}
              disabled={isReadOnly}
            />
            <Label htmlFor="ativo">Membro ativo</Label>
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
