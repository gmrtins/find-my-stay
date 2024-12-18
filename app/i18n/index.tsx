import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import enTranslation from './locales/en-GB/translation.json';
import ptTranslation from './locales/pt-PT/translation.json';
import esTranslation from './locales/es-ES/translation.json';

const resources = {
    'pt-PT': { translation: ptTranslation },
    'en-GB': { translation: enTranslation },
    'es-ES': { translation: esTranslation },
};

export const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem('appLanguage', lang);
    i18n.changeLanguage(lang);
};

const initI18n = async () => {
    let savedLanguage = await AsyncStorage.getItem('appLanguage');

    if (!savedLanguage) {
        savedLanguage = i18n.language;
    }

    i18n.use(initReactI18next).init({
        compatibilityJSON: 'v4',
        resources,
        lng: savedLanguage,
        fallbackLng: 'en-GB',
        interpolation: {
            escapeValue: false,
        },
    });
};

initI18n();

export default i18n;
