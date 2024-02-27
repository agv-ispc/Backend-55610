import React from 'react';

const ProductDetails = ({ title, price, stock }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Precio: ${price}</p>
      <p>Stock: {stock}</p>
    </div>
  );
};

export default ProductDetails;
