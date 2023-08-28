import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ largeImg, onClose }) => {
  const modalRef = document.querySelector('#root-modal');

  useEffect(() => {
    const onCloseByEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onCloseByEsc);
    return () => {
      window.removeEventListener('keydown', onCloseByEsc);
    };
  }, [onClose]);

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
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
