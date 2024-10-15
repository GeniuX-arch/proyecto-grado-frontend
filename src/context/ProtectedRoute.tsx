import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

type Role = 'admin' | 'profesor';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user, fetchUserData } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            fetchUserData().catch(() => {
                navigate('/login', { replace: true });
            });
        }
    }, [user, fetchUserData, navigate]);

    if (!user) {
        // Show loading state or return null while checking authentication
        return null;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        if (!allowedRoles.includes(user.rol as Role) && user.rol !== 'admin') {
            // User doesn't have the required role (and is not an admin)
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;