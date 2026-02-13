import { CreateProductRequest, UpdateProductRequest, ProductFilters, ListParams } from '../../../types/src';
export declare const productKeys: {
    all: readonly ["products"];
    lists: () => readonly ["products", "list"];
    list: (filters: ProductFilters & ListParams) => readonly ["products", "list", ProductFilters & ListParams];
    details: () => readonly ["products", "detail"];
    detail: (id: string) => readonly ["products", "detail", string];
};
export declare const useProducts: (params?: ProductFilters & ListParams) => import("@tanstack/react-query").UseQueryResult<import("@ecommerce/types/src/api").PaginatedResponse<any>, Error>;
export declare const useProduct: (id: string) => import("@tanstack/react-query").UseQueryResult<any, Error>;
export declare const useCreateProduct: () => import("@tanstack/react-query").UseMutationResult<any, Error, CreateProductRequest, unknown>;
export declare const useUpdateProduct: () => import("@tanstack/react-query").UseMutationResult<any, Error, UpdateProductRequest, unknown>;
export declare const useDeleteProduct: () => import("@tanstack/react-query").UseMutationResult<void, Error, string, unknown>;
/**
 * Hook para buscar produtos com filtros reativos
 */
export declare const useProductsWithFilters: () => {
    prefetchProducts: (filters: ProductFilters & ListParams) => void;
};
//# sourceMappingURL=products.d.ts.map