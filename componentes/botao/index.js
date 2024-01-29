export default function Botao({ tipo = 'button', texto, cor }) {
  return (
    <button type={tipo} className={'botao-padrao'} cor={cor}>
      {texto}
    </button>
  )
}
