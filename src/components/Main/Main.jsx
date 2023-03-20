import GetResAll from '../../api/GetResAll'
import React from 'react'
import style from './Main.module.css'
import { Link } from 'react-router-dom'

const Main = ({countPage}) => {

    const [characters, setCharacter] = React.useState([])

    React.useEffect(() => {
        GetResAll.getCharacter(countPage).then(data => {
            setCharacter(data.results)
        })
    }, [countPage])


    return (
        <div className={style.characters}>
            {characters.map(character => {
                const { id, name, status, species, gender, image, type, origin, location} = character;

                return (

                    <div key={id} className={style.character}>

                        <h2><Link to={`/hero/${id}`} >{name}</Link></h2>
                        <img src={image} alt={name} />
                        <h3>Status: {status}</h3>
                        <h3>Species: {species}</h3>
                        <h3>Gender: {gender}</h3>
                        <h3>Type: {type}</h3>
                        <h3>Origin: {origin.name}</h3>
                        <h3>Location: {location.name}</h3>

                    </div>
                )
            })}
        </div>

    )
}

export default Main