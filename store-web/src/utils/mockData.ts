/**
 * Mock data aligned with admin-web (admin-web/src/utils/mockData.ts).
 * Same products and categories so the backend has one reference to analyze and replicate.
 * Placeholder images use data URI to avoid external requests (ERR_NAME_NOT_RESOLVED).
 */

import type { PaginationMeta } from '@/types/common';
import type { PaginatedResponse } from '@/types/api';
import { ProductStatus } from '@/types/enums';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect fill="%23e5e7eb" width="300" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EProduto%3C/text%3E%3C/svg%3E';

export interface AdminProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  sales30d: number;
  status: 'active' | 'inactive';
  images?: string[];
  description?: string;
  totalValue: number;
}

export const products: AdminProduct[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    sku: 'IP15PM-001',
    category: 'Smartphones',
    price: 8999.99,
    cost: 6500.0,
    stock: 15,
    sales30d: 45,
    status: 'active',
    images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
    description:
      'iPhone 15 Pro Max with 48MP main camera, A17 Pro chip and 6.7-inch Super Retina XDR display.',
    totalValue: 134999.85,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    sku: 'SGS24U-001',
    category: 'Smartphones',
    price: 7899.99,
    cost: 5800.0,
    stock: 23,
    sales30d: 38,
    status: 'active',
    images: [PLACEHOLDER_IMAGE],
    description:
      'Samsung Galaxy S24 Ultra with integrated S Pen, 200MP camera and Dynamic AMOLED 2X display.',
    totalValue: 181699.77,
  },
  {
    id: '3',
    name: 'MacBook Pro M3',
    sku: 'MBP-M3-001',
    category: 'Laptops',
    price: 12999.99,
    cost: 9500.0,
    stock: 8,
    sales30d: 22,
    status: 'active',
    totalValue: 103999.92,
  },
  {
    id: '4',
    name: 'AirPods Pro 2',
    sku: 'APP2-001',
    category: 'Accessories',
    price: 1899.99,
    cost: 1200.0,
    stock: 0,
    sales30d: 0,
    status: 'inactive',
    totalValue: 0,
  },
  {
    id: '5',
    name: 'Apple Watch Series 9',
    sku: 'AWS9-001',
    category: 'Wearables',
    price: 3999.99,
    cost: 2800.0,
    stock: 12,
    sales30d: 31,
    status: 'active',
    totalValue: 47999.88,
  },
  {
    id: '6',
    name: 'iPad Pro 12.9"',
    sku: 'IPP129-001',
    category: 'Tablets',
    price: 8499.99,
    cost: 6000.0,
    stock: 6,
    sales30d: 18,
    status: 'active',
    totalValue: 50999.94,
  },
  {
    id: '7',
    name: 'Sony WH-1000XM5',
    sku: 'SWH1000-001',
    category: 'Accessories',
    price: 2299.99,
    cost: 1500.0,
    stock: 18,
    sales30d: 42,
    status: 'active',
    totalValue: 41399.82,
  },
  {
    id: '8',
    name: 'Dell XPS 13',
    sku: 'DXP13-001',
    category: 'Laptops',
    price: 7999.99,
    cost: 5500.0,
    stock: 5,
    sales30d: 15,
    status: 'active',
    totalValue: 39999.95,
  },
];

export const categories = [
  'Smartphones',
  'Laptops',
  'Tablets',
  'Accessories',
  'Wearables',
  'Audio',
  'Gaming',
  'Smart Home',
];

const categorySlug = (name: string) =>
  name.toLowerCase().replace(/\s+/g, '-');
const categoryIdByName = (name: string) => {
  const idx = categories.indexOf(name);
  return idx >= 0 ? String(idx + 1) : '1';
};

const now = new Date().toISOString();

