"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePermissions = exports.useIsAuthenticated = exports.useLogout = exports.useResetPassword = exports.useForgotPassword = exports.useRegister = exports.useLogin = exports.useProfile = exports.authKeys = void 0;
const react_query_1 = require("@tanstack/react-query");
const client_1 = require("../client");
// Query keys
exports.authKeys = {
    all: ['auth'],
    profile: () => [...exports.authKeys.all, 'profile'],
};
// ================================
// AUTH QUERIES
// ================================
const useProfile = () => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.authKeys.profile(),
        queryFn: () => client_1.apiClient.getProfile(),
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
exports.useProfile = useProfile;
// ================================
// AUTH MUTATIONS
// ================================
const useLogin = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.login(data),
        onSuccess: (response) => {
            // Salvar tokens no localStorage
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            // Configurar token no cliente
            client_1.apiClient.setToken(response.access_token);
            // Invalidar queries para recarregar dados do usuário
            queryClient.invalidateQueries({ queryKey: exports.authKeys.all });
            // Salvar dados do usuário no cache
            queryClient.setQueryData(exports.authKeys.profile(), response.user);
        },
    });
};
exports.useLogin = useLogin;
const useRegister = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.register(data),
        onSuccess: (response) => {
            // Salvar tokens no localStorage
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            // Configurar token no cliente
            client_1.apiClient.setToken(response.access_token);
            // Invalidar queries para recarregar dados do usuário
            queryClient.invalidateQueries({ queryKey: exports.authKeys.all });
            // Salvar dados do usuário no cache
            queryClient.setQueryData(exports.authKeys.profile(), response.user);
        },
    });
};
exports.useRegister = useRegister;
const useForgotPassword = () => {
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.forgotPassword(data),
    });
};
exports.useForgotPassword = useForgotPassword;
const useResetPassword = () => {
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.resetPassword(data),
    });
};
exports.useResetPassword = useResetPassword;
const useLogout = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async () => {
            // Limpar tokens e dados de autenticação
            client_1.apiClient.clearAuth();
            // Limpar cache do React Query
            queryClient.clear();
            return Promise.resolve();
        },
    });
};
exports.useLogout = useLogout;
// ================================
// AUTH HELPERS
// ================================
/**
 * Hook para verificar se o usuário está autenticado
 */
const useIsAuthenticated = () => {
    const { data: user, isLoading } = (0, exports.useProfile)();
    return {
        isAuthenticated: !!user && !isLoading,
        isLoading,
        user,
    };
};
exports.useIsAuthenticated = useIsAuthenticated;
/**
 * Hook para verificar permissões do usuário
 */
const usePermissions = () => {
    const { data: user } = (0, exports.useProfile)();
    const hasPermission = (module, action) => {
        if (!user?.permissions)
            return false;
        return user.permissions[module]?.[action] === true;
    };
    const hasRole = (role) => {
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
exports.usePermissions = usePermissions;
//# sourceMappingURL=auth.js.map