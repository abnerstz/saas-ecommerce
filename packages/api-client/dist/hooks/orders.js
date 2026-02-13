"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCancelOrder = exports.useUpdateOrder = exports.useCreateOrder = exports.useOrder = exports.useOrders = exports.orderKeys = void 0;
const react_query_1 = require("@tanstack/react-query");
const client_1 = require("../client");
// Query keys
exports.orderKeys = {
    all: ['orders'],
    lists: () => [...exports.orderKeys.all, 'list'],
    list: (filters) => [...exports.orderKeys.lists(), filters],
    details: () => [...exports.orderKeys.all, 'detail'],
    detail: (id) => [...exports.orderKeys.details(), id],
};
// ================================
// ORDER QUERIES
// ================================
const useOrders = (params) => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.orderKeys.list(params || {}),
        queryFn: () => client_1.apiClient.getOrders(params),
        staleTime: 1 * 60 * 1000, // 1 minute (orders update frequently)
    });
};
exports.useOrders = useOrders;
const useOrder = (id) => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.orderKeys.detail(id),
        queryFn: () => client_1.apiClient.getOrder(id),
        enabled: !!id,
        staleTime: 30 * 1000, // 30 seconds (order details change frequently)
    });
};
exports.useOrder = useOrder;
// ================================
// ORDER MUTATIONS
// ================================
const useCreateOrder = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.createOrder(data),
        onSuccess: () => {
            // Invalidar listas de pedidos
            queryClient.invalidateQueries({ queryKey: exports.orderKeys.lists() });
            // Invalidar analytics que podem ser afetados
            queryClient.invalidateQueries({ queryKey: ['analytics'] });
        },
    });
};
exports.useCreateOrder = useCreateOrder;
const useUpdateOrder = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.updateOrder(data),
        onSuccess: (updatedOrder, variables) => {
            // Invalidar listas de pedidos
            queryClient.invalidateQueries({ queryKey: exports.orderKeys.lists() });
            // Atualizar cache do pedido específico
            queryClient.setQueryData(exports.orderKeys.detail(variables.id), updatedOrder);
            // Invalidar analytics
            queryClient.invalidateQueries({ queryKey: ['analytics'] });
        },
    });
};
exports.useUpdateOrder = useUpdateOrder;
const useCancelOrder = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (id) => client_1.apiClient.cancelOrder(id),
        onSuccess: (updatedOrder, orderId) => {
            // Invalidar listas de pedidos
            queryClient.invalidateQueries({ queryKey: exports.orderKeys.lists() });
            // Atualizar cache do pedido específico
            queryClient.setQueryData(exports.orderKeys.detail(orderId), updatedOrder);
        },
    });
};
exports.useCancelOrder = useCancelOrder;
//# sourceMappingURL=orders.js.map