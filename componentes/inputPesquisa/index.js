import Image from 'next/image'
import pesquisaIcon from '../../public/imagens/iconePesquisa.svg'

export default function InputPesquisa({
  tipo,
  texto,
  valor = '',
  aoAlterarValor,
  onChange
}) {
  const pesquisarCarro = () => {
    console.log('clicou aqui')
  }

  return (
    <div className="inputPesquisa-container">
      <div className="input">
        <input
          type={tipo}
          placeholder={' Buscar por carros '}
          value={valor}
          onChange={aoAlterarValor}
        />
      </div>
      <Image
        onClick={pesquisarCarro}
        src={pesquisaIcon}
        alt="icone de pesquisa"
        className="icone-pesquisa"
        width={25}
        height={25}
      />
    </div>
  )
}
