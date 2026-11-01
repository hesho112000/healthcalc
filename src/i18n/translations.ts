import type { Language } from '../types';
import type { TranslationKeys } from './translationTypes';

export type { TranslationKeys };

// Type-only shape retained for existing keyof typeof translations.en references.
export declare const translations: Record<Language, TranslationKeys>;
