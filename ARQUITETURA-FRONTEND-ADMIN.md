# Arquitetura do Projeto Front-end - Admin Panel

## 1. Visão Geral

O projeto front-end do painel administrativo é uma aplicação React moderna construída com Vite, TypeScript e Tailwind CSS. A arquitetura segue princípios de **Clean Architecture** e **SOLID**, implementando uma estrutura modular e escalável com separação clara entre camadas de apresentação, lógica de negócio e dados.

### Principais Decisões Arquiteturais

- **Monorepo com packages compartilhados**: Reutilização de código entre diferentes aplicações
- **Design System centralizado**: Componentes UI padronizados no package `@ecommerce/ui`
- **API Client unificado**: Comunicação padronizada com backend via `@ecommerce/api-client`
- **Tipagem forte**: TypeScript em toda a aplicação com tipos compartilhados
- **Responsive-first**: Layout adaptativo com mobile-first approach
- **Performance otimizada**: Lazy loading, code splitting e otimizações do Vite

## 2. Estrutura de Diretórios

```
apps/admin/src/
├── components/           # Componentes organizados por domínio
│   ├── charts/          # Componentes de gráficos e visualizações
│   ├── customers/       # Componentes específicos de clientes
│   ├── dashboard/       # Componentes do dashboard principal
│   ├── forms/           # Componentes de formulários reutilizáveis
│   ├── layout/          # Componentes de layout (header, sidebar, etc.)
│   ├── orders/          # Componentes de gestão de pedidos
│   ├── products/        # Componentes de gestão de produtos
│   ├── settings/        # Componentes de configurações
│   ├── shared/          # Componentes compartilhados entre domínios
│   └── ui/              # Componentes de UI básicos (vazio - usa package)
├── hooks/               # Custom hooks reutilizáveis
│   ├── useMediaQuery.ts # Hook para media queries responsivas
│   └── useSidebar.ts    # Hook para controle do sidebar
├── pages/               # Páginas da aplicação (roteamento)
│   ├── customers/       # Página de clientes
│   ├── dashboard/       # Página principal
│   ├── orders/          # Página de pedidos
│   ├── products/        # Página de produtos
│   └── settings/        # Página de configurações
├── store/               # Gerenciamento de estado (vazio - usa React Query)
├── types/               # Tipos específicos da aplicação (vazio - usa package)
├── utils/               # Utilitários e helpers
│   ├── mockData.ts      # Dados mock para desenvolvimento
│   └── README.md        # Documentação dos utilitários
├── App.tsx              # Componente raiz da aplicação
├── main.tsx             # Ponto de entrada da aplicação
└── index.css            # Estilos globais e variáveis CSS
```

### Padrões de Organização

- **Feature-based**: Componentes agrupados por domínio de negócio
- **Co-location**: Componentes relacionados ficam próximos
- **Separation of concerns**: Separação clara entre UI, lógica e dados
- **Convenções de nomenclatura**: PascalCase para componentes, camelCase para hooks

## 3. Stack Tecnológico

### Core Framework
- **React 18.2.0**: Framework principal com hooks e functional components
- **TypeScript 5.3.3**: Tipagem estática e melhor DX
- **Vite 5.0.8**: Build tool moderno e rápido

### UI e Styling
- **Tailwind CSS 3.3.6**: Framework CSS utility-first
- **Radix UI**: Componentes acessíveis e customizáveis
- **Lucide React**: Biblioteca de ícones
- **Framer Motion**: Animações e transições
- **Class Variance Authority**: Gerenciamento de variantes de componentes

### Estado e Dados
- **React Query 3.39.3**: Cache, sincronização e gerenciamento de estado servidor
- **Zustand 4.4.7**: Gerenciamento de estado local (não utilizado atualmente)
- **React Hook Form 7.48.2**: Gerenciamento de formulários
- **Zod 3.22.4**: Validação de schemas

### Roteamento e Navegação
- **React Router DOM 6.20.1**: Roteamento client-side
- **React Helmet Async 2.0.4**: Gerenciamento de meta tags

