# Frontend Landing Page - Páginas de Marketing

## Stack Tecnológico

- **Framework**: HTML5 estático + JavaScript Vanilla
- **Build Tool**: Webpack/Vite (para otimização)
- **Styling**: TailwindCSS + CSS Animations
- **SEO**: Meta tags nativas + Schema.org
- **Analytics**: Google Analytics 4
- **Forms**: JavaScript Vanilla + Fetch API
- **CMS**: Headless CMS (Strapi/Contentful) para conteúdo dinâmico

## Estrutura do Projeto

```
apps/landing/
├── src/
│   ├── pages/              # Páginas HTML estáticas
│   │   ├── index.html      # Home principal
│   │   ├── restaurant.html # Landing para lanchonetes
│   │   ├── fashion.html    # Landing para moda
│   │   ├── digital.html    # Landing para infoprodutos
│   │   ├── pricing.html    # Página de preços
│   │   ├── about.html      # Sobre nós
│   │   └── contact.html    # Contato
│   ├── assets/
│   │   ├── css/           # Estilos compilados
│   │   ├── js/            # JavaScript modular
│   │   ├── images/        # Imagens otimizadas
│   │   └── icons/         # Ícones SVG
│   ├── templates/         # Templates base para nichos
│   ├── components/        # Componentes HTML reutilizáveis
│   └── scripts/           # Scripts de build e otimização
├── dist/                  # Build final
└── package.json
```

## Templates por Nicho

### Sistema de Templates HTML
```html
<!-- restaurant.html - Template para Lanchonetes -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Delivery para Restaurantes | Loja Online</title>
    <meta name="description" content="Crie sua loja online para delivery em minutos. Sistema completo com cardápio digital, pedidos e pagamentos integrados.">
    <meta name="keywords" content="delivery, restaurante online, cardápio digital, pedidos online">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Sistema de Delivery para Restaurantes">
    <meta property="og:description" content="Sistema completo para delivery com cardápio digital">
    <meta property="og:image" content="/images/restaurant-og.jpg">
    <meta property="og:type" content="website">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Sistema de Delivery",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Sistema completo para delivery com cardápio digital"
    }
    </script>
    
    <link href="/assets/css/restaurant.css" rel="stylesheet">
</head>
<body class="restaurant-theme">
    <!-- Hero Section -->
    <section class="hero-section bg-gradient-restaurant min-h-screen flex items-center">
        <div class="container mx-auto px-4">
            <div class="text-center text-white">
                <h1 class="text-5xl font-bold mb-6 animate-fade-in">
                    Sua Lanchonete Online em Minutos
                </h1>
                <p class="text-xl mb-8 opacity-90">
                    Sistema completo para delivery com cardápio digital, pedidos e pagamentos
                </p>
                <button class="cta-button bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
                        onclick="trackCTAClick('hero', 'restaurant')">
                    Começar Agora - Grátis
                </button>
                
                <div class="mt-8 flex justify-center space-x-8 text-sm">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                        </svg>
                        Entrega em 30min
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                        </svg>
                        Pedidos pelo WhatsApp
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Features Section -->
    <section class="features-section py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Tudo que você precisa</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="feature-card bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                    <div class="feature-icon mb-4">
                        <svg class="w-12 h-12 mx-auto text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 6.414V12z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-3">Cardápio Digital</h3>
                    <p class="text-gray-600">Cardápio responsivo com fotos e descrições detalhadas</p>
                </div>
                <!-- Mais feature cards... -->
            </div>
        </div>
    </section>
    
    <script src="/assets/js/restaurant.js"></script>
</body>
</html>
```

