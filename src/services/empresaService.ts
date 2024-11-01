import { Empresa } from "@/@types/Empresa";
import api from "./api";
import axios from "axios";

export const getEmpresa = async (): Promise<Empresa[]> => {
  try {
    const response = await api.get(`/empresa`);
    return response.data.docs as Empresa[];
  } catch (error) {
    throw error;
  }
};

export const getEmpresaPublica = async (url: string): Promise<Empresa[]> => {
  try {
    const response = await axios.get(`http://${url}/v2/publico/empresa`);
    return response.data.docs as Empresa[];
  } catch (error) {
    throw error;
  }
};
