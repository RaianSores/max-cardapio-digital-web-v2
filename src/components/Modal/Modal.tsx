/* import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay, ModalContainer, ModalContent, CloseButton } from './styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay onClick={() => onClose()}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
 */

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay, ModalContainer, ModalContent, CloseButton } from './styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
