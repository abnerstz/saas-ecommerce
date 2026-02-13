"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
exports.formatters = formatters;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
function formatters() {
    return {
        currency: (value, currency = 'BRL') => {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency,
            }).format(value);
        },
        date: (date) => {
            const d = typeof date === 'string' ? new Date(date) : date;
            return new Intl.DateTimeFormat('pt-BR').format(d);
        },
        datetime: (date) => {
            const d = typeof date === 'string' ? new Date(date) : date;
            return new Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }).format(d);
        }
    };
}
//# sourceMappingURL=utils.js.map