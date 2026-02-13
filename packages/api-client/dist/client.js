"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiClient = exports.ApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
// Configuração base do cliente HTTP
class ApiClient {
    constructor(baseURL = (typeof process !== 'undefined' ? process.env.VITE_API_URL : undefined) || 'http://localhost:3000/api') {
        this.token = null;
        this.instance = axios_1.default.create({
            baseURL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        // Request interceptor para adicionar token
        this.instance.interceptors.request.use((config) => {
            if (this.token) {
                config.headers.Authorization = `Bearer ${this.token}`;
            }
            return config;
        }, (error) => Promise.reject(error));
        // Response interceptor para tratamento de erros
        this.instance.interceptors.response.use((response) => response, async (error) => {
            const originalRequest = error.config;
            // Se o token expirou, tentar renovar
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (refreshToken) {
                        const response = await this.refreshToken({ refresh_token: refreshToken });
                        this.setToken(response.access_token);
                        localStorage.setItem('access_token', response.access_token);
                        localStorage.setItem('refresh_token', response.refresh_token);
                        return this.instance(originalRequest);
                    }
                }
                catch (refreshError) {
                    // Se não conseguir renovar, limpar tokens e redirecionar para login
                    this.clearAuth();
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        });
    }
    setToken(token) {
        this.token = token;
    }
    clearAuth() {
        this.token = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
    async request(config) {
        try {
            const response = await this.instance(config);
            return response.data.data;
        }
        catch (error) {
            if (error.response?.data) {
                throw error.response.data;
            }
            throw {
                success: false,
                error: {
                    code: 'NETWORK_ERROR',
                    message: 'Erro de conexão com o servidor',
                    details: error.message,
                },
                timestamp: new Date().toISOString(),
            };
        }
    }
    // ================================
    // AUTH ENDPOINTS
    // ================================
    async login(data) {
        return this.request({
            method: 'POST',
            url: '/auth/login',
            data,
        });
    }
    async register(data) {
        return this.request({
            method: 'POST',
            url: '/auth/register',
            data,
        });
    }
    async refreshToken(data) {
        return this.request({
            method: 'POST',
            url: '/auth/refresh',
            data,
        });
    }
    async forgotPassword(data) {
        return this.request({
            method: 'POST',
            url: '/auth/forgot-password',
            data,
        });
    }
    async resetPassword(data) {
        return this.request({
            method: 'POST',
            url: '/auth/reset-password',
            data,
        });
    }
    async getProfile() {
        return this.request({
            method: 'GET',
            url: '/auth/profile',
        });
    }
    // ================================
    // PRODUCTS ENDPOINTS
    // ================================
    async getProducts(params) {
        return this.request({
            method: 'GET',
            url: '/products',
            params,
        });
    }
    async getProduct(id) {
        return this.request({
            method: 'GET',
            url: `/products/${id}`,
        });
    }
    async createProduct(data) {
        return this.request({
            method: 'POST',
            url: '/products',
            data,
        });
    }
    async updateProduct(data) {
        const { id, ...updateData } = data;
        return this.request({
            method: 'PUT',
            url: `/products/${id}`,
            data: updateData,
        });
    }
    async deleteProduct(id) {
        return this.request({
            method: 'DELETE',
            url: `/products/${id}`,
        });
    }
    // ================================
    // ORDERS ENDPOINTS
    // ================================
    async getOrders(params) {
        return this.request({
            method: 'GET',
            url: '/orders',
            params,
        });
    }
    async getOrder(id) {
        return this.request({
            method: 'GET',
            url: `/orders/${id}`,
        });
    }
    async createOrder(data) {
        return this.request({
            method: 'POST',
            url: '/orders',
            data,
        });
    }
    async updateOrder(data) {
        const { id, ...updateData } = data;
        return this.request({
            method: 'PUT',
            url: `/orders/${id}`,
            data: updateData,
        });
    }
    async cancelOrder(id) {
        return this.request({
            method: 'POST',
            url: `/orders/${id}/cancel`,
        });
    }
    // ================================
    // CUSTOMERS ENDPOINTS
    // ================================
    async getCustomers(params) {
        return this.request({
            method: 'GET',
            url: '/customers',
            params,
        });
    }
    async getCustomer(id) {
        return this.request({
            method: 'GET',
            url: `/customers/${id}`,
        });
    }
    async createCustomer(data) {
        return this.request({
            method: 'POST',
            url: '/customers',
            data,
        });
    }
    async updateCustomer(data) {
        const { id, ...updateData } = data;
        return this.request({
            method: 'PUT',
            url: `/customers/${id}`,
            data: updateData,
        });
    }
    async deleteCustomer(id) {
        return this.request({
            method: 'DELETE',
            url: `/customers/${id}`,
        });
    }
    // ================================
    // CATEGORIES ENDPOINTS
    // ================================
    async getCategories(params) {
        return this.request({
            method: 'GET',
            url: '/categories',
            params,
        });
    }
    async getCategory(id) {
        return this.request({
            method: 'GET',
            url: `/categories/${id}`,
        });
    }
    async createCategory(data) {
        return this.request({
            method: 'POST',
            url: '/categories',
            data,
        });
    }
    async updateCategory(data) {
        const { id, ...updateData } = data;
        return this.request({
            method: 'PUT',
            url: `/categories/${id}`,
            data: updateData,
        });
    }
    async deleteCategory(id) {
        return this.request({
            method: 'DELETE',
            url: `/categories/${id}`,
        });
    }
    // ================================
    // ANALYTICS ENDPOINTS
    // ================================
    async getDashboardStats() {
        return this.request({
            method: 'GET',
            url: '/analytics/dashboard',
        });
    }
    async getAnalytics(params) {
        return this.request({
            method: 'GET',
            url: '/analytics',
            params,
        });
    }
    async getRecentActivity() {
        return this.request({
            method: 'GET',
            url: '/analytics/recent-activity',
        });
    }
    // ================================
    // UPLOAD ENDPOINTS
    // ================================
    async uploadFile(data) {
        const formData = new FormData();
        formData.append('file', data.file); // File object from browser
        if (data.folder)
            formData.append('folder', data.folder);
        if (data.alt)
            formData.append('alt', data.alt);
        return this.request({
            method: 'POST',
            url: '/upload',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    async deleteFile(id) {
        return this.request({
            method: 'DELETE',
            url: `/upload/${id}`,
        });
    }
}
exports.ApiClient = ApiClient;
// Instância padrão do cliente
exports.apiClient = new ApiClient();
//# sourceMappingURL=client.js.map