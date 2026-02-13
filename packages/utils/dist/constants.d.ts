import { NicheType, OrderStatus, PaymentStatus, UserRole } from '@ecommerce/types';
export declare const APP_NAME = "SaaS Ecommerce";
export declare const APP_VERSION = "1.0.0";
export declare const DEFAULT_PAGE_SIZE = 10;
export declare const MAX_PAGE_SIZE = 100;
export declare const MAX_FILE_SIZE: number;
export declare const ALLOWED_IMAGE_TYPES: string[];
export declare const ALLOWED_DOCUMENT_TYPES: string[];
export declare const DEFAULT_AVATAR_URL = "/images/default-avatar.png";
export declare const DEFAULT_PRODUCT_IMAGE = "/images/default-product.png";
export declare const ORDER_STATUS_LABELS: Record<OrderStatus, string>;
export declare const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string>;
export declare const USER_ROLE_LABELS: Record<UserRole, string>;
export declare const STATUS_COLORS: {
    readonly pending: "yellow";
    readonly confirmed: "blue";
    readonly processing: "indigo";
    readonly shipped: "purple";
    readonly delivered: "green";
    readonly cancelled: "red";
    readonly refunded: "orange";
    readonly paid: "green";
    readonly failed: "red";
    readonly active: "green";
    readonly inactive: "gray";
    readonly suspended: "red";
};
export declare const SUPPORTED_CURRENCIES: {
    code: string;
    symbol: string;
    name: string;
}[];
export declare const SUPPORTED_COUNTRIES: {
    code: string;
    name: string;
}[];
export declare const BRAZILIAN_STATES: {
    code: string;
    name: string;
}[];
export declare const GENDER_OPTIONS: {
    value: string;
    label: string;
}[];
export declare const ADDRESS_TYPES: {
    value: string;
    label: string;
}[];
export declare const TIME_PERIODS: {
    value: string;
    label: string;
}[];
export declare const DATE_FORMATS: {
    readonly SHORT: "dd/MM/yyyy";
    readonly MEDIUM: "dd/MM/yyyy HH:mm";
    readonly LONG: "dd 'de' MMMM 'de' yyyy";
    readonly ISO: "yyyy-MM-dd";
};
export declare const REGEX_PATTERNS: {
    readonly EMAIL: RegExp;
    readonly PHONE: RegExp;
    readonly CPF: RegExp;
    readonly CNPJ: RegExp;
    readonly CEP: RegExp;
    readonly SLUG: RegExp;
};
export declare const NICHE_DISPLAY_NAMES: Record<NicheType, string>;
export declare const NICHE_ICONS: Record<NicheType, string>;
export declare const PLAN_LIMITS: {
    readonly free: {
        readonly products: 10;
        readonly orders: 50;
        readonly storage: 100;
        readonly users: 1;
    };
    readonly basic: {
        readonly products: 100;
        readonly orders: 500;
        readonly storage: 1000;
        readonly users: 3;
    };
    readonly professional: {
        readonly products: 1000;
        readonly orders: 5000;
        readonly storage: 10000;
        readonly users: 10;
    };
    readonly enterprise: {
        readonly products: -1;
        readonly orders: -1;
        readonly storage: -1;
        readonly users: -1;
    };
};
//# sourceMappingURL=constants.d.ts.map