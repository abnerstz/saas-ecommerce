# Frontend Admin - Painel Administrativo

## Stack Tecnológico

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Shadcn/UI
- **State Management**: Zustand + React Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Notifications**: React Hot Toast

## Estrutura do Projeto

```
apps/admin/
├── src/
│   ├── components/          # Componentes específicos do admin
│   │   ├── layout/         # Layout components
│   │   ├── forms/          # Form components
│   │   ├── tables/         # Data tables
│   │   └── charts/         # Chart components
│   ├── pages/              # Páginas da aplicação
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── customers/
│   │   ├── analytics/
│   │   └── settings/
│   ├── hooks/              # Custom hooks
│   ├── services/           # API calls
│   ├── stores/             # Zustand stores
│   ├── types/              # TypeScript types
│   └── utils/              # Utilities
├── public/
└── package.json
```

## Funcionalidades por Módulo

### 1. Dashboard
**Componentes principais:**
- Métricas em tempo real (vendas, pedidos, usuários)
- Gráficos de performance
- Alertas e notificações
- Ações rápidas

**Features:**
```typescript
interface DashboardData {
  sales: {
    today: number;
    thisMonth: number;
    growth: number;
  };
  orders: {
    pending: number;
    processing: number;
    completed: number;
  };
  topProducts: Product[];
  recentActivity: Activity[];
}
```

### 2. Gestão de Produtos

**Features flexíveis por nicho:**

#### Layout Adaptável:
```typescript
// Configuração dinâmica baseada no nicho do tenant
interface ProductFormConfig {
  niche: 'restaurant' | 'fashion' | 'digital' | 'retail';
  fields: ProductField[];
  validations: ValidationRule[];
  customSections: CustomSection[];
}

// Exemplo para lanchonete
const restaurantConfig: ProductFormConfig = {
  niche: 'restaurant',
  fields: [
    { name: 'ingredients', type: 'multi-select', required: true },
    { name: 'cooking_time', type: 'number', suffix: 'min' },
    { name: 'spice_level', type: 'select', options: ['mild', 'medium', 'hot'] },
    { name: 'calories', type: 'number', optional: true }
  ],
  customSections: [
    { title: 'Informações Nutricionais', fields: ['calories', 'allergens'] },
    { title: 'Preparo', fields: ['cooking_time', 'ingredients'] }
  ]
};
```

#### Componentes Reutilizáveis:
```typescript
// Formulário adaptável
<ProductForm 
  config={getConfigByNiche(tenant.niche)}
  onSubmit={handleSubmit}
  initialData={product}
/>

// Tabela de produtos com colunas dinâmicas
<ProductTable 
  columns={getColumnsByNiche(tenant.niche)}
  data={products}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### 3. Gestão de Pedidos

**Workflow flexível:**
```typescript
interface OrderWorkflow {
  niche: string;
  states: OrderState[];
  transitions: StateTransition[];
  automations: Automation[];
}

// Exemplo para diferentes nichos
const workflows = {
  restaurant: {
    states: ['pending', 'confirmed', 'preparing', 'ready', 'delivered'],
    automations: ['auto_confirm_payment', 'notify_kitchen']
  },
  digital: {
    states: ['pending', 'paid', 'access_granted'],
    automations: ['auto_grant_access', 'send_download_link']
  },
  fashion: {
    states: ['pending', 'confirmed', 'picked', 'shipped', 'delivered'],
    automations: ['auto_generate_shipping_label']
  }
};
```

**Componentes:**
- Lista de pedidos com filtros avançados
- Detalhes do pedido adaptáveis por nicho
- Timeline de status do pedido
- Ações em lote para pedidos

### 4. Gestão de Clientes

**Features:**
- Lista e busca de clientes
- Perfil detalhado do cliente
- Histórico de pedidos
- Segmentação de clientes
- Comunicação (emails, notificações)

**Análise de cliente:**
```typescript
interface CustomerAnalytics {
  lifetime_value: number;
  order_frequency: number;
  average_order_value: number;
  preferred_categories: string[];
  last_order_date: Date;
  segments: CustomerSegment[];
}
```

### 5. Analytics e Relatórios

**Dashboards configuráveis:**
- Métricas de vendas
- Performance de produtos
- Análise de cliente
- Relatórios financeiros
- Métricas operacionais (por nicho)

**Componentes:**
```typescript
// Dashboard modular
<AnalyticsDashboard>
  <MetricCard title="Vendas Hoje" value={salesData.today} />
  <SalesChart data={chartData} period="30d" />
  <TopProducts products={topProducts} />
  {niche === 'restaurant' && (
    <KitchenMetrics averagePrepTime={metrics.avgPrepTime} />
  )}
