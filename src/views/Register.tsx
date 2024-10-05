import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate(); // Inicializa useNavigate
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [rol, setRol] = useState('student'); // Rol por defecto
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene la recarga de la página
        const userData = {
            name,
            email,
            password,
            rol,
            password_confirmation: passwordConfirmation, // Asegúrate de incluir esto
        };

        try {
            await register(userData);
            navigate('/login'); // Redirige a la página de inicio de sesión
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Error durante el registro. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen" style={{
            backgroundImage: "url('https://img2.wallspic.com/crops/2/5/2/0/30252/30252-negocio-taza_de_cafe-tabla-medios_de_comunicacion_social-empresa-3840x2160.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-center">Regístrate para una cuenta</h3>
                <form onSubmit={handleSubmit}>
                    {error && <p className="mt-4 text-red-500">{error}</p>} {/* Mensaje de error */}
                    <div className="mt-4">
                        <label className="block" htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Nombre"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Correo Electrónico"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Contraseña"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="passwordConfirmation">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            placeholder="Confirmar Contraseña"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="rol">Rol</label>
                        <select
                            id="rol"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="student">Estudiante</option>
                            <option value="teacher">Profesor</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    <div className="flex items-baseline justify-between mt-4">
                        <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Registrar</button>
                        <a href="/login" className="text-sm text-blue-600 hover:underline">¿Ya tienes una cuenta?</a>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Register;
