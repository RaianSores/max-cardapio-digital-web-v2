import styled from "styled-components";

export const ProductCardContainer = styled.div`
  display: flex;
  background-color: #bdbaba;
  border-radius: 5px;
  color: #000;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px;
  gap: 10px;
  height: 200px;
  width: 350px;
  max-height: 200px;
  max-width: 350px;
  margin-bottom: 0.4rem;

  @media (max-width: 768px) {
    height: 85px;
    max-height: 85px;
  }
`;

export const ProductCardPhoto = styled.img`
  justify-content: center;
  align-items: center;
  padding: 1px;
  overflow: hidden;
  height: 200px;
  width: 120px;
  max-width: 120px;
  max-height: 200px;
  border-radius: 10px;

  @media (max-width: 768px) {
    max-width: 75px;
    max-height: 75px;
  }
`;

export const ProductCardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 14px;
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
  margin-left: 5px;
`;
