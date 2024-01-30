import Image from 'next/image'

export default function InputModal({
  tipo,
  texto,
  valor = '',
  aoAlterarValor,
  label
}) {
  return (
    <div className="input-container">
      <div className="input-modal">
      <div className="div-label">
        <label htmlFor="label" id="label">
          {label}
          <span className="required">*</span>
        </label>
        </div>
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
