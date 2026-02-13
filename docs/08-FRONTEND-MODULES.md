# Módulos Frontend - Definição Detalhada

## 🎯 Visão Geral dos Sistemas

### 📊 **Sistema Admin** (React + Shadcn/UI)
**Objetivo:** Painel de administração para gestão completa da loja
**Usuários:** Proprietários, gerentes, funcionários

### 🛍️ **Sistema Ecommerce** (React + Shadcn/UI)  
**Objetivo:** Loja online para clientes finais
**Usuários:** Clientes, visitantes

---

## 📊 SISTEMA ADMIN - Módulos Detalhados

### 🏠 **1. Dashboard Module**
**Pasta:** `apps/admin/src/pages/dashboard/`

#### **Pages:**
- `DashboardPage.tsx` - Visão geral principal
- `AnalyticsPage.tsx` - Métricas detalhadas

#### **Components:**
- `MetricsCard.tsx` - Cards de métricas (vendas, pedidos, etc.)
- `SalesChart.tsx` - Gráfico de vendas
- `OrdersChart.tsx` - Gráfico de pedidos
- `TopProducts.tsx` - Lista de produtos mais vendidos
- `RecentActivity.tsx` - Atividades recentes
- `QuickActions.tsx` - Ações rápidas

#### **Features:**
- 📈 Métricas em tempo real
- 📊 Gráficos interativos (Recharts)
- 🔔 Alertas e notificações
- ⚡ Ações rápidas (novo produto, novo pedido)

### 📦 **2. Products Module**
**Pasta:** `apps/admin/src/pages/products/`

#### **Pages:**
- `ProductsListPage.tsx` - Lista de produtos
- `ProductCreatePage.tsx` - Criar produto
- `ProductEditPage.tsx` - Editar produto
- `ProductDetailPage.tsx` - Detalhes do produto
- `CategoriesPage.tsx` - Gestão de categorias

#### **Components:**
- `ProductForm.tsx` - Formulário adaptável por nicho
- `ProductTable.tsx` - Tabela de produtos
- `ProductCard.tsx` - Card de produto
- `ProductImageUpload.tsx` - Upload de imagens
- `ProductVariants.tsx` - Gestão de variações
- `CategoryForm.tsx` - Formulário de categoria
- `NicheSpecificFields.tsx` - Campos específicos por nicho

#### **Features por Nicho:**
```typescript
// Lanchonete
- IngredientSelector
- NutritionInfoForm
- CookingTimeInput
- SpiceLevelSelector

// Moda
- SizeVariants
- ColorVariants
- MaterialSelector
- CareInstructions

// Infoproduto
- DigitalAssetUpload
- LicenseTypeSelector
- AccessDurationInput
- PreviewGenerator
```

### 📋 **3. Orders Module**
**Pasta:** `apps/admin/src/pages/orders/`

#### **Pages:**
- `OrdersListPage.tsx` - Lista de pedidos
- `OrderDetailPage.tsx` - Detalhes do pedido
- `OrderTrackingPage.tsx` - Rastreamento

#### **Components:**
- `OrderTable.tsx` - Tabela de pedidos
- `OrderCard.tsx` - Card de pedido
- `OrderStatusBadge.tsx` - Badge de status
- `OrderTimeline.tsx` - Timeline do pedido
- `OrderActions.tsx` - Ações do pedido
- `OrderFilters.tsx` - Filtros avançados
- `BulkActions.tsx` - Ações em lote

#### **Features por Nicho:**
```typescript
// Lanchonete
- KitchenView (visão da cozinha)
- DeliveryTracking
- TableOrderManagement

// Moda
- ShippingLabelGeneration
- InventoryTracking
- ReturnManagement

// Infoproduto
- AutomaticDelivery
- LicenseActivation
- DownloadTracking
```

### 👥 **4. Customers Module**
**Pasta:** `apps/admin/src/pages/customers/`

#### **Pages:**
- `CustomersListPage.tsx` - Lista de clientes
- `CustomerDetailPage.tsx` - Perfil do cliente
- `CustomerSegmentsPage.tsx` - Segmentação

#### **Components:**
- `CustomerTable.tsx` - Tabela de clientes
- `CustomerCard.tsx` - Card de cliente
- `CustomerProfile.tsx` - Perfil detalhado
- `CustomerOrders.tsx` - Histórico de pedidos
- `CustomerSegments.tsx` - Segmentação
- `CustomerCommunication.tsx` - Comunicação

