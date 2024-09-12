
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

interface ProtectedRouteProps {
    children:React.ReactNode;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    console.log(localStorage.getItem('user'))
    

    return (
            localStorage.getItem('user')? children : <Navigate to="/login" />
    );
};

export default ProtectedRoute;
/*
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
    rol: string;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ rol, children }) => {
    const { user } = useAuth();
    

    // Verifica si hay un usuario autenticado y si el rol coincide
    const isAuthenticated = user !== null;
    const userRole = user?.email; // Asegúrate de que 'user' tenga la propiedad 'role'

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (userRole === rol || userRole === 'admin') {
        return <>{children}</>; // Renderiza los hijos si el rol coincide o es admin
    } else {
        return <Navigate to="/unauthorized" />; // Redirige a una página no autorizada si el rol no coincide
    }
};

export default ProtectedRoute;
*/