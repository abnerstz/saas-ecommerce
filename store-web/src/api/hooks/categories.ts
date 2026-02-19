import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  ListParams,
} from '../types';

// Query keys
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (filters: ListParams) => [...categoryKeys.lists(), filters] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
};

// ================================
// CATEGORY QUERIES
// ================================

export const useCategories = (params?: ListParams) => {
  return useQuery({
    queryKey: categoryKeys.list(params || {}),
    queryFn: () => apiClient.getCategories(params),
    staleTime: 5 * 60 * 1000, // 5 minutes (categories don't change often)
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => apiClient.getCategory(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ================================
// CATEGORY MUTATIONS
// ================================

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => apiClient.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCategoryRequest) => apiClient.updateCategory(data),
    onSuccess: (updatedCategory, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.setQueryData(
        categoryKeys.detail(variables.id),
        updatedCategory
      );
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteCategory(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      queryClient.removeQueries({ queryKey: categoryKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
