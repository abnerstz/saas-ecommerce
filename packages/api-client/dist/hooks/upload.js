"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMultipleFileUpload = exports.useFileUploadWithProgress = exports.useDeleteFile = exports.useUploadFile = void 0;
const react_query_1 = require("@tanstack/react-query");
const client_1 = require("../client");
// ================================
// UPLOAD MUTATIONS
// ================================
const useUploadFile = () => {
    return (0, react_query_1.useMutation)({
        mutationFn: (data) => client_1.apiClient.uploadFile(data),
    });
};
exports.useUploadFile = useUploadFile;
const useDeleteFile = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: (id) => client_1.apiClient.deleteFile(id),
        onSuccess: () => {
            // Invalidar queries que podem ter referências ao arquivo deletado
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};
exports.useDeleteFile = useDeleteFile;
// ================================
// UPLOAD HELPERS
// ================================
/**
 * Hook para upload com progress tracking
 */
const useFileUploadWithProgress = () => {
    const uploadMutation = (0, exports.useUploadFile)();
    const uploadWithProgress = async (file, options, onProgress) => {
        // Simular progresso para demonstração
        // Em produção, você pode usar axios com onUploadProgress
        if (onProgress) {
            const interval = setInterval(() => {
                // Simular progresso
            }, 100);
            try {
                const result = await uploadMutation.mutateAsync({
                    file,
                    ...options,
                });
                clearInterval(interval);
                if (onProgress)
                    onProgress(100);
                return result;
            }
            catch (error) {
                clearInterval(interval);
                throw error;
            }
        }
        return uploadMutation.mutateAsync({
            file,
            ...options,
        });
    };
    return {
        uploadWithProgress,
        isUploading: uploadMutation.isPending,
        error: uploadMutation.error,
    };
};
exports.useFileUploadWithProgress = useFileUploadWithProgress;
/**
 * Hook para upload múltiplo
 */
const useMultipleFileUpload = () => {
    const uploadMutation = (0, exports.useUploadFile)();
    const uploadMultiple = async (files, options, onProgress) => {
        const results = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                if (onProgress)
                    onProgress(i, 0);
                const result = await uploadMutation.mutateAsync({
                    file,
                    ...options,
                });
                if (onProgress)
                    onProgress(i, 100);
                results.push(result);
            }
            catch (error) {
                if (onProgress)
                    onProgress(i, -1); // -1 indica erro
                throw error;
            }
        }
        return results;
    };
    return {
        uploadMultiple,
        isUploading: uploadMutation.isPending,
        error: uploadMutation.error,
    };
};
exports.useMultipleFileUpload = useMultipleFileUpload;
//# sourceMappingURL=upload.js.map