### 📊 **5. Analytics Module**
**Pasta:** `apps/admin/src/pages/analytics/`

#### **Pages:**
- `SalesAnalyticsPage.tsx` - Análise de vendas
- `ProductAnalyticsPage.tsx` - Análise de produtos
- `CustomerAnalyticsPage.tsx` - Análise de clientes
- `ReportsPage.tsx` - Relatórios customizáveis

#### **Components:**
- `SalesChart.tsx` - Gráfico de vendas
- `ProductPerformance.tsx` - Performance de produtos
- `CustomerInsights.tsx` - Insights de clientes
- `CustomReport.tsx` - Relatório customizável
- `ExportData.tsx` - Exportação de dados

### ⚙️ **6. Settings Module**
**Pasta:** `apps/admin/src/pages/settings/`

#### **Pages:**
- `GeneralSettingsPage.tsx` - Configurações gerais
- `PaymentSettingsPage.tsx` - Configurações de pagamento
- `ShippingSettingsPage.tsx` - Configurações de envio
- `ThemeSettingsPage.tsx` - Personalização visual
- `UsersManagementPage.tsx` - Gestão de usuários

#### **Components:**
- `SettingsForm.tsx` - Formulário de configurações
- `PaymentGateways.tsx` - Gateways de pagamento
- `ShippingMethods.tsx` - Métodos de envio
- `ThemeCustomizer.tsx` - Customizador de tema
- `UserInvitation.tsx` - Convite de usuários

---

## 🛍️ SISTEMA ECOMMERCE - Módulos Detalhados

### 🏠 **1. Home Module**
**Pasta:** `apps/ecommerce/src/pages/home/`

#### **Pages:**
- `HomePage.tsx` - Página inicial

#### **Components:**
- `HeroSection.tsx` - Seção hero adaptável
- `FeaturedProducts.tsx` - Produtos em destaque
- `Categories.tsx` - Categorias principais
- `Testimonials.tsx` - Depoimentos
- `Newsletter.tsx` - Newsletter signup

#### **Adaptações por Nicho:**
```typescript
// Lanchonete
- MenuHighlights
- DeliveryInfo
- OperatingHours

// Moda
- SeasonalCollections
- LookBook
- SizeGuide

// Infoproduto
- CoursePreview
- AuthorBio
- StudentTestimonials
```

### 📦 **2. Products Module**
**Pasta:** `apps/ecommerce/src/pages/products/`

#### **Pages:**
- `ProductsListPage.tsx` - Lista de produtos
- `ProductDetailPage.tsx` - Detalhes do produto
- `CategoryPage.tsx` - Produtos por categoria

#### **Components:**
- `ProductGrid.tsx` - Grade de produtos
- `ProductCard.tsx` - Card de produto
- `ProductDetail.tsx` - Detalhes do produto
- `ProductGallery.tsx` - Galeria de imagens
- `ProductFilters.tsx` - Filtros de busca
- `ProductReviews.tsx` - Avaliações
- `RelatedProducts.tsx` - Produtos relacionados

#### **Componentes por Nicho:**
```typescript
// Lanchonete
- NutritionInfo
- IngredientsList
- CustomizationOptions
- AllergensWarning

// Moda
- SizeChart
- MaterialInfo
- CareInstructions
- ColorSwatches

// Infoproduto
- CourseOutline
- ContentPreview
- SystemRequirements
- AuthorProfile
```

### 🛒 **3. Cart Module**
**Pasta:** `apps/ecommerce/src/pages/cart/`

#### **Pages:**
- `CartPage.tsx` - Página do carrinho

#### **Components:**
- `CartItems.tsx` - Itens do carrinho
- `CartItem.tsx` - Item individual
- `CartSummary.tsx` - Resumo do carrinho
- `CartActions.tsx` - Ações do carrinho
- `RecommendedProducts.tsx` - Produtos recomendados

#### **Features por Nicho:**
```typescript
// Lanchonete
- SpecialInstructions
- DeliveryTimeEstimate
- MinimumOrderValue

// Moda
- SizeReminder
- GiftOptions
- ShippingCalculator

// Infoproduto
- LicenseSelection
- BundleOffers
- InstantAccess
```

### 💳 **4. Checkout Module**
**Pasta:** `apps/ecommerce/src/pages/checkout/`

