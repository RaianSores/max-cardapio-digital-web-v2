import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #3e3e3e;
  align-items: center;
  padding: 5px;
`;

export const HeaderContent = styled.div`
  flex: 5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 10px;
`;

export const IconCircle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #a3a2a2;
  background-color: #3e3e3e;
`;

export const HeaderContentTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  cursor: pointer;
`;

export const HeaderContentInfor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
`;

export const HeaderContentInforOrder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
  cursor: pointer;
`;

export const HeaderContentTotal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

export const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #a3a2a2;
`;

export const OrderCount = styled.div`
  position: absolute;
  top: -2px;
  left: 1px;
  background-color: #ffa500;
  color: #fff;
  font-size: 14px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 22px;
`;