### Desenvolvimento
- **ESLint**: Linting de código
- **PostCSS**: Processamento de CSS
- **Autoprefixer**: Prefixos CSS automáticos

## 4. Configurações Principais

### Vite Configuration (`vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: true, // Permite acesso externo
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ecommerce/types': path.resolve(__dirname, '../../packages/types/src'),
      '@ecommerce/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@ecommerce/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@ecommerce/api-client': path.resolve(__dirname, '../../packages/api-client/src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Source maps para debugging
  },
})
```

**Características importantes:**
- Aliases para imports limpos e organizados
- Source maps habilitados para debugging
- Porta customizada (3001) para evitar conflitos
- Host habilitado para acesso externo

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "vite.config.ts"],
  "references": [
    { "path": "../../packages/types" },
    { "path": "../../packages/utils" },
    { "path": "../../packages/ui" },
    { "path": "../../packages/api-client" }
  ]
}
```

**Características importantes:**
- Configuração estrita para melhor qualidade de código
- Referências aos packages compartilhados
- Suporte a JSX moderno
- Verificações de código morto

### Tailwind Configuration (`tailwind.config.js`)

```javascript
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}', // Inclui componentes do design system
  ],
  theme: {
    extend: {
      colors: {
        // Sistema de cores baseado em CSS variables
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... outras cores
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
```

**Características importantes:**
- Sistema de cores baseado em CSS variables para temas
- Suporte a dark mode via classe
- Inclusão de componentes do design system
- Border radius customizável via CSS variables

## 5. Padrões Implementados

### Arquitetura de Componentes

#### 1. Functional Components com Hooks
```typescript
interface MetricCardProps {
  title: string
  value: number
  previousValue: number
  icon: LucideIcon
  format?: 'currency' | 'number' | 'percentage'
}

export function MetricCard({ 
  title, 
  value, 
  previousValue, 
  icon: Icon, 
  format = 'currency' 
}: MetricCardProps) {
  // Lógica do componente
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      case 'percentage':
        return `${val.toFixed(1)}%`
      default:
        return val.toLocaleString('pt-BR')
    }
  }

  return (
    <Card className="hover:shadow-sm transition-shadow">
      {/* JSX do componente */}
    </Card>
  )
}
```

#### 2. Custom Hooks para Lógica Reutilizável
```typescript
export function useSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isDesktop = useIsDesktop()

  // Lógica de controle do sidebar
  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(false)
    }
  }, [isDesktop])

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar
  }
}
```

#### 3. Responsive Design com Hooks
```typescript
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    if (media.addEventListener) {
      media.addEventListener('change', listener)
      return () => media.removeEventListener('change', listener)
    } else {
      media.addListener(listener)
      return () => media.removeListener(listener)
    }
  }, [query])

  return matches
}

// Breakpoints comuns
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsMobile = () => useMediaQuery('(max-width: 1023px)')
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
```

### Gerenciamento de Estado

#### 1. React Query para Estado Servidor
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 30, // 30 minutos
      refetchOnWindowFocus: false,
    },
  },
})
```

#### 2. Estado Local com useState
- Estado de UI (modais, sidebar, formulários)
- Estado temporário de componentes
- Estado que não precisa ser compartilhado

### Roteamento

#### 1. Estrutura de Rotas
```typescript
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}
```

#### 2. Layout Responsivo
```typescript
export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <ResponsiveSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className="lg:pl-64">
        <div className="lg:hidden">
          <MobileHeader 
            isSidebarOpen={isSidebarOpen} 
            onToggleSidebar={toggleSidebar} 
          />
        </div>
        
        <div className="hidden lg:block">
          <DesktopHeader />
        </div>
        
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### Comunicação com APIs

