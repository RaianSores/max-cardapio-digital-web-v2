import api from "./api";
import { Grupo } from "../@types/Grupo";

export const getGrupos = async (): Promise<Grupo[]> => {
  try {
    const response = await api.get<Grupo[]>("/food/grupo/consultar");    
    console.log(JSON.stringify(response, undefined, 2))
    return response.data;
  } catch (error) {
    throw error;
  }
};
