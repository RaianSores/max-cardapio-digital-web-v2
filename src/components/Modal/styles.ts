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
  max-width: 520px !important;
  margin: 0 auto !important;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  max-width: 90%;
  width: 80%;
  min-height: 22%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

export const ModalContent = styled.div`
  margin-top: 20px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  color: red;
  border: none;
  font-size: 38px;
  cursor: pointer;
`;
