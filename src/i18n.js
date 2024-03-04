// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en', // Langue par défaut
  fallbackLng: 'en', // Langue de secours si la traduction actuelle n'est pas disponible
  resources: {
    en: {
      translation: {
        errors: {
          firstNameRequired: 'First name is required.',
          lastNameRequired: 'Last name is required.',
          emailRequired: 'Email address is required.',
          emailInvalid: 'Please provide a valid email address.',
          passwordRequired: 'Password is required.',
          passwordLength: 'Password must be at least 8 characters long.',
          // ... Ajoutez d'autres traductions d'erreur pour les autres champs
        },
      },
    },
    fr: {
      translation: {
        errors: {
          firstNameRequired: 'Le prénom est requis.',
          lastNameRequired: 'Le nom de famille est requis.',
          emailRequired: 'L\'adresse e-mail est requise.',
          emailInvalid: 'Veuillez fournir une adresse e-mail valide.',
          passwordRequired: 'Le mot de passe est requis.',
          passwordLength: 'Le mot de passe doit contenir au moins 8 caractères.',
          // ... Ajoutez d'autres traductions d'erreur pour les autres champs
        },
      },
    },
  },
  interpolation: {
    escapeValue: false, // Évite d'échapper les caractères spéciaux dans les traductions
  },
});

export default i18n;
