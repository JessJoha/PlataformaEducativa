import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

       
       
        try {
            
            setUsername('Usuario');
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            handleLogout();
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px' 
            }}>
                <h1>Bienvenido, {username}</h1>
                <button 
                    onClick={handleLogout}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Cerrar Sesión
                </button>
            </header>

            <main>
                <div style={{ 
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '8px'
                }}>
                    <h2>Panel de Control</h2>
                    <p>Esta es tu área personal. Aquí podrás:</p>
                    <ul>
                        <li>Ver tu información personal</li>
                        <li>Acceder a tus recursos</li>
                        <li>Gestionar tu cuenta</li>
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;