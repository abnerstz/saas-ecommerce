import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import {
  CreateOrderRequest,
  UpdateOrderRequest,
  OrderFilters,
  ListParams,
} from '../types';

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters: OrderFilters & ListParams) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
};

// ================================
// ORDER QUERIES
// ================================

export const useOrders = (params?: OrderFilters & ListParams) => {
  return useQuery({
    queryKey: orderKeys.list(params || {}),
    queryFn: () => apiClient.getOrders(params),
    staleTime: 1 * 60 * 1000, // 1 minute (orders update frequently)
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => apiClient.getOrder(id),
    enabled: !!id,
    staleTime: 30 * 1000, // 30 seconds (order details change frequently)
  });
};

// ================================
// ORDER MUTATIONS
// ================================

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderRequest) => apiClient.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateOrderRequest) => apiClient.updateOrder(data),
    onSuccess: (updatedOrder, variables) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.setQueryData(
        orderKeys.detail(variables.id),
        updatedOrder
      );
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.cancelOrder(id),
    onSuccess: (updatedOrder, orderId) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.setQueryData(
        orderKeys.detail(orderId),
        updatedOrder
      );
    },
  });
};
