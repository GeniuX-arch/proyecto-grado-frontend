import axios from 'axios';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function CrearProfesor() {
  const [profesor, setProfesor] = useState({
    cedula: '',
    nombre: '',
    tipo_contrato: '',
    estado: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfesor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/profesores', profesor);
      console.log(response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
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
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Crear Profesor</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="cedula" className="block text-green-700 font-medium mb-2">Cédula:</label>
              <input
                type="text"
                id="cedula"
                name="cedula"
                value={profesor.cedula}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese la cédula"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="nombre" className="block text-green-700 font-medium mb-2">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={profesor.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese el nombre"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tipo_contrato" className="block text-green-700 font-medium mb-2">Tipo de Contrato:</label>
              <input
                type="text"
                id="tipo_contrato"
                name="tipo_contrato"
                value={profesor.tipo_contrato}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese el tipo de contrato"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="estado" className="block text-green-700 font-medium mb-2">Estado:</label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={profesor.estado}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
                placeholder="Ingrese el estado"
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


