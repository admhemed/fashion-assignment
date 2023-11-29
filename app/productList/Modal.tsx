// Modal.tsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-5 rounded shadow-lg max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-4 text-3xl z-10"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
