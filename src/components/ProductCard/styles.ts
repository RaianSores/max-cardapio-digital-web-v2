import styled from "styled-components";

export const ProductCardContainer = styled.div`
  display: flex;
  background-color: #bdbaba;
  border-radius: 5px;
  color: #000;
  flex-direction: row;
  align-items: flex-start;
  padding: 1%;
  gap: 2%;
  max-width: 100%;
  margin-bottom: 0.4rem;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #a19f9f;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #a19f9f;
  }
`;

export const ProductCardInfo = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  flex-direction: column;
  font-size: 10px;
  color: #46423f;
`;

export const ProductCardTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #46423f;
`;

export const ProductCardAbout = styled.p`
  flex: 1;
  font-size: 14px;
  color: #46423f;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
`;

export const PriceDiscount = styled.span`
  font-size: 18px;
  text-decoration: line-through;
  color: #52555a;
`;

export const PriceFinal = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #46423f;
`;
