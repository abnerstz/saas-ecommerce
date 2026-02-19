import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import {
  CreateProductRequest,
  UpdateProductRequest,
  ProductFilters,
  ListParams,
} from '../types';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters & ListParams) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// ================================
// PRODUCT QUERIES
// ================================

export const useProducts = (params?: ProductFilters & ListParams) => {
  return useQuery({
    queryKey: productKeys.list(params || {}),
    queryFn: () => apiClient.getProducts(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => apiClient.getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ================================
// PRODUCT MUTATIONS
// ================================

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => apiClient.createProduct(data),
    onSuccess: () => {
      // Invalidate product lists
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductRequest) => apiClient.updateProduct(data),
    onSuccess: (updatedProduct, variables) => {
      // Invalidate product lists
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      
      // Atualizar cache do produto específico
      queryClient.setQueryData(
        productKeys.detail(variables.id),
        updatedProduct
      );
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteProduct(id),
    onSuccess: (_, deletedId) => {
      // Invalidate product lists
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      
      // Remover produto específico do cache
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
    },
  });
};

// ================================
// PRODUCT HELPERS
// ================================

/**
 * Hook to fetch products with reactive filters
 */
export const useProductsWithFilters = () => {
  const queryClient = useQueryClient();

  const prefetchProducts = (filters: ProductFilters & ListParams) => {
    queryClient.prefetchQuery({
      queryKey: productKeys.list(filters),
      queryFn: () => apiClient.getProducts(filters),
      staleTime: 2 * 60 * 1000,
    });
  };

  return {
    prefetchProducts,
  };
};
