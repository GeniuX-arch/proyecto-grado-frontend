

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
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);


    const login = (userData: User) => {
    // Supongamos que tienes una función de autenticación que verifica el email y la contraseña.
    //validación y conexión a la db+
    /*    axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true })


        .then(() => {
            axios.post('http://localhost:8000/login', {
            email: userData.email,
            password: userData.password
            }, { withCredentials: true })
            .then(response => {
                if(response.data==='Authenticated'){
                    setUser(userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                    console.log(response.data.message);
                }
            })
            .catch(error => {
            console.error('Error during login:', error.response.data.message);
            });
    });
*/
    
         console.log(userData.email=="0000000000@gmail.com" && userData.password=="0000000000@gmail.com")
    const isValidUser = (userData.email=="0000000000@gmail.com" && userData.password=="0000000000@gmail.com");
    
    if (isValidUser) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    } else {
        console.error("Invalid credentials");
        
    }
        

    
};


    const logout = () => {
        

        
    axios.post('http://localhost:8000/logout', {}, { withCredentials: true })
    .then(response => {
        setUser(null);
        localStorage.removeItem('user');
        console.log(response.data.message);
    })
    .catch(error => {
        console.error('Error during logout:', error.response.data.message);
    });


    };

    const value = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};