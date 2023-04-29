import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import I18NextComp from './components/js/I18NextComp';
import { Coordinates } from './components/js/Context'
import './components/css/App.css'
import Main from './components/js/Main';


function App() {
  const { t } = useTranslation()
  const [backgroundClass, setbackgroundClass] = useState('nolocation')
  const [NoLocation, setNoLocation] = useState('true')
  const [Longitude, setLongitude] = useState('')
  const [Latitude, setLatitude] = useState('')
  const [CityName, setCityName] = useState('--')
  const [CF, setCF] = useState('C')
  const [LangCode, setLangCode] = useState('en')

  return (
    <>
      <Coordinates.Provider value={{ LangCode, setLangCode, NoLocation, setNoLocation, backgroundClass, setbackgroundClass, Longitude, setLongitude, Latitude, setLatitude, CityName, setCityName, CF, setCF }}>
        <I18NextComp />
        <div className={backgroundClass}>
          <h1 className='TitleName'>{t('Header')}</h1>
          <h1 className='TitleCreated'>Created by @Hitesh Patel</h1>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
      </Coordinates.Provider>
    </>
  );
}

export default App;
