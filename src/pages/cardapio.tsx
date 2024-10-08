import Head from 'next/head';
import Home from '@/components/Home/Home';

const CardapioPage: React.FC = () => {
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