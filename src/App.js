import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import i18next from 'i18next';
import Cookies from 'js-cookie';

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

function App() {
  const currentLanguageCode = Cookies.get('i18next') || 'en'
  const [lo, setLo] = useState('')
  const [Live, setLive] = useState('')
  const [LiveText, setLiveText] = useState('')
  const { t } = useTranslation();
  const releaseDate = new Date('2020-03-07');
  const timeDifference = new Date() - releaseDate;
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))


  function geoFindMe() {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLo("");
      setLive(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`)
      setLiveText(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
    }
    function error() {
      setLo("Unable to retrieve your location")
    }
    if (!navigator.geolocation) {
      setLiveText("Geolocation is not supported by your browser")
    } else {
      setLo("Locating…")
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }


  useEffect(() => {
    currentLanguageCode === 'ar' ?
      (document.body.dir = 'rtl') : (document.body.dir = 'ltr');
    document.title = t('app_title')
  }, [currentLanguageCode])


  return (
    <>
      <h2>Title : {t('app_title')}</h2>
      <h2>language : {t('language')}</h2>
      <h2>welcome message : {t('welcome_message')}</h2>
      <h2>days since release : {t('days_since_release', { number_of_days })}</h2>

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

      <button id="find-me" onClick={geoFindMe}>Show my location</button><br />
      <p id="status">{lo}</p>
      <a id="map-link" target="_blank" href={Live}>{LiveText}</a>
      <h1>Jay Swaminarayan</h1>
    </>
  );
}

export default App;
