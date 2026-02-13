"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAN_LIMITS = exports.NICHE_ICONS = exports.NICHE_DISPLAY_NAMES = exports.REGEX_PATTERNS = exports.DATE_FORMATS = exports.TIME_PERIODS = exports.ADDRESS_TYPES = exports.GENDER_OPTIONS = exports.BRAZILIAN_STATES = exports.SUPPORTED_COUNTRIES = exports.SUPPORTED_CURRENCIES = exports.STATUS_COLORS = exports.USER_ROLE_LABELS = exports.PAYMENT_STATUS_LABELS = exports.ORDER_STATUS_LABELS = exports.DEFAULT_PRODUCT_IMAGE = exports.DEFAULT_AVATAR_URL = exports.ALLOWED_DOCUMENT_TYPES = exports.ALLOWED_IMAGE_TYPES = exports.MAX_FILE_SIZE = exports.MAX_PAGE_SIZE = exports.DEFAULT_PAGE_SIZE = exports.APP_VERSION = exports.APP_NAME = void 0;
// Constantes do sistema
exports.APP_NAME = 'SaaS Ecommerce';
exports.APP_VERSION = '1.0.0';
// Configurações de paginação
exports.DEFAULT_PAGE_SIZE = 10;
exports.MAX_PAGE_SIZE = 100;
// Configurações de upload
exports.MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
exports.ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
exports.ALLOWED_DOCUMENT_TYPES = ['application/pdf'];
// URLs e endpoints
exports.DEFAULT_AVATAR_URL = '/images/default-avatar.png';
exports.DEFAULT_PRODUCT_IMAGE = '/images/default-product.png';
// Status de pedidos com labels em português
exports.ORDER_STATUS_LABELS = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    processing: 'Processando',
    shipped: 'Enviado',
    delivered: 'Entregue',
    cancelled: 'Cancelado',
    refunded: 'Reembolsado',
};
// Status de pagamento com labels
exports.PAYMENT_STATUS_LABELS = {
    pending: 'Pendente',
    paid: 'Pago',
    failed: 'Falhou',
    refunded: 'Reembolsado',
    cancelled: 'Cancelado',
};
// Roles de usuário com labels
exports.USER_ROLE_LABELS = {
    super_admin: 'Super Administrador',
    tenant_admin: 'Administrador',
    manager: 'Gerente',
    employee: 'Funcionário',
    customer: 'Cliente',
};
// Cores dos status
exports.STATUS_COLORS = {
    pending: 'yellow',
    confirmed: 'blue',
    processing: 'indigo',
    shipped: 'purple',
    delivered: 'green',
    cancelled: 'red',
    refunded: 'orange',
    paid: 'green',
    failed: 'red',
    active: 'green',
    inactive: 'gray',
    suspended: 'red',
};
// Moedas suportadas
exports.SUPPORTED_CURRENCIES = [
    { code: 'BRL', symbol: 'R$', name: 'Real Brasileiro' },
    { code: 'USD', symbol: '$', name: 'Dólar Americano' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
];
// Países suportados
exports.SUPPORTED_COUNTRIES = [
    { code: 'BR', name: 'Brasil' },
    { code: 'US', name: 'Estados Unidos' },
    { code: 'AR', name: 'Argentina' },
];
// Estados brasileiros
exports.BRAZILIAN_STATES = [
    { code: 'AC', name: 'Acre' },
    { code: 'AL', name: 'Alagoas' },
    { code: 'AP', name: 'Amapá' },
    { code: 'AM', name: 'Amazonas' },
    { code: 'BA', name: 'Bahia' },
    { code: 'CE', name: 'Ceará' },
    { code: 'DF', name: 'Distrito Federal' },
    { code: 'ES', name: 'Espírito Santo' },
    { code: 'GO', name: 'Goiás' },
    { code: 'MA', name: 'Maranhão' },
    { code: 'MT', name: 'Mato Grosso' },
    { code: 'MS', name: 'Mato Grosso do Sul' },
    { code: 'MG', name: 'Minas Gerais' },
    { code: 'PA', name: 'Pará' },
    { code: 'PB', name: 'Paraíba' },
    { code: 'PR', name: 'Paraná' },
    { code: 'PE', name: 'Pernambuco' },
    { code: 'PI', name: 'Piauí' },
    { code: 'RJ', name: 'Rio de Janeiro' },
    { code: 'RN', name: 'Rio Grande do Norte' },
    { code: 'RS', name: 'Rio Grande do Sul' },
    { code: 'RO', name: 'Rondônia' },
    { code: 'RR', name: 'Roraima' },
    { code: 'SC', name: 'Santa Catarina' },
    { code: 'SP', name: 'São Paulo' },
    { code: 'SE', name: 'Sergipe' },
    { code: 'TO', name: 'Tocantins' },
];
// Gêneros
exports.GENDER_OPTIONS = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Feminino' },
    { value: 'other', label: 'Outro' },
    { value: 'prefer_not_to_say', label: 'Prefiro não informar' },
];
// Tipos de endereço
exports.ADDRESS_TYPES = [
    { value: 'home', label: 'Residencial' },
    { value: 'work', label: 'Comercial' },
    { value: 'other', label: 'Outro' },
];
// Intervalos de tempo para analytics
exports.TIME_PERIODS = [
    { value: 'today', label: 'Hoje' },
    { value: 'yesterday', label: 'Ontem' },
    { value: 'last_7_days', label: 'Últimos 7 dias' },
    { value: 'last_30_days', label: 'Últimos 30 dias' },
    { value: 'last_90_days', label: 'Últimos 90 dias' },
    { value: 'this_month', label: 'Este mês' },
    { value: 'last_month', label: 'Mês passado' },
    { value: 'this_year', label: 'Este ano' },
    { value: 'last_year', label: 'Ano passado' },
];
// Formatos de data
exports.DATE_FORMATS = {
    SHORT: 'dd/MM/yyyy',
    MEDIUM: 'dd/MM/yyyy HH:mm',
    LONG: "dd 'de' MMMM 'de' yyyy",
    ISO: 'yyyy-MM-dd',
};
// Regex patterns
exports.REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    CEP: /^\d{5}-\d{3}$/,
    SLUG: /^[a-z0-9-]+$/,
};
// Configurações por nicho
exports.NICHE_DISPLAY_NAMES = {
    restaurant: 'Lanchonete/Restaurante',
    fashion: 'Moda',
    digital: 'Infoprodutos',
    retail: 'Varejo',
    services: 'Serviços',
    other: 'Outro',
};
// Ícones por nicho (para usar com lucide-react)
exports.NICHE_ICONS = {
    restaurant: 'utensils',
    fashion: 'shirt',
    digital: 'monitor',
    retail: 'shopping-bag',
    services: 'briefcase',
    other: 'store',
};
// Limites por plano
exports.PLAN_LIMITS = {
    free: {
        products: 10,
        orders: 50,
        storage: 100, // MB
        users: 1,
    },
    basic: {
        products: 100,
        orders: 500,
        storage: 1000, // MB
        users: 3,
    },
    professional: {
        products: 1000,
        orders: 5000,
        storage: 10000, // MB
        users: 10,
    },
    enterprise: {
        products: -1, // unlimited
        orders: -1, // unlimited
        storage: -1, // unlimited
        users: -1, // unlimited
    },
};
//# sourceMappingURL=constants.js.map