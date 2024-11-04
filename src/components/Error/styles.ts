import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const AnimationContainer = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #ff4d4d;
  margin: 0;
`;

export const Message = styled.p`
  font-size: 18px;
  color: #333;
  margin: 10px 0;
`;

export const Instructions = styled.p`
  font-size: 16px;
  color: #666;
`;

export const RetryButton = styled.button`
  background-color: #0070f3;
  color: #fff;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;