import styled from "styled-components";

interface ProductListContainerProps {
  pedidoConta: boolean;
}

export const ProductListContainer = styled.div<ProductListContainerProps>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.pedidoConta ? "#740c0c" : "#3E3E3E")};
  width: 100%;
  box-sizing: border-box;
`;

export const ProductListContent = styled.div<ProductListContainerProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1px 0;
  box-sizing: border-box;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  img {
    width: 20%;
    height: 20%;
  }
`;