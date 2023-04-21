import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from 'i18next-browser-languagedetector';
// import HttpApi from 'i18next-http-backend';

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .use(LanguageDetector) // passes language detector down to react-i18next
//   .use(HttpApi) // passes http backend down to react-i18next
//   .init({
//     supportedLngs: ['en', 'ar', 'fr', 'gu'],
//     // the translations
//     // (tip move them in a JSON file and import them,
//     // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)

//     // lng: "en", // if you're using a language detector, do not define the lng option
//     // lng: document.querySelector('html').lang, // if you're using a language detector, do not define the lng option
//     fallbackLng: "en",
//     detection: {
//       order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
//       caches: ['localStorage', 'cookie'],
//     },
//     backend: {
//       loadPath: 'assets/locales/{{lng}}/translation.json',
//     },
//     // react: { useSuspense: false },n
//   });

// function App() {
//   const { t } = useTranslation();

//   return <h2>{t('Welcome to React')}</h2>;
// }





const lodingMarkup = (
  <h1>Loading...................</h1>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={lodingMarkup}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Suspense>
);

serviceWorkerRegistration.register();

reportWebVitals();
