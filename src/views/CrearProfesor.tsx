import axios from 'axios';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function CrearProfesor() {
  const [profesor, setProfesor] = useState({
    cedula: '',
    nombre: '',
    tipoContrato: '',
    materias: '',
    horariosDisponibles: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setProfesor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(profesor);
    try {
      const response = await axios.post('URL_DEL_ENDPOINT', profesor);
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
            <label htmlFor="tipoContrato" className="block text-green-700 font-medium mb-2">Tipo de Contrato:</label>
            <input
              type="text"
              id="tipoContrato"
              name="tipoContrato"
              value={profesor.tipoContrato}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
              placeholder="Ingrese el tipo de contrato"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="materias" className="block text-green-700 font-medium mb-2">Materias:</label>
            <input
              type="text"
              id="materias"
              name="materias"
              value={profesor.materias}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
              placeholder="Ingrese las materias"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="horariosDisponibles" className="block text-green-700 font-medium mb-2">Horarios Disponibles:</label>
            <input
              type="text"
              id="horariosDisponibles"
              name="horariosDisponibles"
              value={profesor.horariosDisponibles}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
              placeholder="Ingrese los horarios disponibles"
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
