import React, { useCallback, useContext, useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { Coordinates } from './Context'
import { BiDownArrowAlt, BiUpArrowAlt, BiWind } from 'react-icons/bi'
import { FaTemperatureHigh } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import '../css/TodayTemp.css'

export default function TodayTemp() {
    const { Latitude, setLatitude, Longitude, setLongitude } = useContext(Coordinates)
    const [DateFormat, setDateFormat] = useState('--')
    const [MainData, setMainData] = useState({})
    const [ForecastData, setForecastData] = useState({})
    // const state = useSelector((state) => state.LatLngLanguage)
    // const LatLng = [state.Lat, state.Lng]
    // $.ajax({
    //     url: `https://api.openweathermap.org/data/2.5/weather?q=${Search}&appid=082b1ef5e5ccdcd2dd8368f7087b34b1&units=metric`,
    //     type: "Get",
    //     dataType: "jsonp",
    //     success: (data) => {
    //         setDataMainC(data)
    //         if (CF === '°C') {
    //             setDataMain(data)
    //         }
    //     },
    //     error: (err) => { }
    // });
    // $.ajax({
    //     url: `https://api.openweathermap.org/data/2.5/forecast?q=${Search}&appid=082b1ef5e5ccdcd2dd8368f7087b34b1&units=metric`,
    //     type: "Get",
    //     dataType: "jsonp",
    //     success: (data) => {
    //         setDataC(data)
    //         if (CF === '°C') {
    //             setData(data)
    //         }
    //         setTodayWeather([weekday[new Date(data.list[0].dt_txt).getDay()], dayjs(data.list[0].dt_txt).format('h a'), data.list[0].weather[0].description])
    //     },
    //     error: (err) => { }
    // });

    const GetWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=082b1ef5e5ccdcd2dd8368f7087b34b1&units=metric`)
            const data = await response.json()
            setMainData(data)
            // timeConverter(data.dt)
            console.log(data)
            setDateFormat(timeConverter(data.dt))
            // console.log(timeConverter(data.dt))
            // .toLocaleDateString() or.toLocaleTimeString())
        }
        catch (err) {
            console.log(err)
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${Latitude}&lon=${Longitude}&appid=082b1ef5e5ccdcd2dd8368f7087b34b1&units=metric`)
            const data = await response.json()
            setForecastData(data)
            // console.log(data)
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
        // var hour = a.getHours();
        // var min = a.getMinutes();
        // var sec = a.getSeconds();
        // var time = date + ' ' + month + ' ' + year + ' ; ' + hour + ':' + min + ':' + sec;
        var time = Days[day] + ' ' + date + ' ' + month + ' ' + year + ' | ' + a.toLocaleTimeString();
        console.log(time)
        return time;
    }
    useEffect(() => {
        console.log('GetWeather')
        GetWeather()
    }, [Latitude])

    // useCallback(
    //     (DateCode) => {
    //         var a = new Date(DateCode * 1000);
    //         var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //         var Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //         var year = a.getFullYear();
    //         var month = months[a.getMonth()];
    //         var date = a.getDate();
    //         var day = a.getDay();
    //         // var hour = a.getHours();
    //         // var min = a.getMinutes();
    //         // var sec = a.getSeconds();
    //         // var time = date + ' ' + month + ' ' + year + ' ; ' + hour + ':' + min + ':' + sec;
    //         var time = Days[day] + ' ' + date + ' ' + month + ' ' + year + ' ; ' + a.toLocaleTimeString();
    //         console.log(time)
    //         return time;
    //     },
    //     [DateCode],
    // )



    return (
        <>
            <div className='TempMain'>
                <p>Friday 21 Apr 2023 | 08:08:08 pm</p>
                {/* <p>{DateFormat}</p> */}
                <h1>Parish, <span>FR</span></h1>
                <div className='TempMain-Container'>
                    <div className='TempMain-Container-Left'>
                        <h1>23<span>°</span></h1>
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
                    <div className='TempMain-Container-Right'>
                        <img alt="icon" src={`https://openweathermap.org/img/w/10n.png`} width="100" height="100" />
                        <p>Clear Sky</p>
                        <div className='Detail'>
                            <p><FaTemperatureHigh />Real Feel: 28°</p>
                            <p><WiHumidity />Humidity: 68%</p>
                            <p><BiWind />Wind: 0 km/h</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
