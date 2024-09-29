import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/UserContext';

const ProfilePage = () => {
  const { authUser, logOut, getProfile } = useContext(GlobalContext);

  useEffect(() => {
    getProfile(); // Llama a getProfile al cargar el componente
  }, [getProfile]);

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      {authUser.token ? (
        <>
          <p>Email: {authUser.email}</p>
          <button onClick={logOut} className="btn btn-danger">Cerrar Sesión</button>
        </>
      ) : (
        <p>No estás autenticado.</p>
      )}
    </div>
  );
};

export default ProfilePage;