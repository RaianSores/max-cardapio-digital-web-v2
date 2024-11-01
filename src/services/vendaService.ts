import api from "./api";
import { Venda } from "../@types/Venda";

export const sendSale = async (venda: Venda): Promise<Venda> => {
  try {
    const response = await api.post(`venda`, venda);
    if (response.status === 201) {
      return response.data as Venda;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getSale = async (numMesa: number): Promise<Venda[]> => {
  try {
    const response = await api.get(`/venda`, {
      params: { numMesa },
    });
    if (response.status === 200) {
      return response.data.docs as Venda[];
    } else {
      throw [];
    }
  } catch (error) {
    throw error;
  }
};

export const solicitarConta = async (id: number, requestAccount: boolean): Promise<{ mensagem: string }> => {
  try {
    const response = await api.put(`/venda/solicitaconta/${id}/solicitaconta`, null, {
      params: {
        solicitaconta: requestAccount
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Erro ao solicitar conta.");
    }
  } catch (error) {
    throw error;
  }
};
