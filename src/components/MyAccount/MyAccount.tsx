import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
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
    ActionPrice,
    LineItem,
    Title,
    Price,
} from './styles';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/utils/format';
import { CartContext } from '@/context/CartContext';
import { solicitarConta } from '@/services/vendaService';
import StorageService from '@/utils/StorageService';

const MyAccount: React.FC = () => {
    const router = useRouter();
    const [isInitialized, setIsInitialized] = useState(false);
    const {
        venda,
        totalPedido,
        desconto,
        totalServico,
        totalFinal,
        isContaSolicitada,
        setIsContaSolicitada,
        fetchItems,
        calcularTotais
    } = useContext(CartContext);

    useEffect(() => {
        if (!isInitialized) {
            fetchItems();
            calcularTotais();
            setIsInitialized(true);
        }
    }, [isInitialized, fetchItems, calcularTotais]);

    async function handleRequestAccount() {
        const id = await StorageService.getItem("vendaId");
        if (id) {
            await solicitarConta(parseInt(id), true);
            fetchItems();
        };
    };

    const ContainerToUse = isContaSolicitada ? ContainerConta : Container;

    return (
        <ContainerToUse>
            <Header />
            <ActionsCardHeader>
                <ActionsCardBack onClick={() => router.back()}>Voltar</ActionsCardBack>
                <ActionsCardTitle>| Minha Conta</ActionsCardTitle>
            </ActionsCardHeader>
            <ActionCard>
                <ActionPrice>
                    <LineItem>
                        <Title>Total Pedido:</Title>
                        <Price>{formatPrice(totalPedido)}</Price>
                    </LineItem>
                    <LineItem>
                        <Title>+ Srv.:</Title>
                        <Price>{formatPrice(totalServico)}</Price>
                    </LineItem>
                    <LineItem>
                        <Title>- Desc.:</Title>
                        <Price>{formatPrice(desconto)}</Price>
                    </LineItem>
                    <LineItem>
                        <Title>Total Final:</Title>
                        <Price>{formatPrice(totalFinal)}</Price>
                    </LineItem>
                </ActionPrice>
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
                                        <ActionCardInvoiceTableRow
                                            key={index}
                                            style={{
                                                textDecoration: item.status === "C" ? "line-through" : "none",
                                                opacity: item.status === "C" ? 0.6 : 1,
                                            }}
                                        >
                                            <DescriptionCard>
                                                {item.descricaoProd}
                                                {item.status === "C" && <span> (Cancelado)</span>}
                                            </DescriptionCard>
                                            <PriceCard>
                                                {item.status === "C" ? "-" : formatPrice(item.valor)}
                                            </PriceCard>
                                            <QuantityCard>
                                                {item.status === "C" ? "-" : item.qtde}
                                            </QuantityCard>
                                            <TotalPriceCard>
                                                {item.status === "C" ? "-" : formatPrice(item.valor * item.qtde)}
                                            </TotalPriceCard>
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

                {!isContaSolicitada && totalPedido !== 0 && (
                    <ActionCardInvoiceFooter>
                        <ConfirmButton onClick={handleRequestAccount}>
                            <FontAwesomeIcon icon={faMoneyCheckDollar} size="1x" color="#FFFF" width={32} height={32} />
                            Solicitar Conta
                        </ConfirmButton>
                    </ActionCardInvoiceFooter>
                )}
            </ActionCard>
        </ContainerToUse>
    );
};

export default MyAccount;
