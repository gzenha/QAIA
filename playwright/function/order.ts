export function gerarCodigoPedido() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const prefix = "VLO";
  
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // 4 dígitos
  
    return `${prefix}-${randomLetter}${randomNumbers}`;
  }
  
  const order = gerarCodigoPedido();