import { UploadRequest } from '../../../types/src';
export declare const useUploadFile: () => import("@tanstack/react-query").UseMutationResult<import("@ecommerce/types/src/api").UploadResponse, Error, UploadRequest, unknown>;
export declare const useDeleteFile: () => import("@tanstack/react-query").UseMutationResult<void, Error, string, unknown>;
/**
 * Hook para upload com progress tracking
 */
export declare const useFileUploadWithProgress: () => {
    uploadWithProgress: (file: File, options?: {
        folder?: string;
        alt?: string;
    }, onProgress?: (progress: number) => void) => Promise<import("@ecommerce/types/src/api").UploadResponse>;
    isUploading: boolean;
    error: Error | null;
};
/**
 * Hook para upload múltiplo
 */
export declare const useMultipleFileUpload: () => {
    uploadMultiple: (files: File[], options?: {
        folder?: string;
    }, onProgress?: (fileIndex: number, progress: number) => void) => Promise<import("@ecommerce/types/src/api").UploadResponse[]>;
    isUploading: boolean;
    error: Error | null;
};
//# sourceMappingURL=upload.d.ts.map