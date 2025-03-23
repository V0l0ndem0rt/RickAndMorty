import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetResAll from '../../api/GetResAll'
import style from './Main.module.css'

const CharacterCard = React.memo(({ character }) => {
	const { id, name, status, species, gender, image, type, origin, location } =
		character

	return (
		<div key={id} className={style.character}>
			<h2>
				<Link to={`/hero/${id}`}>{name}</Link>
			</h2>
			<img src={image} alt={name} />
			<h3>Status: {status}</h3>
			<h3>Species: {species}</h3>
			<h3>Gender: {gender}</h3>
			<h3>Type: {type || 'unknown'}</h3>
			<h3>Origin: {origin.name}</h3>
			<h3>Location: {location.name}</h3>
		</div>
	)
})

const Main = ({ countPage }) => {
	const [characters, setCharacters] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchCharacters = useCallback(async () => {
		try {
			setIsLoading(true)
			setError(null)
			const data = await GetResAll.getCharacter(countPage)
			setCharacters(data.results)
		} catch (err) {
			setError('Ошибка при загрузке персонажей')
			console.error('Error fetching characters:', err)
		} finally {
			setIsLoading(false)
		}
	}, [countPage])

	useEffect(() => {
		fetchCharacters()
	}, [fetchCharacters])

	if (isLoading) return <div className={style.loading}>Загрузка...</div>
	if (error) return <div className={style.error}>{error}</div>

	return (
		<div className={style.characters}>
			{characters.map(character => (
				<CharacterCard key={character.id} character={character} />
			))}
		</div>
	)
}

export default React.memo(Main)
