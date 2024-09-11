

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
            setUser(user=parsedUser);
        } catch (error) {
            console.error('Error parsing stored user:', error);
        }
    }
}, []);


    const login = (userData: User) => {
    // Supongamos que tienes una función de autenticación que verifica el email y la contraseña.
    //validación y conexión a la db+
    /*
        axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true })
        .then(() => {
            axios.post('http://localhost:8000/login', {
            email: userData.email,
            password: userData.password
            }, { withCredentials: true })
            .then(response => {
                if(response.data.message==='Authenticated'){
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    console.log(response.data.message);
                }
            })
            .catch(error => {
                console.error('Error during login:', error.response.data.message);
            });
    });
    */

         console.log(userData.email=="0@gmail.com" && userData.password=="0@gmail.com")
    const isValidUser = (userData.email=="0@gmail.com" && userData.password=="0@gmail.com");
    
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
        /*
    axios.post('http://localhost:8000/logout', {}, { withCredentials: true })
    .then(response => {
        setUser(null);
        localStorage.removeItem('user');
        console.log(response.data.message);
    })
    .catch(error => {
        console.error('Error during logout:', error.response.data.message);
    });
    */
    };

    const value = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
