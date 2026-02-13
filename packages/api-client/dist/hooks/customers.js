"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeleteCustomer = exports.useUpdateCustomer = exports.useCreateCustomer = exports.useCustomer = exports.useCustomers = exports.customerKeys = void 0;
const react_query_1 = require("@tanstack/react-query");
const client_1 = require("../client");
// Query keys
exports.customerKeys = {
    all: ['customers'],
    lists: () => [...exports.customerKeys.all, 'list'],
    list: (filters) => [...exports.customerKeys.lists(), filters],
    details: () => [...exports.customerKeys.all, 'detail'],
    detail: (id) => [...exports.customerKeys.details(), id],
};
// ================================
// CUSTOMER QUERIES
// ================================
const useCustomers = (params) => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.customerKeys.list(params || {}),
        queryFn: () => client_1.apiClient.getCustomers(params),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};
exports.useCustomers = useCustomers;
const useCustomer = (id) => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.customerKeys.detail(id),
        queryFn: () => client_1.apiClient.getCustomer(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
exports.useCustomer = useCustomer;
// ================================
// CUSTOMER MUTATIONS
// ================================
const useCreateCustomer = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.createCustomer(data),
        onSuccess: () => {
            // Invalidar listas de clientes
            queryClient.invalidateQueries({ queryKey: exports.customerKeys.lists() });
            // Invalidar analytics
            queryClient.invalidateQueries({ queryKey: ['analytics'] });
        },
    });
};
exports.useCreateCustomer = useCreateCustomer;
const useUpdateCustomer = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.updateCustomer(data),
        onSuccess: (updatedCustomer, variables) => {
            // Invalidar listas de clientes
            queryClient.invalidateQueries({ queryKey: exports.customerKeys.lists() });
            // Atualizar cache do cliente específico
            queryClient.setQueryData(exports.customerKeys.detail(variables.id), updatedCustomer);
        },
    });
};
exports.useUpdateCustomer = useUpdateCustomer;
const useDeleteCustomer = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (id) => client_1.apiClient.deleteCustomer(id),
        onSuccess: (_, deletedId) => {
            // Invalidar listas de clientes
            queryClient.invalidateQueries({ queryKey: exports.customerKeys.lists() });
            // Remover cliente específico do cache
            queryClient.removeQueries({ queryKey: exports.customerKeys.detail(deletedId) });
            // Invalidar analytics
            queryClient.invalidateQueries({ queryKey: ['analytics'] });
        },
    });
};
exports.useDeleteCustomer = useDeleteCustomer;
//# sourceMappingURL=customers.js.map