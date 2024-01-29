import Image from 'next/image'
import React from 'react'

export default function CardCarro({ src, alt, marca, modelo, preco }) {
  return (
    <div className="container-card">
      <div className="card">
        <div className="foto-do-carro">
          <Image src={src} alt={alt} width={370} height={200} />
        </div>
        <div className="informacoes">
          <p className="marca">
            <span>{marca} </span>
            <span>{modelo}</span>
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
