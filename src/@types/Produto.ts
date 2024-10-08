export interface IProduto {
  ID: number;
  Descricao: string;
  Ativo: boolean;
  PrecoPromo: number;
  PrecoNormal: number;
  Foto: string;
  Observacoes: string;
  GrupoID: number;
  proId: number;
  DataAlteracao: string;
  EmpID: number;
}