import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { getCartItemCount } from '../utils/cartUtils';
import StorageService from '../utils/StorageService';
import { Venda, VendaItem } from '@/@types/Venda';
import { getSale } from '@/services/vendaService';
import axios from 'axios';
import { getEmpresaPublica } from '@/services/empresaService';
import { decryptBase64 } from '@/utils/hash';

interface ICartProviderProps {
    children: ReactNode;
};

interface CartItem {
    id: number;
    productId: number;
    valorTotal: number;
    valorLiquido: number;
    desconto: number;
    vlrOutrasDesp: number;
};

type ProductCardProps = {
    proID: number;
    foto: string;
    descricao: string;
    priceFinal: number;
    priceDiscount: number;
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
    fetchItems: () => void;
    fetchConfigurations: () => void;
    numMesa: number;
    setNumMesa: React.Dispatch<React.SetStateAction<number>>;
    fetchCartItemCount: () => void;
    empId: string;
    setEmpId: React.Dispatch<React.SetStateAction<string>>;
    atendente: number;
    setAtendente: React.Dispatch<React.SetStateAction<number>>;
    antecipacao: number;
    setAntecipacao: React.Dispatch<React.SetStateAction<number>>;
    taxaServico: number;
    setTaxaServico: React.Dispatch<React.SetStateAction<number>>;
    desconto: number;
    setDesconto: React.Dispatch<React.SetStateAction<number>>;
    temContaMaxDigital: boolean;
    setTemContaMaxDigital: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedProduct: ProductCardProps | null;
    setSelectedProduct: (product: ProductCardProps | null) => void;
    vendaId: number;
    setVendaId: React.Dispatch<React.SetStateAction<number>>;
    venda: Venda[];
    setVenda: React.Dispatch<React.SetStateAction<Venda[]>>;
    isConfigurationsLoaded: boolean;
    setIsConfigurationsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    isContaSolicitada: boolean;
    setIsContaSolicitada: React.Dispatch<React.SetStateAction<boolean>>;
    nomeCliente: string;
    setNomeCliente: React.Dispatch<React.SetStateAction<string>>;
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
    const [numMesa, setNumMesa] = useState<number>(0);
    const [empId, setEmpId] = useState('');
    const [atendente, setAtendente] = useState(0);
    const [antecipacao, setAntecipacao] = useState<number>(0);
    const [temContaMaxDigital, setTemContaMaxDigital] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductCardProps | null>(null);
    const [vendaId, setVendaId] = useState<number>(0);
    const [venda, setVenda] = useState<Venda[]>([]);
    const [isConfigurationsLoaded, setIsConfigurationsLoaded] = useState(false);
    const [isContaSolicitada, setIsContaSolicitada] = useState(false);
    const [nomeCliente, setNomeCliente] = useState("");

    const calcularTotais = useCallback(() => {
        let pedido = 0;
        let descont = 0;
        let final = 0;
        let servico = 0;

        cartItems.forEach((item) => {
            const itemValorTotal = item.valorTotal || 0;
            const itemDesconto = item.desconto || 0;
            const itemVlrOutrasDesp = item.vlrOutrasDesp || 0;

            pedido += itemValorTotal + itemDesconto;
            final += itemValorTotal;
            descont += itemDesconto;
            servico += itemVlrOutrasDesp;
        });

        setTotalPedido(pedido);
        setTotalFinal(final);
        setDesconto(descont);
        setTotalServico(servico);
        
        if (final == 0) {
            setIsContaSolicitada(false);
        };

    }, [cartItems]);


    const fetchItems = useCallback(async () => {
        try {
            const numero = await StorageService.getItem("numMesa");

            if (!numero) {
                setVenda([]);
                setCartItems([]);
                setIsContaSolicitada(false);
                return;
            };

            const vendaData = await getSale(parseInt(numero));
            const status = vendaData?.[0].status;

            if (status !== "A" && status !== "S") {
                setVenda([]);
                setCartItems([]);
                await StorageService.removeItem("vendaId");
                await StorageService.removeItem("cartItems");
                return;
            }

            const idVenda = vendaData?.[0]?.id ?? 0;
            const solicitouConta = vendaData?.[0]?.solicitar_conta ?? false;
            const cli = vendaData?.[0]?.cliNome;

            if (idVenda !== 0) {
                setVendaId(idVenda);
            };

            setNomeCliente(cli);
            setIsContaSolicitada(solicitouConta);
            setVenda(vendaData && vendaData.length > 0 ? vendaData : []);

            const items: CartItem[] = vendaData?.[0]?.itens
                ?.filter((item: VendaItem) => item.status !== "C") // Filtra itens que não estão cancelados
                ?.map((item: VendaItem) => ({
                    id: item.id ?? 0,
                    productId: item.codProduto,
                    valorTotal: item.valorTotal,
                    valorLiquido: item.valor - (item.desconto || 0),
                    desconto: item.desconto || 0,
                    vlrOutrasDesp: 0,
                })) || [];


            setCartItems(items);

        } catch (error) {
            setVenda([]);
            setCartItems([]);
        }
    }, []);

    const fetchCartItemCount = async () => {
        const itemCount = await getCartItemCount();
        setCartItemCount(itemCount);
    };

    const fetchConfigurations = async () => {
        try {
            const urlParams = new URL(window.location.href);
            const pathSegments = urlParams.pathname.split('/');
            const encryptedMesa = pathSegments[pathSegments.length - 1].replace('m', '');

            const encryptedIpUrl = urlParams.searchParams.get("ig") || "";
            const encryptedPorta = urlParams.searchParams.get("u") || "";

            const mesa = decryptBase64(encryptedMesa, 3) || encryptedMesa;
            const ipUrl = decryptBase64(encryptedIpUrl, 13) || encryptedIpUrl;
            const porta = decryptBase64(encryptedPorta, 4) || encryptedPorta;

            const mesalocal = await StorageService.getItem("numMesa");

            if (mesa !== mesalocal) {
                await StorageService.removeItem("numMesa");
                await StorageService.removeItem("ipUrl");
                await StorageService.removeItem("porta");
                await StorageService.removeItem("token");
                await StorageService.removeItem("idEmpresa");
                await StorageService.removeItem("idVendedor");
                await StorageService.removeItem("vendaId");
            };

            await StorageService.setItem("numMesa", mesa);
            await StorageService.setItem("ipUrl", ipUrl);
            await StorageService.setItem("porta", porta);

            const apiBaseUrl = `${ipUrl}:${porta}`;

            const empresas = await getEmpresaPublica(apiBaseUrl);

            if (empresas.length > 0) {
                const empresa = empresas[0];

                await StorageService.setItem("idEmpresa", empresa.EmpID.toString());
                await StorageService.setItem("idVendedor", empresa.UserPadrao);
                setAtendente(parseInt(empresa.UserPadrao));
                setEmpId(empresa.EmpID.toString());
                setNumMesa(parseInt(mesa));

                try {
                    const response = await axios.get(`http://${apiBaseUrl}/v2/auth`);
                    await StorageService.setItem("token", response.data.token);
                } catch (error) {
                    console.error("Erro ao autenticar", error);
                };
            } else {
                console.error("Nenhuma empresa encontrada.");
            };
            setIsConfigurationsLoaded(true);
        } catch (error) {
            console.error("Erro ao buscar configurações da empresa:", error);
        };
    };

    /*     const fetchConfigurations = async () => {
            try {
                // Recupera a URL completa do localStorage ou da página atual
                const currentUrl = await StorageService.getItem("fullUrl") || window.location.href;
                
                // Armazena a URL completa no localStorage para persistência
                await StorageService.setItem("fullUrl", currentUrl);
        
                const urlParams = new URL(currentUrl);
                const pathSegments = urlParams.pathname.split('/');
                const encryptedMesa = pathSegments[pathSegments.length - 1].replace('m', '');
        
                const encryptedIpUrl = urlParams.searchParams.get("ig") || "";
                const encryptedPorta = urlParams.searchParams.get("u") || "";
        
                const mesa = decryptBase64(encryptedMesa, 3) || encryptedMesa;
                const ipUrl = decryptBase64(encryptedIpUrl, 13) || encryptedIpUrl;
                const porta = decryptBase64(encryptedPorta, 4) || encryptedPorta;
        
                const mesalocal = await StorageService.getItem("numMesa");
        
                if (mesa !== mesalocal) {
                    // Remover dados anteriores se a mesa for diferente
                    await StorageService.removeItem("numMesa");
                    await StorageService.removeItem("ipUrl");
                    await StorageService.removeItem("porta");
                    await StorageService.removeItem("token");
                    await StorageService.removeItem("idEmpresa");
                    await StorageService.removeItem("idVendedor");
                    await StorageService.removeItem("vendaId");
                }
        
                await StorageService.setItem("numMesa", mesa);
                await StorageService.setItem("ipUrl", ipUrl);
                await StorageService.setItem("porta", porta);
        
                const apiBaseUrl = `${ipUrl}:${porta}`;
                const empresas = await getEmpresaPublica(apiBaseUrl);
        
                if (empresas.length > 0) {
                    const empresa = empresas[0];
        
                    await StorageService.setItem("idEmpresa", empresa.EmpID.toString());
                    await StorageService.setItem("idVendedor", empresa.UserPadrao);
                    setAtendente(parseInt(empresa.UserPadrao));
                    setEmpId(empresa.EmpID.toString());
                    setNumMesa(parseInt(mesa));
        
                    try {
                        const response = await axios.get(`http://${apiBaseUrl}/v2/auth`);
                        await StorageService.setItem("token", response.data.token);
                    } catch (error) {
                        console.error("Erro ao autenticar", error);
                    }
                } else {
                    console.error("Nenhuma empresa encontrada.");
                }
                
                setIsConfigurationsLoaded(true);
            } catch (error) {
                console.error("Erro ao buscar configurações da empresa:", error);
            }
        }; */


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
                numMesa,
                setNumMesa,
                fetchCartItemCount,
                empId,
                setEmpId,
                atendente,
                setAtendente,
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
                fetchItems,
                fetchConfigurations,
                isConfigurationsLoaded,
                setIsConfigurationsLoaded,
                isContaSolicitada,
                setIsContaSolicitada,
                nomeCliente,
                setNomeCliente
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
