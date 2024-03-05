// ProductList.js
import React from 'react';
import ProductThumbnail from './ProductThumbnail';

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <ProductThumbnail
              imageUrl={product.thumbnails[0]} // Puedes ajustar esto según cómo esté estructurado tu objeto de producto
              altText={product.title}
            />
            <p>{product.title}</p>
            <p>Precio: ${product.price}</p>
            <button>Detalles</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
