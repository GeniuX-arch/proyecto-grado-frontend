import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Clases = () => {
  const [formData, setFormData] = useState({
    id: '',
    dis_semana: '',
    hora_inicio: '',
    hora_fin: '',
    materia_id: '',
    salon_id: ''
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
      }}
    >
      <Navbar />
      <div className="relative min-h-screen flex flex-col items-center pt-32">
        <div className="w-full max-w-lg p-8 bg-green-100 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg transform  ">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Crear Clase</h2>
          
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ingrese el ID"
                />
              </div>

              <div>
                <label htmlFor="dis_semana" className="block text-gray-800 font-medium mb-2">Días de la Semana:</label>
                <input
                  type="text"
                  id="dis_semana"
                  name="dis_semana"
                  value={formData.dis_semana}
                  onChange={(e) => setFormData({ ...formData, dis_semana: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ingrese los días de la semana"
                />
              </div>

              <div>
                <label htmlFor="hora_inicio" className="block text-gray-800 font-medium mb-2">Hora de Inicio:</label>
                <input
                  type="time"
                  id="hora_inicio"
                  name="hora_inicio"
                  value={formData.hora_inicio}
                  onChange={(e) => setFormData({ ...formData, hora_inicio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="hora_fin" className="block text-gray-800 font-medium mb-2">Hora de Fin:</label>
                <input
                  type="time"
                  id="hora_fin"
                  name="hora_fin"
                  value={formData.hora_fin}
                  onChange={(e) => setFormData({ ...formData, hora_fin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="materia_id" className="block text-gray-800 font-medium mb-2">ID de Materia:</label>
                <input
                  type="text"
                  id="materia_id"
                  name="materia_id"
                  value={formData.materia_id}
                  onChange={(e) => setFormData({ ...formData, materia_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ingrese el ID de materia"
                />
              </div>

              <div>
                <label htmlFor="salon_id" className="block text-gray-800 font-medium mb-2">ID de Salón:</label>
                <input
                  type="text"
                  id="salon_id"
                  name="salon_id"
                  value={formData.salon_id}
                  onChange={(e) => setFormData({ ...formData, salon_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ingrese el ID de salón"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Clases;
