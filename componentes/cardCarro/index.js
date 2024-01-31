import Image from 'next/image';
import { useState, useEffect } from 'react'
import iconeEditar from '../../public/imagens/iconeEditar.png'
import iconeExcluir from '../../public/imagens/iconeExcluir.png'
import InputModal from '../inputModal';
import Botao from '../../componentes/botao';
import { useRouter } from 'next/router';
import CarApiService from '../../services/CarService';


const carApiService = new CarApiService();


export default function CardCarro({ id, src, alt, marca, nome, preco, modelo, label }) {
  const [token, setToken] = useState();
  const [mostrarModal, setMostrarModal] = useState(false)
  const [nomeCarro, setNomeCarro] = useState(nome)
  const [marcaCarro, setMarcaCarro] = useState(marca)
  const [modeloCarro, setModeloCarro] = useState(modelo)
  const [precoCarro, setPrecoCarro] = useState(preco)
  const [image, setImagem] = useState('')

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token)
    }
  }, []);

  const exibirModal = () => {
    setMostrarModal(true)
  }
  const cancelarEdicao = () => {
    setMostrarModal(false)
  }

  const imagemSelecionada = (event) => {
    const fotoCarro = event.target.files[0];
    setImagem(fotoCarro)
  }
  const carroEditado = async () => {

    try {
      const data = {
        id,
        nomeCarro,
        marcaCarro,
        modeloCarro,
        precoCarro,
        file: image
      }
      const carro = data
      console.log(data)
      const carroData = await carApiService.put('/Carros',
        data
      );
      router.push('/')
      router.reload()
      setMostrarModal(false)
      console.log('Carro Alterado com sucesso ')
      return carroData
    } catch (error) {
      console.log('nao foi possivel alterar carro. ' + error)
    }
  }

  const deletarCarro = async () => {
    const carroId = id
    try {
      const carroExcluido = await carApiService.delete("/Carros", { params: { id: carroId } })

      router.push('/')
      router.reload()
    } catch (error) {
      console.log('Ocorreu um erro ao deletar carro  ', error)
    }
  }




  return (
    <div className="container-card">
      <div className="card">

        {token &&
          <div className='acoes-card'>
            <Image src={iconeEditar} alt={'icone de editar'} width={20} height={20} onClick={exibirModal} />
            <Image src={iconeExcluir} alt={'icone de excluir'} width={18} height={15} onClick={deletarCarro} />
          </div>
        }

        <div className="foto-do-carro">
          <Image src={src} alt={alt} width={300} height={190} />
        </div>

        {mostrarModal &&
          <div className="modal">
            <div className='fechar-modal'>
              <span onClick={cancelarEdicao}>x</span>
            </div>
            <span>Editar Veículo</span>

            <div className="modal-container">
              <div className='formulario-editar'>
                <form>
                  <InputModal
                    label={'Nome '}
                    tipo="text"
                    texto="Nome"
                    aoAlterarValor={e => setNomeCarro(e.target.value)}
                    valor={nomeCarro}

                  />
                  <InputModal
                    label={'Marca'}
                    tipo="text"
                    texto="Marca"
                    valor={marcaCarro}
                    aoAlterarValor={e => setMarcaCarro(e.target.value)}
                  />
                  <InputModal
                    label={'Modelo '}
                    tipo="text"
                    texto="Modelo"
                    aoAlterarValor={e => setModeloCarro(e.target.value)}
                    valor={modeloCarro}
                  />
                  <InputModal
                    label={'Preço'}
                    tipo="Number"
                    texto="preço"
                    aoAlterarValor={e => setPrecoCarro(e.target.value)}
                    valor={precoCarro}
                  />
                  <div className='upload-foto'>
                    <label htmlFor="foto">Foto:</label>
                    <span className="required">*</span>
                    <input
                      type="file"
                      id="foto"
                      name="foto"
                      accept="image/*"
                      onChange={imagemSelecionada}
                    />

                  </div>
                </form>
              </div>
              <div className='botoes' onClick={carroEditado} >
                <Botao
                  texto={'salvar alterações'}
                />

              </div>
            </div>
          </div>
        }

        <div className="informacoes">
          <p className="marca">
            <span>{marca} </span>
            <span>{nome}</span>
            <strong>{modelo}</strong>
            </p>
              <div className="linha-divisoria"></div>
              <p className="preco">
                <span>
                  R$ <strong>{preco}</strong>
                </span>
              </p>
            </div>
        </div>
      </div>
      )
}
