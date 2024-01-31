import CarroApiService from './CarService'

export default class UsuarioService extends CarroApiService {
  async login(credenciais) {
    const { data } = await this.post('/Login', credenciais)

    localStorage.setItem('nome', data.nome)
    localStorage.setItem('email', data.email)
    localStorage.setItem('token', data.token) 
  } 

  async logout(){
    localStorage.removeItem('nome')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
  }
  }
