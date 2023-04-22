import React from 'react'
import { BiDownArrowAlt, BiUpArrowAlt, BiWind } from 'react-icons/bi'
import { FaCloud, FaCompressArrowsAlt, FaTemperatureHigh } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import '../css/Temp_Item.css'

export default function Temp_Item() {
  return (
    <>
      <div className='Temp_Item'>
        <h1>Saturday Outlook</h1>
        <div className='Temp_Item-Container'>
          <div className='Temp_Item-left'>
            <div className='Temp_Item-left-item1'>
              <img alt="icon" src={`https://openweathermap.org/img/w/10n.png`} width="60" height="60" />
              <p>Clear Sky</p>
            </div>
            <div className='Temp_Item-left-item2'>
              <div className='Detail-item'>
                <FaCloud className='Detail-icon' />
                <p>Clouds: 75%</p>
              </div>
              <div className='Detail-item'>
                <WiHumidity className='Detail-icon' />
                <p>Humidity: 68%</p>
              </div>
              <div className='Detail-item'>
                <BiWind className='Detail-icon' />
                <p>Wind: 0 km/h</p>
              </div>
            </div>
          </div>
          <div className='Temp_Item-right'>
            <h1>23<span>°</span></h1>
            <div className='Detail-item'>
              <FaTemperatureHigh className='Detail-icon' />
              <p className='tempclick'>Real Feel: 28°</p>
            </div>
            <div className='HighLow'>
              <div className='HighLow-Left'>
                <BiUpArrowAlt className='UpIcon' />
                <p>High: 25°</p>
              </div>
              <div className='HighLow-Right'>
                <BiDownArrowAlt className='DownIcon' />
                <p>High: 25°</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
