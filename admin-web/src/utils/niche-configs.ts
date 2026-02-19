import { NicheType, ProductFormConfig, ThemeConfig } from '../../types/src';

// Configurações específicas por nicho

/**
 * Configurações de campos de produto por nicho
 */
export const PRODUCT_CONFIGS: Record<NicheType, ProductFormConfig> = {
  restaurant: {
    niche: 'restaurant' as NicheType,
    fields: [
      {
        name: 'ingredients',
        type: 'multi-select',
        label: 'Ingredientes',
        required: true,
        options: [
          { value: 'beef', label: 'Carne bovina' },
          { value: 'chicken', label: 'Frango' },
          { value: 'pork', label: 'Porco' },
          { value: 'fish', label: 'Peixe' },
          { value: 'cheese', label: 'Queijo' },
          { value: 'lettuce', label: 'Alface' },
          { value: 'tomato', label: 'Tomate' },
          { value: 'onion', label: 'Cebola' },
          { value: 'pickle', label: 'Picles' },
          { value: 'bacon', label: 'Bacon' },
        ],
      },
      {
        name: 'cooking_time',
        type: 'number',
        label: 'Tempo de Preparo',
        suffix: 'minutos',
        min: 1,
        max: 120,
      },
      {
        name: 'spice_level',
        type: 'select',
        label: 'Nível de Pimenta',
        options: [
          { value: 'none', label: 'Sem pimenta' },
          { value: 'mild', label: 'Suave' },
          { value: 'medium', label: 'Médio' },
          { value: 'hot', label: 'Picante' },
          { value: 'very_hot', label: 'Muito picante' },
        ],
      },
      {
        name: 'calories',
        type: 'number',
        label: 'Calorias',
        suffix: 'kcal',
        min: 0,
      },
      {
        name: 'allergens',
        type: 'multi-select',
        label: 'Alérgenos',
        options: [
          { value: 'gluten', label: 'Glúten' },
          { value: 'lactose', label: 'Lactose' },
          { value: 'nuts', label: 'Castanhas' },
          { value: 'soy', label: 'Soja' },
          { value: 'eggs', label: 'Ovos' },
          { value: 'fish', label: 'Peixes' },
          { value: 'shellfish', label: 'Frutos do mar' },
        ],
      },
      {
        name: 'vegetarian',
        type: 'boolean',
        label: 'Vegetariano',
      },
      {
        name: 'vegan',
        type: 'boolean',
        label: 'Vegano',
      },
    ],
    validations: [
      {
        required: true,
        message: 'Ingredientes são obrigatórios',
      },
    ],
    customSections: [
      {
        title: 'Informações Nutricionais',
        fields: ['calories', 'allergens', 'vegetarian', 'vegan'],
        collapsible: true,
      },
      {
        title: 'Preparo',
        fields: ['cooking_time', 'spice_level'],
        collapsible: true,
      },
    ],
  },

  fashion: {
    niche: 'fashion' as NicheType,
    fields: [
      {
        name: 'material',
        type: 'text',
        label: 'Material',
        placeholder: 'Ex: 100% Algodão',
        required: true,
      },
      {
        name: 'care_instructions',
        type: 'textarea',
        label: 'Instruções de Cuidado',
        placeholder: 'Ex: Lavar a 30°C, não usar alvejante',
      },
      {
        name: 'fit',
        type: 'select',
        label: 'Caimento',
        options: [
          { value: 'slim', label: 'Slim' },
          { value: 'regular', label: 'Regular' },
          { value: 'loose', label: 'Loose' },
          { value: 'oversized', label: 'Oversized' },
        ],
      },
      {
        name: 'season',
        type: 'select',
        label: 'Estação',
        options: [
          { value: 'spring', label: 'Primavera' },
          { value: 'summer', label: 'Verão' },
          { value: 'autumn', label: 'Outono' },
          { value: 'winter', label: 'Inverno' },
          { value: 'all_seasons', label: 'Todas as estações' },
        ],
      },
      {
        name: 'gender',
        type: 'select',
        label: 'Gênero',
        options: [
          { value: 'male', label: 'Masculino' },
          { value: 'female', label: 'Feminino' },
          { value: 'unisex', label: 'Unissex' },
        ],
      },
      {
        name: 'size_chart_id',
        type: 'text',
        label: 'ID da Tabela de Tamanhos',
        placeholder: 'Ex: shirts-male-regular',
      },
    ],
    validations: [
      {
        required: true,
        message: 'Material é obrigatório',
      },
    ],
    customSections: [
      {
        title: 'Características do Produto',
        fields: ['material', 'fit', 'gender'],
        collapsible: false,
      },
      {
        title: 'Cuidados e Informações Adicionais',
        fields: ['care_instructions', 'season', 'size_chart_id'],
        collapsible: true,
      },
    ],
  },

  digital: {
    niche: 'digital' as NicheType,
    fields: [
      {
        name: 'format',
        type: 'select',
        label: 'Formato',
        required: true,
        options: [
          { value: 'video', label: 'Vídeo' },
          { value: 'ebook', label: 'E-book' },
          { value: 'audio', label: 'Áudio' },
          { value: 'software', label: 'Software' },
          { value: 'course', label: 'Curso Online' },
          { value: 'template', label: 'Template' },
        ],
      },
      {
        name: 'duration',
        type: 'number',
        label: 'Duração',
        suffix: 'minutos',
        min: 1,
      },
      {
        name: 'file_size',
        type: 'number',
        label: 'Tamanho do Arquivo',
        suffix: 'MB',
        min: 0,
      },
      {
        name: 'preview_url',
        type: 'text',
        label: 'URL do Preview',
        placeholder: 'https://...',
      },
      {
        name: 'system_requirements',
        type: 'textarea',
        label: 'Requisitos do Sistema',
        placeholder: 'Ex: Windows 10+, 4GB RAM',
      },
      {
        name: 'license_type',
        type: 'select',
        label: 'Tipo de Licença',
        options: [
          { value: 'personal', label: 'Uso Pessoal' },
          { value: 'commercial', label: 'Uso Comercial' },
          { value: 'extended', label: 'Licença Estendida' },
        ],
      },
      {
        name: 'access_type',
        type: 'select',
        label: 'Tipo de Acesso',
        options: [
          { value: 'lifetime', label: 'Vitalício' },
          { value: '1_year', label: '1 Ano' },
          { value: '6_months', label: '6 Meses' },
          { value: '1_month', label: '1 Mês' },
        ],
      },
      {
        name: 'download_limit',
        type: 'number',
        label: 'Limite de Downloads',
        min: 1,
        max: 10,
      },
    ],
    validations: [
      {
        required: true,
        message: 'Formato é obrigatório',
      },
    ],
    customSections: [
      {
        title: 'Informações do Arquivo',
        fields: ['format', 'duration', 'file_size', 'system_requirements'],
        collapsible: false,
      },
      {
        title: 'Licenciamento e Acesso',
        fields: ['license_type', 'access_type', 'download_limit'],
        collapsible: true,
      },
      {
        title: 'Preview',
        fields: ['preview_url'],
        collapsible: true,
      },
    ],
  },

  retail: {
    niche: 'retail' as NicheType,
    fields: [
      {
        name: 'brand',
        type: 'text',
        label: 'Marca',
        placeholder: 'Ex: Nike, Samsung',
      },
      {
        name: 'model',
        type: 'text',
        label: 'Modelo',
        placeholder: 'Ex: Air Max, Galaxy S24',
      },
      {
        name: 'warranty',
        type: 'number',
        label: 'Garantia',
        suffix: 'meses',
        min: 0,
        max: 120,
      },
      {
        name: 'origin',
        type: 'select',
        label: 'Origem',
        options: [
          { value: 'national', label: 'Nacional' },
          { value: 'imported', label: 'Importado' },
        ],
      },
      {
        name: 'condition',
        type: 'select',
        label: 'Condição',
        options: [
          { value: 'new', label: 'Novo' },
          { value: 'used', label: 'Usado' },
          { value: 'refurbished', label: 'Recondicionado' },
        ],
      },
    ],
    validations: [],
    customSections: [
      {
        title: 'Informações do Produto',
        fields: ['brand', 'model', 'condition'],
        collapsible: false,
      },
      {
        title: 'Garantia e Origem',
        fields: ['warranty', 'origin'],
        collapsible: true,
      },
    ],
  },

  services: {
    niche: 'services' as NicheType,
    fields: [
      {
        name: 'service_type',
        type: 'select',
        label: 'Tipo de Serviço',
        options: [
          { value: 'consultation', label: 'Consultoria' },
          { value: 'maintenance', label: 'Manutenção' },
          { value: 'installation', label: 'Instalação' },
          { value: 'repair', label: 'Reparo' },
          { value: 'design', label: 'Design' },
          { value: 'other', label: 'Outro' },
        ],
      },
      {
        name: 'duration',
        type: 'number',
        label: 'Duração',
        suffix: 'horas',
        min: 0.5,
        step: 0.5,
      },
      {
        name: 'location_type',
        type: 'select',
        label: 'Local de Atendimento',
        options: [
          { value: 'on_site', label: 'No local do cliente' },
          { value: 'remote', label: 'Remoto' },
          { value: 'office', label: 'Em nosso escritório' },
        ],
      },
      {
        name: 'requirements',
        type: 'textarea',
        label: 'Requisitos',
        placeholder: 'Descreva os requisitos necessários para o serviço',
      },
    ],
    validations: [],
    customSections: [
      {
        title: 'Detalhes do Serviço',
        fields: ['service_type', 'duration', 'location_type'],
        collapsible: false,
      },
      {
        title: 'Requisitos',
        fields: ['requirements'],
        collapsible: true,
      },
    ],
  },

  other: {
    niche: 'other' as NicheType,
    fields: [
      {
        name: 'category',
        type: 'text',
        label: 'Categoria',
        placeholder: 'Ex: Eletrônicos, Casa & Jardim',
      },
      {
        name: 'specifications',
        type: 'textarea',
        label: 'Especificações',
        placeholder: 'Descreva as especificações do produto',
      },
    ],
    validations: [],
    customSections: [
      {
        title: 'Informações Gerais',
        fields: ['category', 'specifications'],
        collapsible: false,
      },
    ],
  },
};

