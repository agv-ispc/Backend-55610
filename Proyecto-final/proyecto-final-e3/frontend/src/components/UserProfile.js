import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h2>Datos del Usuario</h2>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Otros detalles del usuario */}
    </div>
  );
};

export default UserProfile;
