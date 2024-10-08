import MyAccount from '@/components/MyAccount/MyAccount';
import Head from 'next/head';

const MyAccountPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Max-Food | Conta</title>
                <meta name="description" content="Max-Food" />
                <link rel="icon" href="./favicon.ico" />
            </Head>
            <MyAccount />
        </>
    );
};

export default MyAccountPage;