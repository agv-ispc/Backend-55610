import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 20;

  useEffect(() => {
    // Aquí realiza la solicitud a tu API para obtener la lista de productos
    fetch(`http://localhost:8000/api/products?pagination=${productsPerPage}&page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [currentPage]); // Dependencia currentPage para que se actualice cuando cambie la página

  return (
    <div>
      <h1>Bienvenido a la Tienda</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <ProductList products={products} />
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </button>
            <span>Página {currentPage}</span>
            <button
              disabled={products.length < productsPerPage}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
