import React, { useState } from 'react';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('http://23.20.89.9:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                // Maneja el éxito, por ejemplo, guarda el token en localStorage
                localStorage.setItem('token', result.token);
                console.log('Login exitoso');
            } else {
                setError(result.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            setError('Error de conexión');
        }
    };

    return (
        <div>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
};

export default LoginForm;
