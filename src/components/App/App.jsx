import React, { useCallback, useEffect, useState } from 'react'
import GetResAll from '../../api/GetResAll'
import Header from '../Header/Header'
import Main from '../Main/Main'
import style from './App.module.css'

const PaginationControls = React.memo(
	({ countPage, character, backPage, nextPage, submitCount, isLoading }) => {
		return (
			<>
				<div className={style.buttons}>
					<button onClick={backPage} disabled={isLoading}>
						Назад
					</button>
					<h3>
						Страница {countPage} из {character?.pages || '?'}
					</h3>
					<button onClick={nextPage} disabled={isLoading}>
						Вперед
					</button>
				</div>
				<form
					className={style.pageForm}
					onSubmit={e => e.preventDefault()}
				>
					<input
						type='number'
						min='1'
						max={character?.pages || 1}
						placeholder='Номер страницы'
						onChange={submitCount}
						disabled={isLoading}
					/>
				</form>
			</>
		)
	}
)

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

			<PaginationControls
				countPage={countPage}
				character={character}
				backPage={backPage}
				nextPage={nextPage}
				submitCount={submitCount}
				isLoading={isLoading}
			/>

			<Main countPage={countPage} />

			<PaginationControls
				countPage={countPage}
				character={character}
				backPage={backPage}
				nextPage={nextPage}
				submitCount={submitCount}
				isLoading={isLoading}
			/>
		</div>
	)
}

export default App
