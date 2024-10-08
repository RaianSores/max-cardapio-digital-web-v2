import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(34, 33, 33, 0.295);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  height: 50%;
  position: relative;
`;

export const ModalContent = styled.div`
  margin-top: 20px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 10px;
  background: none;
  color: red;
  border: none;
  font-size: 38px;
  cursor: pointer;
`;
