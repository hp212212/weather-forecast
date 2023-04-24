import React, { useContext, useEffect, useState } from 'react'
import { Coordinates } from './Context'
import { BiDownArrowAlt, BiUpArrowAlt, BiWind } from 'react-icons/bi'
import { FaTemperatureHigh, FaCloud, FaCompressArrowsAlt } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import '../css/TodayTemp.css'
import dayjs from 'dayjs'
import TempItem from './TempItem'
import { useTranslation } from 'react-i18next'

export default function TodayTemp() {
    const { t } = useTranslation()
    const { Latitude, Longitude, CityName, CF, setCF, setbackgroundClass, NoLocation } = useContext(Coordinates)
    const [DateFormat, setDateFormat] = useState('--')
    const [MainDataC, setMainDataC] = useState({})
    const [MainDataF, setMainDataF] = useState({})
    const [MainData, setMainData] = useState({})
    const [ForecastDataC, setForecastDataC] = useState([])
    const [ForecastDataF, setForecastDataF] = useState([])
    const [ForecastData, setForecastData] = useState([])
    const [Loading, setLoading] = useState(true)

    const GetWeather = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=082b1ef5e5ccdcd2dd8368f7087b34b1&units=metric`)
            const data = await response.json()
            setMainDataC(data)
            if (CF === 'C') {
                setMainData(data)
            }
            if (NoLocation) {
                setbackgroundClass('nolocation')
            } else {
                if (data.main.temp < 15) {
                    setbackgroundClass('below15')
                } else if (data.main.temp > 35) {
                    setbackgroundClass('above35')
                } else {
                    setbackgroundClass('between15to35')
                }
            }
            setDateFormat(timeConverter(data.dt))
        }
        catch (err) {
            console.log(err)
        }

        try {
            setLoading(true)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=082b1ef5e5ccdcd2dd8368f7087b34b1&units=imperial`)
            const data = await response.json()
            setMainDataF(data)
            if (CF === 'F') {
                setMainData(data)
            }
        }
        catch (err) {
            console.log(err)
        }

        try {
            setLoading(true)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${Latitude}&lon=${Longitude}&appid=082b1ef5e5ccdcd2dd8368f7087b34b1&units=metric`)
            const data = await response.json()
            console.log(data)
            for (let i = 0; i < data.list.length; i++) {
                if (dayjs().add(1, 'day').format('YYYY-MM-DD') === dayjs(data.list[i].dt_txt).format('YYYY-MM-DD')) {
                    setForecastDataC([data.list[i], data.list[i + 8], data.list[i + 16], data.list[i + 24], data.list[i + 32]])
                    if (CF === 'C') {
                        setForecastData([data.list[i], data.list[i + 8], data.list[i + 16], data.list[i + 24], data.list[i + 32]])
                    }
                    break
                }
            }
            setLoading(false)
        }
        catch (err) {
            console.log(err)
        }

        try {
            setLoading(true)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${Latitude}&lon=${Longitude}&appid=082b1ef5e5ccdcd2dd8368f7087b34b1&units=imperial`)
            const data = await response.json()
            console.log(data)
            for (let i = 0; i < data.list.length; i++) {
                if (dayjs().add(1, 'day').format('YYYY-MM-DD') === dayjs(data.list[i].dt_txt).format('YYYY-MM-DD')) {
                    setForecastDataF([data.list[i], data.list[i + 8], data.list[i + 16], data.list[i + 24], data.list[i + 32]])
                    if (CF === 'F') {
                        setForecastData([data.list[i], data.list[i + 8], data.list[i + 16], data.list[i + 24], data.list[i + 32]])
                    }
                    break
                }
            }
            setLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    function timeConverter(code) {
        var a = new Date(code * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var day = a.getDay();
        var time = Days[day] + ' ' + date + ' ' + month + ' ' + year + ' | ' + a.toLocaleTimeString();
        return time;
    }
    const TempChange = () => {
        if (CF === 'C') {
            setMainData(MainDataF)
            setForecastData(ForecastDataF)
            setCF('F')
        } else {
            setMainData(MainDataC)
            setForecastData(ForecastDataC)
            setCF('C')
        }
    }


    useEffect(() => {
        if (Latitude !== '') {
            GetWeather()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Latitude])



    return (
        <>
            <div className='mainContainer' style={{ height: '290px' }}>
                <div className='TempMain'>
                    <p>{
                        !Loading ? DateFormat : '--'}</p>
                    <h1>{CityName}</h1>
                    <div className='TempMain-Container'>
                        <div className='TempMain-Container-Left'>
                            <h1 onClick={TempChange}>{!Loading ? MainData.main.temp.toFixed(0) : null}° <span>{CF}</span></h1>
                            <div className='Detail-item'>
                                <FaTemperatureHigh className='Detail-icon' />
                                <p className='tempclick' onClick={TempChange}>{`${t('Real_Feel')} ${!Loading ? MainData.main.feels_like : '--'}`} °</p>
                            </div>
                            <div className='HighLow'>
                                <div className='HighLow-Left'>
                                    <BiUpArrowAlt className='UpIcon' />
                                    <p onClick={TempChange}>{`${t('High')} ${!Loading ? MainData.main.temp_max : '--'}`} °</p>
                                </div>
                                <div className='HighLow-Right'>
                                    <BiDownArrowAlt className='DownIcon' />
                                    <p onClick={TempChange}>{`${t('Low')} ${!Loading ? MainData.main.temp_min : '--'}`} °</p>
                                </div>
                            </div>
                        </div>
                        <div className='TempMain-Container-Right'>
                            <p>{!Loading ? MainData.weather[0].main : '--'}</p>
                            <img alt="icon" src={`https://openweathermap.org/img/w/${!Loading ? MainData.weather[0].icon : '--'}.png`} width="60" height="60" />
                            <div className='Detail-item'>
                                <FaCloud className='Detail-icon' />
                                <p>{`${t('Clouds')} ${!Loading ? MainData.clouds.all : '--'}`} %</p>
                            </div>
                            <div className='Detail-item'>
                                <WiHumidity className='Detail-icon' />
                                <p>{`${t('Humidity')} ${!Loading ? MainData.main.humidity : '--'}`} %</p>
                            </div>
                            <div className='Detail-item'>
                                <BiWind className='Detail-icon' />
                                <p>{`${t('Wind')} ${!Loading ? MainData.wind.speed : '--'} ${CF === 'C' ? 'm/s' : 'miles/h'}`}</p>
                            </div>
                            <div className='Detail-item'>
                                <FaCompressArrowsAlt className='Detail-icon' />
                                <p>{`${t('Pressure')} ${!Loading ? MainData.main.pressure : '--'}`} hPa</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='mainContainer' style={{ height: '141px' }}>
                {
                    !Loading ?
                        (
                            <TempItem data={ForecastData[0]} TempChange={TempChange} />
                        )
                        : null
                }
            </div>
            <div className='mainContainer' style={{ height: '141px' }}>
                {
                    !Loading ?
                        (
                            <TempItem data={ForecastData[1]} TempChange={TempChange} />
                        )
                        : null
                }
            </div>
            <div className='mainContainer' style={{ height: '141px' }}>
                {
                    !Loading ?
                        (
                            <TempItem data={ForecastData[2]} TempChange={TempChange} />
                        )
                        : null
                }
            </div>
            <div className='mainContainer' style={{ height: '141px' }}>
                {
                    !Loading ?
                        (
                            <TempItem data={ForecastData[3]} TempChange={TempChange} />
                        )
                        : null
                }
            </div>
            <div className='mainContainer' style={{ height: '141px' }}>
                {
                    !Loading ?
                        (
                            <TempItem data={ForecastData[4]} TempChange={TempChange} />
                        )
                        : null
                }
            </div>

        </>
    )
}
