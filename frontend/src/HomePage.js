import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bienvenido a la Plataforma Educativa</h1>
      
      <button
        onClick={() => navigate('/register')}
        style={{ margin: '10px', padding: '10px 20px' }}
      >
        Registrar Usuario
      </button>

      <button
        onClick={() => navigate('/login')}
        style={{ margin: '10px', padding: '10px 20px' }}
      >
        Iniciar Sesión
      </button>
    </div>
  );
};

export default HomePage;