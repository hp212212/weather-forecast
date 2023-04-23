import React, { useState, useEffect, useContext } from 'react'
import { GoLocation } from 'react-icons/go'
import { NavLink } from 'react-router-dom'
import { Coordinates } from './Context'
import '../css/Search.css'
import { useTranslation } from 'react-i18next'
// import { useSelector, useDispatch } from 'react-redux'
// import { DispatchLatLng } from '../Redux/Dispatch'

export default function Search() {
    const { t } = useTranslation();
    // const state = useSelector((state) => state.LatLngLanguage)
    // const dispatch = useDispatch()
    let kaka = t('Placeholder')
    const [InputCity, setInputCity] = useState('')
    const [Data, setData] = useState([])
    const [placeholder, setPlaceholder] = useState()
    let [ScaleUl, setScaleUl] = useState('scaleY(1)')
    const { Latitude, setLatitude, Longitude, setLongitude, setCityName } = useContext(Coordinates)
    const Search = async () => {
        try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${InputCity.length > 2 ? InputCity : ''}&key=b257c0dae6134b9683a9d59a1a1bcb8c&limit=7&language=en&debounce=250`);
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
            setCityName(Data[0].formatted)
            // setLongitude(Data[0].geometry.lng)
            // dispatch(DispatchLatLng(Data[0].geometry.lat, Data[0].geometry.lng))
            setLongitude(Data[0].geometry.lng)
            setLatitude(Data[0].geometry.lat)
            setInputCity('')
        }
    }


    const Display = (item) => {
        setPlaceholder(item.formatted)
        setCityName(item.formatted)
        // dispatch(DispatchLatLng(item.geometry.lat, item.geometry.lng))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        placeholder={placeholder ? placeholder : kaka}
                    // value="hhh" 
                    />
                    {/* <select style={{ transform: { ScaleUl } }}>
                        {
                            Data.map((item, index) => {
                                return (
                                    <option key={index} onClick={() => Display(item)} >{item.formatted}</option>
                                    // <li key={index} onClick={() => Display(item)} >{item.formatted}</li>
                                )
                            })
                        }
                    </select> */}
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
