import { Modal } from 'components/Modal/Modal';
import React from 'react';
import { useState } from 'react';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <li
        onClick={handleToggleModal}
        className="ImageGalleryItem"
        role="button"
      >
        <img
          className="ImageGalleryItem-image"
          loading="lazy"
          src={image.webformatURL}
          alt="img"
        />
      </li>
      {isModalOpen && (
        <Modal onClose={handleToggleModal} largeImg={image.largeImageURL} />
      )}
    </>
  );
};
