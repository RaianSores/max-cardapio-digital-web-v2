import React, { useEffect, useContext } from 'react';
import Head from 'next/head';
import Home from '@/components/Home/Home';
import { CartContext } from '@/context/CartContext';

const CardapioPage: React.FC = () => {
  const { setNumMesa } = useContext(CartContext);

  useEffect(() => {
    setNumMesa(0);
  }, []);

  return (
    <>
      <Head>
        <title>Max-Food | Cardápio Digital</title>
        <meta name="description" content="Max-Food" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
};

export default CardapioPage;
