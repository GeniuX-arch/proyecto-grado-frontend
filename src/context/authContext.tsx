

import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    email: string;
    password:string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
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
    let [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        console.log('Logged user from localStorage:', loggedUser);
        if (loggedUser) {
            try {
                const parsedUser = JSON.parse(loggedUser);
                console.log('Parsed user:', parsedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing stored user:', error);
            }
        }
    }, []);

    const login = (userData: User) => {
        // Validación de usuario (simulada)
        console.log(userData.email === "0@gmail.com" && userData.password === "0@gmail.com");
        const isValidUser = (userData.email === "0@gmail.com" && userData.password === "0@gmail.com");
        
        if (isValidUser) {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            console.error("Invalid credentials");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};