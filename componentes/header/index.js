import { useRouter } from 'next/router'
import Image from 'next/image'
import InputPesquisa from '../../componentes/inputPesquisa'
import logoCars from '../../public/imagens/logo-BuyCars.jpeg'
import { useState, useEffect } from 'react'

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
              <li>Sobre nós</li>
              <li onClick={cadastrarCarro}>Cadastrar-Carros</li>
              <li className='nome-usuario'>{nome}</li>
            </ul>

          }

        </div>
      
      </div>
    </>
  )
}


