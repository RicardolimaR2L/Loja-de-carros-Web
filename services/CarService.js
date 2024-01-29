import axios from 'axios'

export default class CarApiService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'
    })

    this.quantidadeRequisicoes = 0
    this.axios.interceptors.request.use(config => {
      this.quantidadeRequisicoes++
      if (this.quantidadeRequisicoes === 1) {
      }
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    })

    this.axios.interceptors.response.use(response => {
      return response
    })
  }

  post(url, data) {
    return this.axios.post(url, data)
  }

  async get(url) {
    return this.axios.get(url)
  }

  put(url, data) {
    return this.axios.put(url, data)
  }
}
