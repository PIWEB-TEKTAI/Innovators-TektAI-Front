// ModalDialog.tsx
import React from 'react';

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Allow children to be passed
}

const ModalDialog: React.FC<ModalDialogProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default ModalDialog;
