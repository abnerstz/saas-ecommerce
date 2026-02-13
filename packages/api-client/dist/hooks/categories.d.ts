import { CreateCategoryRequest, UpdateCategoryRequest, ListParams } from '../../../types/src';
export declare const categoryKeys: {
    all: readonly ["categories"];
    lists: () => readonly ["categories", "list"];
    list: (filters: ListParams) => readonly ["categories", "list", ListParams];
    details: () => readonly ["categories", "detail"];
    detail: (id: string) => readonly ["categories", "detail", string];
};
export declare const useCategories: (params?: ListParams) => import("@tanstack/react-query").UseQueryResult<import("@ecommerce/types/src/api").PaginatedResponse<any>, Error>;
export declare const useCategory: (id: string) => import("@tanstack/react-query").UseQueryResult<any, Error>;
export declare const useCreateCategory: () => import("@tanstack/react-query").UseMutationResult<any, Error, CreateCategoryRequest, unknown>;
export declare const useUpdateCategory: () => import("@tanstack/react-query").UseMutationResult<any, Error, UpdateCategoryRequest, unknown>;
export declare const useDeleteCategory: () => import("@tanstack/react-query").UseMutationResult<void, Error, string, unknown>;
//# sourceMappingURL=categories.d.ts.map