/**
 * Configurações de tema por nicho
 */
export const THEME_CONFIGS: Record<NicheType, ThemeConfig> = {
  restaurant: {
    niche: 'restaurant' as NicheType,
    colors: {
      primary: '#ff6b35',
      secondary: '#2d3748',
      accent: '#f7931e',
      background: '#fffbf7',
      success: '#38a169',
      warning: '#d69e2e',
      error: '#e53e3e',
    },
    typography: {
      headingFont: 'Poppins',
      bodyFont: 'Inter',
      sizes: {
        hero: '3xl',
        heading: 'xl',
        subheading: 'lg',
        body: 'base',
        caption: 'sm',
      },
    },
    layout: {
      showDeliveryInfo: true,
      showNutritionInfo: true,
      enableQuickOrder: true,
      categoryStyle: 'tabs',
      showCookingTime: true,
      enableIngredientCustomization: true,
    },
    components: {
      buttonStyle: 'rounded',
      cardStyle: 'elevated',
      productImageStyle: 'square',
    },
  },

  fashion: {
    niche: 'fashion' as NicheType,
    colors: {
      primary: '#000000',
      secondary: '#ffffff',
      accent: '#e2e8f0',
      background: '#fafafa',
      success: '#38a169',
      warning: '#d69e2e',
      error: '#e53e3e',
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Inter',
      sizes: {
        hero: '4xl',
        heading: '2xl',
        subheading: 'lg',
        body: 'base',
        caption: 'sm',
      },
    },
    layout: {
      showSizeGuide: true,
      showMaterialInfo: true,
      enableWishlist: true,
      categoryStyle: 'sidebar',
      productImageStyle: 'gallery',
      showSeasonalCollections: true,
    },
    components: {
      buttonStyle: 'minimal',
      cardStyle: 'clean',
      productImageStyle: 'portrait',
    },
  },

  digital: {
    niche: 'digital' as NicheType,
    colors: {
      primary: '#3b82f6',
      secondary: '#1e293b',
      accent: '#06b6d4',
      background: '#f8fafc',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      sizes: {
        hero: '4xl',
        heading: '2xl',
        subheading: 'lg',
        body: 'base',
        caption: 'sm',
      },
    },
    layout: {
      showPreview: true,
      showSystemRequirements: true,
      enableInstantAccess: true,
      categoryStyle: 'grid',
      showContentOutline: true,
      enableProgressTracking: true,
    },
    components: {
      buttonStyle: 'modern',
      cardStyle: 'tech',
      productImageStyle: 'widescreen',
    },
  },

  retail: {
    niche: 'retail' as NicheType,
    colors: {
      primary: '#059669',
      secondary: '#374151',
      accent: '#f59e0b',
      background: '#ffffff',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      sizes: {
        hero: '3xl',
        heading: 'xl',
        subheading: 'lg',
        body: 'base',
        caption: 'sm',
      },
    },
    layout: {
      showBrandFilter: true,
      showPriceComparison: true,
      enableProductComparison: true,
      categoryStyle: 'hierarchy',
      showSpecifications: true,
      enableBulkOrders: true,
    },
    components: {
      buttonStyle: 'standard',
      cardStyle: 'standard',
      productImageStyle: 'square',
    },
  },

  services: {
    niche: 'services' as NicheType,
    colors: {
      primary: '#7c3aed',
      secondary: '#4b5563',
      accent: '#f59e0b',
      background: '#ffffff',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      sizes: {
        hero: '4xl',
        heading: '2xl',
        subheading: 'lg',
        body: 'base',
        caption: 'sm',
      },
    },
    layout: {
      showServiceAreas: true,
      showAvailability: true,
      enableBooking: true,
      categoryStyle: 'list',
      showPortfolio: true,
      enableQuotationRequest: true,
    },
    components: {
      buttonStyle: 'professional',
      cardStyle: 'service',
      productImageStyle: 'landscape',
    },
  },

  other: {
    niche: 'other' as NicheType,
    colors: {
      primary: '#6366f1',
      secondary: '#475569',
      accent: '#f59e0b',
      background: '#ffffff',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      sizes: {
        hero: '3xl',
        heading: 'xl',
        subheading: 'lg',
        body: 'base',
        caption: 'sm',
      },
    },
    layout: {
      enableCustomFields: true,
      categoryStyle: 'flexible',
      showDetailedSpecs: true,
    },
    components: {
      buttonStyle: 'default',
      cardStyle: 'default',
      productImageStyle: 'flexible',
    },
  },
};

/**
 * Obter configuração de produto por nicho
 */
export function getProductConfig(niche: NicheType): ProductFormConfig {
  return PRODUCT_CONFIGS[niche] || PRODUCT_CONFIGS.other;
}

/**
 * Obter configuração de tema por nicho
 */
export function getThemeConfig(niche: NicheType): ThemeConfig {
  return THEME_CONFIGS[niche] || THEME_CONFIGS.other;
}

/**
 * Obter campos específicos por nicho
 */
export function getNicheFields(niche: NicheType) {
  return getProductConfig(niche).fields;
}

/**
 * Obter seções customizadas por nicho
 */
export function getNicheSections(niche: NicheType) {
  return getProductConfig(niche).customSections;
}
