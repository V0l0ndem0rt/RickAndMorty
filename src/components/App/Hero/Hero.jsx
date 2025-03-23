import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GetResAll from '../../../api/GetResAll'
import styles from './Hero.module.css'

const Hero = () => {
	const [character, setCharacter] = useState({
		name: '',
		status: '',
		species: '',
		gender: '',
		image: '',
		type: '',
		origin: { name: '' },
		location: { name: '' },
	})
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const { id } = useParams()

	useEffect(() => {
		const fetchCharacter = async () => {
			try {
				setIsLoading(true)
				setError(null)
				const data = await GetResAll.getCharacterItem(id)
				setCharacter(data)
			} catch (err) {
				setError('Ошибка загрузки персонажа')
				console.error('Error fetching character:', err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCharacter()
	}, [id])

	if (isLoading) return <div className={styles.loading}>Загрузка...</div>
	if (error) return <div className={styles.error}>{error}</div>

	const { name, status, species, gender, image, type, origin, location } =
		character

	return (
		<div className={styles.cont}>
			<Link className={styles.link} to='/'>
				Назад
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
