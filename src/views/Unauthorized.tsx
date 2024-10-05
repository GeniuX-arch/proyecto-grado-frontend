import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">No tienes autorizacion</h1>
            <p className="text-xl mb-8">Estas entrando de manera ilegal, el administrador.</p>
            <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go to Home
            </Link>
        </div>
    );
};

export default Unauthorized;