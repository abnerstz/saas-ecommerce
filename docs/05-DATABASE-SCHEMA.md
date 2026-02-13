# Schema do Banco de Dados - PostgreSQL + Prisma

## Estratégia de Design

### Princípios Fundamentais
1. **Flexibilidade**: Schema adaptável para múltiplos nichos
2. **Multi-tenancy**: Isolamento seguro por tenant
3. **Escalabilidade**: Suporte a crescimento horizontal
4. **Extensibilidade**: Campos JSON para customizações específicas
5. **Performance**: Índices otimizados para consultas frequentes

### Abordagem Multi-tenant
- **Schema Compartilhado**: Uma única instância do banco
- **Isolamento por Tenant ID**: Row Level Security (RLS)
- **Configurações Flexíveis**: JSON fields para customizações
- **Auditoria Completa**: Tracking de mudanças por tenant

## Schema Completo

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ================================
// CORE MODELS
// ================================

model Tenant {
  id                String   @id @default(cuid())
  name              String
  slug              String   @unique
  domain            String?  @unique
  subdomain         String?  @unique
  
  // Configurações do negócio
  niche             NicheType
  business_type     String?  // Subtipo específico do nicho
  description       String?
  logo_url          String?
  favicon_url       String?
  
  // Configurações técnicas
  settings          Json     @default("{}")
  theme_config      Json     @default("{}")
  feature_flags     Json     @default("{}")
  
  // Informações de contato
  email             String?
  phone             String?
  address           Json?    // Endereço completo estruturado
  
  // Status e limites
  status            TenantStatus @default(ACTIVE)
  plan_type         PlanType     @default(FREE)
  plan_limits       Json         @default("{}")
  
  // Timestamps
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
  
  // Relacionamentos
  users             User[]
  products          Product[]
  categories        Category[]
  orders            Order[]
  customers         Customer[]
  payment_methods   PaymentMethod[]
  shipping_methods  ShippingMethod[]
  coupons          Coupon[]
  analytics        Analytics[]
  notifications    Notification[]
  
  @@map("tenants")
}

model User {
  id            String   @id @default(cuid())
  tenant_id     String
  
  // Informações básicas
  email         String   
  password_hash String?
  first_name    String
  last_name     String
  avatar_url    String?
  phone         String?
  
  // Autenticação
  email_verified     Boolean  @default(false)
  email_verified_at  DateTime?
  last_login_at      DateTime?
  
  // Autorização
  role              UserRole @default(EMPLOYEE)
  permissions       Json     @default("[]")
  
  // Status
  status            UserStatus @default(ACTIVE)
  
  // Timestamps
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
  
  // Relacionamentos
  tenant        Tenant @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
  created_orders Order[] @relation("OrderCreatedBy")
  
  @@unique([tenant_id, email])
  @@map("users")
}

model Customer {
  id            String   @id @default(cuid())
  tenant_id     String
  
  // Informações pessoais
  email         String?
  phone         String?
  first_name    String
  last_name     String
  birth_date    DateTime?
  gender        Gender?
  
  // Endereços (JSON array de endereços)
  addresses     Json     @default("[]")
  
  // Preferências
  preferences   Json     @default("{}")
  tags          String[] @default([])
  
  // Marketing
  accepts_marketing Boolean @default(true)
  
  // Timestamps
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
  last_order_at DateTime?
  
  // Relacionamentos
  tenant        Tenant @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
  orders        Order[]
  
  @@unique([tenant_id, email])
  @@unique([tenant_id, phone])
  @@map("customers")
}

// ================================
// PRODUCT MODELS
// ================================

model Category {
  id              String   @id @default(cuid())
  tenant_id       String
  parent_id       String?
  
  // Informações básicas
  name            String
  slug            String
  description     String?
  image_url       String?
  
  // SEO
  seo_title       String?
  seo_description String?
  
  // Configurações
  is_active       Boolean  @default(true)
  sort_order      Int      @default(0)
  
  // Customizações por nicho
  custom_attributes Json   @default("{}")
  
  // Timestamps
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  
  // Relacionamentos
  tenant          Tenant     @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
  parent          Category?  @relation("CategoryParent", fields: [parent_id], references: [id])
  children        Category[] @relation("CategoryParent")
  products        Product[]
  
  @@unique([tenant_id, slug])
  @@map("categories")
}

