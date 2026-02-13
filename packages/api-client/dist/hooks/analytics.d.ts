import { AnalyticsRequest } from '../../../types/src';
export declare const analyticsKeys: {
    all: readonly ["analytics"];
    dashboard: () => readonly ["analytics", "dashboard"];
    reports: () => readonly ["analytics", "reports"];
    report: (params: AnalyticsRequest) => readonly ["analytics", "reports", AnalyticsRequest];
    activity: () => readonly ["analytics", "activity"];
};
export declare const useDashboardStats: () => import("@tanstack/react-query").UseQueryResult<import("@ecommerce/types/src/api").DashboardStatsResponse, Error>;
export declare const useAnalytics: (params: AnalyticsRequest) => import("@tanstack/react-query").UseQueryResult<import("@ecommerce/types/src/api").AnalyticsResponse, Error>;
export declare const useRecentActivity: () => import("@tanstack/react-query").UseQueryResult<import("@ecommerce/types/src/api").RecentActivity[], Error>;
/**
 * Hook para múltiplas métricas de analytics
 */
export declare const useMultipleAnalytics: (requests: AnalyticsRequest[]) => import("@tanstack/react-query").UseQueryResult<import("@ecommerce/types/src/api").AnalyticsResponse[], Error>;
//# sourceMappingURL=analytics.d.ts.map