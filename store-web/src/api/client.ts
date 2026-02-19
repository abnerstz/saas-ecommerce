import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  ApiResponse,
  ApiError,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  CreateProductRequest,
  UpdateProductRequest,
  ProductFilters,
  CreateOrderRequest,
  UpdateOrderRequest,
  OrderFilters,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerFilters,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  AnalyticsRequest,
  AnalyticsResponse,
  DashboardStatsResponse,
  RecentActivity,
  UploadRequest,
  UploadResponse,
  PaginatedResponse,
  ListParams,
} from '../types';

// Configuração base do cliente HTTP
export class ApiClient {
  private instance: AxiosInstance;
  private token: string | null = null;

  constructor(baseURL: string = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || (typeof process !== 'undefined' ? process.env.VITE_API_URL : undefined) || 'http://localhost:3000/api/v1') {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor para adicionar token
    this.instance.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor para tratamento de erros
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
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
          } catch (refreshError) {
            // Se não conseguir renovar, limpar tokens e redirecionar para login
            this.clearAuth();
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  setToken(token: string) {
    this.token = token;
  }

  clearAuth() {
    this.token = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.instance(config);
      return response.data.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
      throw {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Erro de conexão com o servidor',
          details: error.message,
        },
        timestamp: new Date().toISOString(),
      } as ApiError;
    }
  }

  // ================================
  // AUTH ENDPOINTS
  // ================================

  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>({
      method: 'POST',
      url: '/auth/login',
      data,
    });
  }

  async register(data: RegisterRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>({
      method: 'POST',
      url: '/auth/register',
      data,
    });
  }

  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return this.request<RefreshTokenResponse>({
      method: 'POST',
      url: '/auth/refresh',
      data,
    });
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    return this.request<void>({
      method: 'POST',
      url: '/auth/forgot-password',
      data,
    });
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    return this.request<void>({
      method: 'POST',
      url: '/auth/reset-password',
      data,
    });
  }

  async getProfile(): Promise<any> {
    return this.request<any>({
      method: 'GET',
      url: '/auth/profile',
    });
  }

  // ================================
  // PRODUCTS ENDPOINTS
  // ================================

  async getProducts(params?: ProductFilters & ListParams): Promise<PaginatedResponse<any>> {
    return this.request<PaginatedResponse<any>>({
      method: 'GET',
      url: '/products',
      params,
    });
  }

  async getProduct(id: string): Promise<any> {
    return this.request<any>({
      method: 'GET',
      url: `/products/${id}`,
    });
  }

  async createProduct(data: CreateProductRequest): Promise<any> {
    return this.request<any>({
      method: 'POST',
      url: '/products',
      data,
    });
  }

  async updateProduct(data: UpdateProductRequest): Promise<any> {
    const { id, ...updateData } = data;
    return this.request<any>({
      method: 'PUT',
      url: `/products/${id}`,
      data: updateData,
    });
  }

  async deleteProduct(id: string): Promise<void> {
    return this.request<void>({
      method: 'DELETE',
      url: `/products/${id}`,
    });
  }

  // ================================
  // ORDERS ENDPOINTS
  // ================================

  async getOrders(params?: OrderFilters & ListParams): Promise<PaginatedResponse<any>> {
    return this.request<PaginatedResponse<any>>({
      method: 'GET',
      url: '/orders',
      params,
    });
  }

  async getOrder(id: string): Promise<any> {
    return this.request<any>({
      method: 'GET',
      url: `/orders/${id}`,
    });
  }

  async createOrder(data: CreateOrderRequest): Promise<any> {
    return this.request<any>({
      method: 'POST',
      url: '/orders',
      data,
    });
  }

  async updateOrder(data: UpdateOrderRequest): Promise<any> {
    const { id, ...updateData } = data;
    return this.request<any>({
      method: 'PUT',
      url: `/orders/${id}`,
      data: updateData,
    });
  }

  async cancelOrder(id: string): Promise<any> {
    return this.request<any>({
      method: 'POST',
      url: `/orders/${id}/cancel`,
    });
  }

  // ================================
  // CUSTOMERS ENDPOINTS
  // ================================

  async getCustomers(params?: CustomerFilters & ListParams): Promise<PaginatedResponse<any>> {
    return this.request<PaginatedResponse<any>>({
      method: 'GET',
      url: '/customers',
      params,
    });
  }

  async getCustomer(id: string): Promise<any> {
    return this.request<any>({
      method: 'GET',
      url: `/customers/${id}`,
    });
  }

  async createCustomer(data: CreateCustomerRequest): Promise<any> {
    return this.request<any>({
      method: 'POST',
      url: '/customers',
      data,
    });
  }

  async updateCustomer(data: UpdateCustomerRequest): Promise<any> {
    const { id, ...updateData } = data;
    return this.request<any>({
      method: 'PUT',
      url: `/customers/${id}`,
      data: updateData,
    });
  }

  async deleteCustomer(id: string): Promise<void> {
    return this.request<void>({
      method: 'DELETE',
      url: `/customers/${id}`,
    });
  }

  // ================================
  // CATEGORIES ENDPOINTS
  // ================================

  async getCategories(params?: ListParams): Promise<PaginatedResponse<any>> {
    return this.request<PaginatedResponse<any>>({
      method: 'GET',
      url: '/categories',
      params,
    });
  }

  async getCategory(id: string): Promise<any> {
    return this.request<any>({
      method: 'GET',
      url: `/categories/${id}`,
    });
  }

  async createCategory(data: CreateCategoryRequest): Promise<any> {
    return this.request<any>({
      method: 'POST',
      url: '/categories',
      data,
    });
  }

  async updateCategory(data: UpdateCategoryRequest): Promise<any> {
    const { id, ...updateData } = data;
    return this.request<any>({
      method: 'PUT',
      url: `/categories/${id}`,
      data: updateData,
    });
  }

  async deleteCategory(id: string): Promise<void> {
    return this.request<void>({
      method: 'DELETE',
      url: `/categories/${id}`,
    });
  }

  // ================================
  // ANALYTICS ENDPOINTS
  // ================================

  async getDashboardStats(): Promise<DashboardStatsResponse> {
    return this.request<DashboardStatsResponse>({
      method: 'GET',
      url: '/analytics/dashboard',
    });
  }

  async getAnalytics(params: AnalyticsRequest): Promise<AnalyticsResponse> {
    return this.request<AnalyticsResponse>({
      method: 'GET',
      url: '/analytics',
      params,
    });
  }

  async getRecentActivity(): Promise<RecentActivity[]> {
    return this.request<RecentActivity[]>({
      method: 'GET',
      url: '/analytics/recent-activity',
    });
  }

  // ================================
  // UPLOAD ENDPOINTS
  // ================================

  async uploadFile(data: UploadRequest): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', data.file as any); // File object from browser
    if (data.folder) formData.append('folder', data.folder);
    if (data.alt) formData.append('alt', data.alt);

    return this.request<UploadResponse>({
      method: 'POST',
      url: '/upload',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async deleteFile(id: string): Promise<void> {
    return this.request<void>({
      method: 'DELETE',
      url: `/upload/${id}`,
    });
  }
}

// Instância padrão do cliente
export const apiClient = new ApiClient();