#### 1. API Client Centralizado
```typescript
export class ApiClient {
  private instance: AxiosInstance;
  private token: string | null = null;

  constructor(baseURL: string = process.env.VITE_API_URL || 'http://localhost:3000/api') {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' },
    });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor para adicionar token
    this.instance.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });

    // Response interceptor para tratamento de erros e refresh token
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Lógica de refresh token automático
      }
    );
  }
}
```

#### 2. Tratamento de Erros Robusto
- Interceptors para tratamento global de erros
- Refresh token automático
- Redirecionamento para login em caso de falha de autenticação
- Logs estruturados para debugging

### Sistema de Design

#### 1. Componentes Baseados em Radix UI
- Acessibilidade nativa
- Customização via CSS variables
- Consistência visual

#### 2. Sistema de Cores com CSS Variables
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... outras variáveis para dark mode */
}
```

## 6. Packages Compartilhados e Padrões

### Estrutura do Monorepo
```
packages/
├── types/           # Tipos TypeScript compartilhados
├── ui/              # Design system com componentes
├── utils/           # Utilitários e helpers
└── api-client/      # Cliente HTTP e hooks React Query
```

### @ecommerce/types - Sistema de Tipos

**Estrutura:**
- `entities.ts`: Entidades de domínio (User, Product, Order, etc.)
- `api.ts`: Tipos para comunicação com APIs
- `common.ts`: Tipos comuns e utilitários
- `enums.ts`: Enums do sistema

**Padrões implementados:**
- **Entidades base**: `BaseEntity` e `TenantEntity` para consistência
- **Tipos de API**: Request/Response padronizados
- **Validação**: Interfaces que correspondem aos schemas Zod
- **Enums centralizados**: Status, roles, tipos de pagamento

```typescript
// Exemplo de entidade base
export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface TenantEntity extends BaseEntity {
  tenant_id: string;
}
```

### @ecommerce/ui - Design System

**Componentes disponíveis:**
- `Button`, `Card`, `Input`, `Label`
- `Dialog`, `Sheet`, `Alert`
- `Table`, `Badge`, `Avatar`
- `Select`, `Switch`, `Progress`
- `Tabs`, `Accordion`, `RadioGroup`

**Padrões implementados:**
- **Class Variance Authority**: Gerenciamento de variantes
- **Radix UI**: Base acessível para todos os componentes
- **Forwarding refs**: Suporte completo a refs
- **Polymorphic components**: Suporte a `asChild` prop

```typescript
// Exemplo de componente com variantes
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)
```

**Utilitários incluídos:**
- `cn()`: Merge de classes CSS com Tailwind
- `formatters()`: Formatadores para moeda, data, etc.

### @ecommerce/utils - Utilitários Compartilhados

**Categorias de utilitários:**

#### Formatação
```typescript
// Formatação monetária
formatCurrency(1234.56) // "R$ 1.234,56"

// Formatação de data
formatDate(new Date()) // "31/12/2023"
formatDateTime(new Date()) // "31/12/2023 14:30"
formatRelativeTime(new Date()) // "há 2 horas"

// Formatação brasileira
formatPhone("11987654321") // "(11) 98765-4321"
formatCPF("12345678901") // "123.456.789-01"
formatCNPJ("12345678000195") // "12.345.678/0001-95"
formatCEP("01234567") // "01234-567"
```

#### Validação com Zod
```typescript
// Schemas reutilizáveis
export const emailSchema = z.string().email('Email inválido');
export const phoneSchema = z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/);
export const passwordSchema = z.string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .regex(/[A-Z]/, 'Deve conter maiúscula')
  .regex(/[a-z]/, 'Deve conter minúscula')
  .regex(/\d/, 'Deve conter número');

// Schemas de entidades
export const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.number().min(0, 'Preço deve ser positivo'),
  // ... outros campos
});
```

#### Helpers
```typescript
// Geração de slugs
slugify("Produto Incrível!") // "produto-incrivel"

// Capitalização
capitalize("hello world") // "Hello world"
capitalizeWords("hello world") // "Hello World"

// Iniciais
getInitials("João", "Silva") // "JS"

