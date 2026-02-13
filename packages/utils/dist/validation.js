"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = exports.registerSchema = exports.loginSchema = exports.updateCategorySchema = exports.createCategorySchema = exports.updateCustomerSchema = exports.createCustomerSchema = exports.createOrderSchema = exports.updateProductSchema = exports.createProductSchema = exports.addressSchema = exports.tenantEntitySchema = exports.baseEntitySchema = exports.slugSchema = exports.passwordSchema = exports.cepSchema = exports.cnpjSchema = exports.cpfSchema = exports.phoneSchema = exports.emailSchema = void 0;
exports.validateData = validateData;
exports.safeValidateData = safeValidateData;
const zod_1 = require("zod");
// Schemas de validação Zod reutilizáveis
exports.emailSchema = zod_1.z.string().email('Email inválido');
exports.phoneSchema = zod_1.z
    .string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato de telefone inválido');
exports.cpfSchema = zod_1.z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido');
exports.cnpjSchema = zod_1.z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido');
exports.cepSchema = zod_1.z
    .string()
    .regex(/^\d{5}-\d{3}$/, 'CEP inválido');
exports.passwordSchema = zod_1.z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/\d/, 'Senha deve conter pelo menos um número');
exports.slugSchema = zod_1.z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens');
// Schema base para entidades
exports.baseEntitySchema = zod_1.z.object({
    id: zod_1.z.string().cuid(),
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
});
exports.tenantEntitySchema = exports.baseEntitySchema.extend({
    tenant_id: zod_1.z.string().cuid(),
});
// Schema de endereço
exports.addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, 'Rua é obrigatória'),
    number: zod_1.z.string().min(1, 'Número é obrigatório'),
    complement: zod_1.z.string().optional(),
    neighborhood: zod_1.z.string().min(1, 'Bairro é obrigatório'),
    city: zod_1.z.string().min(1, 'Cidade é obrigatória'),
    state: zod_1.z.string().length(2, 'Estado deve ter 2 caracteres'),
    zipCode: exports.cepSchema,
    country: zod_1.z.string().default('BR'),
    type: zod_1.z.enum(['home', 'work', 'other']).optional(),
    isDefault: zod_1.z.boolean().optional(),
});
// Schema de produto
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Nome é obrigatório'),
    description: zod_1.z.string().optional(),
    short_description: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0, 'Preço deve ser maior ou igual a zero'),
    compare_at_price: zod_1.z.number().min(0).optional(),
    cost_price: zod_1.z.number().min(0).optional(),
    category_id: zod_1.z.string().cuid().optional(),
    sku: zod_1.z.string().optional(),
    barcode: zod_1.z.string().optional(),
    track_inventory: zod_1.z.boolean().default(false),
    inventory_qty: zod_1.z.number().int().min(0).default(0),
    allow_backorder: zod_1.z.boolean().default(false),
    weight: zod_1.z.number().min(0).optional(),
    dimensions: zod_1.z.record(zod_1.z.any()).optional(),
    is_featured: zod_1.z.boolean().default(false),
    seo_title: zod_1.z.string().optional(),
    seo_description: zod_1.z.string().optional(),
    images: zod_1.z.array(zod_1.z.string()).default([]),
    custom_attributes: zod_1.z.record(zod_1.z.any()).default({}),
});
exports.updateProductSchema = exports.createProductSchema.partial().extend({
    id: zod_1.z.string().cuid(),
});
// Schema de pedido
exports.createOrderSchema = zod_1.z.object({
    customer_id: zod_1.z.string().cuid().optional(),
    customer_info: zod_1.z
        .object({
        first_name: zod_1.z.string().min(1, 'Nome é obrigatório'),
        last_name: zod_1.z.string().min(1, 'Sobrenome é obrigatório'),
        email: exports.emailSchema,
        phone: exports.phoneSchema.optional(),
    })
        .optional(),
    billing_address: exports.addressSchema,
    shipping_address: exports.addressSchema.optional(),
    items: zod_1.z
        .array(zod_1.z.object({
        product_id: zod_1.z.string().cuid(),
        variant_id: zod_1.z.string().cuid().optional(),
        quantity: zod_1.z.number().int().min(1),
        customizations: zod_1.z.record(zod_1.z.any()).default({}),
    }))
        .min(1, 'Pelo menos um item é obrigatório'),
    notes: zod_1.z.string().optional(),
    custom_attributes: zod_1.z.record(zod_1.z.any()).default({}),
});
// Schema de cliente
exports.createCustomerSchema = zod_1.z.object({
    email: exports.emailSchema.optional(),
    phone: exports.phoneSchema.optional(),
    first_name: zod_1.z.string().min(1, 'Nome é obrigatório'),
    last_name: zod_1.z.string().min(1, 'Sobrenome é obrigatório'),
    birth_date: zod_1.z.string().optional(),
    gender: zod_1.z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
    addresses: zod_1.z.array(exports.addressSchema).default([]),
    accepts_marketing: zod_1.z.boolean().default(true),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.updateCustomerSchema = exports.createCustomerSchema.partial().extend({
    id: zod_1.z.string().cuid(),
});
// Schema de categoria
exports.createCategorySchema = zod_1.z.object({
    parent_id: zod_1.z.string().cuid().optional(),
    name: zod_1.z.string().min(1, 'Nome é obrigatório'),
    slug: exports.slugSchema.optional(),
    description: zod_1.z.string().optional(),
    image_url: zod_1.z.string().url().optional(),
    seo_title: zod_1.z.string().optional(),
    seo_description: zod_1.z.string().optional(),
    sort_order: zod_1.z.number().int().min(0).default(0),
    custom_attributes: zod_1.z.record(zod_1.z.any()).default({}),
});
exports.updateCategorySchema = exports.createCategorySchema.partial().extend({
    id: zod_1.z.string().cuid(),
});
// Schema de login
exports.loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: zod_1.z.string().min(1, 'Senha é obrigatória'),
    tenant_slug: zod_1.z.string().optional(),
});
// Schema de registro
exports.registerSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: exports.passwordSchema,
    first_name: zod_1.z.string().min(1, 'Nome é obrigatório'),
    last_name: zod_1.z.string().min(1, 'Sobrenome é obrigatório'),
    tenant_slug: zod_1.z.string().optional(),
});
// Schema de filtros de paginação
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.number().int().min(1).default(1),
    limit: zod_1.z.number().int().min(1).max(100).default(10),
    sort: zod_1.z.string().optional(),
    order: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
// Função helper para validação
function validateData(schema, data) {
    return schema.parse(data);
}
// Função helper para validação com erro customizado
function safeValidateData(schema, data) {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, errors: result.error };
}
//# sourceMappingURL=validation.js.map