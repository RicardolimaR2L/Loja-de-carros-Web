    const validarEmail = email => {
    const emailStr = email?.toString()
    return (
      emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.')
    )
  }
  
  const validarSenha = senha => {
    return senha?.toString().length >= 3
  }
  
  
  
  export { validarEmail, validarSenha }