// Formatação de arquivos
formatFileSize(1024) // "1 KB"
formatWeight(1500) // "1.5kg"
```

### @ecommerce/api-client - Cliente HTTP e Hooks

**Estrutura:**
- `client.ts`: Cliente Axios centralizado
- `hooks/`: Hooks React Query por domínio
- `types.ts`: Re-export dos tipos

#### Padrões de Hooks React Query

**1. Query Keys Estruturadas**
```typescript
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters & ListParams) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};
```

**2. Hooks de Query**
```typescript
export const useProducts = (params?: ProductFilters & ListParams) => {
  return useQuery({
    queryKey: productKeys.list(params || {}),
    queryFn: () => apiClient.getProducts(params),
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => apiClient.getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
```

**3. Hooks de Mutação com Cache Management**
```typescript
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => apiClient.createProduct(data),
    onSuccess: () => {
      // Invalidar listas de produtos
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductRequest) => apiClient.updateProduct(data),
    onSuccess: (updatedProduct, variables) => {
      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      
      // Atualizar cache específico
      queryClient.setQueryData(
        productKeys.detail(variables.id),
        updatedProduct
      );
    },
  });
};
```

**4. Hooks de Autenticação**
```typescript
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => apiClient.login(data),
    onSuccess: (response: LoginResponse) => {
      // Salvar tokens
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      
      // Configurar cliente
      apiClient.setToken(response.access_token);
      
      // Invalidar queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      
      // Salvar dados do usuário
      queryClient.setQueryData(authKeys.profile(), response.user);
    },
  });
};

export const useIsAuthenticated = () => {
  const { data: user, isLoading } = useProfile();
  return {
    isAuthenticated: !!user && !isLoading,
    isLoading,
    user,
  };
};
```

**5. Hooks de Analytics com Refetch Automático**
```typescript
export const useDashboardStats = () => {
  return useQuery({
    queryKey: analyticsKeys.dashboard(),
    queryFn: () => apiClient.getDashboardStats(),
    staleTime: 2 * 60 * 1000, // 2 minutos
    refetchInterval: 5 * 60 * 1000, // Refetch a cada 5 minutos
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: analyticsKeys.activity(),
    queryFn: () => apiClient.getRecentActivity(),
    staleTime: 1 * 60 * 1000, // 1 minuto
    refetchInterval: 2 * 60 * 1000, // Refetch a cada 2 minutos
  });
};
```

### Dependências Principais
- **React 18.2.0**: Framework principal
- **TypeScript 5.3.3**: Tipagem estática
- **Vite 5.0.8**: Build tool e dev server
- **Tailwind CSS 3.3.6**: Framework CSS
- **React Query 3.39.3**: Gerenciamento de estado servidor
- **React Router DOM 6.20.1**: Roteamento
- **React Hook Form 7.48.2**: Formulários
- **Zod 3.22.4**: Validação
- **Radix UI**: Componentes acessíveis
- **Lucide React**: Ícones
- **Framer Motion**: Animações

## 7. Pontos de Atenção

### Decisões Arquiteturais Importantes

#### 1. Monorepo com Packages Compartilhados
**Vantagens:**
- Reutilização de código entre aplicações
- Consistência de tipos e componentes
- Manutenção centralizada

**Desafios:**
- Complexidade de build e deploy
- Dependências circulares
- Versionamento de packages

#### 2. Design System Centralizado
**Vantagens:**
- Consistência visual
- Desenvolvimento mais rápido
- Manutenção simplificada

**Considerações:**
- Necessidade de documentação clara
- Versionamento cuidadoso
- Breaking changes impactam múltiplas aplicações

#### 3. Responsive Design Mobile-First
**Implementação:**
- Hooks customizados para media queries
- Layout adaptativo com Tailwind
- Componentes específicos para mobile/desktop

#### 4. Gerenciamento de Estado
**Estratégia atual:**
- React Query para dados do servidor
- useState para estado local
- Context API quando necessário (não implementado)

**Considerações futuras:**
- Implementar Zustand para estado global complexo
- Adicionar persistência de estado
- Implementar offline support

### Performance e Escalabilidade

#### 1. Otimizações Implementadas
- Lazy loading de rotas
- Code splitting automático do Vite
- Tree shaking para bundles menores
- Source maps para debugging

#### 2. Próximos Passos
- Implementar React.memo para componentes pesados
- Adicionar virtualização para listas grandes
- Implementar service workers para cache
- Adicionar métricas de performance

### Manutenibilidade

#### 1. Padrões Estabelecidos
- Componentes funcionais com hooks
- Props tipadas com TypeScript
- Separação clara de responsabilidades
- Custom hooks para lógica reutilizável

#### 2. Convenções de Código
- PascalCase para componentes
- camelCase para hooks e funções
- kebab-case para arquivos CSS
- Imports organizados por tipo

## 8. Padrões dos Packages Compartilhados

### Estratégias de Desenvolvimento

#### 1. Desenvolvimento de Hooks React Query

**Estrutura Padrão:**
```typescript
// 1. Definir query keys estruturadas
export const entityKeys = {
  all: ['entity'] as const,
  lists: () => [...entityKeys.all, 'list'] as const,
  list: (filters: EntityFilters) => [...entityKeys.lists(), filters] as const,
  details: () => [...entityKeys.all, 'detail'] as const,
  detail: (id: string) => [...entityKeys.details(), id] as const,
};

