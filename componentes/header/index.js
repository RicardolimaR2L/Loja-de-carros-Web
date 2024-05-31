import { useRouter } from 'next/router'
import Image from 'next/image'
import logoCars from '../../public/imagens/logo-BuyCars.jpeg'
import { useState, useEffect } from 'react'
import UsuarioService from '../../services/UsuarioServices'

const usuarioService = new UsuarioService();

export default function Header() {
  const [name, setName] = useState();


  useEffect(() => {
    const nomeSalvo = localStorage.getItem('name');

    if (nomeSalvo) {
      setName(nomeSalvo)
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
    
    router.push('/');

  }


  return (
    <>
      <div className="header-container">
        <div className="logo-container" onClick={irparaHome}>
          <Image src={logoCars} alt="logo do loja" />
        </div>
        <div className="navegacao-container">
          {!name ? <nav >
            <ul className='menu-deslogado'>
              <li onClick={irParaLogin}>Login</li>
            </ul>

          </nav> :
            <ul>
              <li className='nome-usuario'>{name}</li>
              <li onClick={cadastrarCarro} className='cadastrar'>Cadastrar-Veículo</li>
              <li onClick={logout} className='logout'>Sair</li>
            </ul>

          }

        </div>
      </div>
    </>
  )
}


