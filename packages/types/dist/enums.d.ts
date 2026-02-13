export declare enum NicheType {
    RESTAURANT = "restaurant",
    FASHION = "fashion",
    DIGITAL = "digital",
    RETAIL = "retail",
    SERVICES = "services",
    OTHER = "other"
}
export declare enum TenantStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    TRIAL = "trial"
}
export declare enum PlanType {
    FREE = "free",
    BASIC = "basic",
    PROFESSIONAL = "professional",
    ENTERPRISE = "enterprise"
}
export declare enum UserRole {
    SUPER_ADMIN = "super_admin",
    TENANT_ADMIN = "tenant_admin",
    MANAGER = "manager",
    EMPLOYEE = "employee",
    CUSTOMER = "customer"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export declare enum ProductStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    INACTIVE = "inactive",
    ARCHIVED = "archived"
}
export declare enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}
export declare enum FulfillmentStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}
export declare enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed",
    REFUNDED = "refunded",
    CANCELLED = "cancelled"
}
export declare enum PaymentMethodType {
    CREDIT_CARD = "credit_card",
    DEBIT_CARD = "debit_card",
    PIX = "pix",
    BANK_SLIP = "bank_slip",
    PAYPAL = "paypal",
    CASH = "cash",
    OTHER = "other"
}
export declare enum PaymentGateway {
    STRIPE = "stripe",
    MERCADOPAGO = "mercadopago",
    PAGSEGURO = "pagseguro",
    CIELO = "cielo",
    CUSTOM = "custom"
}
export declare enum ShipmentStatus {
    PENDING = "pending",
    SHIPPED = "shipped",
    IN_TRANSIT = "in_transit",
    DELIVERED = "delivered",
    RETURNED = "returned",
    LOST = "lost"
}
export declare enum DiscountType {
    PERCENTAGE = "percentage",
    FIXED_AMOUNT = "fixed_amount",
    FREE_SHIPPING = "free_shipping"
}
export declare enum NotificationType {
    ORDER = "order",
    PAYMENT = "payment",
    SYSTEM = "system",
    MARKETING = "marketing",
    REMINDER = "reminder"
}
//# sourceMappingURL=enums.d.ts.map