// 2. Hooks de query com staleTime apropriado
export const useEntities = (params?: EntityFilters) => {
  return useQuery({
    queryKey: entityKeys.list(params || {}),
    queryFn: () => apiClient.getEntities(params),
    staleTime: 2 * 60 * 1000, // Baseado na frequência de mudança
  });
};

// 3. Hooks de mutação com invalidação inteligente
export const useCreateEntity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateEntityRequest) => apiClient.createEntity(data),
    onSuccess: () => {
      // Invalidar listas relacionadas
      queryClient.invalidateQueries({ queryKey: entityKeys.lists() });
      // Invalidar analytics se aplicável
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};
```

**Convenções de StaleTime:**
- **Dados estáticos** (categorias): 5 minutos
- **Dados semi-estáticos** (produtos, clientes): 2-5 minutos
- **Dados dinâmicos** (pedidos): 30 segundos - 1 minuto
- **Analytics**: 2-5 minutos com refetch automático

#### 2. Desenvolvimento de Componentes UI

**Estrutura Padrão:**
```typescript
// 1. Definir variantes com CVA
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-styles",
        secondary: "secondary-styles",
      },
      size: {
        sm: "small-styles",
        md: "medium-styles",
        lg: "large-styles",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// 2. Interface com VariantProps
export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  asChild?: boolean;
}

// 3. Componente com forwardRef
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

**Convenções de Nomenclatura:**
- **Variantes**: `default`, `secondary`, `destructive`, `outline`, `ghost`
- **Tamanhos**: `sm`, `md` (default), `lg`, `xl`
- **Estados**: `hover`, `focus`, `active`, `disabled`

#### 3. Desenvolvimento de Utilitários

**Categorização por Funcionalidade:**
```typescript
// Formatação - sempre com locale brasileiro
export function formatCurrency(value: number, currency = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value);
}

// Validação - schemas Zod reutilizáveis
export const emailSchema = z.string().email('Email inválido');
export const phoneSchema = z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/);

// Helpers - funções puras e testáveis
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

#### 4. Desenvolvimento de Tipos

**Hierarquia de Tipos:**
```typescript
// Base entities
export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface TenantEntity extends BaseEntity {
  tenant_id: string;
}

// API types com consistência
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// Request/Response pairs
export interface CreateProductRequest {
  name: string;
  price: number;
  // ... outros campos
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}
```

### Configuração de TypeScript para Packages

**tsconfig.base.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "CommonJS",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "exclude": ["node_modules", "dist", "build"]
}
```

