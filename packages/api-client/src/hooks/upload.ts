import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import { UploadRequest } from '../../../types/src';

// ================================
// UPLOAD MUTATIONS
// ================================

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (data: UploadRequest) => apiClient.uploadFile(data),
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteFile(id),
    onSuccess: () => {
      // Invalidar queries que podem ter referências ao arquivo deletado
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

// ================================
// UPLOAD HELPERS
// ================================

/**
 * Hook para upload com progress tracking
 */
export const useFileUploadWithProgress = () => {
  const uploadMutation = useUploadFile();

  const uploadWithProgress = async (
    file: File,
    options?: { folder?: string; alt?: string },
    onProgress?: (progress: number) => void
  ) => {
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
        if (onProgress) onProgress(100);
        return result;
      } catch (error) {
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

/**
 * Hook para upload múltiplo
 */
export const useMultipleFileUpload = () => {
  const uploadMutation = useUploadFile();

  const uploadMultiple = async (
    files: File[],
    options?: { folder?: string },
    onProgress?: (fileIndex: number, progress: number) => void
  ) => {
    const results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        if (onProgress) onProgress(i, 0);
        
        const result = await uploadMutation.mutateAsync({
          file,
          ...options,
        });
        
        if (onProgress) onProgress(i, 100);
        results.push(result);
      } catch (error) {
        if (onProgress) onProgress(i, -1); // -1 indica erro
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
