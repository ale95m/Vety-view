export default {
  async setTheme (axios, id, data) {
    return await axios.put('/workers/setTheme/' + id, data)
  }
}
