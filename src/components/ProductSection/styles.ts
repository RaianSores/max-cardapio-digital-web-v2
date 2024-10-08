import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const ContentInfoActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #463f3f;
`;

export const InputQtde = styled.div`
  display: flex;
  align-items: center;
`;

export const QuantityInput = styled.input`
  text-align: center;
  color: black;
  background-color: #ddd;
  border: none;
  width: 55px;
  height: 60px;
  font-size: 32px;
  font-weight: bold;
`;

export const DecreaseButton = styled.button`
  font-size: 48px;
  width: 60px;
  height: 60px;
  justify-content: center;
  background-color: #4E4D4B;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: none;
  cursor: pointer;
`;

export const IncreaseButton = styled.button`
  font-size: 48px;
  width: 60px;
  height: 60px;
  justify-content: center;
  background-color: #4E4D4B;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: none;
  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  background-color: #F38321;
  border: none;
  border-radius: 10px;
  width: 80px;
  height: 60px;
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
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
