/**
 * Formatar valor monetário para Real brasileiro
 */
export declare function formatCurrency(value: number, currency?: string, locale?: string): string;
/**
 * Formatar data para o padrão brasileiro
 */
export declare function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string;
/**
 * Formatar data com hora
 */
export declare function formatDateTime(date: Date | string): string;
/**
 * Formatar apenas a hora
 */
export declare function formatTime(date: Date | string): string;
/**
 * Formatar número de telefone brasileiro
 */
export declare function formatPhone(phone: string): string;
/**
 * Formatar CPF
 */
export declare function formatCPF(cpf: string): string;
/**
 * Formatar CNPJ
 */
export declare function formatCNPJ(cnpj: string): string;
/**
 * Formatar CEP
 */
export declare function formatCEP(cep: string): string;
/**
 * Formatar número com separadores de milhares
 */
export declare function formatNumber(value: number, locale?: string): string;
/**
 * Formatar porcentagem
 */
export declare function formatPercentage(value: number, decimals?: number, locale?: string): string;
/**
 * Formatar tamanho de arquivo
 */
export declare function formatFileSize(bytes: number): string;
/**
 * Formatar peso
 */
export declare function formatWeight(grams: number): string;
/**
 * Formatar dimensões
 */
export declare function formatDimensions(dimensions: {
    length: number;
    width: number;
    height: number;
    unit?: string;
}): string;
/**
 * Truncar texto
 */
export declare function truncateText(text: string, maxLength: number): string;
/**
 * Converter string para slug
 */
export declare function slugify(text: string): string;
/**
 * Alias para slugify - gerar slug a partir de texto
 */
export declare const generateSlug: typeof slugify;
/**
 * Capitalizar primeira letra
 */
export declare function capitalize(text: string): string;
/**
 * Capitalizar cada palavra
 */
export declare function capitalizeWords(text: string): string;
/**
 * Formatar nome completo
 */
export declare function formatFullName(firstName: string, lastName: string): string;
/**
 * Extrair iniciais do nome
 */
export declare function getInitials(firstName: string, lastName: string): string;
/**
 * Formatar tempo relativo (ex: "há 2 horas")
 */
export declare function formatRelativeTime(date: Date | string): string;
//# sourceMappingURL=formatting.d.ts.map