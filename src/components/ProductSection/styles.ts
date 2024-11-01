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
  background-color: #4e4d4b;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: none;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #41403f;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #41403f;
  }
`;

export const IncreaseButton = styled.button`
  font-size: 48px;
  width: 60px;
  height: 60px;
  justify-content: center;
  background-color: #4e4d4b;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: none;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #41403f;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #41403f;
  }
`;

export const ConfirmButton = styled.button`
  background-color: #f38321;
  border: none;
  border-radius: 10px;
  width: 80px;
  height: 60px;
  font-size: 20px;
  margin-left: 10px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #d4711c;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #d4711c;
  }
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
