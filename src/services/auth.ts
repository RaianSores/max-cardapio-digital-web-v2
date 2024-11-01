import StorageService from "@/utils/StorageService";
import api from "./api";

export async function authenticate() {
    try {
      const response = await api.get("/auth");
      if (response.data.token) {
        await StorageService.setItem("token", response.data.token);
      }
    } catch (error) {
      console.error("Erro de autenticação:", error);
    }
  }
  