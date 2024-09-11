import axios from 'axios';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { host } from '../data/server';
import { Profesores } from '../interfaces/interfaces';

export default function CrearProfesor() {
  const [profesor, setProfesor] = useState<Profesores>({
    cedula: '',
    nombre: '',
    tipo_contrato: '',
    estado: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

    // Si el campo es 'cedula', aseguramos que solo acepte números
    if (name === 'cedula' && isNaN(Number(value))) {
      return; // Evita la actualización si el valor no es un número
    }

    setProfesor(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(profesor);
    try {
      const response = await axios.post(host + "/profesores", profesor);

      setProfesor({
        cedula: '',
        nombre: '',
        tipo_contrato: '',
        estado: '',
      });

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
              required
              pattern="[0-9]*" // Solo permite números
              inputMode="numeric" // Indica al teclado móvil que solo acepte números
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
              required
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
              required
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
        </div>
      </div>
      </div>
  );
}
