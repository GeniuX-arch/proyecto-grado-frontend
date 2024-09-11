// Materias.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Materias = () => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    calificacion_alumno: '',
    experiencia: ''
  });

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
        }}
      >
        <div className="w-full max-w-4xl mt-32 mb-10 p-6 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Formulario de Materias</h2>
          
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700 text-sm font-medium mb-2">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-medium mb-2">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="calificacion_alumno" className="block text-gray-700 text-sm font-medium mb-2">Calificación del Alumno:</label>
            <input
              type="text"
              id="calificacion_alumno"
              name="calificacion_alumno"
              value={formData.calificacion_alumno}
              onChange={(e) => setFormData({ ...formData, calificacion_alumno: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="experiencia" className="block text-gray-700 text-sm font-medium mb-2">Experiencia:</label>
            <textarea
              id="experiencia"
              name="experiencia"
              value={formData.experiencia}
              onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export default Materias;
