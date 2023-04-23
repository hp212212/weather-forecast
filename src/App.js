import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import Demo from './components/Demo';
import I18NextComp from './components/js/I18NextComp';
import { BackgroungChange, Coordinates } from './components/js/Context'
import './components/css/App.css'
import Main from './components/js/Main';
import { Provider } from 'react-redux';
// import { store } from './components/Redux/Store';
import { MyLocation } from './components/js/MyLocation';


function App() {
  const [backgroundClass, setbackgroundClass] = useState('below15')
  const [Longitude, setLongitude] = useState('')
  const [Latitude, setLatitude] = useState('')
  const [CityName, setCityName] = useState('--')
  const [CF, setCF] = useState('C')
  // const [lo, setLo] = useState('')
  // const [Live, setLive] = useState('')
  // const [LiveText, setLiveText] = useState('')
  // const { t } = useTranslation();
  // const releaseDate = new Date('2020-03-07');
  // const timeDifference = new Date() - releaseDate;
  // const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))


  // function geoFindMe() {
  //   function success(position) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;
  //     setLo("");
  //     setLive(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`)
  //     setLiveText(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  //   }
  //   function error() {
  //     setLo("Unable to retrieve your location")
  //   }
  //   if (!navigator.geolocation) {
  //     setLiveText("Geolocation is not supported by your browser")
  //   } else {
  //     setLo("Locating…")
  //     navigator.geolocation.getCurrentPosition(success, error);
  //   }
  // }
  return (
    <>
      {/* <h2>Title : {t('app_title')}</h2>
      <h2>language : {t('language')}</h2>
      <h2>welcome message : {t('welcome_message')}</h2>
      <h2>days since release : {t('days_since_release', { number_of_days })}</h2> */}

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
      {/* <I18NextComp /> */}
      <div className={backgroundClass}>
        <h1 className='TitleName'>weather forecast</h1>
        {/* <Provider store={store}> */}
        <BackgroungChange.Provider value={{ backgroundClass, setbackgroundClass }}>
          <Coordinates.Provider value={{ Longitude, setLongitude, Latitude, setLatitude, CityName, setCityName, CF, setCF }}>
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
          </Coordinates.Provider>
        </BackgroungChange.Provider>
        {/* </Provider> */}
      </div>
      {/* <Demo /> */}

    </>
  );
}

export default App;
