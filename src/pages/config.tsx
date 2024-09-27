import Head from 'next/head';
import Config from '../components/Config/Config';

const ConfigPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Max-Food | Configurações</title>
                <meta name="description" content="Max-Food" />
                <link rel="icon" href="./favicon.ico" />
            </Head>
            <Config/>
        </>
    );
};

export default ConfigPage;