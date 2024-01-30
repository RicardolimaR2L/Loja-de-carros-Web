import Image from 'next/image';
import { useState, useEffect } from 'react'
import InputPesquisa from '../../componentes/inputPesquisa';
import InputModal from '../../componentes/inputModal';
import Botao from '../../componentes/botao';
import { useRouter } from 'next/router';
import Header from '../../componentes/header';


export default function CardCarro({ src, alt, marca, nome, preco, modelo }) {
    const [token, setToken] = useState();
    const [mostrarModal, setMostrarModal] = useState(false)
    const [nomeCarro, setNomeCarro] = useState(nome)
    const [marcaCarro, setMarcaCarro] = useState(marca)
    const [modeloCarro, setModeloCarro] = useState(modelo)
    const [precoCarro, setPrecoCarro] = useState(preco)

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

    const carroEditado = () => {
        router.push('/')
        setMostrarModal(false)

    }

    return (
        <div className="container-cadastro">
            <Header />
            <InputPesquisa/>
            <div className="container-principal">
                <span>Cadastrar Novo Veículo</span>


                <div className='formulario-de cadastro'>
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
                            tipo="text"
                            texto="valor"
                            aoAlterarValor={e => setPrecoCarro(e.target.value)}
                            valor={precoCarro}
                        />
                        <div className='upload-foto'>
                            <label htmlFor="foto">Foto:</label>
                            <input
                                type="file"
                                id="foto"
                                name="foto"
                                accept="image/*"
                            />
                        </div>
                    </form>
                </div>
                <div className='botoes' onClick={carroEditado} >
                    <Botao
                        texto={'Cadstrar Veículo'}
                    />
                </div>
            </div>
        </div>
    )
}
