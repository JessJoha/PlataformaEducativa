import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage('El nombre de usuario y la contraseña son requeridos');
      return;
    }

    try {
      const response = await fetch("http://23.20.89.9:5000/auth/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Inicio de sesión exitoso');
        localStorage.setItem('token', data.token); // Guarda el token recibido
        setUsername('');
        setPassword('');
        setErrorMessage('');
        
        // Aquí puedes hacer la solicitud para la ruta protegida
        const token = localStorage.getItem('token');
        const protectedResponse = await fetch('http://23.20.89.9:5000/protected-route', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (protectedResponse.ok) {
          const protectedData = await protectedResponse.json();
          console.log('Datos protegidos:', protectedData); // Procesa los datos recibidos
        } else {
          console.log('Error al acceder a la ruta protegida');
        }

        navigate('/dashboard'); // Redirige al dashboard
      } else {
        setErrorMessage(data.error || 'Error al iniciar sesión');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Hubo un error al procesar tu solicitud');
      setSuccessMessage('');
    }
  };

  const handleBack = () => {
    navigate('/');  
  };

  return (
    <div className="login-form">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Iniciar Sesión</button>
        </div>

        {errorMessage && <div id="error-message" className="error-message">{errorMessage}</div>}
        {successMessage && <div id="success-message" className="success-message">{successMessage}</div>}
      </form>

      {/* Botón de regresar */}
      <button onClick={handleBack} style={{ marginTop: '20px' }}>
        Regresar
      </button>
    </div>
  );
};

export default LoginForm;
