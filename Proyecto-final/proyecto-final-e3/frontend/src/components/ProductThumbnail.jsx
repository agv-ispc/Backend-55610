import React from 'react';

const ProductThumbnail = ({ imageUrl, altText }) => {
  return (
    <img src={imageUrl} alt={altText} />
  );
};

export default ProductThumbnail;
ProductThumbnail