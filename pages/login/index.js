import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Input from '../../componentes/input/index'
import Botao from '../../componentes/botao/index'
import emailIcon from '../../public/imagens/envelope.svg'
import logoCars from '../../public/imagens/logo-BuyCars.jpeg'
import senhaIcon from '../../public/imagens/chave.svg'
import { validarEmail, validarSenha } from '../../validadores-login/validadores'
import UsuarioService from '../../services/UsuarioServices'


const usuarioService = new UsuarioService();

 const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setsenha] = useState('')
  const [estaSubmetendo, setEstasubmetendo] = useState(false)
  const router = useRouter()

  const validarFormulario = () => {
    return (
      validarEmail(email)
      && validarSenha(password)
    );
  };

  const aoSubmeter = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    setEstasubmetendo(true)
    try {

      await usuarioService.login({
        login: email,
      password
      })
      router.push('/')
    } catch (e) {
      console.log(e)
       alert('erro ao realizar o login. ' + e.response?.data?.erro);
    }

    setEstasubmetendo(false)
  }
  return (
    <section className={'login-container'}>
      <div className="logo-container">
        <Image src={logoCars} alt="logo do loja" />
      </div>
      <div className="formulario-login">
        <form onSubmit={aoSubmeter}>
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
            valor={password}
          />
          <div className="botao-container">
            <Botao
              texto="Login" tipo="submit" desabilitado={!validarFormulario() || estaSubmetendo}/>
          </div>
        </form>
      </div>
    </section>
  )
}
export default Login