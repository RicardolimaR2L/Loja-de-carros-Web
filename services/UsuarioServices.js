import ApiService from "./ApiService"

export default class UsuarioService extends ApiService {
  async login(credenciais) {
    const { data } = await this.axios.post('/login/Login', credenciais)

    localStorage.setItem('name', data.name)
    localStorage.setItem('email', data.email)
    localStorage.setItem('token', data.token)
  }

  async logout() {
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
  }


  async pesquisar(termoDaPesquisa) {
    return await this.axios.get('/cars/SearchPublicCars?filter=' + termoDaPesquisa);

  }
}
