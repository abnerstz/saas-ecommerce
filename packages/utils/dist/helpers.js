"use strict";
// Funções auxiliares úteis
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = debounce;
exports.throttle = throttle;
exports.generateRandomString = generateRandomString;
exports.generateId = generateId;
exports.deepClone = deepClone;
exports.deepEqual = deepEqual;
exports.omit = omit;
exports.pick = pick;
exports.groupBy = groupBy;
exports.unique = unique;
exports.sortBy = sortBy;
exports.sleep = sleep;
exports.retry = retry;
exports.isBrowser = isBrowser;
exports.isDevelopment = isDevelopment;
exports.isProduction = isProduction;
exports.getEnvVar = getEnvVar;
exports.clamp = clamp;
exports.humanFileSize = humanFileSize;
exports.createUrl = createUrl;
exports.parseQueryParams = parseQueryParams;
exports.objectToFormData = objectToFormData;
/**
 * Debounce function - delay execution until after delay has passed
 */
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}
/**
 * Throttle function - limit execution to once per interval
 */
function throttle(func, interval) {
    let lastCall = 0;
    return (...args) => {
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
function generateRandomString(length = 8) {
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
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
/**
 * Deep clone an object
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object')
        return obj;
    if (obj instanceof Date)
        return new Date(obj.getTime());
    if (obj instanceof Array)
        return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const copy = {};
        Object.keys(obj).forEach(key => {
            copy[key] = deepClone(obj[key]);
        });
        return copy;
    }
    return obj;
}
/**
 * Check if two objects are deeply equal
 */
function deepEqual(a, b) {
    if (a === b)
        return true;
    if (a instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime();
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
        return a === b;
    if (a === null || a === undefined || b === null || b === undefined)
        return false;
    if (a.prototype !== b.prototype)
        return false;
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length)
        return false;
    return keys.every(k => deepEqual(a[k], b[k]));
}
/**
 * Omit properties from an object
 */
function omit(obj, keys) {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
}
/**
 * Pick properties from an object
 */
function pick(obj, keys) {
    const result = {};
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
function groupBy(array, keyFn) {
    return array.reduce((groups, item) => {
        const key = String(keyFn(item));
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
}
/**
 * Remove duplicate items from array
 */
function unique(array, keyFn) {
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
function sortBy(array, ...sortFns) {
    return [...array].sort((a, b) => {
        for (const sortFn of sortFns) {
            const aVal = sortFn(a);
            const bVal = sortFn(b);
            if (aVal < bVal)
                return -1;
            if (aVal > bVal)
                return 1;
        }
        return 0;
    });
}
/**
 * Sleep for a given number of milliseconds
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * Retry a function with exponential backoff
 */
async function retry(fn, maxAttempts = 3, baseDelay = 1000) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            if (attempt === maxAttempts) {
                throw lastError;
            }
            const delay = baseDelay * Math.pow(2, attempt - 1);
            await sleep(delay);
        }
    }
    throw lastError;
}
/**
 * Check if code is running in browser
 */
function isBrowser() {
    return typeof window !== 'undefined';
}
/**
 * Check if code is running in development
 */
function isDevelopment() {
    return process.env.NODE_ENV === 'development';
}
/**
 * Check if code is running in production
 */
function isProduction() {
    return process.env.NODE_ENV === 'production';
}
/**
 * Get environment variable with fallback
 */
function getEnvVar(name, fallback) {
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
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
/**
 * Convert bytes to human readable format
 */
function humanFileSize(bytes, si = false) {
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
function createUrl(baseUrl, params) {
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
function parseQueryParams(search) {
    const params = new URLSearchParams(search);
    const result = {};
    params.forEach((value, key) => {
        result[key] = value;
    });
    return result;
}
/**
 * Convert object to FormData
 */
function objectToFormData(obj, formData = new FormData(), parentKey) {
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;
        if (value === null || value === undefined) {
            return;
        }
        if (value instanceof File || value instanceof Blob) {
            formData.append(formKey, value);
        }
        else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                const arrayKey = `${formKey}[${index}]`;
                if (typeof item === 'object' && !(item instanceof File)) {
                    objectToFormData(item, formData, arrayKey);
                }
                else {
                    formData.append(arrayKey, item);
                }
            });
        }
        else if (typeof value === 'object') {
            objectToFormData(value, formData, formKey);
        }
        else {
            formData.append(formKey, String(value));
        }
    });
    return formData;
}
//# sourceMappingURL=helpers.js.map