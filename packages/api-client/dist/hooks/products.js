"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProductsWithFilters = exports.useDeleteProduct = exports.useUpdateProduct = exports.useCreateProduct = exports.useProduct = exports.useProducts = exports.productKeys = void 0;
const react_query_1 = require("@tanstack/react-query");
const client_1 = require("../client");
// Query keys
exports.productKeys = {
    all: ['products'],
    lists: () => [...exports.productKeys.all, 'list'],
    list: (filters) => [...exports.productKeys.lists(), filters],
    details: () => [...exports.productKeys.all, 'detail'],
    detail: (id) => [...exports.productKeys.details(), id],
};
// ================================
// PRODUCT QUERIES
// ================================
const useProducts = (params) => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.productKeys.list(params || {}),
        queryFn: () => client_1.apiClient.getProducts(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};
exports.useProducts = useProducts;
const useProduct = (id) => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.productKeys.detail(id),
        queryFn: () => client_1.apiClient.getProduct(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
exports.useProduct = useProduct;
// ================================
// PRODUCT MUTATIONS
// ================================
const useCreateProduct = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.createProduct(data),
        onSuccess: () => {
            // Invalidar listas de produtos
            queryClient.invalidateQueries({ queryKey: exports.productKeys.lists() });
        },
    });
};
exports.useCreateProduct = useCreateProduct;
const useUpdateProduct = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.updateProduct(data),
        onSuccess: (updatedProduct, variables) => {
            // Invalidar listas de produtos
            queryClient.invalidateQueries({ queryKey: exports.productKeys.lists() });
            // Atualizar cache do produto específico
            queryClient.setQueryData(exports.productKeys.detail(variables.id), updatedProduct);
        },
    });
};
exports.useUpdateProduct = useUpdateProduct;
const useDeleteProduct = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (id) => client_1.apiClient.deleteProduct(id),
        onSuccess: (_, deletedId) => {
            // Invalidar listas de produtos
            queryClient.invalidateQueries({ queryKey: exports.productKeys.lists() });
            // Remover produto específico do cache
            queryClient.removeQueries({ queryKey: exports.productKeys.detail(deletedId) });
        },
    });
};
exports.useDeleteProduct = useDeleteProduct;
// ================================
// PRODUCT HELPERS
// ================================
/**
 * Hook para buscar produtos com filtros reativos
 */
const useProductsWithFilters = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    const prefetchProducts = (filters) => {
        queryClient.prefetchQuery({
            queryKey: exports.productKeys.list(filters),
            queryFn: () => client_1.apiClient.getProducts(filters),
            staleTime: 2 * 60 * 1000,
        });
    };
    return {
        prefetchProducts,
    };
};
exports.useProductsWithFilters = useProductsWithFilters;
//# sourceMappingURL=products.js.map