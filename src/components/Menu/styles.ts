import styled from "styled-components";

export const MenuContainer = styled.div`
  width: 100%;
  height: calc(100vh * 10px);
  padding: 1%;
  padding-bottom: 5%;
  overflow-y: auto;
  box-sizing: border-box;
  margin: 1%;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  padding: 1%;
  background-color: #dddddd;
  margin-bottom: 5px;
  border-radius: 5px;
  max-width: 100%;
  min-width: 100%;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;

  &.promotion {
    background-color: #ffa500;
    color: #dddddd;

    &:hover {
      background-color: #ec8326;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      background-color: #ec8326;
    }
  }

  &:hover {
    background-color: #c4bebe;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #c4bebe;
  }
`;

export const MenuImage = styled.img`
  width: 15%;
  height: 100%;
  margin-right: 1%;
  border-radius: 6px;
`;

export const MenuText = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #46423f;
`;

export const MenuTextPromo = styled(MenuText)`
  font-size: 14px;
  color: #fff;
  padding-left: 1%;
`;

export const MenuTextHome = styled(MenuText)`
  font-size: 14px;
  color: #46423f;
  padding-left: 1%;
`;
