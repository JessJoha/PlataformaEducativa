import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage('El nombre de usuario y la contraseña son requeridos');
      return;
    }

    try {
      const response = await fetch("http://23.20.89.9:5000/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Inicio de sesión exitoso');
        setUsername('');
        setPassword('');
        setErrorMessage('');
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

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
