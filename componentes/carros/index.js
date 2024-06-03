import { useEffect, useState } from 'react';
import CardCarro from '../cardCarro';

export default function Carros({ carros }) {
  const [carrosOrdenados, setCarrosOrdenados] = useState([]);

  useEffect(() => {
    if (carros) {
      const listaDeCarros = [...carros];
      listaDeCarros.sort((a, b) => a.price - b.price);
      setCarrosOrdenados(listaDeCarros);
    }
  }, [carros]);

  return (
    <div className="container-carros">
      <div className="grid-carros">
        {carrosOrdenados.map((carro, index) => (
          <CardCarro
            id={carro._id}
            key={index}
            className="item-carro"
            src={carro.photo}
            altText={'card Carro'}
            marca={carro.brand}
            nome={carro.name}
            modelo={carro.model}
            preco={carro.price}
          />
        ))}
      </div>
    </div>
  );
}
