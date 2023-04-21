import React, { useState, useEffect, useContext } from 'react'
import { GoLocation } from 'react-icons/go'
import { NavLink } from 'react-router-dom'
import { Coordinates } from './Context'
import '../css/Search.css'

export default function Search() {
    const [InputCity, setInputCity] = useState('')
    const [Data, setData] = useState([])
    const [placeholder, setPlaceholder] = useState('Enter City Name...')
    let [ScaleUl, setScaleUl] = useState('scaleY(1)')
    const { Longitude, setLongitude, Latitude, setLatitude } = useContext(Coordinates)
    const Search = async () => {
        try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${InputCity.length > 2 ? InputCity : ''}&key=066c930b1b9f4d9bb89733fb93e9827b&limit=7&language=de&debounce=250`);
            const data = await response.json();
            setData(data.results)
        }
        catch (e) {
            console.log(e);
        }
    }

    const Check = (e) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
            setPlaceholder(Data[0].formatted)
            setLongitude(Data[0].geometry.lng)
            setLatitude(Data[0].geometry.lat)
            setInputCity('')
        }
    }


    const Display = (item) => {
        setPlaceholder(item.formatted)
        setLongitude(item.geometry.lng)
        setLatitude(item.geometry.lat)
        setInputCity('')
    }

    useEffect(() => {
        if (InputCity.length > 2) {
            Search()
            setScaleUl('scaleY(1)')
        } else {
            setData([])
            setScaleUl('scaleY(0)')
        }
    }, [InputCity])
    return (
        <>
            <div className='SearchMain'>
                <div className='inputDiv'>
                    <input type="text" name="InputCity"
                        autoComplete='off'
                        value={InputCity || ""}
                        onChange={(event) => {
                            setInputCity(event.target.value);
                        }}
                        onKeyDown={Check}
                        placeholder={placeholder}
                    // value="hhh" 
                    />
                    <ul style={{ transform: { ScaleUl } }}>
                        {
                            Data.map((item, index) => {
                                return (
                                    <li key={index} onClick={() => Display(item)} >{item.formatted}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* <div className='LocationIcon'> */}
                <NavLink to={`https://www.openstreetmap.org/#map=12/${Latitude}/${Longitude}`} target="_blank">
                    <GoLocation className='LocationIcon' />
                </NavLink>
                {/* </div> */}
            </div>
        </>
    )
}
