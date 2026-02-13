// Re-export tipos do @ecommerce/types para conveniência
export * from '../../types/src';

// Tipos específicos do API client
export interface QueryConfig {
  staleTime?: number;
  refetchInterval?: number;
  enabled?: boolean;
  retry?: number | boolean;
}

export interface MutationConfig {
  onSuccess?: (data: any, variables: any) => void;
  onError?: (error: any, variables: any) => void;
  onMutate?: (variables: any) => void;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface FilterState {
  search?: string;
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: any;
}

export interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

export interface ListState {
  pagination: PaginationState;
  filters: FilterState;
  sort: SortState;
}

// Tipos para upload com progresso
export interface UploadProgress {
  fileIndex: number;
  progress: number;
  file: File;
  error?: string;
}

export interface UploadState {
  files: File[];
  progress: UploadProgress[];
  isUploading: boolean;
  error?: string;
}
