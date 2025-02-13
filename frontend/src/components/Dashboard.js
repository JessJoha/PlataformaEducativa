import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
    const [user, setUser] = useState({ username: '', role: '' });
    const [courses, setCourses] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', accessKey: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token en Dashboard:', token); 

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decoded = jwtDecode(token); 
            console.log('Token decodificado:', decoded);
            
            setUser({
                username: decoded.username || 'Usuario',
                role: decoded.role
            });
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            handleLogout();
        }
    }, [navigate]);

    const fetchCourses = async (token) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_COURSE_LIST}/courses/courses`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            }
        } catch (error) {
            console.error('Error al obtener cursos:', error);
        }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`${process.env.REACT_APP_COURSE_CREATE}/courses/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCourse)
            });

            if (response.ok) {
                setShowCreateModal(false);
                setNewCourse({ title: '', description: '', accessKey: '' });
                fetchCourses(token);
            }
        } catch (error) {
            console.error('Error al crear curso:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (user.role === 'admin') {
        return (
            <div className="p-6">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Bienvenido al Aula Virtual - Admin Panel</h1>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Cerrar Sesión
                    </button>
                </header>

                <div className="mb-6">
                    <button 
                        onClick={() => setShowCreateModal(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Crear Nuevo Curso
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map(course => (
                        <div key={course.id} className="border rounded-lg p-4 shadow">
                            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                    Editar
                                </button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showCreateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Crear Nuevo Curso</h2>
                            <form onSubmit={handleCreateCourse}>
                                <div className="mb-4">
                                    <label className="block mb-2">Título</label>
                                    <input 
                                        type="text"
                                        className="w-full border rounded p-2"
                                        value={newCourse.title}
                                        onChange={e => setNewCourse({...newCourse, title: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Descripción</label>
                                    <textarea 
                                        className="w-full border rounded p-2"
                                        value={newCourse.description}
                                        onChange={e => setNewCourse({...newCourse, description: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Clave de Acceso</label>
                                    <input 
                                        type="text"
                                        className="w-full border rounded p-2"
                                        value={newCourse.accessKey}
                                        onChange={e => setNewCourse({...newCourse, accessKey: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button 
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                    >
                                        Crear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Vista para estudiantes (por implementar)
    return (
        <div className="p-6">
            <h1>Bienvenido al Aula Virtual - Portal de Estudiantes</h1>
            <p>Vista de estudiante en desarrollo...</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default Dashboard;