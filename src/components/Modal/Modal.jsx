import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ largeImg, onClose }) => {
  const modalRef = document.querySelector('#root-modal');

  useEffect(() => {
    window.addEventListener('keydown', onCloseByEsc);
    return () => {
      window.removeEventListener('keydown', onCloseByEsc);
    };
  });

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const onCloseByEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdrop}>
      <div className="Modal">
        <img src={largeImg} alt="bigImg" />
      </div>
    </div>,
    modalRef
  );
};
