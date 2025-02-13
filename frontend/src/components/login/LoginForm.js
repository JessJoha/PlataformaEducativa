import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (!username || !password) {
            setErrorMessage('El nombre de usuario y la contraseña son requeridos');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_LOGIN_USER}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data); 

            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('Token guardado:', data.token); 
                navigate('/dashboard');
            } else {
                setErrorMessage(data.error || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setErrorMessage('Error de conexión con el servidor');
        } finally {
            setLoading(false);
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
                    <button type="submit" disabled={loading}>
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </div>

                {errorMessage && (
                    <div id="error-message" className="error-message">
                        {errorMessage}
                    </div>
                )}
            </form>

            <button onClick={handleBack} style={{ marginTop: '20px' }}>
                Regresar
            </button>
        </div>
    );
};

export default LoginForm;