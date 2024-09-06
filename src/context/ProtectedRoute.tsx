import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

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
