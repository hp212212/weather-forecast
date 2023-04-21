import React, { useState, useEffect } from 'react'
// import '../App.css'

export default function Demo() {
    const [InputCity, setInputCity] = useState('')
    const [Data, setData] = useState([])
    const Search = async () => {
        try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${InputCity.length > 2 ? InputCity : ''}&key=066c930b1b9f4d9bb89733fb93e9827b&limit=10&language=de&debounce=250`);
            const data = await response.json();
            setData(data.results)
        }
        catch (e) {
            console.log(e);
        }
    }

    const Check = (e) => {
        if (e.key === 'Tab') {
            console.log('Tab')

        }
    }


    const Display = (index) => {
        console.log(Data[index])
    }

    useEffect(() => {
        if (InputCity.length > 2) {
            Search()
        } else {
            setData([])
        }
    }, [InputCity])


    return (
        <>
            <input type="text" name="InputCity" value={InputCity || ""}
                onChange={(event) => {
                    setInputCity(event.target.value);
                }}
                onKeyDown={Check}
            />
            <button type="button">Submit</button>
            <ul>
                {
                    Data.map((item, index) => {
                        return (
                            <div key={index} onClick={(index) => Display(index)} >{item.formatted}</div>
                        )
                    })
                }
            </ul>
        </>
    )
}
