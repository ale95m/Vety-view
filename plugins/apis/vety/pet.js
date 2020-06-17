export default {
  async create (axios, data) {
    return await axios.post('/pets/', data)
  },
  async getSpecies (axios) {
    return await axios.get('/pets/species')
  }
}
