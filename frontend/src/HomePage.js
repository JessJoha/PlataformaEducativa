import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bienvenido a la Plataforma Educativa</h1>
      
      <button
        onClick={() => window.location.href = '/register'}
        style={{ margin: '10px', padding: '10px 20px' }}
      >
        Registrar Usuario
      </button>

      <button
        onClick={() => window.location.href = 'http://13.216.132.78:3000/users/login'}
        style={{ margin: '10px', padding: '10px 20px' }}
      >
        Iniciar Sesión
      </button>
    </div>
  );
};

export default HomePage;