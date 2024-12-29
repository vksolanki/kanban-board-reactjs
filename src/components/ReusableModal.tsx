import React from 'react';
import ReactDOM from 'react-dom';
import './ReusableModal.css';

interface ReusableModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
}

const ReusableModal: React.FC<ReusableModalProps> = ({ isOpen, onRequestClose, contentLabel, children }) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error('Modal root element not found');
    return null;
  }

  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="modal">
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default ReusableModal;
