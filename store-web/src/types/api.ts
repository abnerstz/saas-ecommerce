import { PaginationMeta, FilterParams, SortParams } from './common';

// Tipos para APIs

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ListParams extends FilterParams {
  page?: number;
  limit?: number;
  sort?: SortParams;
}

// Auth API Types
export interface LoginRequest {
  email: string;
  password: string;
  tenant_slug?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    tenant_id: string;
  };
  tenant: {
    id: string;
    name: string;
    slug: string;
    niche: string;
  };
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  tenant_slug?: string;
}

export interface ForgotPasswordRequest {
  email: string;
  tenant_slug?: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

// Product API Types
export interface CreateProductRequest {
  name: string;
  description?: string;
  short_description?: string;
  price: number;
  compare_at_price?: number;
  cost_price?: number;
  category_id?: string;
  sku?: string;
  barcode?: string;
  track_inventory?: boolean;
  inventory_qty?: number;
  allow_backorder?: boolean;
  weight?: number;
  dimensions?: Record<string, any>;
  is_featured?: boolean;
  seo_title?: string;
  seo_description?: string;
  images?: string[];
  custom_attributes?: Record<string, any>;
  variants?: CreateProductVariantRequest[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface CreateProductVariantRequest {
  title: string;
  sku?: string;
  barcode?: string;
  price?: number;
  compare_at_price?: number;
  cost_price?: number;
  inventory_qty?: number;
  attributes?: Record<string, any>;
  image_url?: string;
}

export interface ProductFilters extends FilterParams {
  category_id?: string;
  status?: string;
  is_featured?: boolean;
  price_min?: number;
  price_max?: number;
  in_stock?: boolean;
}

// Order API Types
export interface CreateOrderRequest {
  customer_id?: string;
  customer_info?: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  };
  billing_address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shipping_address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: Array<{
    product_id: string;
    variant_id?: string;
    quantity: number;
    customizations?: Record<string, any>;
  }>;
  notes?: string;
  custom_attributes?: Record<string, any>;
}

export interface UpdateOrderRequest {
  id: string;
  status?: string;
  fulfillment_status?: string;
  payment_status?: string;
  notes?: string;
  tags?: string[];
}

export interface OrderFilters extends FilterParams {
  status?: string;
  fulfillment_status?: string;
  payment_status?: string;
  customer_id?: string;
  date_from?: string;
  date_to?: string;
}

// Customer API Types
export interface CreateCustomerRequest {
  email?: string;
  phone?: string;
  first_name: string;
  last_name: string;
  birth_date?: string;
  gender?: string;
  addresses?: Array<{
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    type?: string;
    isDefault?: boolean;
  }>;
  accepts_marketing?: boolean;
  tags?: string[];
}

export interface UpdateCustomerRequest extends Partial<CreateCustomerRequest> {
  id: string;
}

export interface CustomerFilters extends FilterParams {
  accepts_marketing?: boolean;
  has_orders?: boolean;
  tags?: string[];
}

// Category API Types
export interface CreateCategoryRequest {
  parent_id?: string;
  name: string;
  slug?: string;
  description?: string;
  image_url?: string;
  seo_title?: string;
  seo_description?: string;
  sort_order?: number;
  custom_attributes?: Record<string, any>;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: string;
}

// Analytics API Types
export interface AnalyticsRequest {
  metric: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  date_from?: string;
  date_to?: string;
  filters?: Record<string, any>;
}

export interface AnalyticsResponse {
  metric: string;
  period: string;
  data: Array<{
    date: string;
    value: number;
    dimensions?: Record<string, any>;
  }>;
  summary: {
    total: number;
    average: number;
    growth?: number;
  };
}

// Dashboard API Types
export interface DashboardStatsResponse {
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

export interface RecentActivity {
  id: string;
  type: 'order' | 'customer' | 'product' | 'payment';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// File Upload API Types
export interface UploadRequest {
  file: unknown; // Browser File object
  folder?: string;
  alt?: string;
}

export interface UploadResponse {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  alt?: string;
}
