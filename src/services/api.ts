import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import StorageService from "../utils/StorageService";

const getConfigData = async () => {
  try {
    const ipUrl = await StorageService.getItem("ipUrl");
    const porta = await StorageService.getItem("porta");
    const idEmpresa = await StorageService.getItem("idEmpresa");
    const token = await StorageService.getItem("token");

    if (ipUrl && porta && idEmpresa && token) {
      return {
        baseURL: `http://${ipUrl}:${porta}/v2`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          empId: idEmpresa,
        },
      };
    } else {
      throw new Error("Configuração incompleta");
    }
  } catch (error) {
    throw error;
  }
};

const api: AxiosInstance = axios.create({
  baseURL: "", // Inicialmente vazio, será preenchido dinamicamente
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {  
    try {
      const configData = await getConfigData();
      if (configData) {
        config.baseURL = configData.baseURL;
        
        // Convertendo o objeto de headers para AxiosHeaders
        if (config.headers instanceof AxiosHeaders) {
          config.headers.set('Content-Type', configData.headers['Content-Type']);
          config.headers.set('Authorization', configData.headers['Authorization']);
          config.headers.set('empId', configData.headers['empId']);
        }
      }
    } catch (error) {
      //showToast("Erro ao definir configurações de requisição!", 'error');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