model Product {
  id                String   @id @default(cuid())
  tenant_id         String
  category_id       String?
  
  // Informações básicas
  name              String
  slug              String
  description       String?
  short_description String?
  
  // Preços
  price             Decimal
  compare_at_price  Decimal?
  cost_price        Decimal?
  
  // Inventário
  sku               String?
  barcode           String?
  track_inventory   Boolean  @default(false)
  inventory_qty     Int      @default(0)
  allow_backorder   Boolean  @default(false)
  
  // Físico
  weight            Decimal?
  dimensions        Json?    // {length, width, height, unit}
  
  // Status
  status            ProductStatus @default(DRAFT)
  is_featured       Boolean       @default(false)
  
  // SEO
  seo_title         String?
  seo_description   String?
  
  // Imagens (JSON array de URLs)
  images            Json     @default("[]")
  
  // Customizações por nicho
  custom_attributes Json     @default("{}")
  
  // Timestamps
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
  
  // Relacionamentos
  tenant            Tenant           @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
  category          Category?        @relation(fields: [category_id], references: [id])
  variants          ProductVariant[]
  order_items       OrderItem[]
  
  @@unique([tenant_id, slug])
  @@map("products")
}

model ProductVariant {
  id                String   @id @default(cuid())
  product_id        String
  
  // Identificação
  title             String
  sku               String?
  barcode           String?
  
  // Preços
  price             Decimal?
  compare_at_price  Decimal?
  cost_price        Decimal?
  
  // Inventário
  inventory_qty     Int      @default(0)
  
  // Características (para variações como tamanho, cor, etc.)
  attributes        Json     @default("{}")
  
  // Status
  is_active         Boolean  @default(true)
  
  // Imagem específica da variação
  image_url         String?
  
  // Timestamps
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
  
  // Relacionamentos
  product           Product     @relation(fields: [product_id], references: [id], onDelete: Cascade)
  order_items       OrderItem[]
  
  @@map("product_variants")
}

// ================================
// ORDER MODELS
// ================================

model Order {
  id                String   @id @default(cuid())
  tenant_id         String
  customer_id       String?
  created_by_id     String?
  
  // Identificação
  order_number      String   @unique
  
  // Status e workflow
  status            OrderStatus @default(PENDING)
  fulfillment_status FulfillmentStatus @default(PENDING)
  payment_status    PaymentStatus @default(PENDING)
  
  // Valores financeiros
  subtotal          Decimal
  tax_amount        Decimal  @default(0)
  shipping_amount   Decimal  @default(0)
  discount_amount   Decimal  @default(0)
  total_amount      Decimal
  
  // Informações do cliente
  customer_info     Json     // Nome, email, telefone
  billing_address   Json
  shipping_address  Json?
  
  // Configurações específicas por nicho
  custom_attributes Json     @default("{}")
  
  // Notas e observações
  notes             String?
  tags              String[] @default([])
  
  // Timestamps
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
  confirmed_at      DateTime?
  shipped_at        DateTime?
  delivered_at      DateTime?
  cancelled_at      DateTime?
  
  // Relacionamentos
  tenant            Tenant       @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
  customer          Customer?    @relation(fields: [customer_id], references: [id])
  created_by        User?        @relation("OrderCreatedBy", fields: [created_by_id], references: [id])
  items             OrderItem[]
  payments          Payment[]
  shipments         Shipment[]
  status_history    OrderStatusHistory[]
  
  @@map("orders")
}

model OrderItem {
  id                String   @id @default(cuid())
  order_id          String
  product_id        String
  variant_id        String?
  
  // Informações do produto no momento da compra
  product_name      String
  variant_title     String?
  sku               String?
  
  // Preços
  unit_price        Decimal
  quantity          Int
  total_price       Decimal
  
  // Customizações (para produtos personalizáveis)
  customizations    Json     @default("{}")
  
  // Relacionamentos
  order             Order           @relation(fields: [order_id], references: [id], onDelete: Cascade)
  product           Product         @relation(fields: [product_id], references: [id])
  variant           ProductVariant? @relation(fields: [variant_id], references: [id])
  
  @@map("order_items")
}

model OrderStatusHistory {
  id          String   @id @default(cuid())
  order_id    String
  
  status      OrderStatus
  comment     String?
  created_by  String?  // User ID
  
  created_at  DateTime @default(now())
  
  order       Order @relation(fields: [order_id], references: [id], onDelete: Cascade)
  
  @@map("order_status_history")
}

// ================================
// PAYMENT MODELS
// ================================

model Payment {
  id                String   @id @default(cuid())
  order_id          String
  
  // Identificação
  transaction_id    String?  @unique
  gateway_id        String?  // ID no gateway de pagamento
  
  // Informações do pagamento
  method            PaymentMethodType
  gateway           PaymentGateway
  amount            Decimal
  currency          String   @default("BRL")
  
  // Status
  status            PaymentStatus @default(PENDING)
  
  // Dados do gateway
  gateway_response  Json?
  
  // Timestamps
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
  processed_at      DateTime?
  
  // Relacionamentos
  order             Order @relation(fields: [order_id], references: [id], onDelete: Cascade)
  
  @@map("payments")
}

