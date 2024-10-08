export interface Grupo {
  id: number;
  nome: string;
  foto: string | null; // A foto pode ser null
  grupo_id: number;
  ativo: string; // Parece ser uma string com data
  dataAlteracao: boolean; // Esse campo é booleano
}

