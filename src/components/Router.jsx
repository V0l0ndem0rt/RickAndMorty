import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App/App'
import Hero from './App/Hero/Hero'
import Episode from './Episode/Episode'
import Location from './Location/Location'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/hero/:id' element={<Hero />} />

				<Route path='/location' element={<Location />} />
				<Route path='/episode' element={<Episode />} />
				<Route path='*' element={<h1>Not found</h1>} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
