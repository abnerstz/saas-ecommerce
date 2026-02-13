/**
 * Debounce function - delay execution until after delay has passed
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Throttle function - limit execution to once per interval
 */
export declare function throttle<T extends (...args: any[]) => any>(func: T, interval: number): (...args: Parameters<T>) => void;
/**
 * Generate a random string
 */
export declare function generateRandomString(length?: number): string;
/**
 * Generate a unique ID (simple alternative to uuid)
 */
export declare function generateId(): string;
/**
 * Deep clone an object
 */
export declare function deepClone<T>(obj: T): T;
/**
 * Check if two objects are deeply equal
 */
export declare function deepEqual(a: any, b: any): boolean;
/**
 * Omit properties from an object
 */
export declare function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
/**
 * Pick properties from an object
 */
export declare function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
/**
 * Group array items by a key
 */
export declare function groupBy<T>(array: T[], keyFn: (item: T) => string | number): Record<string, T[]>;
/**
 * Remove duplicate items from array
 */
export declare function unique<T>(array: T[], keyFn?: (item: T) => any): T[];
/**
 * Sort array by multiple criteria
 */
export declare function sortBy<T>(array: T[], ...sortFns: Array<(item: T) => any>): T[];
/**
 * Sleep for a given number of milliseconds
 */
export declare function sleep(ms: number): Promise<void>;
/**
 * Retry a function with exponential backoff
 */
export declare function retry<T>(fn: () => Promise<T>, maxAttempts?: number, baseDelay?: number): Promise<T>;
/**
 * Check if code is running in browser
 */
export declare function isBrowser(): boolean;
/**
 * Check if code is running in development
 */
export declare function isDevelopment(): boolean;
/**
 * Check if code is running in production
 */
export declare function isProduction(): boolean;
/**
 * Get environment variable with fallback
 */
export declare function getEnvVar(name: string, fallback?: string): string;
/**
 * Clamp a number between min and max
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Convert bytes to human readable format
 */
export declare function humanFileSize(bytes: number, si?: boolean): string;
/**
 * Create a URL with query parameters
 */
export declare function createUrl(baseUrl: string, params: Record<string, string | number | boolean | undefined>): string;
/**
 * Parse query parameters from URL
 */
export declare function parseQueryParams(search: string): Record<string, string>;
/**
 * Convert object to FormData
 */
export declare function objectToFormData(obj: Record<string, any>, formData?: FormData, parentKey?: string): FormData;
//# sourceMappingURL=helpers.d.ts.map