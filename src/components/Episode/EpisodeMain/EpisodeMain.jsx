import GetResAll from '../../../api/GetResAll'
import React from 'react'
import style from './EpisodeMain.module.css'

const EpisodeMain = ({ countPage }) => {
	const [episodes, setEpisode] = React.useState([])

	React.useEffect(() => {
		GetResAll.getEpisode(countPage).then(data => {
			setEpisode(data.results)
		})
	}, [countPage])

	return (
		<div className={style.episodes}>
			{episodes.map(epi => {
				const { id, name, air_date, episode } = epi

				return (
					<div key={id} className={style.episode}>
						<h2>Name: {name}</h2>
						<h3>Air Date: {air_date}</h3>
						<h3>Episode: {episode}</h3>
					</div>
				)
			})}
		</div>
	)
}

export default EpisodeMain
