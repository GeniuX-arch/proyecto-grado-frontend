// Salones.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Salones = () => {
  const [formData, setFormData] = useState({
    id: '',
    capacidad_alumnos: '',
    tipo: ''
  });

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
        }}
      >
        <div className="w-full max-w-4xl p-8 bg-green-100 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg transform  ">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Formulario de Salones</h2>
          
          <form>
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="id" className="block text-gray-800 font-medium mb-2">ID:</label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="capacidad_alumnos" className="block text-gray-800 font-medium mb-2">Capacidad de Alumnos:</label>
                <input
                  type="number"
                  id="capacidad_alumnos"
                  name="capacidad_alumnos"
                  value={formData.capacidad_alumnos}
                  onChange={(e) => setFormData({ ...formData, capacidad_alumnos: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="tipo" className="block text-gray-800 font-medium mb-2">Tipo:</label>
              <input
                type="text"
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

export default Salones;
