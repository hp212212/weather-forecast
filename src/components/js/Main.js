import React, { useContext, useEffect } from 'react'
import Search from './Search'
import '../css/Main.css'
// import { MyLocation } from './MyLocation'
import { DispatchLatLng } from '../Redux/Dispatch'
import { useDispatch } from 'react-redux'
import TodayTemp from './TodayTemp'
import { Coordinates } from './Context'


// MyLocation()
export default function Main() {
    // const dispatch = useDispatch()
    const { Latitude, setLatitude, Longitude, setLongitude } = useContext(Coordinates)

    const Geolocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser. Automatic Set TORONTO Location.")
        } else {
            // setLo("Locating…")
            navigator.geolocation.getCurrentPosition(success, error);
        }
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLatitude(latitude)
            setLongitude(longitude)
            // dispatch(
            //     DispatchLatLng(latitude, longitude)
            // )
            // setLo("");
            // setLive(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`)
            // setLiveText(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
        }
        function error() {
            setLatitude('43.6537')
            setLongitude('-79.3827')
            // dispatch(
            //     DispatchLatLng('43.6537', '-79.3827')
            // )
        }
    }

    useEffect(() => {
        Geolocation()
    }, [])

    return (
        <>
            <div className='mainContainer'>
                {/* <MyLocation /> */}
                <Search />
                <TodayTemp />
            </div>
        </>
    )
}
