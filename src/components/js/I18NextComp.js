import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Cookies from 'js-cookie';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { MdLanguage } from 'react-icons/md'
import '../css/i18Next.css'
import { Coordinates } from './Context';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['en', 'ar', 'fr', 'gu'],
        fallbackLng: "en",
        detection: {
            order: ['cookie', 'path', 'htmlTag', 'localStorage', 'subdomain'],
            caches: ['localStorage', 'cookie'],
        },
        backend: {
            loadPath: 'assets/locales/{{lng}}/translation.json',
        },
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
    const [close, setclose] = useState(true)
    const currentLanguageCode = Cookies.get('i18next') || 'en'
    const { t } = useTranslation();
    const { setLangCode } = useContext(Coordinates)

    const SelectLng = (code) => {
        setLangCode(code)
        i18next.changeLanguage(code)
        setclose(true)
    }


    useEffect(() => {
        currentLanguageCode === 'ar' ?
            (document.body.dir = 'rtl') : (document.body.dir = 'ltr');
        document.title = t('Title')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLanguageCode])
    return (
        <>
            <div className='i18Main'>
                <div className='i18Main__header'>
                    <MdLanguage className='i18Main-icon'
                        onClick={
                            () => {
                                if (close === true) {
                                    setclose(false)
                                } else {
                                    setclose(true)
                                }
                            }
                        }
                    />
                    <ul style={{ transform: close === true ? 'scaleY(0)' : 'scaleY(1)' }} >
                        {
                            languages.map((res, index) => {
                                return (
                                    <li key={index} onClick={() => { SelectLng(res.code) }}>{res.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
