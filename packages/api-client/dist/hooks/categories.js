"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeleteCategory = exports.useUpdateCategory = exports.useCreateCategory = exports.useCategory = exports.useCategories = exports.categoryKeys = void 0;
const react_query_1 = require("@tanstack/react-query");
const client_1 = require("../client");
// Query keys
exports.categoryKeys = {
    all: ['categories'],
    lists: () => [...exports.categoryKeys.all, 'list'],
    list: (filters) => [...exports.categoryKeys.lists(), filters],
    details: () => [...exports.categoryKeys.all, 'detail'],
    detail: (id) => [...exports.categoryKeys.details(), id],
};
// ================================
// CATEGORY QUERIES
// ================================
const useCategories = (params) => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.categoryKeys.list(params || {}),
        queryFn: () => client_1.apiClient.getCategories(params),
        staleTime: 5 * 60 * 1000, // 5 minutes (categories don't change often)
    });
};
exports.useCategories = useCategories;
const useCategory = (id) => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.categoryKeys.detail(id),
        queryFn: () => client_1.apiClient.getCategory(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
exports.useCategory = useCategory;
// ================================
// CATEGORY MUTATIONS
// ================================
const useCreateCategory = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.createCategory(data),
        onSuccess: () => {
            // Invalidar listas de categorias
            queryClient.invalidateQueries({ queryKey: exports.categoryKeys.lists() });
        },
    });
};
exports.useCreateCategory = useCreateCategory;
const useUpdateCategory = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.updateCategory(data),
        onSuccess: (updatedCategory, variables) => {
            // Invalidar listas de categorias
            queryClient.invalidateQueries({ queryKey: exports.categoryKeys.lists() });
            // Atualizar cache da categoria específica
            queryClient.setQueryData(exports.categoryKeys.detail(variables.id), updatedCategory);
        },
    });
};
exports.useUpdateCategory = useUpdateCategory;
const useDeleteCategory = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (id) => client_1.apiClient.deleteCategory(id),
        onSuccess: (_, deletedId) => {
            // Invalidar listas de categorias
            queryClient.invalidateQueries({ queryKey: exports.categoryKeys.lists() });
            // Remover categoria específica do cache
            queryClient.removeQueries({ queryKey: exports.categoryKeys.detail(deletedId) });
            // Invalidar produtos que podem usar esta categoria
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
exports.useDeleteCategory = useDeleteCategory;
//# sourceMappingURL=categories.js.map