#### **Pages:**
- `CheckoutPage.tsx` - Processo de checkout

#### **Components:**
- `CheckoutSteps.tsx` - Steps do checkout
- `CustomerInfo.tsx` - Informações do cliente
- `ShippingInfo.tsx` - Informações de envio
- `PaymentInfo.tsx` - Informações de pagamento
- `OrderSummary.tsx` - Resumo do pedido
- `OrderConfirmation.tsx` - Confirmação

#### **Steps por Nicho:**
```typescript
// Lanchonete
1. Cart Review
2. Customer Info
3. Delivery Options
4. Payment
5. Confirmation

// Moda
1. Cart Review
2. Customer Info
3. Shipping Address
4. Shipping Method
5. Payment
6. Confirmation

// Infoproduto
1. Cart Review
2. Customer Info
3. License Agreement
4. Payment
5. Access Granted
```

### 👤 **5. Account Module**
**Pasta:** `apps/ecommerce/src/pages/account/`

#### **Pages:**
- `AccountPage.tsx` - Dashboard da conta
- `ProfilePage.tsx` - Perfil do usuário
- `OrdersHistoryPage.tsx` - Histórico de pedidos
- `AddressesPage.tsx` - Endereços salvos
- `WishlistPage.tsx` - Lista de desejos

#### **Components:**
- `AccountSidebar.tsx` - Sidebar da conta
- `ProfileForm.tsx` - Formulário de perfil
- `OrderHistory.tsx` - Histórico de pedidos
- `AddressBook.tsx` - Livro de endereços
- `Wishlist.tsx` - Lista de desejos

### 📍 **6. Order Tracking Module**
**Pasta:** `apps/ecommerce/src/pages/order-tracking/`

#### **Pages:**
- `OrderTrackingPage.tsx` - Rastreamento de pedido

#### **Components:**
- `OrderStatus.tsx` - Status do pedido
- `TrackingTimeline.tsx` - Timeline de tracking
- `DeliveryInfo.tsx` - Informações de entrega
- `ContactSupport.tsx` - Contato com suporte

---

## 📦 PACKAGES COMPARTILHADOS

### 🎨 **@ecommerce/ui**
**Componentes Shadcn/UI Customizados:**
```
packages/ui/src/components/
├── button/
├── input/
├── card/
├── dialog/
├── form/
├── table/
├── badge/
├── avatar/
├── dropdown-menu/
├── select/
├── textarea/
├── checkbox/
├── radio-group/
├── switch/
├── tabs/
├── toast/
└── index.ts
```

### 🔧 **@ecommerce/types**
**Tipos TypeScript Compartilhados:**
```typescript
// entities/
export interface User { }
export interface Product { }
export interface Order { }
export interface Customer { }

// api/
export interface ApiResponse<T> { }
export interface PaginatedResponse<T> { }

// common/
export type NicheType = 'restaurant' | 'fashion' | 'digital' | 'retail';
export type UserRole = 'admin' | 'manager' | 'employee';
```

### 🛠️ **@ecommerce/utils**
**Utilitários Compartilhados:**
```typescript
// validation/
export const productSchemas = { }
export const orderSchemas = { }

// formatting/
export const formatCurrency = () => { }
export const formatDate = () => { }

// constants/
export const NICHE_CONFIGS = { }
export const ORDER_STATUSES = { }
```

### 🌐 **@ecommerce/api-client**
**Cliente HTTP Compartilhado:**
```typescript
// hooks/
export const useProducts = () => { }
export const useOrders = () => { }
export const useCustomers = () => { }

// clients/
export const productApi = { }
export const orderApi = { }
export const customerApi = { }
```

---

## ✅ **Confirmação Necessária**

Antes de começarmos a implementação, confirme:

1. **Módulos Admin** - Os 6 módulos definidos atendem suas necessidades?
2. **Módulos Ecommerce** - Os 6 módulos cobrem o fluxo completo do cliente?
3. **Adaptações por Nicho** - As customizações por nicho estão adequadas?
4. **Packages Compartilhados** - A estrutura de shared packages faz sentido?
5. **Algum módulo adicional** necessário?
6. **Alguma modificação** nos módulos propostos?

Após confirmação, começaremos com:
1. 🏗️ Setup da estrutura base do projeto
2. 📦 Implementação dos packages compartilhados
3. 🎨 Setup do Shadcn/UI
4. 🚀 Desenvolvimento módulo por módulo
