import api from "./api";
import { IRequestAccount, Venda } from "../@types/Venda";

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

export const getSale = async (id: number | undefined, numMesa: number): Promise<Venda[]> => {
  try {
    const response = await api.get(`/venda`, {
      params: { id, numMesa },
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


export const solicitarConta = async (
  venda: IRequestAccount
): Promise<IRequestAccount> => {
  try {
    const response = await api.post("/food/venda/solicitaConta", venda);
    if (response.status === 200) {
      return response.data as IRequestAccount;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
