import React, { useState, useEffect } from 'react';
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

type CartItem = {
    id: number;
    quantity: number;
    price: number;
    description: string;
    image?: string;
};

const MyAccount: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const items = await StorageService.getItem("cartItems");
            if (items) {
                setCartItems(JSON.parse(items));
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Container>
            <Header />
            <ActionsCardHeader>
                <ActionsCardTitle>Minha Conta |</ActionsCardTitle>
                <ActionsCardBack onClick={() => router.back()}>Voltar</ActionsCardBack>
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
                    <ConfirmButton>Solicitar Conta</ConfirmButton>
                </ActionCardInvoiceFooter>
            </ActionCard>
        </Container>
    )
}

export default MyAccount;