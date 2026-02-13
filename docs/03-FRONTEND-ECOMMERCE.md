# Frontend Ecommerce - Loja Online

## Stack Tecnológico

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Shadcn/UI + Framer Motion
- **State Management**: Zustand + React Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **SEO**: React Helmet Async
- **PWA**: Vite PWA Plugin

## Estrutura do Projeto

```
apps/ecommerce/
├── src/
│   ├── components/          # Componentes da loja
│   │   ├── common/         # Componentes comuns
│   │   ├── product/        # Componentes de produto
│   │   ├── cart/           # Carrinho de compras
│   │   ├── checkout/       # Processo de checkout
│   │   └── layout/         # Layout da loja
│   ├── pages/              # Páginas da loja
│   │   ├── home/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── account/
│   │   └── order-tracking/
│   ├── hooks/              # Custom hooks
│   ├── services/           # API e serviços
│   ├── stores/             # Zustand stores
│   ├── themes/             # Temas por nicho
│   └── utils/              # Utilities
├── public/
└── package.json
```

## Temas Adaptáveis por Nicho

### Sistema de Temas
```typescript
interface ThemeConfig {
  niche: 'restaurant' | 'fashion' | 'digital' | 'retail';
  colors: ColorPalette;
  typography: Typography;
  layout: LayoutConfig;
  components: ComponentConfig;
}

// Tema para lanchonete
const restaurantTheme: ThemeConfig = {
  niche: 'restaurant',
  colors: {
    primary: '#ff6b35',    // Laranja apetitoso
    secondary: '#2d3748',  
    accent: '#f7931e',
    background: '#fffbf7',
    success: '#38a169',
  },
  typography: {
    headingFont: 'Poppins',
    bodyFont: 'Inter',
    sizes: {
      hero: '3xl',
      heading: 'xl',
      body: 'base'
    }
  },
  layout: {
    showDeliveryInfo: true,
    showNutritionInfo: true,
    enableQuickOrder: true,
    categoryStyle: 'tabs' // vs 'sidebar'
  }
};

// Tema para moda
const fashionTheme: ThemeConfig = {
  niche: 'fashion',
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#e2e8f0',
    background: '#fafafa',
  },
  layout: {
    showSizeGuide: true,
    showMaterialInfo: true,
    enableWishlist: true,
    categoryStyle: 'sidebar',
    productImageStyle: 'gallery' // vs 'carousel'
  }
};
```

### Theme Provider
```typescript
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { tenant } = useTenant();
  const theme = getThemeByNiche(tenant?.niche || 'retail');
  
  return (
    <ThemeContext.Provider value={theme}>
      <div className={getThemeClasses(theme)}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
```

## Componentes Adaptáveis

### 1. Header/Navigation
```typescript
interface HeaderProps {
  tenant: Tenant;
  cart: Cart;
  user?: User;
}

const Header: React.FC<HeaderProps> = ({ tenant, cart, user }) => {
  const theme = useTheme();
  
  return (
    <header className={getHeaderClasses(theme)}>
      <Logo tenant={tenant} />
      <Navigation categories={tenant.categories} layout={theme.layout.categoryStyle} />
      
      {/* Componentes específicos por nicho */}
      {theme.niche === 'restaurant' && (
        <DeliveryInfo deliveryTime={tenant.settings.delivery_time} />
      )}
      
      {theme.niche === 'fashion' && (
        <SearchBar 
          filters={['size', 'color', 'brand']}
          suggestions={true}
        />
      )}
      
      <CartButton cart={cart} />
      <UserMenu user={user} />
    </header>
  );
};
```

### 2. Product Card
```typescript
interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list' | 'featured';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'grid' }) => {
  const theme = useTheme();
  
  return (
    <div className={getProductCardClasses(theme, variant)}>
      <ProductImage 
        product={product}
        style={theme.layout.productImageStyle}
      />
      
      <div className="product-info">
        <ProductTitle product={product} />
        <ProductPrice product={product} />
        
        {/* Informações específicas por nicho */}
        {theme.niche === 'restaurant' && (
          <RestaurantInfo 
            cookingTime={product.custom_attributes.cooking_time}
            spiceLevel={product.custom_attributes.spice_level}
          />
        )}
        
        {theme.niche === 'fashion' && (
          <FashionInfo 
            sizes={product.variants?.map(v => v.size)}
            colors={product.variants?.map(v => v.color)}
          />
        )}
        
        {theme.niche === 'digital' && (
          <DigitalInfo 
            format={product.custom_attributes.format}
            accessType={product.custom_attributes.access_type}
          />
        )}
        
        <AddToCartButton 
          product={product}
          style={theme.components.buttonStyle}
        />
      </div>
    </div>
  );
};
```

