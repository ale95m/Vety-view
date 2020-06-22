export default {
  async getPets (axios, data) {
    return await axios.get('/petsRoute/get', data)
  },
  async getSpecies (axios) {
    return await axios.get('/species')
  },
  async create (axios, data) {
    return await axios.post('/pets', data)
  },
  async update (axios, data) {
    return await axios.put('/pets/' + data.id, data)
  },
  async remove (axios, data) {
    return await axios.delete('/pets/' + data.id, data)
  }
}
