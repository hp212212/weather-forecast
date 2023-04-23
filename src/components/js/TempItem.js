import dayjs from 'dayjs'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { BiDownArrowAlt, BiUpArrowAlt, BiWind } from 'react-icons/bi'
import { FaCloud, FaTemperatureHigh } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import '../css/TempItem.css'
import { Coordinates } from './Context'

export default function TempItem(Props) {
  const { t } = useTranslation()
  const { CF } = useContext(Coordinates)
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let data = Props.data;
  const TempChange = Props.TempChange
  console.log(data)
  return (
    <>
      <div className='Temp_Item'>
        <h1>{`${weekday[new Date(data.dt_txt).getDay()]} ${t('Outlook')} : ${dayjs(data.dt_txt).format('DD, MMM')}`}</h1>
        <div className='Temp_Item-Container'>
          <div className='Temp_Item-left-item1'>
            <img alt="icon" src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} width="60" height="60" />
            <p>{data.weather[0].description}</p>
          </div>
          <div className='Temp_Item-left-item2'>
            <div className='Detail-item'>
              <FaCloud className='Detail-icon' />
              <p>{`${t('Clouds')} ${data.clouds.all}`}%</p>
            </div>
            <div className='Detail-item'>
              <WiHumidity className='Detail-icon' />
              <p>{`${t('Humidity')} ${data.main.humidity}`}%</p>
            </div>
            <div className='Detail-item'>
              <BiWind className='Detail-icon' />
              <p>{`${t('Wind')} ${data.wind.speed} ${CF === 'C' ? 'm/s' : 'miles/h'}`}</p>
            </div>
          </div>
          <div className='Temp_Item-right'>
            <h1 onClick={TempChange}>{data.main.temp.toFixed(0)}<span> °</span></h1>
            <div className='Detail-item'>
              <FaTemperatureHigh className='Detail-icon' />
              <p className='tempclick' onClick={TempChange}>{`${t('Real_Feel')} ${data.main.feels_like}`} °</p>
            </div>
            <div className='HighLow'>
              <div className='HighLow-Left'>
                <BiUpArrowAlt className='UpIcon' />
                <p onClick={TempChange}>{`${t('High')} ${data.main.temp_max.toFixed(0)}`} °</p>
              </div>
              <div className='HighLow-Right'>
                <BiDownArrowAlt className='DownIcon' />
                <p onClick={TempChange}>{`${t('Low')} ${data.main.temp_min.toFixed(0)}`} °</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
