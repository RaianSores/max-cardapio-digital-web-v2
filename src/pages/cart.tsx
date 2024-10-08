import Head from 'next/head';
import Cart from '@/components/Cart/Cart';

const CartPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Max-Food | Carrinho</title>
                <meta name="description" content="Max-Food" />
                <link rel="icon" href="./favicon.ico" />
            </Head>
            <Cart />
        </>
    );
};

export default CartPage;