import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #3e3e3e;
`;

export const ActionCardContent = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 160px);
  padding-bottom: 80px;
`;

export const ActionsCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 8px;
  margin-top: 2px;
  margin-right: 5px;
  width: 95%;
`;

export const ActionsCardTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

export const ActionsCardBack = styled.button`
  font-size: 18px;
  font-weight: bold;
  height: 30px;
  width: 20%;
  margin-right: 2%;
  background-color: #f38321;
  border: none;
  border-radius: 3px;
  color: #FFF;
  cursor: pointer;
`;

export const ActionCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  background-color: #ddd;
  margin: 8px;
  border-radius: 5px;
  position: relative;
`;

export const ActionCardHeaderList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 97%;
  background-color: #ddd;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  margin-left: 5px;
  margin-right: 5px;
`;

export const TableColLeft = styled.div`
  flex-basis: 40%;
  text-align: left;
`;

export const TableColRigth = styled.div`
  flex-basis: 20%;
  text-align: right;
`;

export const RegTable = styled.h1`
  font-size: 16px;
  color: #363539;
  font-weight: bold;
`;

export const ActionCardInvoiceTableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 98%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

export const DescriptionCard = styled.p`
  flex-basis: 40%;
  font-size: 14px;
  color: #363539;
  margin-left: 5px;
`;

export const PriceCard = styled.p`
  flex-basis: 20%;
  font-size: 14px;
  color: #363539;
  text-align: right;
`;

export const QuantityCard = styled.p`
  flex-basis: 20%;
  font-size: 14px;
  color: #363539;
  text-align: right;
`;

export const TotalPriceCard = styled.p`
  flex-basis: 20%;
  font-size: 14px;
  color: #363539;
  text-align: right;
  margin-right: 5px;
`;

export const ActionCardInvoiceFooter = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #ddd;
  border-top: 1px solid #ccc;
  border-radius: 5px;
`;

export const ConfirmButton = styled.button`
  font-size: 18px;
  font-weight: bold;
  height: 50px;
  width: 45%;
  background-color: #f38321;
  border: none;
  border-radius: 5px;
  color: #FFF;
  cursor: pointer;
`;

export const ClearButton = styled.button`
  font-size: 18px;
  font-weight: bold;
  height: 50px;
  width: 45%;
  background-color: #03a371;
  border: none;
  border-radius: 5px;
  color: #FFF;
  cursor: pointer;
`;