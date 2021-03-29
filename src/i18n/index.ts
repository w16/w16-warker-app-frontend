import i18n from 'i18n-js';
import * as localization from 'expo-localization';
import en from './locales/en';
import pt from './locales/pt';

/**
 * @file Parametrização da biblioteca de internacionalização.
 * @author Lucas Creator
 * 
 * Língua escolhida com base na língua do sistema do usuário.
 */

i18n.fallbacks = true;
i18n.locale = localization.locale.split(/-|_/)[0];
i18n.translations = {
    'en': en,
    'pt': pt
};

export default i18n;

export const t = i18n.t;
