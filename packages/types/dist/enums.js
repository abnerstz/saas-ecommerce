"use strict";
// Enums do sistema
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.DiscountType = exports.ShipmentStatus = exports.PaymentGateway = exports.PaymentMethodType = exports.PaymentStatus = exports.FulfillmentStatus = exports.OrderStatus = exports.ProductStatus = exports.UserStatus = exports.UserRole = exports.PlanType = exports.TenantStatus = exports.NicheType = void 0;
var NicheType;
(function (NicheType) {
    NicheType["RESTAURANT"] = "restaurant";
    NicheType["FASHION"] = "fashion";
    NicheType["DIGITAL"] = "digital";
    NicheType["RETAIL"] = "retail";
    NicheType["SERVICES"] = "services";
    NicheType["OTHER"] = "other";
})(NicheType || (exports.NicheType = NicheType = {}));
var TenantStatus;
(function (TenantStatus) {
    TenantStatus["ACTIVE"] = "active";
    TenantStatus["INACTIVE"] = "inactive";
    TenantStatus["SUSPENDED"] = "suspended";
    TenantStatus["TRIAL"] = "trial";
})(TenantStatus || (exports.TenantStatus = TenantStatus = {}));
var PlanType;
(function (PlanType) {
    PlanType["FREE"] = "free";
    PlanType["BASIC"] = "basic";
    PlanType["PROFESSIONAL"] = "professional";
    PlanType["ENTERPRISE"] = "enterprise";
})(PlanType || (exports.PlanType = PlanType = {}));
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "super_admin";
    UserRole["TENANT_ADMIN"] = "tenant_admin";
    UserRole["MANAGER"] = "manager";
    UserRole["EMPLOYEE"] = "employee";
    UserRole["CUSTOMER"] = "customer";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
    UserStatus["SUSPENDED"] = "suspended";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["DRAFT"] = "draft";
    ProductStatus["ACTIVE"] = "active";
    ProductStatus["INACTIVE"] = "inactive";
    ProductStatus["ARCHIVED"] = "archived";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["PROCESSING"] = "processing";
    OrderStatus["SHIPPED"] = "shipped";
    OrderStatus["DELIVERED"] = "delivered";
    OrderStatus["CANCELLED"] = "cancelled";
    OrderStatus["REFUNDED"] = "refunded";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var FulfillmentStatus;
(function (FulfillmentStatus) {
    FulfillmentStatus["PENDING"] = "pending";
    FulfillmentStatus["PROCESSING"] = "processing";
    FulfillmentStatus["SHIPPED"] = "shipped";
    FulfillmentStatus["DELIVERED"] = "delivered";
    FulfillmentStatus["CANCELLED"] = "cancelled";
})(FulfillmentStatus || (exports.FulfillmentStatus = FulfillmentStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PAID"] = "paid";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["REFUNDED"] = "refunded";
    PaymentStatus["CANCELLED"] = "cancelled";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentMethodType;
(function (PaymentMethodType) {
    PaymentMethodType["CREDIT_CARD"] = "credit_card";
    PaymentMethodType["DEBIT_CARD"] = "debit_card";
    PaymentMethodType["PIX"] = "pix";
    PaymentMethodType["BANK_SLIP"] = "bank_slip";
    PaymentMethodType["PAYPAL"] = "paypal";
    PaymentMethodType["CASH"] = "cash";
    PaymentMethodType["OTHER"] = "other";
})(PaymentMethodType || (exports.PaymentMethodType = PaymentMethodType = {}));
var PaymentGateway;
(function (PaymentGateway) {
    PaymentGateway["STRIPE"] = "stripe";
    PaymentGateway["MERCADOPAGO"] = "mercadopago";
    PaymentGateway["PAGSEGURO"] = "pagseguro";
    PaymentGateway["CIELO"] = "cielo";
    PaymentGateway["CUSTOM"] = "custom";
})(PaymentGateway || (exports.PaymentGateway = PaymentGateway = {}));
var ShipmentStatus;
(function (ShipmentStatus) {
    ShipmentStatus["PENDING"] = "pending";
    ShipmentStatus["SHIPPED"] = "shipped";
    ShipmentStatus["IN_TRANSIT"] = "in_transit";
    ShipmentStatus["DELIVERED"] = "delivered";
    ShipmentStatus["RETURNED"] = "returned";
    ShipmentStatus["LOST"] = "lost";
})(ShipmentStatus || (exports.ShipmentStatus = ShipmentStatus = {}));
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "percentage";
    DiscountType["FIXED_AMOUNT"] = "fixed_amount";
    DiscountType["FREE_SHIPPING"] = "free_shipping";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["ORDER"] = "order";
    NotificationType["PAYMENT"] = "payment";
    NotificationType["SYSTEM"] = "system";
    NotificationType["MARKETING"] = "marketing";
    NotificationType["REMINDER"] = "reminder";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
//# sourceMappingURL=enums.js.map