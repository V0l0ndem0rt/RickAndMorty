import GetResAll from '../../../api/GetResAll'
import React from 'react'
import style from './LocationMain.module.css'

const LocationMain = ({countPage}) => {

    const [location, setLocation] = React.useState([])

    React.useEffect(() => {
        GetResAll.getLocation(countPage).then(data => {
            setLocation(data.results)
        })
    }, [countPage])


    return (
        <div className={style.locations}>
            {location.map(character => {
                const { id, name,type,dimension} = character;

                return (

                    <div key={id} className={style.location}>
                        <h2>Name : {name}</h2>
                        <h3>Type: {type}</h3>
                        <h3>Location: {dimension}</h3>
                    </div>
                )
            })}
        </div>

    )
}

export default LocationMain