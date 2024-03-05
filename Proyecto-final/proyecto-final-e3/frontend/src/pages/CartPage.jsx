import React from 'react';
import Cart from '../components/Cart';
import axios from 'axios'

const CartPage = () => {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    // Función para obtener la información del carrito desde la API
    const fetchCartData = async () => {
      try {
        // Reemplaza 'tu-servidor' con la URL de tu servidor
        const response = await axios.get('http://localhost:8000/api/carts/cart?cartid=659b318fa323b1f2bd162188');
        setCartData(response.data);
      } catch (error) {
        console.error('Error al obtener la información del carrito', error);
      }
    };

    // Llamada a la función para obtener la información del carrito
    fetchCartData();
  }, []); // La dependencia vacía asegura que la llamada solo se realice una vez al montar el componente


  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cartData ? (
        <Cart items={cartData.products} />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default CartPage;
