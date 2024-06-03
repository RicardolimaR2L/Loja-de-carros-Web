import Header from '../../componentes/header'
import InputPesquisa from '../../componentes/inputPesquisa'
import Carros from '../../componentes/carros'
import { useEffect, useState } from 'react'
import CarApiService from '../../services/CarService'

const carApiService = new CarApiService()

export default function Home() {
  const [carros, setCarros] = useState([])
  const [carrosIniciais, setCarrosIniciais] = useState([])
  const [mensagemDeErro, setMensagemDeErro] = useState(''); 
  useEffect(() => {
    async function getCarros() {
      try {
        const response = await carApiService.get('/cars/PublicCars')
        setCarros(response.data)
        setCarrosIniciais(response.data) 
      } catch (error) {
        console.error('Erro ao buscar carros públicos:', error)
        setMensagemDeErro('Erro ao carregar os carros.');
      }
    }
    getCarros()
  }, [])

  const aoPesquisarCallback = (carrosEncontrados) => {
    setCarros(carrosEncontrados);
    if (carrosEncontrados.length === 0) {
      setMensagemDeErro('Nenhum carro encontrado para a busca realizada.');
    } else {
      setMensagemDeErro('');
    }
  };

  const aoLimparCallback = () => {
    setCarros(carrosIniciais);
    setMensagemDeErro(''); 
  };

  return (
    <div className="home-container">
      <Header />
      <InputPesquisa tipo="text" aoPesquisarCallback={aoPesquisarCallback} aoLimparCallback={aoLimparCallback} />
      <div className="container-principal">
        {mensagemDeErro ? (
          <p className="mensagem-erro">{mensagemDeErro}</p> 
        ) : (
          <Carros carros={carros} />
        )}
      </div>
    </div>
  )
}
