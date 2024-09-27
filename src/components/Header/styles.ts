import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #3e3e3e;
  align-items: center;
  padding: 8px;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const HeaderContent = styled.div`
  flex: 5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding: 2px 0;
  }
`;

export const IconCircle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #a3a2a2;
  background-color: #3e3e3e;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

export const HeaderContentTable = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    gap: 5px;
    flex-direction: column;
  }
`;

export const HeaderContentInfor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 5px;
    align-items: flex-start;
  }
`;

export const HeaderContentInforOrder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
  }
`;

export const HeaderContentTotal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
  }
`;

export const Text = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #a3a2a2;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const OrderCount = styled.div`
  position: absolute;
  top: -2px;
  left: -6px;
  background-color: #ffa500;
  color: #fff;
  font-size: 12px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  text-align: center;
  line-height: 15px;

  @media (max-width: 768px) {
    font-size: 14px;
    left: 1px;
    text-align: center;
    width: 20px;
    height: 20px;
    line-height: 22px;
  }
`;
