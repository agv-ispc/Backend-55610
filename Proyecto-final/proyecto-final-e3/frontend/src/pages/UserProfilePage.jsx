import React from 'react';
import UserProfile from '../components/UserProfile';

const UserProfilePage = () => {
  // Obtener datos del usuario (puede venir de un estado o una API)
  const userData = {...};

  return (
    <div>
      <h1>Mi Perfil</h1>
      <UserProfile user={userData} />
    </div>
  );
};

export default UserProfilePage;
