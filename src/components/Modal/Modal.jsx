import { createPortal } from 'react-dom';

export const Modal = ({ largeImg, onClose }) => {
  const modalRef = document.querySelector('#root-modal');
  window.addEventListener('keydown', () => onCloseByEsc);

  const onCloseByEsc = e => {
    if (e.code === 'Escape') {
      return onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={largeImg} alt="bigImg" />
      </div>
    </div>,
    modalRef
  );
};
