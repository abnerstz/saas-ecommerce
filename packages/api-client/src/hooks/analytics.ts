import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { AnalyticsRequest } from '../../../types/src';

// Query keys
export const analyticsKeys = {
  all: ['analytics'] as const,
  dashboard: () => [...analyticsKeys.all, 'dashboard'] as const,
  reports: () => [...analyticsKeys.all, 'reports'] as const,
  report: (params: AnalyticsRequest) => [...analyticsKeys.reports(), params] as const,
  activity: () => [...analyticsKeys.all, 'activity'] as const,
};

// ================================
// ANALYTICS QUERIES
// ================================

export const useDashboardStats = () => {
  return useQuery({
    queryKey: analyticsKeys.dashboard(),
    queryFn: () => apiClient.getDashboardStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

export const useAnalytics = (params: AnalyticsRequest) => {
  return useQuery({
    queryKey: analyticsKeys.report(params),
    queryFn: () => apiClient.getAnalytics(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!params.metric,
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: analyticsKeys.activity(),
    queryFn: () => apiClient.getRecentActivity(),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
};

// ================================
// ANALYTICS HELPERS
// ================================

/**
 * Hook para múltiplas métricas de analytics
 */
export const useMultipleAnalytics = (requests: AnalyticsRequest[]) => {
  return useQuery({
    queryKey: ['multiple-analytics', ...requests],
    queryFn: async () => {
      const results = await Promise.all(
        requests.map(params => apiClient.getAnalytics(params))
      );
      return results;
    },
    staleTime: 5 * 60 * 1000,
    enabled: requests.length > 0 && requests.every(req => !!req.metric),
  });
};
