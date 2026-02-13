import {
  NicheType,
  TenantStatus,
  PlanType,
  UserRole,
  UserStatus,
  ProductStatus,
  OrderStatus,
  FulfillmentStatus,
  PaymentStatus,
  PaymentMethodType,
  PaymentGateway,
  ShipmentStatus,
  DiscountType,
  NotificationType,
} from './enums';
import { BaseEntity, TenantEntity, Address, UploadedFile } from './common';

// ================================
// TENANT & USERS
// ================================

export interface Tenant extends BaseEntity {
  name: string;
  slug: string;
  domain?: string;
  subdomain?: string;
  niche: NicheType;
  business_type?: string;
  description?: string;
  logo_url?: string;
  favicon_url?: string;
  settings: Record<string, any>;
  theme_config: Record<string, any>;
  feature_flags: Record<string, any>;
  email?: string;
  phone?: string;
  address?: Address;
  status: TenantStatus;
  plan_type: PlanType;
  plan_limits: Record<string, any>;
}

export interface User extends BaseEntity {
  tenant_id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  phone?: string;
  email_verified: boolean;
  email_verified_at?: Date;
  last_login_at?: Date;
  role: UserRole;
  permissions: Record<string, any>;
  status: UserStatus;
  tenant?: Tenant;
}

export interface Customer extends TenantEntity {
  email?: string;
  phone?: string;
  first_name: string;
  last_name: string;
  birth_date?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  addresses: Address[];
  preferences: Record<string, any>;
  tags: string[];
  accepts_marketing: boolean;
  last_order_at?: Date;
  tenant?: Tenant;
}

// ================================
// PRODUCTS
// ================================

export interface Category extends TenantEntity {
  parent_id?: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  seo_title?: string;
  seo_description?: string;
  is_active: boolean;
  sort_order: number;
  custom_attributes: Record<string, any>;
  parent?: Category;
  children?: Category[];
  tenant?: Tenant;
}

export interface Product extends TenantEntity {
  category_id?: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  compare_at_price?: number;
  cost_price?: number;
  sku?: string;
  barcode?: string;
  track_inventory: boolean;
  inventory_qty: number;
  allow_backorder: boolean;
  weight?: number;
  dimensions?: Record<string, any>;
  status: ProductStatus;
  is_featured: boolean;
  seo_title?: string;
  seo_description?: string;
  images: UploadedFile[];
  custom_attributes: Record<string, any>;
  category?: Category;
  variants?: ProductVariant[];
  tenant?: Tenant;
}

export interface ProductVariant extends BaseEntity {
  product_id: string;
  title: string;
  sku?: string;
  barcode?: string;
  price?: number;
  compare_at_price?: number;
  cost_price?: number;
  inventory_qty: number;
  attributes: Record<string, any>;
  is_active: boolean;
  image_url?: string;
  product?: Product;
}

// ================================
// ORDERS
// ================================

export interface Order extends TenantEntity {
  customer_id?: string;
  created_by_id?: string;
  order_number: string;
  status: OrderStatus;
  fulfillment_status: FulfillmentStatus;
  payment_status: PaymentStatus;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  customer_info: Record<string, any>;
  billing_address: Address;
  shipping_address?: Address;
  custom_attributes: Record<string, any>;
  notes?: string;
  tags: string[];
  confirmed_at?: Date;
  shipped_at?: Date;
  delivered_at?: Date;
  cancelled_at?: Date;
  customer?: Customer;
  created_by?: User;
  items?: OrderItem[];
  payments?: Payment[];
  shipments?: Shipment[];
  tenant?: Tenant;
}

export interface OrderItem extends BaseEntity {
  order_id: string;
  product_id: string;
  variant_id?: string;
  product_name: string;
  variant_title?: string;
  sku?: string;
  unit_price: number;
  quantity: number;
  total_price: number;
  customizations: Record<string, any>;
  order?: Order;
  product?: Product;
  variant?: ProductVariant;
}

export interface OrderStatusHistory extends BaseEntity {
  order_id: string;
  status: OrderStatus;
  comment?: string;
  created_by?: string;
  order?: Order;
}

// ================================
// PAYMENTS
// ================================

export interface Payment extends TenantEntity {
  order_id: string;
  transaction_id?: string;
  gateway_id?: string;
  method: PaymentMethodType;
  gateway: PaymentGateway;
  amount: number;
  currency: string;
  status: PaymentStatus;
  gateway_response?: Record<string, any>;
  processed_at?: Date;
  order?: Order;
  tenant?: Tenant;
}

export interface PaymentMethod extends TenantEntity {
  type: PaymentMethodType;
  gateway: PaymentGateway;
  name: string;
  description?: string;
  gateway_config: Record<string, any>;
  is_active: boolean;
  is_default: boolean;
  tenant?: Tenant;
}

// ================================
// SHIPPING
// ================================

export interface Shipment extends BaseEntity {
  order_id: string;
  tracking_number?: string;
  carrier: string;
  service: string;
  status: ShipmentStatus;
  shipped_at?: Date;
  delivered_at?: Date;
  estimated_delivery?: Date;
  tracking_events: Array<{
    date: Date;
    status: string;
    location: string;
    description: string;
  }>;
  order?: Order;
}

export interface ShippingMethod extends TenantEntity {
  name: string;
  description?: string;
  carrier?: string;
  price: number;
  free_threshold?: number;
  custom_config: Record<string, any>;
  is_active: boolean;
  tenant?: Tenant;
}

// ================================
// MARKETING
// ================================

export interface Coupon extends TenantEntity {
  code: string;
  name: string;
  description?: string;
  discount_type: DiscountType;
  discount_value: number;
  usage_limit?: number;
  usage_count: number;
  minimum_amount?: number;
  starts_at?: Date;
  expires_at?: Date;
  is_active: boolean;
  tenant?: Tenant;
}

// ================================
// ANALYTICS
// ================================

export interface Analytics extends TenantEntity {
  metric_name: string;
  metric_value: number;
  dimensions: Record<string, any>;
  date: Date;
  period_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  tenant?: Tenant;
}

// ================================
// NOTIFICATIONS
// ================================

export interface Notification extends TenantEntity {
  user_id?: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  data?: Record<string, any>;
  read_at?: Date;
  tenant?: Tenant;
}
