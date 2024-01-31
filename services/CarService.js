import ApiService from './ApiService'

export default class CarApiService extends ApiService {
  post(url, data) {
    const bodyFormData = new FormData();
    bodyFormData.append("id", data.id)
    bodyFormData.append("file", data.file)
    bodyFormData.append("nome", data.nomeCarro)
    bodyFormData.append("marca", data.marcaCarro)
    bodyFormData.append("modelo", data.modeloCarro)
    bodyFormData.append("preco", data.precoCarro)
    return this.axios.post(url, bodyFormData, {

      headers: { 'content-type': 'multipart/form-data' }
    })
  }

  async get(url) {
    return this.axios.get(url)
  }

  async put(url, data) {
    console.log(data)
    const bodyFormData = new FormData();
    bodyFormData.append("id", data.id)
    bodyFormData.append("file", data.file)
    bodyFormData.append("nome", data.nomeCarro)
    bodyFormData.append("marca", data.marcaCarro)
    bodyFormData.append("modelo", data.modeloCarro)
    bodyFormData.append("preco", data.precoCarro)
    return this.axios.put(url, bodyFormData, {

      headers: { 'content-type': 'multipart/form-data' }
    })
  }

  delete(url, data) {
    return this.axios.delete(url, data)
  }
 
}