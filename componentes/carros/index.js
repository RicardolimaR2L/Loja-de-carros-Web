import { useEffect, useState } from 'react';
import CardCarro from '../cardCarro';

export default function Carros({ carro }) {
  const [carrosOrdenados, setCarrosOrdenados] = useState([]);

  useEffect(() => {
    if (carro && carro.data) {
      const listaDeCarros = [...carro.data];
      listaDeCarros.sort((a, b) => a.preco - b.preco);
      setCarrosOrdenados(listaDeCarros);
   
    }

  }, [carro]);


  return (
    <div className="container-carros">
      <div className="grid-carros">
        {carrosOrdenados.map((carro, index) => (
          <CardCarro
            id={carro._id}
            key={index}
            className="item-carro"
            src={carro.foto}
            altText={'card Carro'}
            marca={carro.marca}
            nome={carro.nome}
            modelo={carro.modelo}
            preco={carro.preco}
          />
        ))}
      </div>
    </div>
  );
}
