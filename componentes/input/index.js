import Image from 'next/image'

export default function Input ({
  imagem,
  tipo,
  texto,
  valor = '',
  aoAlterarValor
}) {
  return (
    <div className="input-container">
      <div className="input-div">
        <Image
          src={imagem}
          alt="imagem do campo"
          className="icone-input"
          width={20}
          height={20}
        />
        <input
          type={tipo}
          placeholder={texto}
          value={valor}
          onChange={aoAlterarValor}
        />
      </div>
    </div>
  )
}