function toStoreProduct(p: AdminProduct) {
  const categoryId = categoryIdByName(p.category);
  const slug = p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const images = (p.images ?? []).map((url, i) => ({
    id: `img-${p.id}-${i}`,
    filename: `image-${i}.jpg`,
    url,
    size: 0,
    mimeType: 'image/jpeg',
  }));
  return {
    id: p.id,
    tenant_id: 'mock-tenant',
    created_at: now,
    updated_at: now,
    category_id: categoryId,
    name: p.name,
    slug,
    description: p.description,
    short_description: p.description?.slice(0, 100),
    price: p.price,
    compare_at_price: undefined,
    cost_price: p.cost,
    sku: p.sku,
    barcode: undefined,
    track_inventory: true,
    inventory_qty: p.stock,
    allow_backorder: false,
    status: p.status === 'active' ? ProductStatus.ACTIVE : ProductStatus.INACTIVE,
    is_featured: false,
    images,
    custom_attributes: {},
    category: {
      id: categoryId,
      name: p.category,
      slug: categorySlug(p.category),
      is_active: true,
      sort_order: categories.indexOf(p.category),
    },
  };
}

export function getMockProductsPaginated(
  params?: { search?: string; category_id?: string; page?: number; limit?: number }
): PaginatedResponse<ReturnType<typeof toStoreProduct>> {
  let list = products.map(toStoreProduct);
  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q)
    );
  }
  if (params?.category_id) {
    list = list.filter((p) => p.category_id === params.category_id);
  }
  const page = Math.max(1, params?.page ?? 1);
  const limit = Math.min(100, Math.max(1, params?.limit ?? 12));
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const data = list.slice(start, start + limit);
  const meta: PaginationMeta = {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
  return { data, meta };
}

export function getMockProduct(id: string) {
  const p = products.find((x) => x.id === id);
  return p ? toStoreProduct(p) : null;
}

export function getMockCategoriesPaginated(
  params?: { page?: number; limit?: number }
): PaginatedResponse<{ id: string; name: string; slug: string; is_active: boolean; sort_order: number }> {
  const list = categories.map((name, i) => ({
    id: String(i + 1),
    name,
    slug: categorySlug(name),
    is_active: true,
    sort_order: i,
  }));
  const page = Math.max(1, params?.page ?? 1);
  const limit = Math.min(100, Math.max(1, params?.limit ?? 50));
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const data = list.slice(start, start + limit);
  const meta: PaginationMeta = {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
  return { data, meta };
}

export function getMockCategory(id: string) {
  const idx = categories.findIndex((_, i) => String(i + 1) === id);
  if (idx < 0) return null;
  const name = categories[idx];
  return {
    id: String(idx + 1),
    name,
    slug: categorySlug(name),
    is_active: true,
    sort_order: idx,
  };
}

let mockOrderCounter = 1000;

export function createMockOrder(data: {
  customer_info?: { first_name: string; last_name: string; email: string; phone?: string };
  billing_address: Record<string, string>;
  shipping_address?: Record<string, string>;
  items: Array<{ product_id: string; quantity: number }>;
  notes?: string;
  custom_attributes?: Record<string, string>;
}) {
  const orderNumber = `ORD-2024-${String(++mockOrderCounter).padStart(3, '0')}`;
  const items = data.items.map((item) => {
    const p = products.find((x) => x.id === item.product_id);
    const unitPrice = p?.price ?? 0;
    const quantity = item.quantity;
    return {
      id: `oi-${orderNumber}-${item.product_id}`,
      product_id: item.product_id,
      product_name: p?.name ?? 'Produto',
      unit_price: unitPrice,
      quantity,
      total_price: unitPrice * quantity,
    };
  });
  const subtotal = items.reduce((s, i) => s + i.total_price, 0);
  return {
    id: `mock-${mockOrderCounter}`,
    order_number: orderNumber,
    status: 'pending',
    fulfillment_status: 'pending',
    payment_status: 'pending',
    subtotal,
    tax_amount: 0,
    shipping_amount: 0,
    discount_amount: 0,
    total_amount: subtotal,
    customer_info: data.customer_info ?? {},
    billing_address: data.billing_address,
    shipping_address: data.shipping_address,
    items,
    notes: data.notes,
    custom_attributes: data.custom_attributes ?? {},
    tags: [],
  };
}
