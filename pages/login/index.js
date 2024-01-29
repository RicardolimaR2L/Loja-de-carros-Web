import { useState } from 'react'
import Image from 'next/image'
import Input from '../../componentes/input/index'
import Botao from '../../componentes/botao/index'
import emailIcon from '../../public/imagens/envelope.svg'
import logoCars from '../../public/imagens/logo-BuyCars.jpeg'
import senhaIcon from '../../public/imagens/chave.svg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setsenha] = useState('')

  return (
    <section className={'login-container'}>
      <div className="logo-container">
        <Image src={logoCars} alt="logo do loja" />
      </div>
      <div className="formulario-login">
        <form onSubmit={''}>
          <Input
            imagem={emailIcon}
            texto="E-mail"
            tipo="email"
            aoAlterarValor={e => setEmail(e.target.value)}
            valor={email}
          />
          <Input
            imagem={senhaIcon}
            texto="Senha"
            tipo="password"
            aoAlterarValor={e => setsenha(e.target.value)}
            valor={senha}
          />
          <div className="botao-container">
            <Botao texto="Login" tipo="submit" />
          </div>
        </form>
      </div>
    </section>
  )
}
