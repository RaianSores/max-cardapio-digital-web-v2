export interface Venda {
  numMesa: string;
  operador: number;
  tipo: string;
  pediuConta?: number;
  venda: {
    id?: number;
    clienteId: number;
    tipo: string;
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
  };
}

export interface VendaItem {
  vendaId: number;
  codProduto: number;
  cfop: number;
  qtde: number;
  valor: number;
  desconto: number | null;
  descricaoProd: string;
  valorTotal: number;
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
};