### Estratégias de Build e Deploy

#### 1. Build dos Packages
```json
// package.json de cada package
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist"
  },
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"]
}
```

#### 2. Referências entre Packages
```json
// tsconfig.json da aplicação
{
  "references": [
    { "path": "../../packages/types" },
    { "path": "../../packages/utils" },
    { "path": "../../packages/ui" },
    { "path": "../../packages/api-client" }
  ]
}
```

#### 3. Aliases no Vite
```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@ecommerce/types': path.resolve(__dirname, '../../packages/types/src'),
      '@ecommerce/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@ecommerce/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@ecommerce/api-client': path.resolve(__dirname, '../../packages/api-client/src'),
    },
  },
});
```

### Convenções de Código

#### 1. Estrutura de Arquivos
```
packages/
├── package-name/
│   ├── src/
│   │   ├── components/     # Componentes (se aplicável)
│   │   ├── hooks/         # Hooks (se aplicável)
│   │   ├── lib/           # Utilitários internos
│   │   ├── types/         # Tipos específicos
│   │   └── index.ts       # Export principal
│   ├── dist/              # Build output
│   ├── package.json
│   └── tsconfig.json
```

#### 2. Convenções de Export
```typescript
// index.ts - Export principal
export * from './components';
export * from './hooks';
export * from './lib';
export * from './types';

// Re-export de dependências quando necessário
export * from '../../../types/src';
```

#### 3. Convenções de Nomenclatura
- **Hooks**: `use` + PascalCase (ex: `useProducts`, `useCreateProduct`)
- **Query Keys**: `entityKeys` (ex: `productKeys`, `orderKeys`)
- **Schemas**: `entitySchema` (ex: `createProductSchema`, `updateProductSchema`)
- **Types**: PascalCase (ex: `Product`, `CreateProductRequest`)
- **Utils**: camelCase (ex: `formatCurrency`, `slugify`)

## 9. Guia de Replicação

### Passos para Replicar a Arquitetura

#### 1. Configuração Inicial
```bash
# Criar projeto Vite + React + TypeScript
npm create vite@latest meu-projeto -- --template react-ts

# Instalar dependências principais
npm install react-router-dom react-query react-hook-form zod
npm install @radix-ui/react-* lucide-react framer-motion
npm install tailwindcss postcss autoprefixer
npm install -D @types/react @types/react-dom
```

#### 2. Configuração do Vite
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

#### 3. Configuração do Tailwind
```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Definir sistema de cores
      },
    },
  },
  plugins: [],
}
```

#### 4. Estrutura de Pastas
```
src/
├── components/
│   ├── layout/
│   ├── ui/
│   └── [feature]/
├── hooks/
├── pages/
├── utils/
├── types/
└── store/
```

#### 5. Configuração do React Query
```typescript
// main.tsx
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
```

### Checklist de Implementação

- [ ] Configurar Vite com aliases
- [ ] Configurar TypeScript com regras estritas
- [ ] Configurar Tailwind CSS
- [ ] Implementar estrutura de pastas
- [ ] Configurar React Router
- [ ] Configurar React Query
- [ ] Implementar sistema de design base
- [ ] Criar hooks customizados
- [ ] Implementar layout responsivo
- [ ] Configurar API client
- [ ] Implementar tratamento de erros
- [ ] Configurar ESLint e Prettier
- [ ] Documentar componentes
- [ ] Implementar testes (opcional)

## 9. Conclusão

Esta arquitetura fornece uma base sólida e escalável para aplicações React modernas, seguindo as melhores práticas da comunidade e princípios de Clean Architecture. A estrutura modular permite fácil manutenção e extensão, enquanto os packages compartilhados garantem consistência entre diferentes aplicações do monorepo.

A implementação de padrões como custom hooks, design system centralizado e gerenciamento de estado bem estruturado resulta em código mais limpo, testável e manutenível, facilitando o desenvolvimento em equipe e a evolução contínua da aplicação.