### 3. Product Detail Page
```typescript
const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { data: product } = useProduct(id);
  const theme = useTheme();
  
  if (!product) return <ProductSkeleton />;
  
  return (
    <div className="product-detail">
      <ProductGallery 
        images={product.images}
        style={theme.layout.productImageStyle}
      />
      
      <div className="product-info">
        <ProductHeader product={product} />
        <ProductDescription product={product} />
        
        {/* Seções específicas por nicho */}
        <NicheSpecificSections product={product} niche={theme.niche} />
        
        <ProductVariants 
          product={product}
          niche={theme.niche}
        />
        
        <AddToCartSection product={product} />
        
        {theme.layout.enableReviews && (
          <ProductReviews productId={product.id} />
        )}
      </div>
    </div>
  );
};

// Seções específicas por nicho
const NicheSpecificSections: React.FC<{ product: Product; niche: string }> = ({ product, niche }) => {
  switch (niche) {
    case 'restaurant':
      return (
        <>
          <IngredientsList ingredients={product.custom_attributes.ingredients} />
          <NutritionInfo nutrition={product.custom_attributes.nutrition} />
          <AllergenInfo allergens={product.custom_attributes.allergens} />
        </>
      );
      
    case 'fashion':
      return (
        <>
          <SizeGuide sizes={product.variants?.map(v => v.size)} />
          <MaterialInfo material={product.custom_attributes.material} />
          <CareInstructions care={product.custom_attributes.care} />
        </>
      );
      
    case 'digital':
      return (
        <>
          <ContentPreview preview={product.custom_attributes.preview_url} />
          <SystemRequirements requirements={product.custom_attributes.requirements} />
          <AccessInfo accessType={product.custom_attributes.access_type} />
        </>
      );
      
    default:
      return null;
  }
};
```

## Carrinho de Compras Flexível

### Cart Store
```typescript
interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
  customizations?: Record<string, any>; // Para personalizações específicas
}

interface CartStore {
  items: CartItem[];
  total: number;
  shipping: ShippingInfo | null;
  addItem: (product: Product, options?: AddItemOptions) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  applyDiscount: (code: string) => Promise<void>;
  calculateShipping: (address: Address) => Promise<void>;
  clear: () => void;
}

// Opções específicas por nicho
interface AddItemOptions {
  variant?: ProductVariant;
  customizations?: {
    // Lanchonete
    specialInstructions?: string;
    removeIngredients?: string[];
    extraIngredients?: string[];
    
    // Moda
    giftWrap?: boolean;
    monogram?: string;
    
    // Digital
    licenseType?: 'personal' | 'commercial';
  };
}
```

### Cart Component
```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const Cart: React.FC = () => {
  const { items, total, updateQuantity, removeItem } = useCartStore();
  const theme = useTheme();
  
  return (
    <div className="cart space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Carrinho de Compras
            <Badge variant="secondary">{items.length} items</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map(item => (
            <CartItem 
              key={`${item.product.id}-${item.variant?.id || 'default'}`}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
              niche={theme.niche}
            />
          ))}
          
          <Separator />
          
          <CartSummary 
            subtotal={calculateSubtotal(items)}
            shipping={calculateShipping(items)}
            taxes={calculateTaxes(items)}
            total={total}
          />
          
          <Button 
            className="w-full"
            disabled={items.length === 0}
            size="lg"
          >
            Finalizar Compra
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
```

## Processo de Checkout

