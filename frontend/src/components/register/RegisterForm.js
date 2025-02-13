import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
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
      const response = await fetch(`${process.env.REACT_APP_CREATE_USER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Usuario registrado exitosamente');
        setUsername('');
        setPassword('');
        setErrorMessage('');
      } else {
        setErrorMessage(data.error || 'Error al registrar el usuario');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setErrorMessage('Hubo un error al procesar tu solicitud');
      setSuccessMessage('');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="register-form">
      <h1>Registro de Usuario</h1>
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
          <button type="submit">Registrar</button>
        </div>

        {errorMessage && <div id="error-message" className="error-message">{errorMessage}</div>}
        {successMessage && <div id="success-message" className="success-message">{successMessage}</div>}
      </form>

      <button onClick={handleBack} style={{ marginTop: '20px' }}>
        Regresar
      </button>
    </div>
  );
};

export default RegisterForm;
