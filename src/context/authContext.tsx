import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { host } from '../data/server';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    rol: 'admin' | 'profesor';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (userData: { name: string, email: string, password: string, rol: 'admin' | 'profesor' }) => Promise<void>;
    fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);


    const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.get(`${host}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const userData = response.data;
        setUser(userData);

    } catch (error: any) {
        console.error('Error fetching user data:', error);

        // Eliminar el token si hay un error
        localStorage.removeItem('token');
        setUser(null);

        // Manejo de errores de respuesta
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Failed to fetch user data');
        } else {
            throw new Error('Failed to fetch user data');
        }
    }
};

    useEffect(() => {
        fetchUserData().catch(() => {
            // Handle error (e.g., redirect to login page)
        });
    }, []);




    const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${host}/login`, { email, password }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // `axios` automáticamente maneja la conversión de JSON
        const data = response.data;

        // Guarda los datos del usuario y el token en el localStorage
        setUser(data.user);
        localStorage.setItem('token', data.token);

    } catch (error: any) {
        // Manejo de errores con `axios`
        if (error.response && error.response.data) {
            console.error('Login failed:', error.response.data.message || 'Unknown error');
            throw new Error(error.response.data.message || 'Login failed');
        } else {
            console.error('Login failed:', error.message);
            throw new Error('Login failed');
        }
    }
};


    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
           
            axios.post(`${host}/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('token');
        }
    };


    const register = async (userData: { name: string, email: string, password: string, rol: 'admin' | 'profesor' }) => {
    try {
        const response = await axios.post(`${host}/register`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // axios automáticamente maneja la conversión de JSON, por lo que puedes acceder a los datos directamente
        const data = response.data;

        // Aquí puedes manejar los datos de la respuesta, como guardar el token o iniciar sesión automáticamente
        // setUser(data.user);
        // localStorage.setItem('token', data.token);

    } catch (error: any) {
        // Si hay un error, axios lo lanza directamente, así que puedes manejarlo aquí
        if (error.response && error.response.data) {
            console.error('Registration failed:', error.response.data.message || 'Unknown error');
            throw new Error(error.response.data.message || 'Registration failed');
        } else {
            console.error('Registration failed:', error.message);
            throw new Error('Registration failed');
        }
    }
};


    const value = {
        user,
        login,
        logout,
        register,
        fetchUserData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
