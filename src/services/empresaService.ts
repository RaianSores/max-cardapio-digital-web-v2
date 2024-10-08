import axios from "axios";
import api from "./api";

export const getEmpresa = async () => {
  try {
    const response = await axios.get(`http://192.168.0.231/v2/empresa/consultar`);
    return response.data.docs;
  } catch (error) {
    throw error;
  }
};
