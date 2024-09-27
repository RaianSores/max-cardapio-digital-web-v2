import styled from "styled-components";

export const MenuContainer = styled.div`
  width: 100%;
  height: calc(100vh * 10px);
  padding: 1%;
  padding-bottom: 5%;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  padding: 0.2%;
  background-color: #dddddd;
  margin-bottom: 5px;
  border-radius: 5px;
  width: 15%;
  height: 10%;
  max-width: 15%;
  min-width: 10%;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 1%;
    height: 55px;
    max-height: 55px;
    max-width: 150px;
    min-width: 350px;
    min-height: 25px;
  }

  &.promotion {
    background-color: #ffa500;
    margin-top: 5%;
  }

  &.home {
    background-color: #dddddd;
  }
`;

export const MenuImage = styled.img`
  width: 25%;
  height: 100%;
  margin-right: 1%;
  border-radius: 6px;

  @media (max-width: 768px) {
    width: 15%;
    height: 100%;
    margin-right: 1%;
    border-radius: 6px;
  }
`;

export const MenuText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #46423f;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const MenuTextPromo = styled(MenuText)`
  font-size: 16px;
  color: #fff;
  padding-left: 1%;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const MenuTextHome = styled(MenuText)`
  font-size: 16px;
  color: #46423f;
  padding-left: 1%;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
