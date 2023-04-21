import React, { useState } from 'react'

export function MyLocation() {
    const [lo, setLo] = useState('')
    const [Live, setLive] = useState('')
    const [LiveText, setLiveText] = useState('')

    const geoFindMe = () => {
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
    return (
        <>
            <button id="find-me" onClick={geoFindMe}>Show my location</button><br />
            <p id="status">{lo}</p>
            <a id="map-link" target="_blank" href={Live}>{LiveText}</a>
            <h1>Jay Swaminarayan</h1>
        </>
    )
}
