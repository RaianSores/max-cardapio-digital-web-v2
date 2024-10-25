import React, { useEffect, useContext, useCallback } from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConciergeBell, faCartPlus, faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/CartContext";

import {
  HeaderContainer,
  HeaderContent,
  HeaderContentTable,
  HeaderContentInfor,
  HeaderContentInforOrder,
  OrderCount,
  HeaderContentTotal,
  Text,
} from "./styles";
import { encryptBase64 } from "@/utils/hash";

const Header: React.FC = () => {
  const router = useRouter();
  const { cartItemCount, fetchCartItemCount, fetchItems, vendaId, numMesa, cartItems } = useContext(CartContext);

  const memoizedFetchCartItemCount = useCallback(() => {
    fetchCartItemCount();
  }, [fetchCartItemCount]);

  useEffect(() => {
    memoizedFetchCartItemCount();
  }, [memoizedFetchCartItemCount]);

  useEffect(() => {
    fetchItems();
  }, [vendaId]);

  const handleNavigation = (route: string) => {
    if (numMesa) {
      const hashMesa = encryptBase64(numMesa.toString()); 
      router.push(`${route}/${hashMesa}`);  
    } else {
      router.push(route);
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderContentTable onClick={() => handleNavigation('/cardapio')}>
          <FontAwesomeIcon icon={faConciergeBell} size="2x" color="#A3A2A2" width={32} height={32} />
          {numMesa ? (<Text>Mesa {numMesa}</Text>) : (<Text>Home</Text>)}
        </HeaderContentTable>

        <HeaderContentInfor>
          <HeaderContentInforOrder onClick={() => handleNavigation('/cart')}>
            {cartItemCount ? <OrderCount>{cartItemCount}</OrderCount> : null}
            <FontAwesomeIcon icon={faCartPlus} size="2x" color="#A3A2A2" width={32} height={32} />
            <Text>Pedido</Text>
          </HeaderContentInforOrder>

          <HeaderContentTotal onClick={() => handleNavigation('/myaccount')}>
            <FontAwesomeIcon icon={faHandHoldingUsd} size="2x" color="#A3A2A2" width={32} height={32} />
            <Text>Conta</Text>
          </HeaderContentTotal>
        </HeaderContentInfor>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
