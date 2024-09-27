import styled from "styled-components";

interface ProductListContainerProps {
  pedidoConta: boolean;
}

export const ProductListContainer = styled.div<ProductListContainerProps>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.pedidoConta ? "#740c0c" : "#3E3E3E")};
  width: 75%; /* Adiciona uma largura para ocupar o restante da tela */
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;  
  }
`;

export const ProductListContent = styled.div<ProductListContainerProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 10px 0;
  box-sizing: border-box;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  img {
    width: 100px;
    height: 100px;
  }
`;