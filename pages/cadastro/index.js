import { useState } from 'react'
import InputModal from '../../componentes/inputModal';
import Botao from '../../componentes/botao';
import { useRouter } from 'next/router';
import Header from '../../componentes/header';
import CarApiService from '../../services/CarService';
import InputPesquisa from '../../componentes/inputPesquisa';

const carApiService = new CarApiService();


 const Cadastro = ()=> {
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')

    const router = useRouter()
    const imagemSelecionada = (event) => {
        const photo = event.target.files[0];
        setImage(photo)
    }
    const cadastrarCarro = async () => {

        try {
            const carroData = await carApiService.post('cars/Cars', {
                name,
                brand,
                model,
                price,
                file: image
            });
            router.push('/')
            setMostrarModal(false)
            console.log('Carro cadastrado com sucesso ')
            console.log(carroData)
            return carroData
        } catch (error) {
            console.log('nao foi possivel cadastrar carro. ' + error)
        }
    }

    return (
        <div className="container-cadastro">
            <Header />
            <InputPesquisa />
            <div className="container-principal">
                <span>Cadastrar Novo Veículo</span>
                <div >
                    <form className='formulario-cadastro'>
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
                            texto="Preço"
                            aoAlterarValor={e => setPrice(e.target.value)}
                            valor={price}
                        />
                        <div className='upload-foto'>
                            <label htmlFor="foto">Foto</label>
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
                <div className='botoes' onClick={cadastrarCarro} >
                    <Botao
                        texto={'Cadastrar'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Cadastro;