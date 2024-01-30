import Header from '../../componentes/header'
import InputPesquisa from '../../componentes/inputPesquisa'
import Carros from '../../componentes/carros'
import { useEffect, useState } from 'react'
import CarApiService from '../../services/CarService'

const carroApiService = new CarApiService()

export default function Home({ tipo, texto }) {
  const [carroPesquisado, setCarroPesquisado] = useState('')
  const [carroEncontrado, setCarroEncontrado] = useState('')
  const aoPesquisar = e => {
    setCarroPesquisado(e.target.value)
  }

  useEffect(() => {
    async function getCarros() {
      try {
        const response = await carroApiService.get('/endpointCarroPublico')
        setCarroEncontrado(response)
      } catch (error) {
        console.error('Erro ao buscar carros públicos:', error)
      }
    }
    getCarros()
  }, [])

  return (
    <>
      <div className="home-container">
        <Header />
        <InputPesquisa
          type={tipo}
          placeholder={texto}
          valor={carroPesquisado}
          aoAlterarValor={aoPesquisar}
        />
        <div className="container-principal">
          <Carros
          carro={carroEncontrado} />
        </div>
      </div>
    </>
  )
}
