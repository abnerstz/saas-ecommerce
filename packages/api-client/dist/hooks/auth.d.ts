import { LoginRequest, LoginResponse, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest } from '../../../types/src';
export declare const authKeys: {
    all: readonly ["auth"];
    profile: () => readonly ["auth", "profile"];
};
export declare const useProfile: () => import("@tanstack/react-query").UseQueryResult<any, Error>;
export declare const useLogin: () => import("@tanstack/react-query").UseMutationResult<LoginResponse, Error, LoginRequest, unknown>;
export declare const useRegister: () => import("@tanstack/react-query").UseMutationResult<LoginResponse, Error, RegisterRequest, unknown>;
export declare const useForgotPassword: () => import("@tanstack/react-query").UseMutationResult<void, Error, ForgotPasswordRequest, unknown>;
export declare const useResetPassword: () => import("@tanstack/react-query").UseMutationResult<void, Error, ResetPasswordRequest, unknown>;
export declare const useLogout: () => import("@tanstack/react-query").UseMutationResult<void, Error, void, unknown>;
/**
 * Hook para verificar se o usuário está autenticado
 */
export declare const useIsAuthenticated: () => {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: any;
};
/**
 * Hook para verificar permissões do usuário
 */
export declare const usePermissions: () => {
    hasPermission: (module: string, action: string) => boolean;
    hasRole: (role: string) => boolean;
    isAdmin: () => boolean;
    permissions: any;
    role: any;
};
//# sourceMappingURL=auth.d.ts.map