model PaymentMethod {
  id            String   @id @default(cuid())
  tenant_id     String
  
  // Configurações
  type          PaymentMethodType
  gateway       PaymentGateway
  name          String
  description   String?
  
  // Configurações do gateway
  gateway_config Json
  
  // Status
  is_active     Boolean  @default(true)
  is_default    Boolean  @default(false)
  
  // Timestamps
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
  
  // Relacionamentos
  tenant        Tenant @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
  
  @@map("payment_methods")
}

// ================================
// SHIPPING MODELS
// ================================

model Shipment {
  id              String   @id @default(cuid())
  order_id        String
  
  // Identificação
  tracking_number String?
  carrier         String
  service         String   // Sedex, PAC, etc.
  
  // Status
  status          ShipmentStatus @default(PENDING)
  
  // Informações de envio
  shipped_at      DateTime?
  delivered_at    DateTime?
  estimated_delivery DateTime?
  
  // Tracking
  tracking_events Json     @default("[]")
  
  // Timestamps
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  
  // Relacionamentos
  order           Order @relation(fields: [order_id], references: [id], onDelete: Cascade)
  
  @@map("shipments")
}

model ShippingMethod {
  id            String   @id @default(cuid())
  tenant_id     String
  
  // Configurações
  name          String
  description   String?
  carrier       String?
  
  // Preços
  price         Decimal
  free_threshold Decimal? // Valor mínimo para frete grátis
  
  // Configurações específicas por nicho
  custom_config Json     @default("{}")
  
  // Status
  is_active     Boolean  @default(true)
  
  // Timestamps
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
  
  // Relacionamentos
  tenant        Tenant @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
  
  @@map("shipping_methods")
}

// ================================
// MARKETING MODELS
// ================================

model Coupon {
  id               String   @id @default(cuid())
  tenant_id        String
  
  // Identificação
  code             String
  name             String
  description      String?
  
  // Tipo de desconto
  discount_type    DiscountType
  discount_value   Decimal
  
  // Limites
  usage_limit      Int?
  usage_count      Int      @default(0)
  minimum_amount   Decimal?
  
  // Validade
  starts_at        DateTime?
  expires_at       DateTime?
  
  // Status
  is_active        Boolean  @default(true)
  
  // Timestamps
  created_at       DateTime @default(now())
  updated_at       DateTime @updatedAt
  
  // Relacionamentos
  tenant           Tenant @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
  
  @@unique([tenant_id, code])
  @@map("coupons")
}

// ================================
// ANALYTICS MODELS
// ================================

model Analytics {
  id            String   @id @default(cuid())
  tenant_id     String
  
  // Métricas
  metric_name   String
  metric_value  Decimal
  dimensions    Json     @default("{}")
  
  // Período
  date          DateTime
  period_type   PeriodType // daily, weekly, monthly
  
  // Timestamps
  created_at    DateTime @default(now())
  
  // Relacionamentos
  tenant        Tenant @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
  
  @@unique([tenant_id, metric_name, date, period_type])
  @@map("analytics")
}

// ================================
// NOTIFICATION MODELS
// ================================

model Notification {
  id            String   @id @default(cuid())
  tenant_id     String
  user_id       String?
  
  // Conteúdo
  title         String
  message       String
  type          NotificationType
  
  // Status
  is_read       Boolean  @default(false)
  
  // Dados adicionais
  data          Json?
  
  // Timestamps
  created_at    DateTime @default(now())
  read_at       DateTime?
  
  // Relacionamentos
  tenant        Tenant @relation(fields: [tenant_id], references: [id], onDelete: Cascade)
  
  @@map("notifications")
}

// ================================
// ENUMS
// ================================

enum NicheType {
  RESTAURANT
  FASHION
  DIGITAL
  RETAIL
  SERVICES
  OTHER
}

enum TenantStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  TRIAL
}

enum PlanType {
  FREE
  BASIC
  PROFESSIONAL
  ENTERPRISE
}

