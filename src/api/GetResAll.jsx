import axios from 'axios'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

// Создаем экземпляр axios с базовой конфигурацией
const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Простой кэш для хранения результатов запросов
const cache = new Map()

// Время жизни кэша в миллисекундах (5 минут)
const CACHE_TTL = 5 * 60 * 1000

const handleApiError = error => {
	if (error.response) {
		throw new Error(
			`API Error: ${error.response.status} - ${
				error.response.data.message || 'Unknown error'
			}`
		)
	} else if (error.request) {
		throw new Error('Network Error: No response received from server')
	} else {
		throw new Error(`Error: ${error.message}`)
	}
}

const getCacheKey = (endpoint, params) => {
	return `${endpoint}${params ? `?${JSON.stringify(params)}` : ''}`
}

const GetResAll = {
	async fetchWithCache(endpoint, params = null) {
		const cacheKey = getCacheKey(endpoint, params)
		const cached = cache.get(cacheKey)

		if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
			return cached.data
		}

		try {
			const { data } = await apiClient.get(endpoint, { params })
			cache.set(cacheKey, {
				data,
				timestamp: Date.now(),
			})
			return data
		} catch (error) {
			handleApiError(error)
		}
	},

	async getCharacter(countPage) {
		return this.fetchWithCache('/character', { page: countPage })
	},

	async getCharacterItem(id) {
		return this.fetchWithCache(`/character/${id}`)
	},

	async getLocation(countPage) {
		return this.fetchWithCache('/location', { page: countPage })
	},

	async getEpisode(countPage) {
		return this.fetchWithCache('/episode', { page: countPage })
	},

	// Метод для очистки кэша
	clearCache() {
		cache.clear()
	},
}

export default GetResAll
