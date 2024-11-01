import React, { useContext } from 'react';
import {
    Container,
    ConfirmButton,
    ModalInput,
    ModalTitle
} from './styles';
import { CartContext } from '@/context/CartContext';

const InputClient: React.FC = () => {
    const { nomeCliente, setNomeCliente, setIsModalOpen } = useContext(CartContext);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeCliente(e.target.value);
    };

    const handleConfirm = () => {
        if (nomeCliente) {
            setIsModalOpen(false);
        }
    };

    return (
        <Container>
            <ModalTitle>Nome / Telefone</ModalTitle>
            <ModalInput
                value={nomeCliente}
                onChange={handleInputChange}
                autoCapitalize="none"
                placeholder="Digite seu nome e telefone"
            />
            <ConfirmButton onClick={handleConfirm}>Confirmar</ConfirmButton>
        </Container>
    );
};

export default InputClient;
