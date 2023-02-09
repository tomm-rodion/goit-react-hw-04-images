import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRef = document.querySelector('#root-modal');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEsc);
  }

  onCloseByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };
  render() {
    const { largeImg, onClose } = this.props;
    return createPortal(
      <div className="Overlay" onClick={onClose}>
        <div className="Modal">
          <img src={largeImg} alt="bigImg" />
        </div>
      </div>,
      modalRef
    );
  }
}
