import styled from 'styled-components';

// Container principal que envolve toda a página
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #3e3e3e;
  color: white;
  min-height: 100vh;
`;

// Container para o formulário de configuração
export const ConfigForm = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 60%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #21262e;
`;

// Título do formulário
export const FormTitle = styled.h2`
  text-align: center;
  color: #3e3e3e;
`;

// Grupo de form, que inclui label e input/select
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

// Label do input
export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #7d899d;
`;

// Estilos para input e select
export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// Botão de submit ou ação
export const Button = styled.button`
  background-color: #3e3e3e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #2c2c2c;
  }

  &:focus {
    outline: none;
  }
`;

// Estilo do ícone de atualização dentro do form
export const RefreshIcon = styled.button`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

// Loading container
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
