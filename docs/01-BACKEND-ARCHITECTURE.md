# Arquitetura Backend - NestJS Modular

## Stack Tecnológico

- **Framework**: NestJS (Node.js + TypeScript)
- **ORM**: Prisma
- **Banco**: PostgreSQL
- **Cache**: Redis (opcional, para performance)
- **Validação**: class-validator + class-transformer
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest + Supertest

## Estrutura de Módulos

### Core Modules

#### 1. AuthModule
**Responsabilidades:**
- Autenticação JWT
- Refresh tokens
- Políticas de autorização
- Integração com provedores externos (Google, Facebook)

**Endpoints principais:**
```typescript
POST /auth/login
POST /auth/register
POST /auth/refresh
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
```

#### 2. UsersModule
**Responsabilidades:**
- CRUD de usuários
- Perfis de usuário
- Permissões e roles
- Gestão de dados pessoais

**Tipos de usuário:**
- `SUPER_ADMIN` - Administrador da plataforma
- `TENANT_ADMIN` - Dono da loja
- `EMPLOYEE` - Funcionário da loja
- `CUSTOMER` - Cliente final

#### 3. TenantsModule
**Responsabilidades:**
- Gestão de lojas/tenants
- Configurações por tenant
- Customizações visuais
- Planos e limites

**Features:**
- Multi-tenancy com isolamento de dados
- Configurações flexíveis por nicho
- Temas e layouts personalizáveis
- Limites baseados em plano

### Business Modules

#### 4. ProductsModule
**Responsabilidades:**
- CRUD de produtos flexível
- Categorias dinâmicas
- Atributos customizáveis
- Variações de produtos
- Estoque

**Flexibilidade por nicho:**
```typescript
// Produto base
interface BaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  tenant_id: string;
  custom_attributes: Record<string, any>; // Flexibilidade
}

// Exemplos de custom_attributes por nicho:
// Lanchonete: { ingredients: [], cooking_time: 15, spice_level: 'mild' }
// Roupas: { size: 'M', color: 'blue', material: 'cotton' }
// Infoproduto: { format: 'video', duration: 3600, access_type: 'lifetime' }
```

#### 5. OrdersModule
**Responsabilidades:**
- Processamento de pedidos
- Workflow flexível por nicho
- Estados customizáveis
- Integração com fulfillment

**Estados flexíveis:**
```typescript
// Estados base: pending, confirmed, processing, shipped, delivered, cancelled
// Estados customizáveis por nicho:
// Lanchonete: preparing, ready_for_pickup, out_for_delivery
// Infoproduto: payment_confirmed, access_granted
// Físico: packed, in_transit, delivered
```

#### 6. PaymentsModule
**Responsabilidades:**
- Integração com gateways (Stripe, PagSeguro, Mercado Pago)
- Processamento de pagamentos
- Webhooks
- Reconciliação financeira

**Suporte a:**
- Cartão de crédito/débito
- PIX
- Boleto bancário
- PayPal
- Assinaturas recorrentes

### Support Modules

#### 7. NotificationsModule
**Responsabilidades:**
- Emails transacionais
- Push notifications
- SMS
- Notificações in-app

#### 8. AnalyticsModule
**Responsabilidades:**
- Métricas de vendas
- Comportamento do usuário
- Relatórios customizáveis
- Dashboard analytics

#### 9. CustomizationModule
**Responsabilidades:**
- Templates por nicho
- Configurações de UI
- Workflows customizáveis
- Regras de negócio específicas

#### 10. IntegrationsModule
**Responsabilidades:**
- APIs de frete (Correios, transportadoras)
- ERPs externos
- Marketplaces
- Ferramentas de marketing

## Padrões de Design

### 1. Repository Pattern
```typescript
@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService
  ) {}
  
  async findByTenant(tenantId: string, filters: ProductFilters) {
    // Implementação com cache e filtros flexíveis
  }
}
```

### 2. Event-Driven Architecture
```typescript
// Eventos para desacoplamento
@EventPattern('order.created')
handleOrderCreated(data: OrderCreatedEvent) {
  // Dispara emails, atualiza estoque, etc.
}
```

### 3. Strategy Pattern para Nichos
```typescript
interface NicheStrategy {
  calculateShipping(order: Order): Promise<ShippingCost>;
  validateProduct(product: Product): ValidationResult;
  getOrderWorkflow(): OrderState[];
}

@Injectable()
export class RestaurantStrategy implements NicheStrategy {
  // Implementação específica para lanchonetes
}
```

## Configuração e Ambiente

### Environment Variables
```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/ecommerce"

# JWT
JWT_SECRET="your-secret"
JWT_EXPIRES_IN="1d"

# Cache
REDIS_URL="redis://localhost:6379"

# External APIs
STRIPE_SECRET_KEY="sk_test_..."
MERCADOPAGO_ACCESS_TOKEN="TEST-..."
```

### Database Schema Preview
```prisma
model Tenant {
  id           String @id @default(cuid())
  name         String
  domain       String @unique
  niche        String // restaurant, fashion, digital, etc.
  settings     Json   // Configurações específicas
  created_at   DateTime @default(now())
  
  users        User[]
  products     Product[]
  orders       Order[]
}

model Product {
  id               String @id @default(cuid())
  tenant_id        String
  name             String
  price            Decimal
  custom_attributes Json   // Flexibilidade por nicho
  
  tenant           Tenant @relation(fields: [tenant_id], references: [id])
}
```

## Segurança

### 1. Multi-tenancy Security
- Row Level Security (RLS) no PostgreSQL
- Middleware de tenant isolation
- Validação de acesso por tenant

### 2. API Security
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection
- CORS configurado

### 3. Data Privacy
- LGPD compliance
- Criptografia de dados sensíveis
- Audit logs
- Retenção de dados configurável

## Testes

### Estrutura de Testes
```
src/
├── auth/
│   ├── auth.service.spec.ts
│   ├── auth.controller.spec.ts
│   └── auth.e2e.spec.ts
```

### Tipos de Teste
- **Unit**: Testes isolados de serviços e utilities
- **Integration**: Testes de módulos completos
- **E2E**: Testes de fluxos completos da API
- **Performance**: Testes de carga e stress

## Deployment

### Docker Setup
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
CMD ["node", "dist/main"]
```

### CI/CD Pipeline
1. Testes automatizados
2. Build da aplicação
3. Deploy em staging
4. Testes E2E em staging
5. Deploy em produção
6. Health checks
