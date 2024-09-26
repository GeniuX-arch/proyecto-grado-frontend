import axios from 'axios';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Salones } from '../../interfaces/interfaces';

export default function CrearSalon() {
  const [salon, setSalon] = useState<Salones>({
    capacidad_alumnos: '',
    tipo: '',
  });

  const [mensaje, setMensaje] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSalon(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${host}/salones`, salon);
      setSalon({
        capacidad_alumnos: '',
        tipo: '',
      });
      setMensaje('Salón creado exitosamente');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setMensaje('Error al enviar los datos');
    }
  };

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
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Crear Salón</h2>

          {mensaje && (
            <div className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="capacidad_alumnos" className="block text-green-700 font-medium mb-2">Capacidad de Alumnos:</label>
              <input
                type="number"
                id="capacidad_alumnos"
                name="capacidad_alumnos"
                value={salon.capacidad_alumnos}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese la capacidad de alumnos"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tipo" className="block text-green-700 font-medium mb-2">Tipo:</label>
              <input
                type="text"
                id="tipo"
                name="tipo"
                value={salon.tipo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese el tipo"
                required
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
          </form>
        </div>
      </div>
    </div>
  );
}