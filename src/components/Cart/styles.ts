import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #3e3e3e;
`;

export const ContainerConta = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #740c0c;
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
  font-size: 100%;
  font-weight: bold;
  height: 30px;
  width: 20%;
  margin-right: 2%;
  background-color: #f38321;
  border: none;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #d4711c;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #c56118;
  }
`;

export const ActionCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #dddddd;
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
  font-size: 90%;
  font-weight: bold;
  height: 50px;
  width: 45%;
  background-color: #f38321;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #d4711c;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #c56118;
  }
`;

export const ClearButton = styled.button`
  font-size: 90%;
  font-weight: bold;
  height: 50px;
  width: 45%;
  background-color: #03a371;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #04885e;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #04885e;
  }
`;

export const ActionCardEmpty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;  
  background-color: #dddddd;
  margin: 10px;
  border-radius: 5px;
  position: relative;
  padding: 20px;
`;

export const ContainerEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #363539;
  margin-top: 20px;
`;

/* export const ContainerEmpty = styled.div`
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-top: 25%;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #363539;
  margin: 0;
`; */
