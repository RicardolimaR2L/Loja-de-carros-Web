import CarroApiService from './CarService'

export default class UsuarioService extends CarroApiService {
  async login(credenciais) {
    const { data } = await this.post('/endpointLogin', credenciais)

    localStorage.setItem('nome', data.nome)
    localStorage.setItem('email', data.email)
    localStorage.setItem('token', data.token) 
  } 
  }
