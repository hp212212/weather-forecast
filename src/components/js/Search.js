import React, { useState, useEffect, useContext } from 'react'
import { GoLocation } from 'react-icons/go'
import { NavLink } from 'react-router-dom'
import { Coordinates } from './Context'
import '../css/Search.css'
import { useTranslation } from 'react-i18next'

export default function Search() {
    const { t } = useTranslation();
    let kaka = t('Placeholder')
    const [InputCity, setInputCity] = useState('')
    const [Data, setData] = useState([])
    const [SelectedIndex, setSelectedIndex] = useState(0)
    const [placeholder, setPlaceholder] = useState()
    let [ScaleUl, setScaleUl] = useState('scaleY(1)')
    const { Latitude, setLatitude, Longitude, setLongitude, setCityName, LangCode } = useContext(Coordinates)
    const Search = async () => {
        try {
            setSelectedIndex(0)
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${InputCity.length > 2 ? InputCity : ''}&language=${LangCode}&key=b257c0dae6134b9683a9d59a1a1bcb8c&limit=7&language=en&debounce=250&no_dedupe=1&no_annotations=1&population=100000`);
            const data = await response.json();
            setData(data.results)
        }
        catch (e) {
            console.log(e);
        }
    }

    const Check = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                setSelectedIndex((prevIndex) =>
                    prevIndex === 0 ? Data.length - 1 : prevIndex - 1
                );
                break;
            case 'ArrowDown':
                setSelectedIndex((prevIndex) =>
                    prevIndex === Data.length - 1 ? 0 : prevIndex + 1
                );
                break;
            case 'Tab' || 'Enter':
                setPlaceholder(Data[0].formatted)
                setCityName(Data[0].formatted)
                setLongitude(Data[0].geometry.lng)
                setLatitude(Data[0].geometry.lat)
                setInputCity('')
                break;
            default:
                break;
        }


        if (e.key === 'Tab' || e.key === 'Enter') {
            setPlaceholder(Data[SelectedIndex].formatted)
            setCityName(Data[SelectedIndex].formatted)
            setLongitude(Data[SelectedIndex].geometry.lng)
            setLatitude(Data[SelectedIndex].geometry.lat)
            setInputCity('')
        }
    }

    const MoseMove = (index) => {
        setSelectedIndex(index)
    }


    const Display = (item) => {
        setPlaceholder(item.formatted)
        setCityName(item.formatted)
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
                    />
                    <ul style={{ transform: { ScaleUl } }}>
                        {
                            Data.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => Display(item)}
                                        onMouseEnter={() => MoseMove(index)}
                                        className={
                                            (index === SelectedIndex) ? 'selected' : ''
                                        }
                                    >
                                        {item.formatted}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <NavLink to={`https://www.openstreetmap.org/#map=12/${Latitude}/${Longitude}`} target="_blank" aria-label='Hitesh'>
                    <GoLocation className='LocationIcon' />
                </NavLink>
            </div>
        </>
    )
}