enum UserRole {
  SUPER_ADMIN
  TENANT_ADMIN
  MANAGER
  EMPLOYEE
  CUSTOMER
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

enum Gender {
  MALE
  FEMALE
  OTHER
  PREFER_NOT_TO_SAY
}

enum ProductStatus {
  DRAFT
  ACTIVE
  INACTIVE
  ARCHIVED
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum FulfillmentStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
  CANCELLED
}

enum PaymentMethodType {
  CREDIT_CARD
  DEBIT_CARD
  PIX
  BANK_SLIP
  PAYPAL
  CASH
  OTHER
}

enum PaymentGateway {
  STRIPE
  MERCADOPAGO
  PAGSEGURO
  CIELO
  CUSTOM
}

enum ShipmentStatus {
  PENDING
  SHIPPED
  IN_TRANSIT
  DELIVERED
  RETURNED
  LOST
}

enum DiscountType {
  PERCENTAGE
  FIXED_AMOUNT
  FREE_SHIPPING
}

enum PeriodType {
  DAILY
  WEEKLY
  MONTHLY
  YEARLY
}

enum NotificationType {
  ORDER
  PAYMENT
  SYSTEM
  MARKETING
  REMINDER
}
```

## Índices e Performance

```sql
-- Índices principais para performance
CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_domain ON tenants(domain);
CREATE INDEX idx_tenants_subdomain ON tenants(subdomain);

-- Índices para multi-tenancy
CREATE INDEX idx_users_tenant_email ON users(tenant_id, email);
CREATE INDEX idx_products_tenant_status ON products(tenant_id, status);
CREATE INDEX idx_orders_tenant_status ON orders(tenant_id, status);
CREATE INDEX idx_customers_tenant_email ON customers(tenant_id, email);

-- Índices para busca de produtos
CREATE INDEX idx_products_search ON products USING gin(to_tsvector('portuguese', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_products_category ON products(category_id, status);
CREATE INDEX idx_products_featured ON products(tenant_id, is_featured, status);

-- Índices para relatórios
CREATE INDEX idx_orders_dates ON orders(tenant_id, created_at);
CREATE INDEX idx_orders_customer ON orders(customer_id, created_at);
CREATE INDEX idx_analytics_metrics ON analytics(tenant_id, metric_name, date);

-- Índices para auditoria
CREATE INDEX idx_order_status_history ON order_status_history(order_id, created_at);
```

## Row Level Security (RLS)

```sql
-- Habilitar RLS em todas as tabelas multi-tenant
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- ... outras tabelas

-- Políticas de segurança
CREATE POLICY tenant_isolation_users ON users
  USING (tenant_id = current_setting('app.current_tenant')::text);

CREATE POLICY tenant_isolation_products ON products
  USING (tenant_id = current_setting('app.current_tenant')::text);

CREATE POLICY tenant_isolation_orders ON orders
  USING (tenant_id = current_setting('app.current_tenant')::text);
```

## Configurações JSON por Nicho

### Tenant Settings Examples
```json
// Lanchonete
{
  "delivery": {
    "radius_km": 10,
    "min_order_value": 25.00,
    "delivery_fee": 5.00,
    "estimated_time": 30
  },
  "operating_hours": {
    "monday": {"open": "08:00", "close": "22:00"},
    "tuesday": {"open": "08:00", "close": "22:00"}
  },
  "kitchen": {
    "preparation_time": 20,
    "max_concurrent_orders": 50
  }
}

// Moda
{
  "sizing": {
    "size_chart_url": "https://...",
    "size_guide_enabled": true,
    "return_policy_days": 30
  },
  "product_display": {
    "show_material": true,
    "show_care_instructions": true,
    "enable_zoom": true
  }
}

// Infoproduto
{
  "digital": {
    "auto_delivery": true,
    "license_types": ["personal", "commercial"],
    "download_limit": 5,
    "access_duration_days": 365
  }
}
```

### Product Custom Attributes Examples
```json
// Produto de lanchonete
{
  "ingredients": ["hambúrguer", "queijo", "alface", "tomate"],
  "allergens": ["glúten", "lactose"],
  "nutrition": {
    "calories": 450,
    "protein": 25,
    "carbs": 35,
    "fat": 20
  },
  "cooking_time": 15,
  "spice_level": "mild",
  "category_tags": ["burger", "beef"]
}

// Produto de moda
{
  "material": "100% Algodão",
  "care_instructions": "Lavar a 30°C",
  "fit": "regular",
  "season": "verão",
  "color_variations": ["azul", "vermelho", "branco"],
  "size_chart": "chart_id_123"
}

// Infoproduto
{
  "format": "video",
  "duration_minutes": 120,
  "file_size_mb": 500,
  "preview_url": "https://...",
  "system_requirements": "Windows 10+",
  "license_type": "personal",
  "access_type": "lifetime"
}
```

## Migrations e Versioning

```typescript
// Exemplo de migration para adicionar campo específico
-- Migration: add_restaurant_fields_to_orders
ALTER TABLE orders ADD COLUMN delivery_notes TEXT;
ALTER TABLE orders ADD COLUMN pickup_time TIMESTAMP;
ALTER TABLE orders ADD COLUMN table_number INTEGER;

-- Migration: add_fashion_fields_to_products  
ALTER TABLE products ADD COLUMN gender VARCHAR(20);
ALTER TABLE products ADD COLUMN season VARCHAR(20);
```

Este schema oferece máxima flexibilidade através dos campos JSON `custom_attributes` e `settings`, permitindo que cada nicho adicione suas próprias propriedades sem modificar a estrutura base do banco de dados.
