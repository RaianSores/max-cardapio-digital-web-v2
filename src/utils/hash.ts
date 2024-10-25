export const encryptBase64 = (data: string): string => {
  // Certifica que o número da mesa tem sempre três dígitos
  const mesaFormatted = data.padStart(3, '0');

  // Gera uma string aleatória de 9 caracteres
  const randomString = Math.random().toString(36).substring(2, 11);
  
  // Insere o número da mesa (data) a partir da 5ª posição
  const fullString = randomString.substring(0, 4) + mesaFormatted + randomString.substring(4);

  // Converte para base64
  const encrypted = Buffer.from(fullString).toString('base64');

  // Retorna a string criptografada completa
  return encrypted;
};


export const decryptBase64 = (hash: string): string | null => {
  try {
    // Descriptografa a string base64
    const decrypted = Buffer.from(hash, 'base64').toString('ascii');

    // Extrai os três dígitos a partir da 5ª posição
    const mesaNumber = decrypted.substring(4, 7); // Pega três caracteres da 5ª posição

    // Retorna o número da mesa
    return mesaNumber;
  } catch (error) {
    console.error("Erro ao descriptografar o hash:", error);
    return null;
  }
};


