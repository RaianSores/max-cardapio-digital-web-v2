import React, { createContext, useState, useContext, ReactNode } from 'react';
import { getItemsMesa } from "../services/contaService";
import { getCartItemCount } from '../utils/cartUtils';
import { Conta } from '../@types/Conta';
import StorageService from '../utils/StorageService';
import { Venda } from '@/@types/Venda';
import { getSale } from '@/services/vendaService';

interface ICartProviderProps {
    children: ReactNode;
}

interface CartItem {
    id: number;
    productId: number;
    valorTotal: number;
    valorLiquido: number;
    desconto: number;
    vlrOutrasDesp: number;
}

type ProductCardProps = {
    proID: number;
    foto: string;
    descricao: string;
    priceFinal: number;
    priceDiscount?: number;
  };

interface ICartContextData {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    totalPedido: number;
    totalServico: number;
    setTotalServico: React.Dispatch<React.SetStateAction<number>>;
    totalFinal: number;
    cartItemCount: number;
    setCartItemCount: React.Dispatch<React.SetStateAction<number>>;
    calcularTotais: () => void;
    numeroMesa: number | null;
    setNumeroMesa: React.Dispatch<React.SetStateAction<number | null>>;
    fetchNumeroMesa: () => void;
    fetchItems: () => void;
    fetchCartItems: (numeroMesa: number) => void;
    numMesa: number;
    setNumMesa: React.Dispatch<React.SetStateAction<number>>;
    fetchCartItemCount: () => void;
    fetchNumMesa: () => void;
    empId: string;
    setEmpId: React.Dispatch<React.SetStateAction<string>>;
    atendente: number;
    setAtendente: React.Dispatch<React.SetStateAction<number>>;
    fetchUserData: () => void;
    antecipacao: number;
    setAntecipacao: React.Dispatch<React.SetStateAction<number>>;
    taxaServico: number;
    setTaxaServico: React.Dispatch<React.SetStateAction<number>>;
    desconto: number;
    setDesconto: React.Dispatch<React.SetStateAction<number>>;
    temContaMaxDigital: boolean;
    setTemContaMaxDigital: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    selectedProduct: ProductCardProps | null;
    setSelectedProduct: (product: ProductCardProps | null) => void;
    vendaId: number; 
    setVendaId: React.Dispatch<React.SetStateAction<number>>;
    venda: Venda[]; 
    setVenda: React.Dispatch<React.SetStateAction<Venda[]>>;
}

export const CartContext = createContext<ICartContextData>({} as ICartContextData);

export const CartProvider = ({ children }: ICartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPedido, setTotalPedido] = useState(0);
    const [totalServico, setTotalServico] = useState(0);
    const [taxaServico, setTaxaServico] = useState(0);
    const [totalFinal, setTotalFinal] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [numeroMesa, setNumeroMesa] = useState<number | null>(null);
    const [numMesa, setNumMesa] = useState<number>(0);
    const [empId, setEmpId] = useState('');
    const [atendente, setAtendente] = useState(0);
    const [antecipacao, setAntecipacao] = useState<number>(0);
    const [temContaMaxDigital, setTemContaMaxDigital] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductCardProps | null>(null);
    const [vendaId, setVendaId] = useState<number>(0);  
    const [venda, setVenda] = useState<Venda[]>([]);

    function calcularTotais() {
        let pedido = 0;
        let desconto = 0;
        let final = 0;
        let servico = 0;

        cartItems.forEach((item) => {
            pedido += item.valorTotal;
            final += item.valorLiquido;
            desconto += item.desconto;
            servico += item.vlrOutrasDesp;
        });

        setTotalPedido(pedido);
        setTotalFinal(final);
        setDesconto(desconto);
        setTotalServico(servico);
    }

    async function fetchNumeroMesa() {
        try {
            const mesa = await StorageService.getItem("numMesa");
            console.log(mesa)
            if (mesa !== null) {
                setNumeroMesa(parseInt(mesa));
            }
        } catch (error) {
            console.error("Erro ao buscar número da mesa", error);
        }
    };

    const fetchItems = async () => {
        try {
            const vedId = await StorageService.getItem("vendaId");
            if (vedId) {
                console.log('fetchItems',numMesa)
                const vendaData = await getSale(parseInt(vedId), numMesa);
                
                if (vendaData && vendaData.length > 0) {
                    setVenda(vendaData);
                } else {
                    setVenda([]);   
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    async function fetchCartItems(numeroMesa: number) {
        try {
            const items: Conta[] = await getItemsMesa(numeroMesa);
    
            // Mapear os itens de Conta para CartItem, adicionando a propriedade `id`
            const cartItems: CartItem[] = items.map((item, index) => ({
                id: index, // ou qualquer lógica para gerar um ID
                productId: item.productId,
                valorTotal: item.valorTotal,
                valorLiquido: item.valorLiquido,
                desconto: item.desconto,
                vlrOutrasDesp: item.vlrOutrasDesp,
            }));
    
            setCartItems(cartItems.length === 0 ? [] : cartItems);
        } catch (error) {
            console.error("Erro ao buscar itens da mesa", error);
        }
    }
    

    const fetchCartItemCount = async () => {
        const itemCount = await getCartItemCount();
        setCartItemCount(itemCount);
    };

    const fetchNumMesa = async () => {
        try {
            const mesa = await StorageService.getItem("numMesa");
            if (mesa) {
                setNumMesa(parseInt(mesa));
            }
        } catch (error) {
            console.error("Erro ao buscar número da mesa", error);
        }
    };

    const fetchUserData = async () => {
        try {
            const empId = await StorageService.getItem("empId");
            const operador = await StorageService.getItem("atendente");

            setEmpId(empId || "1");
            setAtendente(parseInt(operador || "0"));
        } catch (error) {
            console.error("Erro ao buscar dados do usuário", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                calcularTotais,
                cartItems,
                setCartItems,
                totalPedido,
                totalServico,
                setTotalServico,
                totalFinal,
                cartItemCount,
                setCartItemCount,
                numeroMesa,
                setNumeroMesa,
                fetchNumeroMesa,
                fetchCartItems,
                numMesa,
                setNumMesa,
                fetchCartItemCount,
                fetchNumMesa,
                empId,
                setEmpId,
                atendente,
                setAtendente,
                fetchUserData,
                antecipacao,
                setAntecipacao,
                temContaMaxDigital,
                setTemContaMaxDigital,
                taxaServico,
                setTaxaServico,
                desconto,
                setDesconto,
                isModalOpen, 
                setIsModalOpen, 
                selectedProduct, 
                setSelectedProduct,
                vendaId, 
                setVendaId,
                venda, 
                setVenda,
                fetchItems
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
