import { useState } from 'react'
import InputModal from '../../componentes/inputModal';
import Botao from '../../componentes/botao';
import { useRouter } from 'next/router';
import Header from '../../componentes/header';
import CarApiService from '../../services/CarService';
import InputPesquisa from '../../componentes/inputPesquisa';

const carApiService = new CarApiService();


export default function Cadastro({  marca, nome, preco, modelo }) {

    const [nomeCarro, setNomeCarro] = useState('')
    const [marcaCarro, setMarcaCarro] = useState('')
    const [modeloCarro, setModeloCarro] = useState('')
    const [precoCarro, setPrecoCarro] = useState('')
    const [image, setImagem] = useState('')

    const router = useRouter()
        
   

    const imagemSelecionada = (event) => {
        const fotoCarro = event.target.files[0];
        setImagem(fotoCarro)
    }
    const cadastrarCarro = async () => {

        try {
            const carroData = await carApiService.post('/Carros', {
                nomeCarro,
                marcaCarro,
                modeloCarro,
                precoCarro,
                file: image
            });
            router.push('/')
            setMostrarModal(false)
            console.log('Carro cadastrado com sucesso ')
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
                            texto="Preço"
                            aoAlterarValor={e => setPrecoCarro(e.target.value)}
                            valor={precoCarro}
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
                        texto={'Cadastrar Veículo'}
                    />
                </div>
            </div>
        </div>
    )
}
