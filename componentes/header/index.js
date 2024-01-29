import { useRouter } from 'next/router'
import Image from 'next/image'
import logoCars from '../../public/imagens/logo-BuyCars.jpeg'

export default function Header() {
  const router = useRouter()

  const irParaModelos = () => {
    router.push('/modelos')
  }
  const irParaSobre = () => {
    router.push('/sobre')
  }
  const irParaLogin = () => {
    router.push('/login')
  }
  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <Image src={logoCars} alt="logo do loja" />
        </div>
        <div className="navegacao-container">
          <nav>
            <ul>
              <li onClick={irParaSobre}>Sobre nós</li>
              <li onClick={irParaModelos}>Modelos</li>
              <li onClick={irParaLogin}>Login</li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

//aqui da para criar uma renderizaçaõ condicioanl pegando o user id e verificando se ele é admin pelo nivel e mostrar cada menu de maneira diferente
// Se o user for admin ele vaiter acesso a tela de excluir carro e todas as outrs operações do sistema
