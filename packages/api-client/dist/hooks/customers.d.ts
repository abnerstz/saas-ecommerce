import { CreateCustomerRequest, UpdateCustomerRequest, CustomerFilters, ListParams } from '../../../types/src';
export declare const customerKeys: {
    all: readonly ["customers"];
    lists: () => readonly ["customers", "list"];
    list: (filters: CustomerFilters & ListParams) => readonly ["customers", "list", CustomerFilters & ListParams];
    details: () => readonly ["customers", "detail"];
    detail: (id: string) => readonly ["customers", "detail", string];
};
export declare const useCustomers: (params?: CustomerFilters & ListParams) => import("@tanstack/react-query").UseQueryResult<import("@ecommerce/types/src/api").PaginatedResponse<any>, Error>;
export declare const useCustomer: (id: string) => import("@tanstack/react-query").UseQueryResult<any, Error>;
export declare const useCreateCustomer: () => import("@tanstack/react-query").UseMutationResult<any, Error, CreateCustomerRequest, unknown>;
export declare const useUpdateCustomer: () => import("@tanstack/react-query").UseMutationResult<any, Error, UpdateCustomerRequest, unknown>;
export declare const useDeleteCustomer: () => import("@tanstack/react-query").UseMutationResult<void, Error, string, unknown>;
//# sourceMappingURL=customers.d.ts.map