import React, { useContext, useEffect } from 'react'
import Search from './Search'
// import TempItem from './TempItem'
import '../css/Main.css'
// import { MyLocation } from './MyLocation'
// import { DispatchLatLng } from '../Redux/Dispatch'
// import { useDispatch } from 'react-redux'
import TodayTemp from './TodayTemp'
import { Coordinates } from './Context'


// MyLocation()
export default function Main() {
    // const dispatch = useDispatch()
    const { setNoLocation, setLatitude, setLongitude, setCityName } = useContext(Coordinates)

    const Geolocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser. Automatic Set TORONTO Location.")
        } else {
            // setLo("Locating…")
            navigator.geolocation.getCurrentPosition(success, error);
        }
        async function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLatitude(latitude)
            setLongitude(longitude)
            setNoLocation(false)
            try {
                const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=082b1ef5e5ccdcd2dd8368f7087b34b1`)
                const data = await response.json()
                setCityName(`${data[0].name}, ${data[0].state}, ${data[0].country}`)

            }
            catch (error) {
                console.log(error)
            }
            // dispatch(
            //     DispatchLatLng(latitude, longitude)
            // )
            // setLo("");
            // setLive(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`)
            // setLiveText(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
        }
        function error() {
            setNoLocation(true)
            setLatitude('43.6537')
            setLongitude('-79.3827')
            setCityName(`Toronto, Ontario, CA`)
            // dispatch(
            //     DispatchLatLng('43.6537', '-79.3827')
            // )
        }
    }

    useEffect(() => {
        Geolocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className='mainContainer' style={{ height: '50px' }}>
                {/* <MyLocation /> */}
                <Search />
            </div>
            <TodayTemp />
        </>
    )
}
