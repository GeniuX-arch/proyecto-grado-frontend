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
        <div className="w-full max-w-md p-6 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Crear Clase</h2>

            <div className="mb-4">
              <label htmlFor="id" className="block text-green-700 font-medium mb-2">ID:</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
          
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese el ID"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dis_semana" className="block text-green-700 font-medium mb-2">Días de la Semana:</label>
              <input
                type="text"
                id="dis_semana"
                name="dis_semana"
                value={formData.dis_semana}
               
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese los días de la semana"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="hora_inicio" className="block text-green-700 font-medium mb-2">Hora de Inicio:</label>
              <input
                type="time"
                id="hora_inicio"
                name="hora_inicio"
                value={formData.hora_inicio}
        
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese la hora de inicio"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="hora_fin" className="block text-green-700 font-medium mb-2">Hora de Fin:</label>
              <input
                type="time"
                id="hora_fin"
                name="hora_fin"
                value={formData.hora_fin}
      
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese la hora de fin"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="materia_id" className="block text-green-700 font-medium mb-2">ID de Materia:</label>
              <input
                type="text"
                id="materia_id"
                name="materia_id"
                value={formData.materia_id}
         
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese el ID de materia"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="salon_id" className="block text-green-700 font-medium mb-2">ID de Salón:</label>
              <input
                type="text"
                id="salon_id"
                name="salon_id"
                value={formData.salon_id}
          
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese el ID de salón"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Enviar
              </button>
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default Clases;
