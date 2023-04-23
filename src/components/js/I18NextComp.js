import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Cookies from 'js-cookie';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { MdLanguage } from 'react-icons/md'
import '../css/i18Next.css'

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
    const [close, setclose] = useState(true)
    const currentLanguageCode = Cookies.get('i18next') || 'en'
    const { t } = useTranslation();
    // const releaseDate = new Date('2020-03-07');
    // const timeDifference = new Date() - releaseDate;
    // const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    const SelectLng = (code) => {
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
                        // onClick={() => { close === 'scaleY(0)' ? setclose('scaleY(1)') : setclose('scaleY(0)') }}
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
            {/* {
                languages.map((res, index) => {
                    return (
                        <button key={index} onClick={() => {
                            i18next.changeLanguage(res.code);
                            // setcurrentLanguageCode(res.code)
                        }}>
                            {res.name}
                        </button>)
                })
            } */}
        </>
    )
}
