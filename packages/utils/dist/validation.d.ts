import { z } from 'zod';
export declare const emailSchema: z.ZodString;
export declare const phoneSchema: z.ZodString;
export declare const cpfSchema: z.ZodString;
export declare const cnpjSchema: z.ZodString;
export declare const cepSchema: z.ZodString;
export declare const passwordSchema: z.ZodString;
export declare const slugSchema: z.ZodString;
export declare const baseEntitySchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
}>;
export declare const tenantEntitySchema: z.ZodObject<{
    id: z.ZodString;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
} & {
    tenant_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: Date;
    updated_at: Date;
    tenant_id: string;
}, {
    id: string;
    created_at: Date;
    updated_at: Date;
    tenant_id: string;
}>;
export declare const addressSchema: z.ZodObject<{
    street: z.ZodString;
    number: z.ZodString;
    complement: z.ZodOptional<z.ZodString>;
    neighborhood: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    zipCode: z.ZodString;
    country: z.ZodDefault<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["home", "work", "other"]>>;
    isDefault: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    number: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    type?: "other" | "home" | "work" | undefined;
    complement?: string | undefined;
    isDefault?: boolean | undefined;
}, {
    number: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    type?: "other" | "home" | "work" | undefined;
    complement?: string | undefined;
    country?: string | undefined;
    isDefault?: boolean | undefined;
}>;
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    short_description: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    compare_at_price: z.ZodOptional<z.ZodNumber>;
    cost_price: z.ZodOptional<z.ZodNumber>;
    category_id: z.ZodOptional<z.ZodString>;
    sku: z.ZodOptional<z.ZodString>;
    barcode: z.ZodOptional<z.ZodString>;
    track_inventory: z.ZodDefault<z.ZodBoolean>;
    inventory_qty: z.ZodDefault<z.ZodNumber>;
    allow_backorder: z.ZodDefault<z.ZodBoolean>;
    weight: z.ZodOptional<z.ZodNumber>;
    dimensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    is_featured: z.ZodDefault<z.ZodBoolean>;
    seo_title: z.ZodOptional<z.ZodString>;
    seo_description: z.ZodOptional<z.ZodString>;
    images: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    custom_attributes: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    track_inventory: boolean;
    inventory_qty: number;
    allow_backorder: boolean;
    is_featured: boolean;
    images: string[];
    custom_attributes: Record<string, any>;
    description?: string | undefined;
    short_description?: string | undefined;
    compare_at_price?: number | undefined;
    cost_price?: number | undefined;
    category_id?: string | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    weight?: number | undefined;
    dimensions?: Record<string, any> | undefined;
    seo_title?: string | undefined;
    seo_description?: string | undefined;
}, {
    name: string;
    price: number;
    description?: string | undefined;
    short_description?: string | undefined;
    compare_at_price?: number | undefined;
    cost_price?: number | undefined;
    category_id?: string | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    track_inventory?: boolean | undefined;
    inventory_qty?: number | undefined;
    allow_backorder?: boolean | undefined;
    weight?: number | undefined;
    dimensions?: Record<string, any> | undefined;
    is_featured?: boolean | undefined;
    seo_title?: string | undefined;
    seo_description?: string | undefined;
    images?: string[] | undefined;
    custom_attributes?: Record<string, any> | undefined;
}>;
export declare const updateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    short_description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    price: z.ZodOptional<z.ZodNumber>;
    compare_at_price: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    cost_price: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    category_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sku: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    barcode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    track_inventory: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    inventory_qty: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    allow_backorder: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    weight: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    dimensions: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    is_featured: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    seo_title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seo_description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    images: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    custom_attributes: z.ZodOptional<z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name?: string | undefined;
    description?: string | undefined;
    short_description?: string | undefined;
    price?: number | undefined;
    compare_at_price?: number | undefined;
    cost_price?: number | undefined;
    category_id?: string | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    track_inventory?: boolean | undefined;
    inventory_qty?: number | undefined;
    allow_backorder?: boolean | undefined;
    weight?: number | undefined;
    dimensions?: Record<string, any> | undefined;
    is_featured?: boolean | undefined;
    seo_title?: string | undefined;
    seo_description?: string | undefined;
    images?: string[] | undefined;
    custom_attributes?: Record<string, any> | undefined;
}, {
    id: string;
    name?: string | undefined;
    description?: string | undefined;
    short_description?: string | undefined;
    price?: number | undefined;
    compare_at_price?: number | undefined;
    cost_price?: number | undefined;
    category_id?: string | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    track_inventory?: boolean | undefined;
    inventory_qty?: number | undefined;
    allow_backorder?: boolean | undefined;
    weight?: number | undefined;
    dimensions?: Record<string, any> | undefined;
    is_featured?: boolean | undefined;
    seo_title?: string | undefined;
    seo_description?: string | undefined;
    images?: string[] | undefined;
    custom_attributes?: Record<string, any> | undefined;
}>;
export declare const createOrderSchema: z.ZodObject<{
    customer_id: z.ZodOptional<z.ZodString>;
    customer_info: z.ZodOptional<z.ZodObject<{
        first_name: z.ZodString;
        last_name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        first_name: string;
        last_name: string;
        email: string;
        phone?: string | undefined;
    }, {
        first_name: string;
        last_name: string;
        email: string;
        phone?: string | undefined;
    }>>;
    billing_address: z.ZodObject<{
        street: z.ZodString;
        number: z.ZodString;
        complement: z.ZodOptional<z.ZodString>;
        neighborhood: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipCode: z.ZodString;
        country: z.ZodDefault<z.ZodString>;
        type: z.ZodOptional<z.ZodEnum<["home", "work", "other"]>>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        isDefault?: boolean | undefined;
    }, {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        country?: string | undefined;
        isDefault?: boolean | undefined;
    }>;
    shipping_address: z.ZodOptional<z.ZodObject<{
        street: z.ZodString;
        number: z.ZodString;
        complement: z.ZodOptional<z.ZodString>;
        neighborhood: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipCode: z.ZodString;
        country: z.ZodDefault<z.ZodString>;
        type: z.ZodOptional<z.ZodEnum<["home", "work", "other"]>>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        isDefault?: boolean | undefined;
    }, {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        country?: string | undefined;
        isDefault?: boolean | undefined;
    }>>;
    items: z.ZodArray<z.ZodObject<{
        product_id: z.ZodString;
        variant_id: z.ZodOptional<z.ZodString>;
        quantity: z.ZodNumber;
        customizations: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        product_id: string;
        quantity: number;
        customizations: Record<string, any>;
        variant_id?: string | undefined;
    }, {
        product_id: string;
        quantity: number;
        variant_id?: string | undefined;
        customizations?: Record<string, any> | undefined;
    }>, "many">;
    notes: z.ZodOptional<z.ZodString>;
    custom_attributes: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    custom_attributes: Record<string, any>;
    billing_address: {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        isDefault?: boolean | undefined;
    };
    items: {
        product_id: string;
        quantity: number;
        customizations: Record<string, any>;
        variant_id?: string | undefined;
    }[];
    customer_id?: string | undefined;
    customer_info?: {
        first_name: string;
        last_name: string;
        email: string;
        phone?: string | undefined;
    } | undefined;
    shipping_address?: {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        isDefault?: boolean | undefined;
    } | undefined;
    notes?: string | undefined;
}, {
    billing_address: {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        country?: string | undefined;
        isDefault?: boolean | undefined;
    };
    items: {
        product_id: string;
        quantity: number;
        variant_id?: string | undefined;
        customizations?: Record<string, any> | undefined;
    }[];
    custom_attributes?: Record<string, any> | undefined;
    customer_id?: string | undefined;
    customer_info?: {
        first_name: string;
        last_name: string;
        email: string;
        phone?: string | undefined;
    } | undefined;
    shipping_address?: {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        country?: string | undefined;
        isDefault?: boolean | undefined;
    } | undefined;
    notes?: string | undefined;
}>;
export declare const createCustomerSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    first_name: z.ZodString;
    last_name: z.ZodString;
    birth_date: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<["male", "female", "other", "prefer_not_to_say"]>>;
    addresses: z.ZodDefault<z.ZodArray<z.ZodObject<{
        street: z.ZodString;
        number: z.ZodString;
        complement: z.ZodOptional<z.ZodString>;
        neighborhood: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipCode: z.ZodString;
        country: z.ZodDefault<z.ZodString>;
        type: z.ZodOptional<z.ZodEnum<["home", "work", "other"]>>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        isDefault?: boolean | undefined;
    }, {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        country?: string | undefined;
        isDefault?: boolean | undefined;
    }>, "many">>;
    accepts_marketing: z.ZodDefault<z.ZodBoolean>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    first_name: string;
    last_name: string;
    addresses: {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        isDefault?: boolean | undefined;
    }[];
    accepts_marketing: boolean;
    tags: string[];
    email?: string | undefined;
    phone?: string | undefined;
    birth_date?: string | undefined;
    gender?: "male" | "female" | "other" | "prefer_not_to_say" | undefined;
}, {
    first_name: string;
    last_name: string;
    email?: string | undefined;
    phone?: string | undefined;
    birth_date?: string | undefined;
    gender?: "male" | "female" | "other" | "prefer_not_to_say" | undefined;
    addresses?: {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        country?: string | undefined;
        isDefault?: boolean | undefined;
    }[] | undefined;
    accepts_marketing?: boolean | undefined;
    tags?: string[] | undefined;
}>;
export declare const updateCustomerSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    first_name: z.ZodOptional<z.ZodString>;
    last_name: z.ZodOptional<z.ZodString>;
    birth_date: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    gender: z.ZodOptional<z.ZodOptional<z.ZodEnum<["male", "female", "other", "prefer_not_to_say"]>>>;
    addresses: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        street: z.ZodString;
        number: z.ZodString;
        complement: z.ZodOptional<z.ZodString>;
        neighborhood: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipCode: z.ZodString;
        country: z.ZodDefault<z.ZodString>;
        type: z.ZodOptional<z.ZodEnum<["home", "work", "other"]>>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        isDefault?: boolean | undefined;
    }, {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        country?: string | undefined;
        isDefault?: boolean | undefined;
    }>, "many">>>;
    accepts_marketing: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    first_name?: string | undefined;
    last_name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    birth_date?: string | undefined;
    gender?: "male" | "female" | "other" | "prefer_not_to_say" | undefined;
    addresses?: {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        isDefault?: boolean | undefined;
    }[] | undefined;
    accepts_marketing?: boolean | undefined;
    tags?: string[] | undefined;
}, {
    id: string;
    first_name?: string | undefined;
    last_name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    birth_date?: string | undefined;
    gender?: "male" | "female" | "other" | "prefer_not_to_say" | undefined;
    addresses?: {
        number: string;
        street: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        type?: "other" | "home" | "work" | undefined;
        complement?: string | undefined;
        country?: string | undefined;
        isDefault?: boolean | undefined;
    }[] | undefined;
    accepts_marketing?: boolean | undefined;
    tags?: string[] | undefined;
}>;
export declare const createCategorySchema: z.ZodObject<{
    parent_id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    image_url: z.ZodOptional<z.ZodString>;
    seo_title: z.ZodOptional<z.ZodString>;
    seo_description: z.ZodOptional<z.ZodString>;
    sort_order: z.ZodDefault<z.ZodNumber>;
    custom_attributes: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    custom_attributes: Record<string, any>;
    sort_order: number;
    description?: string | undefined;
    seo_title?: string | undefined;
    seo_description?: string | undefined;
    parent_id?: string | undefined;
    slug?: string | undefined;
    image_url?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    seo_title?: string | undefined;
    seo_description?: string | undefined;
    custom_attributes?: Record<string, any> | undefined;
    parent_id?: string | undefined;
    slug?: string | undefined;
    image_url?: string | undefined;
    sort_order?: number | undefined;
}>;
export declare const updateCategorySchema: z.ZodObject<{
    parent_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seo_title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seo_description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sort_order: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    custom_attributes: z.ZodOptional<z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name?: string | undefined;
    description?: string | undefined;
    seo_title?: string | undefined;
    seo_description?: string | undefined;
    custom_attributes?: Record<string, any> | undefined;
    parent_id?: string | undefined;
    slug?: string | undefined;
    image_url?: string | undefined;
    sort_order?: number | undefined;
}, {
    id: string;
    name?: string | undefined;
    description?: string | undefined;
    seo_title?: string | undefined;
    seo_description?: string | undefined;
    custom_attributes?: Record<string, any> | undefined;
    parent_id?: string | undefined;
    slug?: string | undefined;
    image_url?: string | undefined;
    sort_order?: number | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    tenant_slug: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    tenant_slug?: string | undefined;
}, {
    email: string;
    password: string;
    tenant_slug?: string | undefined;
}>;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    first_name: z.ZodString;
    last_name: z.ZodString;
    tenant_slug: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    tenant_slug?: string | undefined;
}, {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    tenant_slug?: string | undefined;
}>;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodString>;
    order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    order: "asc" | "desc";
    sort?: string | undefined;
}, {
    sort?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    order?: "asc" | "desc" | undefined;
}>;
export declare function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T;
export declare function safeValidateData<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: true;
    data: T;
} | {
    success: false;
    errors: z.ZodError;
};
//# sourceMappingURL=validation.d.ts.map