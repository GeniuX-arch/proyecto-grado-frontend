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
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
          backgroundAttachment: 'fixed'  // Efecto Parallax
        }}
      >
        <div className="w-full max-w-4xl p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-3xl shadow-2xl border border-opacity-20 border-white">
          <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">Formulario de Materias</h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
              <div>
                <label htmlFor="id" className="block text-white font-semibold mb-2">ID:</label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md bg-opacity-30 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-70 transition duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
              <div>
                <label htmlFor="nombre" className="block text-white font-semibold mb-2">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md bg-opacity-30 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-70 transition duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
              <div>
                <label htmlFor="calificacion_alumno" className="block text-white font-semibold mb-2">Calificación del Alumno:</label>
                <input
                  type="text"
                  id="calificacion_alumno"
                  name="calificacion_alumno"
                  value={formData.calificacion_alumno}
                  onChange={(e) => setFormData({ ...formData, calificacion_alumno: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md bg-opacity-30 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-70 transition duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
              <div>
                <label htmlFor="experiencia" className="block text-white font-semibold mb-2">Experiencia:</label>
                <textarea
                  id="experiencia"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md bg-opacity-30 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-70 transition duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Materias;
