import React, { useEffect, useContext } from 'react';
import Image from 'next/image';
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
} from './styles';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/utils/format';
import { CartContext } from '@/context/CartContext';

const MyAccount: React.FC = () => {
    const { numMesa, venda, fetchItems, fetchConfigurations } = useContext(CartContext);
    const router = useRouter();

    useEffect(() => {
        if (numMesa) {
          fetchConfigurations();
        }
      }, [numMesa]);

    useEffect(() => {
        fetchItems();
    }, [numMesa]);


    return (
        <Container>
            <Header />
            <ActionsCardHeader>
                <ActionsCardBack onClick={() => router.back()}>Voltar</ActionsCardBack>
                <ActionsCardTitle>| Minha Conta</ActionsCardTitle>
            </ActionsCardHeader>
            <ActionCard>
                <ActionCardHeaderList>
                    <TableColLeft><RegTable>Descrição</RegTable></TableColLeft>
                    <TableColRigth><RegTable>Vlr Unit.</RegTable></TableColRigth>
                    <TableColRigth><RegTable>Qtde</RegTable></TableColRigth>
                    <TableColRigth><RegTable>Vlr Total</RegTable></TableColRigth>
                </ActionCardHeaderList>
                <ActionCardContent>
                    {venda && venda.length > 0 ? (
                        venda.map((singleVenda, vendaIndex) => (
                            <React.Fragment key={vendaIndex}>
                                {singleVenda.itens && singleVenda.itens.length > 0 ? (
                                    singleVenda.itens.map((item, index) => (
                                        <ActionCardInvoiceTableRow key={index}>
                                            <DescriptionCard>{item.descricaoProd}</DescriptionCard>
                                            <PriceCard>{formatPrice(item.valor)}</PriceCard>
                                            <QuantityCard>{item.qtde}</QuantityCard>
                                            <TotalPriceCard>{formatPrice(item.valor * item.qtde)}</TotalPriceCard>
                                        </ActionCardInvoiceTableRow>
                                    ))
                                ) : (
                                    <p>Sem itens na venda {singleVenda.id}</p>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <></>
                    )}
                </ActionCardContent>
                <ActionCardInvoiceFooter>
                    <ConfirmButton>Solicitar Conta</ConfirmButton>
                </ActionCardInvoiceFooter>
            </ActionCard>
        </Container>
    );
}

export default MyAccount;
