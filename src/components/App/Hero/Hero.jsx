import React from 'react'
import { Link, useParams } from 'react-router-dom'
import GetResAll from '../../../api/GetResAll'
import styles from './Hero.module.css'

const Hero = () => {
	const [character, setCharacte] = React.useState({
		name: '',
		status: '',
		species: '',
		gender: '',
		image: '',
		type: '',
		origin: '',
		location: '',
	})
	const { id } = useParams()
	React.useEffect(() => {
		GetResAll.getCharacterItem(id).then(data => {
			setCharacte(data)
		})
	}, [id])

	const { name, status, species, gender, image, type, origin, location } =
		character
	return (
		<div className={styles.cont}>
			<Link className={styles.link} to='/'>
				Back
			</Link>
			<div className={styles.hero}>
				<div className={styles.desr}>
					<h1>{name}</h1>
					<h3>Status: {status}</h3>
					<h3>Species: {species}</h3>
					<h3>Gender: {gender}</h3>
					<h3>Type: {type ? type : 'unknown'}</h3>
					<h3>Origin: {origin.name}</h3>
					<h3>Location: {location.name}</h3>
				</div>
				<div className={styles.img}>
					<img src={image} alt={name} />
				</div>
			</div>
		</div>
	)
}

export default Hero
