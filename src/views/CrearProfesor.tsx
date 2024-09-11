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
    <div className="min-h-screen bg-green-100">
      <Navbar />
      <div className="flex justify-center items-center pt-20">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
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
        </form>
      </div>
    </div>
  );
}
