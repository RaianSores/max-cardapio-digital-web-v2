export interface Grupo {
  Id: number;
  Nome: string;
  Foto: string | null; // A foto pode ser null
  GdpID: number;
  Ativo: string; // Parece ser uma string com data
  DataAlteracao: boolean; // Esse campo é booleano
}

