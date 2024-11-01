export const encryptBase64Mesa = (data: string): string => {
  const mesaFormatted = data.padStart(3, "0");
  const randomString = Math.random().toString(36).substring(2, 11);
  const fullString = randomString.substring(0, 4) + mesaFormatted + randomString.substring(4);
  return Buffer.from(fullString).toString("base64");
};

export const encryptBase64Porta = (data: string): string => {
  const portaFormatted = data.padStart(4, "0");
  const randomString = Math.random().toString(36).substring(2, 11);
  const fullString = randomString.substring(0, 4) + portaFormatted + randomString.substring(4);
  return Buffer.from(fullString).toString("base64");
};

export const encryptBase64Url = (data: string): string => {
  const randomString = Math.random().toString(36).substring(2, 11);
  const fullString = randomString.substring(0, 4) + data + randomString.substring(4);
  return Buffer.from(fullString).toString("base64");
};

export const decryptBase64 = (hash: string, length: number = 3): string | null => {
  try {
    const decrypted = Buffer.from(hash, "base64").toString("ascii");
    return decrypted.substring(4, 4 + length);
  } catch (error) {
    return null;
  }
};
