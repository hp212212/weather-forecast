import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Cookies from 'js-cookie';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector) // passes language detector down to react-i18next
    .use(HttpApi) // passes http backend down to react-i18next
    .init({
        supportedLngs: ['en', 'ar', 'fr', 'gu'],
        fallbackLng: "en",
        detection: {
            order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
            caches: ['localStorage', 'cookie'],
        },
        backend: {
            loadPath: 'assets/locales/{{lng}}/translation.json',
        },
        // react: { useSuspense: false },n
    });
const languages = [
    {
        code: 'en',
        name: 'English',
        country_code: 'gb',
    },
    {
        code: 'fr',
        name: 'Français',
        country_code: 'fr',
    },
    {
        code: 'ar',
        name: 'العربية',
        dir: 'rtl',
        country_code: 'sa',
    },
    {
        code: 'gu',
        name: 'ગુજરાતી',
        country_code: 'in',
    },
]

export default function I18NextComp() {
    const currentLanguageCode = Cookies.get('i18next') || 'en'
    const { t } = useTranslation();
    // const releaseDate = new Date('2020-03-07');
    // const timeDifference = new Date() - releaseDate;
    // const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))


    useEffect(() => {
        currentLanguageCode === 'ar' ?
            (document.body.dir = 'rtl') : (document.body.dir = 'ltr');
        document.title = t('app_title')
    }, [currentLanguageCode])
    return (
        <>
            {
                languages.map((res, index) => {
                    return (
                        <button key={index} onClick={() => {
                            i18next.changeLanguage(res.code);
                            // setcurrentLanguageCode(res.code)
                        }}>
                            {res.name}
                        </button>)
                })
            }
        </>
    )
}
