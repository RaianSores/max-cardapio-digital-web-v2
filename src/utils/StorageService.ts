class StorageService {
    // Obter item do localStorage
    static async getItem(key: string): Promise<string | null> {
      return localStorage.getItem(key);
    }
  
    // Definir item no localStorage
    static async setItem(key: string, value: string): Promise<void> {
      localStorage.setItem(key, value);
    }
  
    // Remover item do localStorage
    static async removeItem(key: string): Promise<void> {
      localStorage.removeItem(key);
    }
  
    // Limpar todo o localStorage
    static async clear(): Promise<void> {
      localStorage.clear();
    }
  }
  
  export default StorageService;
  