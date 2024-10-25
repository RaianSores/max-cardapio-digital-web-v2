import { Empresa } from "@/@types/Empresa";
import api from "./api";

export const getEmpresa = async (): Promise<Empresa[]> => {
  try {
    const response = await api.get(`/empresa`);
    return response.data.docs as Empresa[];
  } catch (error) {
    throw error;
  }
};
