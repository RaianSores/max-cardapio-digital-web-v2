import React from 'react';
import Head from 'next/head';
import Error from '@/components/Error/Error';

const ErrorPage: React.FC = () => {
  return (
    <>
        <Head>
            <title>Max-Food | Carrinho</title>
            <meta name="description" content="Max-Food" />
            <link rel="icon" href="./favicon.ico" />
        </Head>
        <Error />
    </>
);
};

export default ErrorPage;