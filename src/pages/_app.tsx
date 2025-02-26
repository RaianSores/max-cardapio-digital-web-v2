import '../app/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CartProvider } from '@/context/CartContext';

function RavenGestor({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Max-Food | MaxData</title>
        <meta name="description" content="Max-Food" />
      </Head>
      <CartProvider>
        <Component {...pageProps} />;
      </CartProvider>
    </>
  )
}

export default RavenGestor;
