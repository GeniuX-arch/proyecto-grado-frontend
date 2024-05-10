import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <span className="text-6xl font-bold text-gray-900 mb-8">Oops!</span>
      <span className="text-xl text-gray-700 mb-4">¡Parece que cambiaste a movistar!</span>
      <span className="text-lg text-gray-700 mb-4">Error 404 - Pagina en la pm</span>
      <img src="/public/perfil.png" alt="Perfil" className="w-64 h-64 rounded-full shadow-lg mb-8" />
      <Link to="/" className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">

        Volver al inicio
      </Link>
    </div>
  );
}
