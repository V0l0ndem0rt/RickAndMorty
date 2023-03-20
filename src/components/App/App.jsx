import GetResAll from '../../api/GetResAll'

import React from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import style from './App.module.css'


const App = () => {


  const [character, setCharacter] = React.useState([]) // переменная для получения данных из базы данных

  React.useEffect(() => { // подгрузка данных из базы данных при первом исполнении страницы
    GetResAll.getCharacter(countPage).then(data => {
      setCharacter(data.info)
    })
  }, [])


  let [countPage, setCountPage] = React.useState(1) // переменная для получения данных из базы данных

  const backPage = () => {
    if(countPage === 1) {
      setCountPage(() => countPage = character.pages)
    } else {
      setCountPage(() => countPage - 1)
    }

  }
  const nextPage = () => {
    if(countPage === character.pages) {
      setCountPage(() => countPage = 1)
    } else {
      setCountPage(() => countPage + 1)
    }
  }

  let a = null

  const submitCount = (e) => { // получение данных из поля ввода
    e.preventDefault()
    if (!a || a < 1 || a > character.pages) {
      countPage = ''
      return
    }
    setCountPage(() => countPage = a) // передача данных в переменную для получения данных из базы данных


  }

  return (
    <div className={style.container}>
      <Header />
      <div className={style.buttons}>
        <button onClick={backPage}>Назад</button>
        <h3>Страница {countPage} из {character.pages}</h3>
        <button onClick={nextPage}>В перед</button>
      </div>
      <form >
        <input type="number" onChange={(e) => a = e.target.value} />
        <button type='submit' onClick={e => submitCount(e)} >Перейти</button>
      </form>

      <Main countPage={countPage} />
      <div className={style.buttons}>
        <button onClick={backPage}>Назад</button>
        <h3>Страница {countPage} из {character.pages}</h3>
        <button onClick={nextPage}>В перед</button>
      </div>
    </div>
  )
}

export default App