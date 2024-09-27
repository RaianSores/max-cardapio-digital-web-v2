import React from 'react';
import { Message, ToastContainer } from './styles';

interface CustomToastProps {
  message: string;
  type: 'error' | 'warning' | 'success';
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type }) => {
  let backgroundColor = 'rgba(0, 0, 0, 0.8)';
  if (type === 'error') {
    backgroundColor = 'red';
  } else if (type === 'warning') {
    backgroundColor = 'orange';
  } else if (type === 'success') {
    backgroundColor = 'green';
  }

  return (
    <ToastContainer style={{ backgroundColor }}>
      <Message>{message}</Message>
    </ToastContainer>
  );
};

export default CustomToast;