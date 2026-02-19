import { NicheType } from './enums';

// Tipos comuns utilizados em todo o sistema

export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface TenantEntity extends BaseEntity {
  tenant_id: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface FilterParams {
  search?: string;
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: any;
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

// Configuração de tema por nicho
export interface ThemeConfig {
  niche: NicheType;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    sizes: {
      hero: string;
      heading: string;
      subheading: string;
      body: string;
      caption: string;
    };
  };
  layout: {
    [key: string]: boolean | string | number;
  };
  components: {
    [key: string]: any;
  };
}

// Configuração de produtos por nicho
export interface ProductFormConfig {
  niche: NicheType;
  fields: ProductField[];
  validations: ValidationRule[];
  customSections: CustomSection[];
}

export interface ProductField {
  name: string;
  type: 'text' | 'number' | 'select' | 'multi-select' | 'textarea' | 'boolean' | 'file';
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: ValidationRule;
  suffix?: string;
  prefix?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

export interface CustomSection {
  title: string;
  description?: string;
  fields: string[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

// Endereço estruturado
export interface Address {
  id?: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
  type?: 'home' | 'work' | 'other';
}

// Coordenadas geográficas
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Configurações de entrega
export interface DeliveryConfig {
  enabled: boolean;
  radius?: number; // em km
  minimumOrder?: number;
  fee?: number;
  freeThreshold?: number;
  estimatedTime?: number; // em minutos
  workingHours?: WorkingHours;
}

export interface WorkingHours {
  [key: string]: {
    open: string;
    close: string;
    closed?: boolean;
  };
}

// Notificação
export interface NotificationData {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  data?: Record<string, any>;
}

// Upload de arquivo (Browser File API)
export interface FileUpload {
  file: unknown; // Browser File object
  preview?: string;
  progress?: number;
  error?: string;
}

export interface UploadedFile {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  alt?: string;
}

// Métricas do dashboard
export interface DashboardMetrics {
  sales: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    growth: number;
  };
  orders: {
    pending: number;
    processing: number;
    completed: number;
    cancelled: number;
  };
  customers: {
    total: number;
    new: number;
    returning: number;
  };
  products: {
    total: number;
    active: number;
    lowStock: number;
  };
}

// Permissões do usuário
export interface UserPermissions {
  [module: string]: {
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

// Configurações do sistema
export interface SystemSettings {
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    logo: string;
    favicon: string;
  };
  appearance: {
    theme: ThemeConfig;
    customCss?: string;
  };
  business: {
    niche: NicheType;
    businessType: string;
    currency: string;
    timezone: string;
    language: string;
  };
  integrations: {
    [key: string]: any;
  };
}
