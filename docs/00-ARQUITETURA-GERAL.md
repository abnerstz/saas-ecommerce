# Arquitetura Geral - SaaS Ecommerce Multi-Nicho

## Visão Geral

Este documento define a arquitetura geral do sistema de ecommerce multi-nicho, projetado para ser flexível e adaptável a diferentes tipos de negócio (lanchonetes, lojas de roupas, infoprodutos, etc.).

## Decisões Arquiteturais

### 1. Estrutura Geral
- **Backend**: Monolito modular (NestJS + TypeScript + Prisma + PostgreSQL)
- **Frontend**: Três aplicações separadas compartilhando bibliotecas comuns
- **Banco de Dados**: PostgreSQL único com schema flexível

### 2. Justificativa: Monolito Modular

**Por que não microserviços inicialmente:**
- Menor complexidade operacional
- Custo reduzido (um servidor, um banco)
- Transações ACID simplificadas
- Debugging e logging centralizados
- Time pequeno no início

**Por que não monolito tradicional:**
- Módulos bem definidos facilitam migração futura
- Separação clara de responsabilidades
- Testabilidade isolada por módulo
- Escalabilidade vertical mais eficiente

### 3. Estrutura de Módulos Backend

```
src/
├── common/           # Utilitários, guards, interceptors compartilhados
├── auth/            # Autenticação e autorização
├── users/           # Gestão de usuários
├── tenants/         # Multi-tenancy (lojas)
├── products/        # Gestão de produtos flexível
├── orders/          # Processamento de pedidos
├── payments/        # Integração com gateways de pagamento
├── notifications/   # Sistema de notificações
├── analytics/       # Relatórios e métricas
├── customization/   # Personalização por nicho
├── integrations/    # APIs externas (correios, etc.)
└── admin/           # Operações administrativas
```

### 4. Estrutura Frontend

**Aplicações Separadas:**
- `apps/admin/` - Painel administrativo
- `apps/ecommerce/` - Loja online
- `apps/landing/` - Landing pages

**Bibliotecas Compartilhadas:**
- `packages/ui/` - Componentes UI reutilizáveis
- `packages/types/` - Tipos TypeScript compartilhados
- `packages/utils/` - Utilitários comuns
- `packages/api-client/` - Cliente HTTP para backend

### 5. Banco de Dados Flexível

**Estratégia:**
- Schema base comum para todos os nichos
- Campos JSON para customizações específicas
- Tabelas de configuração por tenant
- Sistema de atributos dinâmicos para produtos

### 6. Multi-Tenancy

**Abordagem: Schema Compartilhado com Isolamento por Tenant ID**
- Cada loja tem um `tenant_id`
- Dados isolados via RLS (Row Level Security)
- Configurações específicas por tenant
- Customizações visuais por tenant

## Próximos Passos

1. Definir detalhamento de cada módulo
2. Projetar schema do banco de dados
3. Configurar estrutura de projetos
4. Implementar módulos core primeiro

## Migração Futura

A arquitetura permite migração para microserviços quando necessário:
- Cada módulo pode ser extraído independentemente
- API Gateway pode ser introduzido gradualmente
- Banco pode ser particionado por módulo
