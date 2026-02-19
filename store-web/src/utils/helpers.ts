// Funções auxiliares úteis

/**
 * Debounce function - delay execution until after delay has passed
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function - limit execution to once per interval
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      func(...args);
    }
  };
}

/**
 * Generate a random string
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a unique ID (simple alternative to uuid)
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any;
  if (typeof obj === 'object') {
    const copy: any = {};
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone((obj as any)[key]);
    });
    return copy;
  }
  return obj;
}

/**
 * Check if two objects are deeply equal
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a === null || a === undefined || b === null || b === undefined) return false;
  if (a.prototype !== b.prototype) return false;
  
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  
  return keys.every(k => deepEqual(a[k], b[k]));
}

/**
 * Omit properties from an object
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

/**
 * Pick properties from an object
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Group array items by a key
 */
export function groupBy<T>(
  array: T[],
  keyFn: (item: T) => string | number
): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const key = String(keyFn(item));
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Remove duplicate items from array
 */
export function unique<T>(array: T[], keyFn?: (item: T) => any): T[] {
  if (!keyFn) {
    return [...new Set(array)];
  }
  
  const seen = new Set();
  return array.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Sort array by multiple criteria
 */
export function sortBy<T>(
  array: T[],
  ...sortFns: Array<(item: T) => any>
): T[] {
  return [...array].sort((a, b) => {
    for (const sortFn of sortFns) {
      const aVal = sortFn(a);
      const bVal = sortFn(b);
      
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
    }
    return 0;
  });
}

/**
 * Sleep for a given number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxAttempts) {
        throw lastError;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
    }
  }
  
  throw lastError!;
}

/**
 * Check if code is running in browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Check if code is running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if code is running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Get environment variable with fallback
 */
export function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name];
  if (value === undefined) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Convert bytes to human readable format
 */
export function humanFileSize(bytes: number, si: boolean = false): string {
  const thresh = si ? 1000 : 1024;
  
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  
  let u = -1;
  const r = 10;
  
  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  
  return bytes.toFixed(1) + ' ' + units[u];
}

/**
 * Create a URL with query parameters
 */
export function createUrl(
  baseUrl: string,
  params: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(baseUrl, isBrowser() ? window.location.origin : 'http://localhost');
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  
  return url.toString();
}

/**
 * Parse query parameters from URL
 */
export function parseQueryParams(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}

/**
 * Convert object to FormData
 */
export function objectToFormData(
  obj: Record<string, any>,
  formData: FormData = new FormData(),
  parentKey?: string
): FormData {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const formKey = parentKey ? `${parentKey}[${key}]` : key;
    
    if (value === null || value === undefined) {
      return;
    }
    
    if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${formKey}[${index}]`;
        if (typeof item === 'object' && !(item instanceof File)) {
          objectToFormData(item, formData, arrayKey);
        } else {
          formData.append(arrayKey, item);
        }
      });
    } else if (typeof value === 'object') {
      objectToFormData(value, formData, formKey);
    } else {
      formData.append(formKey, String(value));
    }
  });
  
  return formData;
}
