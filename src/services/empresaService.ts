import axios from "axios";

export const getEmpresa = async () => {
  try {
    const response = await axios.get(`/v2/empresa`);
    return response.data.docs;
  } catch (error) {
    throw error;
  }
};
