import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../types';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

// ================================
// AUTH QUERIES
// ================================

export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => apiClient.getProfile(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ================================
// AUTH MUTATIONS
// ================================

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => apiClient.login(data),
    onSuccess: (response: LoginResponse) => {
      // Salvar tokens no localStorage
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      
      // Configurar token no cliente
      apiClient.setToken(response.access_token);
      
      // Invalidar queries para recarregar dados do usuário
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      
      // Salvar dados do usuário no cache
      queryClient.setQueryData(authKeys.profile(), response.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => apiClient.register(data),
    onSuccess: (response: LoginResponse) => {
      // Salvar tokens no localStorage
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      
      // Configurar token no cliente
      apiClient.setToken(response.access_token);
      
      // Invalidar queries para recarregar dados do usuário
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      
      // Salvar dados do usuário no cache
      queryClient.setQueryData(authKeys.profile(), response.user);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => apiClient.forgotPassword(data),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => apiClient.resetPassword(data),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Limpar tokens e dados de autenticação
      apiClient.clearAuth();
      
      // Limpar cache do React Query
      queryClient.clear();
      
      return Promise.resolve();
    },
  });
};

// ================================
// AUTH HELPERS
// ================================

/**
 * Hook para verificar se o usuário está autenticado
 */
export const useIsAuthenticated = () => {
  const { data: user, isLoading } = useProfile();
  return {
    isAuthenticated: !!user && !isLoading,
    isLoading,
    user,
  };
};

/**
 * Hook para verificar permissões do usuário
 */
export const usePermissions = () => {
  const { data: user } = useProfile();
  
  const hasPermission = (module: string, action: string) => {
    if (!user?.permissions) return false;
    return user.permissions[module]?.[action] === true;
  };

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  const isAdmin = () => {
    return hasRole('super_admin') || hasRole('tenant_admin');
  };

  return {
    hasPermission,
    hasRole,
    isAdmin,
    permissions: user?.permissions || {},
    role: user?.role,
  };
};
