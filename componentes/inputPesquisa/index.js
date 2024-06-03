import Image from 'next/image'
import pesquisaIcon from '../../public/imagens/iconePesquisa.svg'
import { useState } from 'react'
import UsuarioService from '../../services/UsuarioServices'

export default function InputPesquisa({ tipo, aoPesquisarCallback, aoLimparCallback }) {
  const usuarioService = new UsuarioService();

  const [termoPesquisado, setTermoPesquisado] = useState('')
  const [mensagemErro, setMensagemErro] = useState('');

  const altualizarTermoPesquisado = (e) => {
    const novoTermo = e.target.value;
    setTermoPesquisado(novoTermo);
    if (novoTermo === '') {
      aoLimparCallback(); 
      setMensagemErro(''); 
    }
  };

  const aoPesquisar = async () => {
    try {
      const { data } = await usuarioService.pesquisar(termoPesquisado);
      if (data.length === 0) {
        aoPesquisarCallback([]);
      } else {
        setMensagemErro('');
        aoPesquisarCallback(data); 
      }
    } catch (error) {
      console.log(error);
      alert((error?.response?.data?.erro));
    }
  };

  const limparPesquisa = () => {
    setTermoPesquisado('');
    setMensagemErro(''); 
    aoLimparCallback(); 
    
  };

  return (
    <div className="inputPesquisa-container">
      <div className="input">
        <input
          type={tipo}
          placeholder=" Buscar por carros "
          value={termoPesquisado}
          onChange={altualizarTermoPesquisado}
        />
        {termoPesquisado && (
          <button className='botao-limpar' onClick={limparPesquisa}></button>
        )}
      </div>
      <Image
        src={pesquisaIcon}
        alt="icone de pesquisa"
        className="icone-pesquisa"
        width={25}
        height={25}
        onClick={aoPesquisar}
      />
      {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}
    </div>
  )
}
