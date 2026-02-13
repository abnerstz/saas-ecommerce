"use strict";
// Funções de formatação
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = void 0;
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.formatTime = formatTime;
exports.formatPhone = formatPhone;
exports.formatCPF = formatCPF;
exports.formatCNPJ = formatCNPJ;
exports.formatCEP = formatCEP;
exports.formatNumber = formatNumber;
exports.formatPercentage = formatPercentage;
exports.formatFileSize = formatFileSize;
exports.formatWeight = formatWeight;
exports.formatDimensions = formatDimensions;
exports.truncateText = truncateText;
exports.slugify = slugify;
exports.capitalize = capitalize;
exports.capitalizeWords = capitalizeWords;
exports.formatFullName = formatFullName;
exports.getInitials = getInitials;
exports.formatRelativeTime = formatRelativeTime;
/**
 * Formatar valor monetário para Real brasileiro
 */
function formatCurrency(value, currency = 'BRL', locale = 'pt-BR') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(value);
}
/**
 * Formatar data para o padrão brasileiro
 */
function formatDate(date, options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
}) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR', options).format(dateObj);
}
/**
 * Formatar data com hora
 */
function formatDateTime(date) {
    return formatDate(date, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
/**
 * Formatar apenas a hora
 */
function formatTime(date) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(dateObj);
}
/**
 * Formatar número de telefone brasileiro
 */
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    else if (cleaned.length === 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phone;
}
/**
 * Formatar CPF
 */
function formatCPF(cpf) {
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
/**
 * Formatar CNPJ
 */
function formatCNPJ(cnpj) {
    const cleaned = cnpj.replace(/\D/g, '');
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}
/**
 * Formatar CEP
 */
function formatCEP(cep) {
    const cleaned = cep.replace(/\D/g, '');
    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
}
/**
 * Formatar número com separadores de milhares
 */
function formatNumber(value, locale = 'pt-BR') {
    return new Intl.NumberFormat(locale).format(value);
}
/**
 * Formatar porcentagem
 */
function formatPercentage(value, decimals = 1, locale = 'pt-BR') {
    return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value / 100);
}
/**
 * Formatar tamanho de arquivo
 */
function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
/**
 * Formatar peso
 */
function formatWeight(grams) {
    if (grams < 1000) {
        return `${grams}g`;
    }
    const kg = grams / 1000;
    return `${kg.toFixed(kg % 1 === 0 ? 0 : 1)}kg`;
}
/**
 * Formatar dimensões
 */
function formatDimensions(dimensions) {
    const { length, width, height, unit = 'cm' } = dimensions;
    return `${length} × ${width} × ${height} ${unit}`;
}
/**
 * Truncar texto
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return text.substr(0, maxLength) + '...';
}
/**
 * Converter string para slug
 */
function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .replace(/-+/g, '-') // Remove hífens duplicados
        .replace(/^-+|-+$/g, ''); // Remove hífens no início e fim
}
/**
 * Alias para slugify - gerar slug a partir de texto
 */
exports.generateSlug = slugify;
/**
 * Capitalizar primeira letra
 */
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
/**
 * Capitalizar cada palavra
 */
function capitalizeWords(text) {
    return text
        .split(' ')
        .map(word => capitalize(word))
        .join(' ');
}
/**
 * Formatar nome completo
 */
function formatFullName(firstName, lastName) {
    return `${firstName.trim()} ${lastName.trim()}`.trim();
}
/**
 * Extrair iniciais do nome
 */
function getInitials(firstName, lastName) {
    const first = firstName.trim().charAt(0).toUpperCase();
    const last = lastName.trim().charAt(0).toUpperCase();
    return `${first}${last}`;
}
/**
 * Formatar tempo relativo (ex: "há 2 horas")
 */
function formatRelativeTime(date) {
    const now = new Date();
    const past = typeof date === 'string' ? new Date(date) : date;
    const diffMs = now.getTime() - past.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffSecs < 60)
        return 'agora mesmo';
    if (diffMins < 60)
        return `há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24)
        return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 30)
        return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
    return formatDate(past);
}
//# sourceMappingURL=formatting.js.map