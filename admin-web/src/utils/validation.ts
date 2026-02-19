import { z } from 'zod';

// Schemas de validação Zod reutilizáveis

export const emailSchema = z.string().email('Email inválido');

export const phoneSchema = z
  .string()
  .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato de telefone inválido');

export const cpfSchema = z
  .string()
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido');

export const cnpjSchema = z
  .string()
  .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido');

export const cepSchema = z
  .string()
  .regex(/^\d{5}-\d{3}$/, 'CEP inválido');

export const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
  .regex(/\d/, 'Senha deve conter pelo menos um número');

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens');

// Schema base para entidades
export const baseEntitySchema = z.object({
  id: z.string().cuid(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const tenantEntitySchema = baseEntitySchema.extend({
  tenant_id: z.string().cuid(),
});

// Schema de endereço
export const addressSchema = z.object({
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres'),
  zipCode: cepSchema,
  country: z.string().default('BR'),
  type: z.enum(['home', 'work', 'other']).optional(),
  isDefault: z.boolean().optional(),
});

// Schema de produto
export const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  short_description: z.string().optional(),
  price: z.number().min(0, 'Preço deve ser maior ou igual a zero'),
  compare_at_price: z.number().min(0).optional(),
  cost_price: z.number().min(0).optional(),
  category_id: z.string().cuid().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  track_inventory: z.boolean().default(false),
  inventory_qty: z.number().int().min(0).default(0),
  allow_backorder: z.boolean().default(false),
  weight: z.number().min(0).optional(),
  dimensions: z.record(z.any()).optional(),
  is_featured: z.boolean().default(false),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  images: z.array(z.string()).default([]),
  custom_attributes: z.record(z.any()).default({}),
});

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.string().cuid(),
});

// Schema de pedido
export const createOrderSchema = z.object({
  customer_id: z.string().cuid().optional(),
  customer_info: z
    .object({
      first_name: z.string().min(1, 'Nome é obrigatório'),
      last_name: z.string().min(1, 'Sobrenome é obrigatório'),
      email: emailSchema,
      phone: phoneSchema.optional(),
    })
    .optional(),
  billing_address: addressSchema,
  shipping_address: addressSchema.optional(),
  items: z
    .array(
      z.object({
        product_id: z.string().cuid(),
        variant_id: z.string().cuid().optional(),
        quantity: z.number().int().min(1),
        customizations: z.record(z.any()).default({}),
      })
    )
    .min(1, 'Pelo menos um item é obrigatório'),
  notes: z.string().optional(),
  custom_attributes: z.record(z.any()).default({}),
});

// Schema de cliente
export const createCustomerSchema = z.object({
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  first_name: z.string().min(1, 'Nome é obrigatório'),
  last_name: z.string().min(1, 'Sobrenome é obrigatório'),
  birth_date: z.string().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  addresses: z.array(addressSchema).default([]),
  accepts_marketing: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
});

export const updateCustomerSchema = createCustomerSchema.partial().extend({
  id: z.string().cuid(),
});

// Schema de categoria
export const createCategorySchema = z.object({
  parent_id: z.string().cuid().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  slug: slugSchema.optional(),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  sort_order: z.number().int().min(0).default(0),
  custom_attributes: z.record(z.any()).default({}),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.string().cuid(),
});

// Schema de login
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
  tenant_slug: z.string().optional(),
});

// Schema de registro
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  first_name: z.string().min(1, 'Nome é obrigatório'),
  last_name: z.string().min(1, 'Sobrenome é obrigatório'),
  tenant_slug: z.string().optional(),
});

// Schema de filtros de paginação
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

// Função helper para validação
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

// Função helper para validação com erro customizado
export function safeValidateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}
