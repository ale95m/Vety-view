export default {
  async getClients (axios) {
    return await axios.get('/clients')
  },
  async create (axios, data) {
    return await axios.post('/clients', data)
  },
  async update (axios, data) {
    return await axios.put('/clients/' + data.id, data)
  },
  async remove (axios, data) {
    return await axios.delete('/clients/' + data.id, data)
  }
}