### Template Builder JavaScript
```javascript
// assets/js/template-builder.js
class LandingTemplate {
    constructor(niche, config) {
        this.niche = niche;
        this.config = config;
        this.init();
    }
    
    init() {
        this.applyTheme();
        this.setupAnimations();
        this.initializeForms();
        this.trackPageView();
    }
    
    applyTheme() {
        const themes = {
            restaurant: {
                primaryColor: '#ff6b35',
                secondaryColor: '#2d3748',
                accentColor: '#f7931e'
            },
            fashion: {
                primaryColor: '#000000',
                secondaryColor: '#ffffff',
                accentColor: '#e2e8f0'
            },
            digital: {
                primaryColor: '#3b82f6',
                secondaryColor: '#1e293b',
                accentColor: '#06b6d4'
            }
        };
        
        const theme = themes[this.niche];
        document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
        document.documentElement.style.setProperty('--accent-color', theme.accentColor);
    }
    
    setupAnimations() {
        // Intersection Observer para animações
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        });
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}

// Instanciar template baseado na página
document.addEventListener('DOMContentLoaded', () => {
    const bodyClass = document.body.className;
    const niche = bodyClass.includes('restaurant') ? 'restaurant' : 
                  bodyClass.includes('fashion') ? 'fashion' : 'digital';
    
    new LandingTemplate(niche, window.landingConfig || {});
});
```

## Componentes Reutilizáveis

### 1. Hero Sections
```typescript
// Hero genérico adaptável
interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
  background?: {
    type: 'image' | 'video' | 'gradient';
    src?: string;
    gradient?: string;
  };
  niche: string;
}

const AdaptiveHero: React.FC<HeroProps> = ({ title, subtitle, cta, background, niche }) => {
  const heroStyles = getHeroStyles(niche);
  
  return (
    <section className={`relative min-h-screen flex items-center ${heroStyles.container}`}>
      {/* Background */}
      <HeroBackground background={background} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className={`mb-6 ${heroStyles.title}`}>
            {title}
          </h1>
          <p className={`mb-8 ${heroStyles.subtitle}`}>
            {subtitle}
          </p>
          
          <CTAButton 
            text={cta}
            size="large"
            style={heroStyles.cta}
            onClick={() => trackCTAClick('hero', niche)}
          />
          
          {/* Indicadores específicos por nicho */}
          {niche === 'restaurant' && (
            <div className="mt-8 flex justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 mr-2" />
                Entrega em 30min
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-2" />
                Pedidos pelo WhatsApp
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
```

### 2. Features Section
```typescript
interface Feature {
  icon: React.ComponentType;
  title: string;
  description: string;
  demo?: string; // URL para demo interativo
}

interface FeaturesProps {
  features: Feature[];
  niche: string;
  layout?: 'grid' | 'list' | 'carousel';
}

const FeaturesSection: React.FC<FeaturesProps> = ({ features, niche, layout = 'grid' }) => {
  const sectionStyles = getFeaturesStyles(niche);
  
  return (
    <section className={`py-20 ${sectionStyles.background}`}>
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Tudo que você precisa"
          subtitle={`Ferramentas profissionais para ${getNicheDisplayName(niche)}`}
          centered
        />
        
        <div className={getLayoutClasses(layout)}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={sectionStyles.featureCard}
            >
              <div className={sectionStyles.iconContainer}>
                <feature.icon className="w-8 h-8" />
              </div>
              
              <h3 className={sectionStyles.featureTitle}>
                {feature.title}
              </h3>
              
              <p className={sectionStyles.featureDescription}>
                {feature.description}
              </p>
              
              {feature.demo && (
                <InteractiveDemo 
                  url={feature.demo}
                  trigger="Ver Demo"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### 3. Pricing Section
```typescript
interface PricingPlan {
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  recommended?: boolean;
  cta: string;
  limits: {
    products?: number;
    orders?: number;
    storage?: string;
  };
}

const PricingSection: React.FC<{ niche: string }> = ({ niche }) => {
  const plans = getPricingByNiche(niche);
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Preços Transparentes"
          subtitle="Escolha o plano ideal para seu negócio"
          centered
        />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan, index) => (
            <PricingCard 
              key={index}
              plan={plan}
              niche={niche}
              recommended={plan.recommended}
            />
          ))}
        </div>
        
        <PricingComparison niche={niche} />
      </div>
    </section>
  );
};

