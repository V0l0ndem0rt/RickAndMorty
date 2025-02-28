import React, { useCallback, useEffect, useState } from 'react'
import GetResAll from '../../api/GetResAll'
import Header from '../Header/Header'
import Main from '../Main/Main'
import style from './App.module.css'

const App = () => {
	const [character, setCharacter] = useState(null)
	const [countPage, setCountPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchCharacterData = useCallback(async page => {
		try {
			setIsLoading(true)
			setError(null)
			const data = await GetResAll.getCharacter(page)
			setCharacter(data.info)
		} catch (err) {
			setError('Ошибка при загрузке данных')
			console.error('Error fetching character data:', err)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchCharacterData(countPage)
	}, [countPage, fetchCharacterData])

	const handlePageChange = useCallback(
		newPage => {
			if (!character) return

			if (newPage < 1) {
				setCountPage(character.pages)
			} else if (newPage > character.pages) {
				setCountPage(1)
			} else {
				setCountPage(newPage)
			}
		},
		[character]
	)

	const backPage = useCallback(() => {
		handlePageChange(countPage - 1)
	}, [countPage, handlePageChange])

	const nextPage = useCallback(() => {
		handlePageChange(countPage + 1)
	}, [countPage, handlePageChange])

	const submitCount = useCallback(
		e => {
			e.preventDefault()
			const pageNumber = parseInt(e.target.value)

			if (
				!pageNumber ||
				pageNumber < 1 ||
				!character ||
				pageNumber > character.pages
			) {
				return
			}

			handlePageChange(pageNumber)
		},
		[character, handlePageChange]
	)

	if (error) {
		return <div className={style.error}>{error}</div>
	}

	return (
		<div className={style.container}>
			<Header />
			<div className={style.buttons}>
				<button onClick={backPage} disabled={isLoading}>
					Назад
				</button>
				<h3>
					Страница {countPage} из {character?.pages}
				</h3>
				<button onClick={nextPage}>В перед</button>
			</div>
			<form>
				<input type='number' onChange={submitCount} />
			</form>

			<Main countPage={countPage} />
			<div className={style.buttons}>
				<button onClick={backPage}>Назад</button>
				<h3>
					Страница {countPage} из {character?.pages}
				</h3>
				<button onClick={nextPage}>В перед</button>
			</div>
		</div>
	)
}

export default App
