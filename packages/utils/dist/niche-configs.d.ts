import { NicheType, ProductFormConfig, ThemeConfig } from '../../types/src';
/**
 * Configurações de campos de produto por nicho
 */
export declare const PRODUCT_CONFIGS: Record<NicheType, ProductFormConfig>;
/**
 * Configurações de tema por nicho
 */
export declare const THEME_CONFIGS: Record<NicheType, ThemeConfig>;
/**
 * Obter configuração de produto por nicho
 */
export declare function getProductConfig(niche: NicheType): ProductFormConfig;
/**
 * Obter configuração de tema por nicho
 */
export declare function getThemeConfig(niche: NicheType): ThemeConfig;
/**
 * Obter campos específicos por nicho
 */
export declare function getNicheFields(niche: NicheType): import("@ecommerce/types/src/common").ProductField[];
/**
 * Obter seções customizadas por nicho
 */
export declare function getNicheSections(niche: NicheType): import("@ecommerce/types/src/common").CustomSection[];
//# sourceMappingURL=niche-configs.d.ts.map