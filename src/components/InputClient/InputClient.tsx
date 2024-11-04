/* import React, { useContext } from 'react';
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
        if (nomeCliente.length > 10) {
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
 */

import React, { useContext, useState } from 'react';
import {
    Container,
    ConfirmButton,
    ModalInput,
    ModalTitle
} from './styles';
import { CartContext } from '@/context/CartContext';

interface InputClientProps {
    closeModal: () => void;
}

const InputClient: React.FC<InputClientProps> = ({ closeModal }) => {
    const { setNomeCliente } = useContext(CartContext);
    const [inputValue, setInputValue] = useState(""); // Estado local para controlar o valor do input

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);      
    };

    const handleConfirm = () => {
        if (inputValue.trim().length > 10) {
            setNomeCliente(inputValue); // Atualiza o contexto apenas na confirmação
            closeModal();
        } else {
            alert("O nome e telefone devem conter pelo menos 10 caracteres.");
        }
    };

    return (
        <Container>
            <ModalTitle>Nome / Telefone</ModalTitle>
            <ModalInput
                value={inputValue} // Usando o estado local como valor
                onChange={handleInputChange}
                autoCapitalize="none"
                placeholder="Digite seu nome e telefone"
            />
            <ConfirmButton onClick={handleConfirm}>Confirmar</ConfirmButton>
        </Container>
    );
};

export default InputClient;

