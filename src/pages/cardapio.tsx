import Head from 'next/head';
import Home from '@/components/Home/Home';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const CardapioPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {

      console.log('Mesa selecionada:', id);
    }
  }, [id]);
  return (
    <>
      <Head>
        <title>Max-Food | Cardápio Digital</title>
        <meta name="description" content="Max-Food" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <Home />
    </>
  );
};

export default CardapioPage;