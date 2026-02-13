import { CreateOrderRequest, UpdateOrderRequest, OrderFilters, ListParams } from '../../../types/src';
export declare const orderKeys: {
    all: readonly ["orders"];
    lists: () => readonly ["orders", "list"];
    list: (filters: OrderFilters & ListParams) => readonly ["orders", "list", OrderFilters & ListParams];
    details: () => readonly ["orders", "detail"];
    detail: (id: string) => readonly ["orders", "detail", string];
};
export declare const useOrders: (params?: OrderFilters & ListParams) => import("@tanstack/react-query").UseQueryResult<import("@ecommerce/types/src/api").PaginatedResponse<any>, Error>;
export declare const useOrder: (id: string) => import("@tanstack/react-query").UseQueryResult<any, Error>;
export declare const useCreateOrder: () => import("@tanstack/react-query").UseMutationResult<any, Error, CreateOrderRequest, unknown>;
export declare const useUpdateOrder: () => import("@tanstack/react-query").UseMutationResult<any, Error, UpdateOrderRequest, unknown>;
export declare const useCancelOrder: () => import("@tanstack/react-query").UseMutationResult<any, Error, string, unknown>;
//# sourceMappingURL=orders.d.ts.map