"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMultipleAnalytics = exports.useRecentActivity = exports.useAnalytics = exports.useDashboardStats = exports.analyticsKeys = void 0;
const react_query_1 = require("@tanstack/react-query");
const client_1 = require("../client");
// Query keys
exports.analyticsKeys = {
    all: ['analytics'],
    dashboard: () => [...exports.analyticsKeys.all, 'dashboard'],
    reports: () => [...exports.analyticsKeys.all, 'reports'],
    report: (params) => [...exports.analyticsKeys.reports(), params],
    activity: () => [...exports.analyticsKeys.all, 'activity'],
};
// ================================
// ANALYTICS QUERIES
// ================================
const useDashboardStats = () => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.analyticsKeys.dashboard(),
        queryFn: () => client_1.apiClient.getDashboardStats(),
        staleTime: 2 * 60 * 1000, // 2 minutes
        refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    });
};
exports.useDashboardStats = useDashboardStats;
const useAnalytics = (params) => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.analyticsKeys.report(params),
        queryFn: () => client_1.apiClient.getAnalytics(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!params.metric,
    });
};
exports.useAnalytics = useAnalytics;
const useRecentActivity = () => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.analyticsKeys.activity(),
        queryFn: () => client_1.apiClient.getRecentActivity(),
        staleTime: 1 * 60 * 1000, // 1 minute
        refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
    });
};
exports.useRecentActivity = useRecentActivity;
// ================================
// ANALYTICS HELPERS
// ================================
/**
 * Hook para múltiplas métricas de analytics
 */
const useMultipleAnalytics = (requests) => {
    return (0, react_query_1.useQuery)({
        queryKey: ['multiple-analytics', ...requests],
        queryFn: async () => {
            const results = await Promise.all(requests.map(params => client_1.apiClient.getAnalytics(params)));
            return results;
        },
        staleTime: 5 * 60 * 1000,
        enabled: requests.length > 0 && requests.every(req => !!req.metric),
    });
};
exports.useMultipleAnalytics = useMultipleAnalytics;
//# sourceMappingURL=analytics.js.map