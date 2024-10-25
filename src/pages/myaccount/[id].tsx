import React, { useEffect, useContext } from 'react';
import { GetServerSideProps } from 'next';
import MyAccount from '@/components/MyAccount/MyAccount';
import { CartContext } from '@/context/CartContext';
import { handleMesaRedirect } from '@/utils/handleMesaRedirect';

const MyAccountId: React.FC<{ numMesa: number }> = ({ numMesa }) => {
    const { setNumMesa } = useContext(CartContext);

  useEffect(() => {
    setNumMesa(numMesa);
  }, [numMesa]);
    return (
        <MyAccount />
    );
};

export default MyAccountId;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return await handleMesaRedirect(context);
  };