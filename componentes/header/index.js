import { useRouter } from 'next/router'
import Image from 'next/image'
import logoCars from '../../public/imagens/logo-BuyCars.jpeg'
import { useState, useEffect } from 'react'
import UsuarioService from '../../services/UsuarioServices'

const usuarioService = new UsuarioService();

export default function Header() {
  const [nome, setNome] = useState();


  useEffect(() => {
    const nomeSalvo = localStorage.getItem('nome');

    if (nomeSalvo) {
      setNome(nomeSalvo)
    }
  }, [])
  const router = useRouter()
  const cadastrarCarro = () => {
    router.push('/cadastro')
  }
  const irParaLogin = () => {
    router.push('/login')
  }
  const irparaHome = () => {
    router.push('/')
  }

  const logout = async () => {
    await usuarioService.logout()
    router.push('/')
    router.reload()

  }


  return (
    <>
      <div className="header-container">
        <div className="logo-container" onClick={irparaHome}>
          <Image src={logoCars} alt="logo do loja" />
        </div>
        <div className="navegacao-container">
          {!nome ? <nav>
            <ul>
              <li>Sobre nós</li>
              <li >Modelos</li>
              <li onClick={irParaLogin}>Login</li>
            </ul>

          </nav> :
            <ul>
              <li className='nome-usuario'>{nome}</li>
              <li onClick={cadastrarCarro} className='cadastrar'> Cadastrar-Carros</li>
              <li onClick={logout} className='logout'>Sair</li>
            </ul>

          }

        </div>
      </div>
    </>
  )
}


