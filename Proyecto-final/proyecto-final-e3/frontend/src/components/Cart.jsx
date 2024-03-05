import React from 'react';

const Cart = ({ items }) => {
  return (
    <div>
      <h2>Carrito</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - <img src={item.thumbnail} alt={item.name} /> - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
