import api from "./api";
import { Grupo } from "../@types/Grupo";

export const getGrupos = async (): Promise<Grupo[]> => {
  try {
    const response = await api.get<{ docs: Grupo[] }>("/grupo/consultar");
    return response.data.docs;
  } catch (error) {
    throw error;
  }
};
