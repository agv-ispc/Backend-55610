import React from 'react';
import ProductDetails from '../components/ProductDetails';

const ProductsPage = () => {
  // Obtener detalles del producto (puede venir de un estado o una API)
  const productDetails = {...};

  return (
    <div>
      <h1>Detalles del Producto</h1>
      <ProductDetails {...productDetails} />
    </div>
  );
};

export default ProductsPage;
