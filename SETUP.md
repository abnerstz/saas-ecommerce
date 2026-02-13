# 🚀 Setup do Projeto - SaaS Ecommerce

## 📋 Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 8+ 
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Redis** 6+ ([Download](https://redis.io/download)) *(opcional para desenvolvimento)*

## ⚡ Setup Rápido

### 1. 📥 Clone e Instale

```bash
# Clone o repositório
git clone <seu-repositorio>
cd saas-ecommerce

# Instale todas as dependências do monorepo
npm install

# Faça o build dos packages compartilhados
npm run build:packages
```

### 2. ⚙️ Configuração do Ambiente

```bash
# Copie o arquivo de exemplo
cp env.example .env

# Edite as variáveis de ambiente
nano .env  # ou seu editor preferido
```

**Variáveis essenciais para desenvolvimento:**
```bash
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/saas_ecommerce"
JWT_SECRET="seu-jwt-secret-aqui"
VITE_API_URL="http://localhost:3000/api"
```

### 3. 🗄️ Setup do Banco de Dados

```bash
# Criar o banco de dados
createdb saas_ecommerce

# Rodar migrations (quando o backend estiver pronto)
npm run db:migrate

# Seed inicial (quando disponível)
npm run db:seed
```

### 4. 🚀 Iniciar Desenvolvimento

```bash
# Iniciar todos os serviços em desenvolvimento
npm run dev

# Ou iniciar serviços individuais:
npm run dev:backend    # Backend NestJS (porta 3000)
npm run dev:admin      # Admin React (porta 3001)
npm run dev:ecommerce  # Ecommerce React (porta 3002)
npm run dev:landing    # Landing HTML (porta 3003)
```

## 📁 Estrutura Criada

```
saas-ecommerce/
├── 📦 packages/               # Packages compartilhados
│   ├── types/                # Tipos TypeScript
│   ├── utils/                # Utilitários (validação, formatação)
│   ├── ui/                   # Componentes UI (Shadcn)
│   └── api-client/           # Cliente HTTP + React Query hooks
│
├── 🎨 apps/ (próximo passo)   # Aplicações frontend
│   ├── admin/                # Painel administrativo
│   ├── ecommerce/            # Loja online
│   └── landing/              # Landing pages
│
├── 🚀 backend/ (próximo)     # API NestJS
│   ├── src/
│   │   ├── auth/            # Autenticação
│   │   ├── products/        # Gestão de produtos
│   │   ├── orders/          # Processamento de pedidos
│   │   └── ...              # Outros módulos
│   └── prisma/              # Schema do banco
│
└── 📖 docs/                  # Documentação completa
```

## 🔧 Scripts Disponíveis

### 📦 **Packages**
```bash
npm run build:packages    # Build todos os packages
npm run type-check        # Verificação de tipos
```

### 🧪 **Testes**
```bash
npm run test             # Todos os testes
npm run test:backend     # Testes do backend
npm run test:frontend    # Testes do frontend
```

### 🎨 **Lint e Formatação**
```bash
npm run lint             # ESLint em tudo
npm run lint:fix         # Fix automático
npm run format           # Prettier
```

### 🗄️ **Banco de Dados**
```bash
npm run db:migrate       # Rodar migrations
npm run db:seed          # Seed de dados
npm run db:reset         # Reset completo
```

### 🧹 **Limpeza**
```bash
npm run clean            # Limpar node_modules
npm run fresh            # Clean + install + build
```

## 📦 Packages Compartilhados

### 🔧 **@ecommerce/types**
Tipos TypeScript para todo o sistema:
```typescript
import { Product, Order, Customer } from '@ecommerce/types';
```

### 🛠️ **@ecommerce/utils**
Utilitários de validação, formatação e helpers:
```typescript
import { formatCurrency, validateData } from '@ecommerce/utils';
```

### 🎨 **@ecommerce/ui** *(próximo)*
Componentes Shadcn/UI customizados:
```typescript
import { Button, Card, Modal } from '@ecommerce/ui';
```

### 🌐 **@ecommerce/api-client**
Cliente HTTP e hooks React Query:
```typescript
import { useProducts, useCreateOrder } from '@ecommerce/api-client';
```

## 🚀 Próximos Passos

### ✅ **Concluído:**
- [x] Estrutura do monorepo
- [x] Configuração de workspaces
- [x] Packages compartilhados (types, utils, api-client)
- [x] Sistema de build coordenado

### 🔄 **Em Andamento:**
- [ ] Package UI (Shadcn/UI)
- [ ] Aplicação Admin React
- [ ] Aplicação Ecommerce React

### 📋 **Próximo:**
1. **Setup das aplicações frontend**
2. **Configuração do Shadcn/UI**
3. **Desenvolvimento dos módulos Admin**
4. **Backend NestJS + Prisma**

## 🆘 Troubleshooting

### 🔧 **Problemas Comuns:**

**1. Erro de dependências entre packages:**
```bash
npm run clean && npm install && npm run build:packages
```

**2. Erro de tipos TypeScript:**
```bash
npm run --workspace=@ecommerce/types build
npm run type-check
```

**3. Ports ocupadas:**
```bash
# Verificar portas em uso
netstat -ano | findstr :3000
netstat -ano | findstr :3001
```

**4. Cache issues:**
```bash
npm run clean
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentação

- **[Arquitetura Geral](docs/00-ARQUITETURA-GERAL.md)**
- **[Módulos Frontend](docs/08-FRONTEND-MODULES.md)**
- **[Repository Structure](docs/07-REPOSITORY-STRUCTURE.md)**
- **[Deployment Strategy](docs/06-DEPLOYMENT-STRATEGY.md)**

## 🤝 Desenvolvimento

### **Workflow:**
1. Criar feature branch: `git checkout -b feature/nova-funcionalidade`
2. Fazer alterações nos packages necessários
3. Buildar packages: `npm run build:packages`
4. Testar localmente: `npm run dev`
5. Commit e push: seguir conventional commits
6. Abrir Pull Request

### **Conventional Commits:**
```bash
feat(products): add product creation form
fix(auth): resolve login token expiration
docs(readme): update setup instructions
```

---

**🎉 Setup completo! Agora vamos desenvolver as aplicações frontend!**
