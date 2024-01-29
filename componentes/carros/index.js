import argoImg from '../../public/imagens/argo.jpg'
import CardCarro from '../cardCarro'

export default function Carros({ carro }) {
  return (
    <>
      <div className="container-carros">
        <div className="grid-carros">
          {carro &&
            carro.data.map(carro => (
              <CardCarro
                className="item-carro"
                src={carro.foto}
                altText={'card Carro'}
                marca={carro.marca}
                modelo={carro.modelo}
                preco={carro.preco}
              />
            ))}
        </div>
      </div>
    </>
  )
}
