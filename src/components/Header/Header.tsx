import React, { useEffect, useContext, useCallback } from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConciergeBell, faCartPlus, faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/CartContext";

import {
  HeaderContainer,
  HeaderContainerConta,
  HeaderContent,
  HeaderContentTable,
  HeaderContentInfor,
  HeaderContentInforOrder,
  OrderCount,
  HeaderContentTotal,
  Text,
} from "./styles";
import { encryptBase64Mesa, encryptBase64Porta, encryptBase64Url } from "@/utils/hash";
import StorageService from "@/utils/StorageService";

const Header: React.FC = () => {
  const router = useRouter();
  const {
    cartItemCount,
    isContaSolicitada,
    numMesa,
    fetchCartItemCount
  } = useContext(CartContext);

  const memoizedFetchCartItemCount = useCallback(() => {
    fetchCartItemCount();
  }, [fetchCartItemCount]);

  useEffect(() => {
    memoizedFetchCartItemCount();
  }, [memoizedFetchCartItemCount]);

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

  const ContainerToUse = isContaSolicitada ? HeaderContainerConta : HeaderContainer;

  return (
    <ContainerToUse>
      <HeaderContent>
        <HeaderContentTable onClick={() => handleNavigation('/cardapio')}>
          <FontAwesomeIcon icon={faConciergeBell} size="2x" color="#A3A2A2" width={32} height={32} />
          {numMesa ? (<Text>Mesa {numMesa}</Text>) : (<Text>Home</Text>)}
        </HeaderContentTable>

        <HeaderContentInfor>
          {!isContaSolicitada && (

            <HeaderContentInforOrder onClick={() => handleNavigation('/cart')}>
              {cartItemCount ? <OrderCount>{cartItemCount}</OrderCount> : null}
              <FontAwesomeIcon icon={faCartPlus} size="2x" color="#A3A2A2" width={32} height={32} />
              <Text>Pedido</Text>
            </HeaderContentInforOrder>
          )}

          <HeaderContentTotal onClick={() => handleNavigation('/myaccount')}>
            <FontAwesomeIcon icon={faHandHoldingUsd} size="2x" color="#A3A2A2" width={32} height={32} />
            <Text>Conta</Text>
          </HeaderContentTotal>
        </HeaderContentInfor>
      </HeaderContent>
    </ContainerToUse>
  );
};

export default Header;
