import React from 'react'
import GetResAll from '../../api/GetResAll'
import Header from '../Header/Header'
import style from './Episode.module.css'
import EpisodeMain from './EpisodeMain/EpisodeMain'

const Episode = () => {
	const [episode, setEpisode] = React.useState([]) // переменная для получения данных из базы данных
	let [countPage, setCountPage] = React.useState(1)

	React.useEffect(() => {
		// подгрузка данных из базы данных при первом исполнении страницы
		GetResAll.getEpisode(countPage).then(data => {
			setEpisode(data.info)
		})
	}, [countPage])

	const backPage = () => {
		if (countPage === 1) {
			setCountPage(() => (countPage = episode.pages))
		} else {
			setCountPage(() => countPage - 1)
		}
	}
	const nextPage = () => {
		if (countPage === episode.pages) {
			setCountPage(() => (countPage = 1))
		} else {
			setCountPage(() => countPage + 1)
		}
	}

	let a = null

	const submitCount = e => {
		// получение данных из поля ввода
		e.preventDefault()
		if (!a || a < 1 || a > episode.pages) {
			return
		}
		setCountPage(() => (countPage = a)) // передача данных в переменную для получения данных из базы данных
	}

	return (
		<div className={style.container}>
			<Header />
			<div className={style.buttons}>
				<button onClick={backPage}>Назад</button>
				<h3>
					Страница {countPage} из {episode.pages}
				</h3>
				<button onClick={nextPage}>В перед</button>
			</div>
			<form action=''>
				<input type='number' onChange={e => (a = e.target.value)} />
				<button type='button' onClick={e => submitCount(e)}>
					Перейти
				</button>
			</form>

			<EpisodeMain countPage={countPage} />
			<div className={style.buttons}>
				<button onClick={backPage}>Назад</button>
				<h3>
					Страница {countPage} из {episode.pages}
				</h3>
				<button onClick={nextPage}>В перед</button>
			</div>
		</div>
	)
}

export default Episode