</AnalyticsDashboard>
```

### 6. Configurações da Loja

**Configurações gerais:**
- Informações básicas da loja
- Configurações de pagamento
- Configurações de entrega
- Impostos e taxas
- Integrações

**Customização por nicho:**
```typescript
interface StoreSettings {
  basic: BasicSettings;
  payment: PaymentSettings;
  shipping: ShippingSettings;
  custom: CustomSettings; // Específico por nicho
}

// Exemplo de configurações customizadas
const restaurantSettings = {
  delivery_radius: 10, // km
  delivery_fee: 5.00,
  preparation_time: 30, // min
  operating_hours: {
    monday: { open: '08:00', close: '22:00' },
    // ...
  }
};
```

## Componentes Reutilizáveis

### Layout Components
```typescript
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sidebar adaptável com Shadcn
<Sidebar>
  <SidebarHeader>
    <Avatar>
      <AvatarImage src={currentUser.avatar} />
      <AvatarFallback>{currentUser.initials}</AvatarFallback>
    </Avatar>
  </SidebarHeader>
  <SidebarContent>
    {getNavigationByNiche(tenant.niche).map(item => (
      <NavigationItem key={item.id} {...item} />
    ))}
  </SidebarContent>
</Sidebar>
```

### Data Components
```typescript
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormField, FormItem } from "@/components/ui/form"

// Tabela genérica com Shadcn
<DataTable
  data={data}
  columns={columns}
  filterComponent={<Input placeholder="Buscar..." />}
  actions={(row) => (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">Editar</Button>
      <Button variant="destructive" size="sm">Excluir</Button>
    </div>
  )}
/>

// Formulário dinâmico com Shadcn
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    {formFields.map(field => (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <Label>{field.label}</Label>
            <Input {...formField} />
          </FormItem>
        )}
      />
    ))}
  </form>
</Form>
```

### Modais e Overlays
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// Modal genérico com Shadcn
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Adicionar Produto</DialogTitle>
    </DialogHeader>
    <ProductForm onSubmit={handleSubmit} />
  </DialogContent>
</Dialog>

// Sheet para detalhes
<Sheet open={showDetails} onOpenChange={setShowDetails}>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Detalhes do Pedido</SheetTitle>
    </SheetHeader>
    <OrderDetails order={selectedOrder} />
  </SheetContent>
</Sheet>
```

## State Management

### Stores Structure
```typescript
// Auth store
interface AuthStore {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

// Products store
interface ProductsStore {
  products: Product[];
  filters: ProductFilters;
  loading: boolean;
  selectedProduct: Product | null;
  fetchProducts: () => Promise<void>;
  createProduct: (data: CreateProductData) => Promise<void>;
  updateProduct: (id: string, data: UpdateProductData) => Promise<void>;
}
```

## API Integration

### React Query Setup
```typescript
// API client configurado
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
});

// Custom hooks para API
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => api.products.list(filters),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.products.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto criado com sucesso!');
    },
  });
};
```

## Performance e UX

### Otimizações:
- Lazy loading de rotas
- Virtual scrolling para listas grandes
- Debounce em filtros e busca
- Cache inteligente com React Query
- Preload de dados críticos

### Acessibilidade:
- Navegação por teclado
- Screen reader support
- Alto contraste
- Focus management
- ARIA labels

## Build e Deploy

### Vite Configuration
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@headlessui/react'],
        },
      },
    },
  },
});
```

### Environment Variables
```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Admin Dashboard
VITE_SENTRY_DSN=your-sentry-dsn
```
