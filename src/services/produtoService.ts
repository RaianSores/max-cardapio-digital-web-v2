import api from './api';
import { IProduto } from '../@types/Produto';

export const getProdutos = async (idGrupo: number): Promise<IProduto[]> => {
  try {
    const response = await api.get<{ docs: IProduto[] }>(
      `/produto?grupo_id=${idGrupo}`,
    );
    return response.data.docs;
  } catch (error) {
    throw error;
  }
};

export const getProdutosPromocoes = async (): Promise<IProduto[]> => {
  try {
    const response = await api.get<{ docs: IProduto[] }>(
      `/promocoes`,
    );
    return response.data.docs;
  } catch (error) {
    throw error;
  }
};
