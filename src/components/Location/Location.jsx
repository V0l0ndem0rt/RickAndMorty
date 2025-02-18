import React from 'react'
import GetResAll from '../../api/GetResAll'
import Header from '../Header/Header'
import style from './Location.module.css'
import LocationMain from './LocationMain/LocationMain'

const Location = () => {
	const [location, setLocation] = React.useState([]) // переменная для получения данных из базы данных
	let [countPage, setCountPage] = React.useState(1)

	React.useEffect(() => {
		// подгрузка данных из базы данных при первом исполнении страницы
		GetResAll.getLocation(countPage).then(data => {
			setLocation(data.info)
		})
	}, [countPage])

	const backPage = () => {
		if (countPage === 1) {
			setCountPage(() => (countPage = location.pages))
		} else {
			setCountPage(() => countPage - 1)
		}
	}

	const nextPage = () => {
		if (countPage === location.pages) {
			setCountPage(() => (countPage = 1))
		} else {
			setCountPage(() => countPage + 1)
		}
	}

	let a = null

	const submitCount = e => {
		// получение данных из поля ввода
		e.preventDefault()
		if (!a || a < 1 || a > location.pages) {
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
					Страница {countPage} из {location.pages}
				</h3>
				<button onClick={nextPage}>В перед</button>
			</div>
			<form action=''>
				<input type='number' onChange={e => (a = e.target.value)} />
				<button type='button' onClick={e => submitCount(e)}>
					Перейти
				</button>
			</form>

			<LocationMain countPage={countPage} />
			<div className={style.buttons}>
				<button onClick={backPage}>Назад</button>
				<h3>
					Страница {countPage} из {location.pages}
				</h3>
				<button onClick={nextPage}>В перед</button>
			</div>
		</div>
	)
}

export default Location