const PricingCard: React.FC<{ plan: PricingPlan; niche: string; recommended?: boolean }> = ({ 
  plan, 
  niche, 
  recommended 
}) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`
        relative p-8 bg-white rounded-2xl shadow-lg
        ${recommended ? 'ring-2 ring-blue-500 scale-105' : ''}
      `}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            Mais Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold">R$ {plan.price}</span>
          <span className="text-gray-600">/{plan.period === 'month' ? 'mês' : 'ano'}</span>
        </div>
      </div>
      
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
            {feature}
          </li>
        ))}
      </ul>
      
      <PlanLimits limits={plan.limits} niche={niche} />
      
      <CTAButton 
        text={plan.cta}
        variant={recommended ? 'primary' : 'secondary'}
        fullWidth
        onClick={() => trackPlanSelection(plan.name, niche)}
      />
    </motion.div>
  );
};
```

### 4. Demo Interativo
```typescript
interface DemoProps {
  niche: string;
  previewImage: string;
  demoUrl?: string;
}

const InteractiveDemo: React.FC<DemoProps> = ({ niche, previewImage, demoUrl }) => {
  const [showDemo, setShowDemo] = useState(false);
  
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Veja em Ação"
          subtitle={`Explore como funciona na prática para ${getNicheDisplayName(niche)}`}
          centered
        />
        
        <div className="max-w-4xl mx-auto mt-12">
          <motion.div
            className="relative cursor-pointer group"
            onClick={() => setShowDemo(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={previewImage}
              alt="Demo Preview"
              className="w-full rounded-2xl shadow-2xl"
            />
            
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl flex items-center justify-center group-hover:bg-opacity-20 transition-all">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6">
                <PlayIcon className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-sm opacity-80">Clique para ver o demo interativo</p>
              <p className="font-semibold">Duração: 2 minutos</p>
            </div>
          </motion.div>
          
          {/* Modal de Demo */}
          <AnimatePresence>
            {showDemo && (
              <DemoModal 
                isOpen={showDemo}
                onClose={() => setShowDemo(false)}
                demoUrl={demoUrl}
                niche={niche}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
```

## Lead Generation

### Forms de Captura HTML
```html
<!-- Formulário de Lead HTML -->
<form class="lead-form" id="leadForm" data-variant="demo" data-niche="restaurant">
    <div class="form-group">
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
        <input type="text" id="name" name="name" required
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
        <span class="error-message hidden text-red-500 text-sm"></span>
    </div>
    
    <div class="form-group">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input type="email" id="email" name="email" required
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
        <span class="error-message hidden text-red-500 text-sm"></span>
    </div>
    
    <!-- Campos específicos por nicho -->
    <div class="niche-fields" data-niche="restaurant">
        <div class="form-group">
            <label for="businessType" class="block text-sm font-medium text-gray-700 mb-2">Tipo de Estabelecimento</label>
            <select id="businessType" name="businessType"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Selecione...</option>
                <option value="restaurant">Restaurante</option>
                <option value="fast_food">Fast Food</option>
                <option value="cafe">Café</option>
            </select>
        </div>
    </div>
    
    <button type="submit" class="submit-btn w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md transition-colors">
        <span class="btn-text">Solicitar Demo Gratuito</span>
        <span class="btn-loading hidden">Enviando...</span>
    </button>
</form>

<script>
// JavaScript para manipulação do formulário
class LeadForm {
    constructor(formElement) {
        this.form = formElement;
        this.variant = formElement.dataset.variant;
        this.niche = formElement.dataset.niche;
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.setupValidation();
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) return;
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    niche: this.niche,
                    variant: this.variant,
                    source: 'landing-page'
                }),
            });
            
            this.trackLeadGeneration();
            this.showSuccess();
            
        } catch (error) {
            this.showError();
        }
    }
}
</script>
```

// Campos específicos por nicho para orçamento
const NicheSpecificFields: React.FC<{ niche: string; register: any }> = ({ niche, register }) => {
  switch (niche) {
    case 'restaurant':
      return (
        <>
          <Select label="Tipo de Estabelecimento" {...register('business_type')}>
            <option value="restaurant">Restaurante</option>
            <option value="fast_food">Fast Food</option>
            <option value="cafe">Café</option>
            <option value="bakery">Padaria</option>
          </Select>
          
          <Select label="Possui Delivery?" {...register('has_delivery')}>
            <option value="yes">Sim</option>
            <option value="no">Não</option>
            <option value="planning">Pretendo implementar</option>
          </Select>
        </>
      );
      
    case 'fashion':
      return (
        <>
          <Select label="Tipo de Produto" {...register('product_type')}>
            <option value="clothing">Roupas</option>
            <option value="shoes">Calçados</option>
            <option value="accessories">Acessórios</option>
            <option value="mixed">Misto</option>
          </Select>
          
          <Input 
            label="Quantidade de Produtos (estimada)"
            type="number"
            {...register('estimated_products')}
          />
        </>
      );
      
    default:
      return null;
  }
};
```

