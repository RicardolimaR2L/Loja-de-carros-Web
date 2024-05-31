import Image from 'next/image';
import { useState, useEffect } from 'react'
import iconeEditar from '../../public/imagens/iconeEditar.png'
import iconeExcluir from '../../public/imagens/iconeExcluir.png'
import InputModal from '../inputModal';
import Botao from '../../componentes/botao';
import { useRouter } from 'next/router';
import CarApiService from '../../services/CarService';

const carApiService = new CarApiService();

export default function CardCarro({ id, src, alt, marca, nome, preco, modelo }) {
  const [token, setToken] = useState();
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState(nome)
  const [brand, setBrand] = useState(marca)
  const [model, setModel] = useState(modelo)
  const [price, setPrice] = useState(preco)
  const [image, setImage] = useState('')

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token)
    }
  }, []);

  const exibirModal = () => {
    setShowModal(true)
  }
  const cancelarEdicao = () => {
    setShowModal(false)
  }

  const imagemSelecionada = (event) => {
    const carPhoto = event.target.files[0];
    setImage(carPhoto)
  }
  const updatedCar = async () => {
    try {
      const data = {
        id,
        name,
        brand,
        model,
        price,
        file: image
      }
      if(!image){

      }
      const carro = data
      const carroData = await carApiService.put('cars/Cars',
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

  const deleteCar = async () => {
    const carroId = id
    try {
      const deletedCar = await carApiService.delete('cars/Cars', { params: { id: carroId } })

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
            <Image src={iconeExcluir} alt={'icone de excluir'} width={18} height={15} onClick={deleteCar} />
          </div>
        }

        <div className="foto-do-carro">
          <Image src={src} alt={alt} width={300} height={190} />
        </div>

        {showModal &&
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
                    aoAlterarValor={e => setName(e.target.value)}
                    valor={name}

                  />
                  <InputModal
                    label={'Marca'}
                    tipo="text"
                    texto="Marca"
                    valor={brand}
                    aoAlterarValor={e => setBrand(e.target.value)}
                  />
                  <InputModal
                    label={'Modelo '}
                    tipo="text"
                    texto="Modelo"
                    aoAlterarValor={e => setModel(e.target.value)}
                    valor={model}
                  />
                  <InputModal
                    label={'Preço'}
                    tipo="Number"
                    texto="preço"
                    aoAlterarValor={e => setPrice(e.target.value)}
                    valor={price}
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
              <div className='botoes' onClick={updatedCar} >
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
