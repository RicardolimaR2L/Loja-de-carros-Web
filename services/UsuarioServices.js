import ApiService from "./ApiService"

export default class UsuarioService extends ApiService {
  async login(credenciais) {
    const { data } = await this.axios.post('/Login', credenciais)

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
