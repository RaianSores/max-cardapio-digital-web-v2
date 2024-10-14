import React, { useState, useEffect, useContext } from 'react';
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
    DescriptionCard,
    PriceCard,
    QuantityCard,
    TotalPriceCard,
    RegTable,
    TableColLeft,
    TableColRigth,
    ActionCardInvoiceFooter,
    ConfirmButton,
    ClearButton
} from './styles';
import { useRouter } from 'next/navigation';
import StorageService from '@/utils/StorageService';
import { formatPrice } from '@/utils/format';
import { Venda, VendaItem } from '@/@types/Venda';
import { CartContext } from '@/context/CartContext';
import { sendSale } from '@/services/vendaService';

type CartItem = {
    id: number;
    quantity: number;
    price: number;
    description: string;
    image?: string;
};

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { atendente, empId, numMesa } = useContext(CartContext);
    const router = useRouter();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const items = await StorageService.getItem("cartItems");
            if (items) {
                setCartItems(JSON.parse(items));
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const clearCart = async () => {
        await StorageService.removeItem("cartItems");
        await fetchCartItems();
        router.push('/cardapio');
    };

    async function sendDataSale(dataSale: Venda) {
        try {
            const data = await sendSale(dataSale);
            if (data.id) {
                await StorageService.setItem("vendaId", (data.id).toString());
            } else {
                await StorageService.removeItem("vendaId");
            }
        } catch (error) {

        }
    };

    async function handleSalesItem() {
        const jsonCartItems = await StorageService.getItem("cartItems");
        const cart = jsonCartItems != null ? JSON.parse(jsonCartItems) : { itens: [] }

        // Verificar se o cart.itens existe e se tem pelo menos um item
        const vlrTotalLiqProd =
            cart.itens && cart.itens.length > 0
                ? cart.itens.reduce((total: number, item: any) => total + item.valorTotal, 0)
                : 0;

        const itensSales: VendaItem[] = cart.map((product: any) => {
            const item: any = {
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
                desconto: product.desconto || 0,
            }

            return item;
        });

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
            cliNome: "CONSUMIDOR",
            cpf: "",
            totalNf: vlrTotalLiqProd,
            msg: "",
            vlrTotalLiqProd: vlrTotalLiqProd,
            consumidorFinal: true,
            empId: empId || '1',
            itens: itensSales,
        };
        await sendDataSale(orderJson);
        await clearCart();
    }

    return (
        <Container>
            <Header />
            <ActionsCardHeader>
                <ActionsCardBack onClick={() => router.back()}>Voltar</ActionsCardBack>
                <ActionsCardTitle>| Meu Carrinho</ActionsCardTitle>
            </ActionsCardHeader>
            <ActionCard>
                <ActionCardHeaderList>
                    <TableColLeft><RegTable>Descrição</RegTable></TableColLeft>
                    <TableColRigth><RegTable>Vlr Unit.</RegTable></TableColRigth>
                    <TableColRigth><RegTable>Qtde</RegTable></TableColRigth>
                    <TableColRigth><RegTable>Vlr Total</RegTable></TableColRigth>
                </ActionCardHeaderList>
                <ActionCardContent>
                    {cartItems.map((item, index) => (
                        <ActionCardInvoiceTableRow key={index}>
                            <DescriptionCard>{item.description}</DescriptionCard>
                            <PriceCard>{formatPrice(item.price)}</PriceCard>
                            <QuantityCard>{item.quantity}</QuantityCard>
                            <TotalPriceCard>{formatPrice(item.price * item.quantity)}</TotalPriceCard>
                        </ActionCardInvoiceTableRow>
                    ))}
                </ActionCardContent>
                <ActionCardInvoiceFooter>
                    <ClearButton onClick={clearCart}>Limpar Carrinho</ClearButton>
                    <ConfirmButton onClick={handleSalesItem}>Enviar Pedido</ConfirmButton>
                </ActionCardInvoiceFooter>
            </ActionCard>
        </Container>
    );
};

export default Cart;
