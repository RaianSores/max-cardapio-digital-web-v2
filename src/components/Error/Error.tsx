import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import qrAnimation from '../../lottie/error.json';
import { AnimationContainer, Container, Instructions, Message, Title } from './styles';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Error: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Container>
            {isClient && (
                <AnimationContainer>
                    <Lottie animationData={qrAnimation} loop={true} />
                </AnimationContainer>
            )}
            <Title>Erro: Mesa não encontrada!</Title>
            <Message>O número da mesa ou o link que você acessou é inválido.</Message>
            <Instructions>Por favor, leia o QRCode da mesa novamente.</Instructions>
        </Container>
    );
};

export default Error;