### Multi-step Checkout
```typescript
interface CheckoutStep {
  id: string;
  title: string;
  component: React.ComponentType;
  validation: ZodSchema;
  required: boolean;
}

const getCheckoutSteps = (niche: string): CheckoutStep[] => {
  const baseSteps = [
    { id: 'cart', title: 'Carrinho', component: CartReview },
    { id: 'customer', title: 'Dados', component: CustomerInfo },
    { id: 'payment', title: 'Pagamento', component: PaymentInfo },
    { id: 'confirmation', title: 'Confirmação', component: OrderConfirmation }
  ];
  
  // Adicionar steps específicos por nicho
  if (niche === 'restaurant') {
    baseSteps.splice(2, 0, {
      id: 'delivery',
      title: 'Entrega',
      component: DeliveryOptions
    });
  }
  
  if (niche === 'fashion') {
    baseSteps.splice(2, 0, {
      id: 'shipping',
      title: 'Envio',
      component: ShippingOptions
    });
  }
  
  return baseSteps;
};

const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const theme = useTheme();
  const steps = getCheckoutSteps(theme.niche);
  
  return (
    <div className="checkout">
      <CheckoutProgress 
        steps={steps}
        currentStep={currentStep}
      />
      
      <div className="checkout-content">
        {React.createElement(steps[currentStep].component)}
      </div>
      
      <CheckoutNavigation 
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={() => setCurrentStep(prev => prev + 1)}
        onPrev={() => setCurrentStep(prev => prev - 1)}
      />
    </div>
  );
};
```

## SEO e Performance

### Meta Tags Dinâmicas
```typescript
const ProductDetailPage: React.FC = () => {
  const { data: product } = useProduct(id);
  
  return (
    <>
      <Helmet>
        <title>{product?.name} | {tenant.name}</title>
        <meta name="description" content={product?.description} />
        <meta property="og:title" content={product?.name} />
        <meta property="og:description" content={product?.description} />
        <meta property="og:image" content={product?.images[0]?.url} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product?.price} />
        <meta property="product:price:currency" content="BRL" />
      </Helmet>
      
      <ProductDetail product={product} />
    </>
  );
};
```

### PWA Configuration
```typescript
// vite-pwa config
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.yourstore\.com\/api\//,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 // 24 hours
          }
        }
      }
    ]
  },
  manifest: {
    name: 'Your Store',
    short_name: 'Store',
    description: 'Your multi-niche ecommerce store',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ]
  }
})
```

## Otimizações Mobile

### Responsive Design
```typescript
// Breakpoints específicos por nicho
const breakpoints = {
  restaurant: {
    // Foco em dispositivos móveis para delivery
    sm: '640px',
    md: '768px',
    lg: '1024px'
  },
  fashion: {
    // Mais foco em tablets e desktop para visualização
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
};

// Componentes mobile-first
const MobileProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="mobile-product-card">
      <TouchableImage src={product.image} />
      <QuickAddButton product={product} />
    </div>
  );
};
```

### Touch Interactions
```typescript
// Gestos para mobile
const ProductGallery: React.FC = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentImage(prev => 
      prev < images.length - 1 ? prev + 1 : prev
    ),
    onSwipedRight: () => setCurrentImage(prev => 
      prev > 0 ? prev - 1 : prev
    ),
  });
  
  return (
    <div {...swipeHandlers} className="product-gallery">
      <img src={images[currentImage]?.url} alt="Product" />
      <ImageIndicators 
        total={images.length}
        current={currentImage}
      />
    </div>
  );
};
```

## Analytics e Tracking

### E-commerce Events
```typescript
// Tracking de eventos específicos do ecommerce
const trackingService = {
  // Eventos de produto
  viewProduct: (product: Product) => {
    analytics.track('Product Viewed', {
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      price: product.price,
      niche: product.tenant.niche
    });
  },
  
  // Eventos de carrinho
  addToCart: (product: Product, quantity: number) => {
    analytics.track('Product Added to Cart', {
      product_id: product.id,
      quantity,
      value: product.price * quantity
    });
  },
  
  // Eventos de compra
  purchaseCompleted: (order: Order) => {
    analytics.track('Order Completed', {
      order_id: order.id,
      value: order.total,
      currency: 'BRL',
      items: order.items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.price
      }))
    });
  }
};
```

## Build e Deploy

### Configuração Vite
```typescript
export default defineConfig({
  plugins: [
    react(),
    VitePWA(pwaConfig)
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          store: ['zustand'],
          router: ['react-router-dom'],
          ui: ['framer-motion'],
        },
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
```
