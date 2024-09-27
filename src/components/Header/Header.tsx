import React, { useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConciergeBell, faCartPlus, faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/CartContext";

import {
  HeaderContainer,
  HeaderContent,
  IconCircle,
  HeaderContentTable,
  HeaderContentInfor,
  HeaderContentInforOrder,
  OrderCount,
  HeaderContentTotal,
  Text,
} from "./styles";

const Header: React.FC = () => {
  const router = useRouter();
  const { 
    cartItemCount, 
    numMesa, 
    fetchCartItemCount, 
    fetchNumMesa 
  } = useContext(CartContext);

  useEffect(() => {
    fetchCartItemCount();
    fetchNumMesa();
  }, []);

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderContentTable onClick={() => router.push('/cardapio')}>
          <IconCircle>
            <FontAwesomeIcon icon={faConciergeBell} size="lg" color="#A3A2A2" width={18} height={18} />
          </IconCircle>
          <Text>Mesa {numMesa}</Text>
        </HeaderContentTable>

        <HeaderContentInfor>
          <HeaderContentInforOrder onClick={() => router.push('/cart')}>
            <IconCircle>
              <OrderCount>{cartItemCount}</OrderCount>
              <FontAwesomeIcon icon={faCartPlus} size="lg" color="#A3A2A2" width={18} height={18} />
            </IconCircle>
            <Text>Pedido</Text>
          </HeaderContentInforOrder>

          <HeaderContentTotal onClick={() => router.push('/myaccount')}>
            <IconCircle>
              <FontAwesomeIcon icon={faHandHoldingUsd} size="lg" color="#A3A2A2" width={18} height={18} />
            </IconCircle>
            <Text>Conta</Text>
          </HeaderContentTotal>
        </HeaderContentInfor>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
