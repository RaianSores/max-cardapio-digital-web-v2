import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  max-width: 600px;
  width: 90%;
  margin: 0 auto;
`;

export const ModalTitle = styled.h1`
  color: #50535A;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

export const ModalInput = styled.input`
  width: 100%;
  border: 1px solid #e0e3e7;
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 0.8rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  outline: none;
  transition: border 0.3s;
  color: #50535A;

  &:focus {
    border-color: #b3b7c1;
  }
`;

export const ConfirmButton = styled.button`
  background-color: #F38321;
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 55px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #FFF;
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
