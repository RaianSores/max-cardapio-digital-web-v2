import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBroom, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Header from '../Header/Header';
import {
    ActionCard,
    ActionCardContent,
    ActionCardHeaderList,
    ActionCardInvoiceTableRow,
    ActionsCardBack,
    ActionsCardHeader,
    ActionsCardTitle,
    Container,
    ContainerConta,
    DescriptionCard,
    PriceCard,
    QuantityCard,
    TotalPriceCard,
    RegTable,
    TableColLeft,
    TableColRigth,
    ActionCardInvoiceFooter,
    ConfirmButton,
    ClearButton,
    Title,
    ContainerEmpty,
    ActionCardEmpty
} from './styles';
import { useRouter } from 'next/router';
import StorageService from '@/utils/StorageService';
import { formatPrice } from '@/utils/format';
import { Venda, VendaItem } from '@/@types/Venda';
import { CartContext } from '@/context/CartContext';
import { sendSale } from '@/services/vendaService';
import { encryptBase64Mesa, encryptBase64Porta, encryptBase64Url } from '@/utils/hash';

import emptyCartAnimation from '../../lottie/Animation - 1730744797551.json';

type CartItem = {
    id: number;
    quantity: number;
    price: number;
    discount: number;
    description: string;
    image?: string;
};

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Cart: React.FC = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const {
        atendente,
        nomeCliente,
        empId,
        numMesa,
        isContaSolicitada,
        cartItemCount,
        fetchCartItemCount,
        setVendaId,
        setNomeCliente,
    } = useContext(CartContext);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const items = await StorageService.getItem("cartItems");
            setCartItems(items ? JSON.parse(items) : []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNavigation = async (route: string) => {
        const mesa = await StorageService.getItem("numMesa") || "";
        const ipUrl = await StorageService.getItem("ipUrl") || "";
        const porta = await StorageService.getItem("porta") || "";

        if (!mesa || !ipUrl || !porta) {
            console.error("Valores insuficientes para construir a URL.");
            return;
        }

        try {
            const mesaEncrypted = encryptBase64Mesa(mesa);
            const portaEncrypted = encryptBase64Porta(porta);
            const urlEncrypted = encryptBase64Url(ipUrl);

            const urlPath = `${route}/m${mesaEncrypted}`;
            const urlQuery = `?ig=${urlEncrypted}&u=${portaEncrypted}&p=${portaEncrypted}`;
            const fullUrl = `${urlPath}${urlQuery}`;

            router.push(
                {
                    pathname: route,
                    query: { m: mesaEncrypted, ig: urlEncrypted, u: mesaEncrypted, p: portaEncrypted }
                },
                fullUrl
            );
        } catch (error) {
            console.error("Erro ao construir a URL de navegação:", error);
        }
    };

    const removeCartItem = async (itemId: number) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
        await StorageService.setItem("cartItems", JSON.stringify(updatedCartItems));
        fetchCartItemCount();
    };

    const clearCart = async () => {
        await StorageService.removeItem("cartItems");
        await fetchCartItems();
        setNomeCliente("");
        handleNavigation('/cardapio');
    };

    async function sendDataSale(dataSale: Venda) {
        try {
            const data = await sendSale(dataSale);
            if (data.id) {
                await StorageService.setItem("vendaId", (data.id).toString());
                setVendaId(data.id);
            } else {
                await StorageService.removeItem("vendaId");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSalesItem() {
        const jsonCartItems = await StorageService.getItem("cartItems");
        const cart = jsonCartItems ? JSON.parse(jsonCartItems) : { itens: [] };
        const vlrTotalLiqProd = cart.itens?.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0) || 0;
        const idVendedor = await StorageService.getItem("idVendedor"); 
        
/*         const itensSales: VendaItem[] = cartItems.map((product: CartItem) => ({
            vendaId: 0,
            codProduto: product.id,
            cfop: 5102,
            qtde: product.quantity,
            valor: product.price,
            descricaoProd: product.description,
            valorTotal: product.price * product.quantity,
            status: "A",
            data: new Date().toISOString(),
            un: "UN",
            desconto: product.discount, //((precoBruto - precoLiquido) / precoBruto) * 100
            vlrOutrasDesp: 0,
            operador: idVendedor !== null ? parseInt(idVendedor) : 1, 
        })); */

         const itensSales: VendaItem[] = cartItems.map((product: CartItem) => {
            // Apenas calcular o desconto se existir um valor de promoção válido
            
            const precoBruto = (product.price * product.quantity) + product.discount;
            const precoLiquido =  (product.price * product.quantity) - product.discount;

            const desconto = (((precoBruto - precoLiquido) / precoBruto) * 100) / 100

            return {
                vendaId: 0,
                codProduto: product.id,
                cfop: 5102,
                qtde: product.quantity,
                valor: product.price,
                descricaoProd: product.description,
                valorTotal: precoBruto,
                status: "A",
                data: new Date().toISOString(),
                un: "UN",
                desconto: desconto,
                vlrOutrasDesp: 0,
                operador: idVendedor !== null ? parseInt(idVendedor) : 1,
            };
        }); 
        

/*         const itensSales: VendaItem[] = cartItems.map((product: CartItem) => ({
            vendaId: 0,
            codProduto: product.id,
            cfop: 5102,
            qtde: product.quantity,
            valor: product.price,
            descricaoProd: product.description,
            valorTotal: product.price * product.quantity,
            status: "A",
            data: new Date().toISOString(),
            un: "UN",
            desconto: product.discount, //((precoBruto - precoLiquido) / precoBruto) * 100
            vlrOutrasDesp: 0,
            operador: idVendedor !== null ? parseInt(idVendedor) : 1, 
        })); */

        const orderJson: Venda = {
            numMesa: numMesa,
            operador: 1,
            id: 0,
            clienteId: 1,
            tipo: "VE",
            atendente: atendente,
            status: "A",
            tipoOrigin: "tpMesa",
            abertura: "A",
            cfop: 5102,
            cliNome: nomeCliente || "CONSUMIDOR",
            cpf: "",
            totalNf: vlrTotalLiqProd,
            msg: "",
            vlrTotalLiqProd,
            consumidorFinal: true,
            empId: empId || '1',
            itens: itensSales,
        };
        await sendDataSale(orderJson);
        await clearCart();
    };

    const ContainerToUse = isContaSolicitada ? ContainerConta : Container;

    return (
        <ContainerToUse>
            <Header />
            <ActionsCardHeader>
                <ActionsCardBack onClick={() => router.back()}>Voltar</ActionsCardBack>
                <ActionsCardTitle>| Meu Carrinho</ActionsCardTitle>
            </ActionsCardHeader>
            {cartItems.length === 0 ? (
                <ActionCardEmpty>
                    <ContainerEmpty>
                    <Lottie animationData={emptyCartAnimation} loop={true} />
                    <Title>Carrinho vazio!</Title>
                    </ContainerEmpty>
                </ActionCardEmpty>
            ) : (
                <ActionCard>
                    <ActionCardHeaderList>
                        <TableColLeft><RegTable>Descrição</RegTable></TableColLeft>
                        <TableColRigth><RegTable>Vlr Unit.</RegTable></TableColRigth>
                        <TableColRigth><RegTable>Qtde</RegTable></TableColRigth>
                        <TableColRigth><RegTable>Vlr Total</RegTable></TableColRigth>
                    </ActionCardHeaderList>
                    <ActionCardContent>
                        {cartItems.map((item) => (
                            <ActionCardInvoiceTableRow key={item.id}>
                                <DescriptionCard>{item.description}</DescriptionCard>
                                <PriceCard>{formatPrice(item.price)}</PriceCard>
                                <QuantityCard>{item.quantity}</QuantityCard>
                                <TotalPriceCard>{formatPrice(item.price * item.quantity)}</TotalPriceCard>
                                <FontAwesomeIcon icon={faTrash} size="2x" color="#4d4b4b" width={20} height={20} onClick={() => removeCartItem(item.id)} />
                            </ActionCardInvoiceTableRow>
                        ))}
                    </ActionCardContent>
                    {!isContaSolicitada && cartItemCount > 0 && (
                        <ActionCardInvoiceFooter>
                            <ClearButton onClick={clearCart}>
                                <FontAwesomeIcon icon={faBroom} size="1x" color="#FFFF" width={32} height={32} />
                                Limpar Carrinho
                            </ClearButton>
                            <ConfirmButton onClick={handleSalesItem}>
                                <FontAwesomeIcon icon={faPaperPlane} size="1x" color="#FFFF" width={32} height={32} />
                                Enviar Pedido
                            </ConfirmButton>
                        </ActionCardInvoiceFooter>
                    )}
                </ActionCard>
            )}
        </ContainerToUse>
    );
};

export default Cart;
