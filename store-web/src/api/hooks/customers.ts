import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import {
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerFilters,
  ListParams,
} from '../types';

// Query keys
export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (filters: CustomerFilters & ListParams) => [...customerKeys.lists(), filters] as const,
  details: () => [...customerKeys.all, 'detail'] as const,
  detail: (id: string) => [...customerKeys.details(), id] as const,
};

// ================================
// CUSTOMER QUERIES
// ================================

export const useCustomers = (params?: CustomerFilters & ListParams) => {
  return useQuery({
    queryKey: customerKeys.list(params || {}),
    queryFn: () => apiClient.getCustomers(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => apiClient.getCustomer(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ================================
// CUSTOMER MUTATIONS
// ================================

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCustomerRequest) => apiClient.createCustomer(data),
    onSuccess: () => {
      // Invalidar listas de clientes
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      
      // Invalidar analytics
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCustomerRequest) => apiClient.updateCustomer(data),
    onSuccess: (updatedCustomer, variables) => {
      // Invalidar listas de clientes
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      
      // Atualizar cache do cliente específico
      queryClient.setQueryData(
        customerKeys.detail(variables.id),
        updatedCustomer
      );
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteCustomer(id),
    onSuccess: (_, deletedId) => {
      // Invalidar listas de clientes
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      
      // Remover cliente específico do cache
      queryClient.removeQueries({ queryKey: customerKeys.detail(deletedId) });
      
      // Invalidar analytics
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};
