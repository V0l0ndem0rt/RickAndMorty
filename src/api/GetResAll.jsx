
import axios from 'axios';

 const GetResAll= {
  async getCharacter(countPage){
    const api = 'https://rickandmortyapi.com/api'

    const {data} = await axios.get(`${api}/character?page=${countPage}`)
    return data
  },
  async getCharacterItem(id){
    const api = 'https://rickandmortyapi.com/api'

    const {data} = await axios.get(`${api}/character/${id}`)
    return data
  },
  async getLocation(countPage){
    const api = 'https://rickandmortyapi.com/api'

    const {data} = await axios.get(`${api}/location?page=${countPage}`)
    return data
  },
  async getEpisode(countPage){
    const api = 'https://rickandmortyapi.com/api'

    const {data} = await axios.get(`${api}/episode?page=${countPage}`)
    return data
  },
 }
export default GetResAll