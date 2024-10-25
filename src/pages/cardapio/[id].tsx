import React, { useEffect, useContext } from 'react';
import { GetServerSideProps } from 'next';
import Home from '@/components/Home/Home';
import { CartContext } from '@/context/CartContext';
import { handleMesaRedirect } from '@/utils/handleMesaRedirect';

const CardapioId: React.FC<{ numMesa: number }> = ({ numMesa }) => {
  const { setNumMesa } = useContext(CartContext);

  useEffect(() => {
    setNumMesa(numMesa);
  }, [numMesa]);

  return <Home />;
};

export default CardapioId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await handleMesaRedirect(context);
};
