export interface Venda {
  numMesa: number;
  operador: number;
  solicitar_conta?: boolean;
  id?: number;
  clienteId: number;
  tipo: string;
  tipoOrigin: string;
  atendente?: number;
  status?: string;
  abertura?: string;
  cfop?: number;
  cliNome: string;
  cpf: string;
  totalNf?: number;
  msg?: string;
  vlrTotalLiqProd?: number;
  consumidorFinal?: boolean;
  empId?: string;
  itens?: VendaItem[];
}

export interface VendaItem {
  id?: number;
  vendaId: number;
  codProduto: number;
  cfop: number;
  qtde: number;
  valor: number;
  desconto: number;
  descricaoProd: string;
  valorTotal: number;
  vlrOutrasDesp: number;
  status: string;
  un: string;
}

export interface IRequestAccount {
  numero: number;
  tipo: string;
  atendente: number;
}

export interface IPix {
  empId: number;
  valor: number;
  nome?: string;
  cpf?: string;
  idVenda: number;
}
