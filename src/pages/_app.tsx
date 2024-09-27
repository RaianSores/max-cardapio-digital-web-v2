import { AdditionalProvider } from '@/context/AdditionalContext';
import '../app/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CartProvider } from '@/context/CartContext';

function RavenGestor({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Max-Food | Sistemas</title>
        <meta name="description" content="Max-Food" />
      </Head>
      <AdditionalProvider>
        <CartProvider>
          <Component {...pageProps} />;
        </CartProvider>
      </AdditionalProvider>
    </>
  )
}

export default RavenGestor;