## SEO e Performance

### Meta Tags Dinâmicas
```typescript
const LandingPageMeta: React.FC<{ niche: string; page: string }> = ({ niche, page }) => {
  const seoData = getSEOData(niche, page);
  
  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords.join(', ')} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />
      
      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(seoData.schema)}
      </script>
    </Helmet>
  );
};

// SEO específico por nicho
const getSEOData = (niche: string, page: string) => {
  const baseData = {
    restaurant: {
      title: 'Sistema de Delivery para Restaurantes | Loja Online',
      description: 'Crie sua loja online para delivery em minutos. Sistema completo com cardápio digital, pedidos e pagamentos integrados.',
      keywords: ['delivery', 'restaurante online', 'cardápio digital', 'pedidos online'],
      image: '/seo/restaurant-og.jpg'
    },
    fashion: {
      title: 'Loja Virtual para Moda | E-commerce Profissional',
      description: 'Loja virtual elegante para sua marca de moda. Gestão completa de produtos, variações e vendas online.',
      keywords: ['loja virtual moda', 'e-commerce fashion', 'loja online roupas'],
      image: '/seo/fashion-og.jpg'
    }
  };
  
  return baseData[niche] || baseData.restaurant;
};
```

### Performance Optimizations
```typescript
// Lazy loading de componentes pesados
const DemoModal = lazy(() => import('./DemoModal'));
const PricingComparison = lazy(() => import('./PricingComparison'));

// Image optimization
const OptimizedImage: React.FC<{ src: string; alt: string; className?: string }> = ({ 
  src, 
  alt, 
  className 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onLoad={() => trackImageLoad(src)}
    />
  );
};

// Critical CSS inlining
const CriticalCSS = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      /* Critical styles for above-the-fold content */
      .hero-section { /* ... */ }
      .navigation { /* ... */ }
    `
  }} />
);
```

## Analytics e Tracking

### Event Tracking
```typescript
const analytics = {
  // Page views
  trackPageView: (page: string, niche: string) => {
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      niche,
      page
    });
  },
  
  // Lead generation
  trackLeadGeneration: (variant: string, niche: string, placement: string) => {
    gtag('event', 'generate_lead', {
      event_category: 'Lead Generation',
      event_label: `${variant}-${niche}-${placement}`,
      value: getLeadValue(variant)
    });
  },
  
  // Demo interactions
  trackDemoInteraction: (action: string, niche: string) => {
    gtag('event', 'demo_interaction', {
      event_category: 'Demo',
      event_label: niche,
      action
    });
  },
  
  // CTA clicks
  trackCTAClick: (location: string, niche: string, text: string) => {
    gtag('event', 'cta_click', {
      event_category: 'CTA',
      event_label: `${location}-${niche}`,
      text
    });
  }
};
```

## A/B Testing

### Variant Testing
```typescript
interface ABTestConfig {
  testName: string;
  variants: string[];
  trafficSplit: number[];
  targetMetric: string;
}

const useABTest = (config: ABTestConfig) => {
  const [variant, setVariant] = useState<string>('');
  
  useEffect(() => {
    const userId = getUserId();
    const selectedVariant = selectVariant(userId, config);
    setVariant(selectedVariant);
    
    // Track variant assignment
    analytics.trackABTestAssignment(config.testName, selectedVariant);
  }, [config]);
  
  return variant;
};

// Exemplo de uso
const HeroSection = () => {
  const heroVariant = useABTest({
    testName: 'hero_cta_text',
    variants: ['Começar Agora', 'Criar Minha Loja', 'Experimentar Grátis'],
    trafficSplit: [33, 33, 34],
    targetMetric: 'conversion_rate'
  });
  
  return (
    <Hero 
      title="Sua Loja Online em Minutos"
      ctaText={heroVariant}
    />
  );
};
```
