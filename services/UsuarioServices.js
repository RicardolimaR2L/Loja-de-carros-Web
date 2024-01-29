import CarroApiService from './CarService'

export default class UsuarioService extends CarroApiService {
  async login(credenciais) {
    const { data } = await this.post('/login', credenciais)

    localStorage.setItem('nome', data.nome)
    localStorage.setItem('email', data.email)
    localStorage.setItem('token', data.token)

    const usuario = await this.get('/endpointCarroPublico')
    localStorage.setItem('id', usuario.data._id)
  }

  async cadastro(dados) {
    return this.post('/cadastro', dados)
  }

  estaAutenticado() {
    return localStorage.getItem('token') !== null
  }
  async getcar() {
    return this.get('endpointCarroPublico/')
  }

  async obterPerfil(idUsuario) {
    return this.get(`/pesquisa?id=${idUsuario}`)
  }

  async alternarSeguir(idUsuario) {
    return this.put(`/seguir?id=${idUsuario}`)
  }
}
