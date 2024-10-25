import React, { useEffect, useContext } from 'react';
import { GetServerSideProps } from 'next';
import Cart from '@/components/Cart/Cart';
import { CartContext } from '@/context/CartContext';
import { handleMesaRedirect } from '@/utils/handleMesaRedirect';

const CartId: React.FC<{ numMesa: number }> = ({ numMesa }) => {
  const { setNumMesa } = useContext(CartContext);

  useEffect(() => {
    setNumMesa(numMesa);
  }, [numMesa]);
  return (
    <Cart />
  );
};

export default CartId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await handleMesaRedirect(context);
};