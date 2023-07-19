import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onImageClick }) => {
  return (
    <img
      src={image.webformatURL}
      alt={image.tags}
      className={css.galleryItemImage}
      onClick={() => {
        onImageClick(image);
      }}
    />
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
