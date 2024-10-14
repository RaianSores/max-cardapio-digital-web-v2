import React, { useEffect, useContext, useCallback } from "react";
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
  const { cartItemCount, fetchCartItemCount, fetchNumMesa, fetchItems, vendaId, venda } = useContext(CartContext);

  const { id } = router.query;

  const memoizedFetchCartItemCount = useCallback(() => {
    fetchCartItemCount();
  }, [fetchCartItemCount]);

  const memoizedFetchNumMesa = useCallback(() => {
    fetchNumMesa();
  }, [fetchNumMesa]);

  useEffect(() => {
    memoizedFetchCartItemCount();
    memoizedFetchNumMesa();
  }, [memoizedFetchCartItemCount, memoizedFetchNumMesa]);

  useEffect(() => {
    fetchItems();
  }, [vendaId]);

  const handleNavigation = (route: string) => {
    if (id) {
      router.push(`${route}/${id}`);
    } else {
      router.push(route);
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderContentTable onClick={() => handleNavigation('/cardapio')}>
          <IconCircle>
            <FontAwesomeIcon icon={faConciergeBell} size="lg" color="#A3A2A2" width={18} height={18} />
          </IconCircle>
          {id ? (<Text>Mesa {id}</Text>) : (<Text>Home</Text>)}
        </HeaderContentTable>

        <HeaderContentInfor>
          <HeaderContentInforOrder onClick={() => handleNavigation('/cart')}>
            <IconCircle>
              <OrderCount>{cartItemCount}</OrderCount>
              <FontAwesomeIcon icon={faCartPlus} size="lg" color="#A3A2A2" width={18} height={18} />
            </IconCircle>
            <Text>Pedido</Text>
          </HeaderContentInforOrder>

          {venda && venda.length > 0 && (
            <HeaderContentTotal onClick={() => handleNavigation('/myaccount')}>
              <IconCircle>
                <FontAwesomeIcon icon={faHandHoldingUsd} size="lg" color="#A3A2A2" width={18} height={18} />
              </IconCircle>
              <Text>Conta</Text>
            </HeaderContentTotal>
          )}
        </HeaderContentInfor>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
