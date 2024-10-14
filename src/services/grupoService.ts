import api from "./api";
import { Grupo } from "../@types/Grupo";

export const getGrupos = async (): Promise<Grupo[]> => {
  try {
    const response = await api.get<{ docs: Grupo[] }>("/grupo");
    return response.data.docs;
  } catch (error) {
    throw error;
  }
};
