import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Profesor, ProfesorMateria } from '../../interfaces/interfaces';
import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

export default function CrearProfesorMateria() {

  const { user } = useAuth();
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
  const [profesorMateria, setProfesorMateria] = useState<ProfesorMateria>({
    id: 0,
    profesor_id: 0,
    materia_id: 0,
    calificacion_alumno: 0,
    experiencia: '',
  });

  const [mensaje, setMensaje] = useState<string>('');
  const [materias, setMaterias] = useState<{ id: number; nombre: string }[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [materiasResponse, profesoresResponse] = await Promise.all([
          axios.get(`${host}/materias`),
          axios.get(`${host}/profesores`),
        ]);

        setMaterias(materiasResponse.data);
        setProfesores(profesoresResponse.data);

        if (id) {
          const response = await axios.get(`${host}/profesor_materia/${id}`);
          setProfesorMateria(response.data);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfesorMateria((prevState) => ({
      ...prevState,
      [name]: name === 'calificacion_alumno' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`${host}/profesor_materia/${id}`, profesorMateria);
        setMensaje('Profesor y materia actualizados exitosamente');
      } else {
        await axios.post(`${host}/profesor_materia`, profesorMateria);
        setMensaje('Profesor y materia asociados exitosamente');
      }

      setProfesorMateria({
        id: 0,
        profesor_id: 0,
        materia_id: 0,
        calificacion_alumno: 0,
        experiencia: '',
      });
    } catch (error: any) {
      console.error('Error al enviar los datos:', error);
      if (error.response) {
        setMensaje(`Error: ${error.response.data.message || 'Error al enviar los datos'}`);
      } else {
        setMensaje('Error al enviar los datos');
      }
    }
  };

  return (
    <div className={`bg-gradient-to-br from-white via-blue-100 to-blue-200 min-h-screen bg-cover bg-center flex flex-col items-center justify-center pl-4 ${user?.rol === 'admin' ? "md:pl-16 lg:pl-52" : ""} pr-6 pt-16`}>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg p-10 bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-md"
      >
        <h2 className="text-3xl font-bold text-[#BFD730] mb-6 text-center">
          {id ? 'Editar Profesor-Materia' : 'Crear Profesor-Materia'}
        </h2>
  
        {mensaje && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`mb-4 p-4 text-center text-white rounded ${mensaje.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {mensaje}
          </motion.div>
        )}
  
        <form onSubmit={handleSubmit}>
          {/* Profesor */}
          <div className="mb-6">
            <label htmlFor="profesor_id" className="block text-cyan-700 font-medium mb-2">Profesor:</label>
            <select
              id="profesor_id"
              name="profesor_id"
              value={profesorMateria.profesor_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            >
              <option value={0}>Seleccione un profesor</option>
              {profesores.map((profesor) => (
                <option key={profesor.id} value={profesor.id}>
                  {profesor.nombre}
                </option>
              ))}
            </select>
          </div>
  
          {/* Materia */}
          <div className="mb-6">
            <label htmlFor="materia_id" className="block text-cyan-700 font-medium mb-2">Materia:</label>
            <select
              id="materia_id"
              name="materia_id"
              value={profesorMateria.materia_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            >
              <option value={0}>Seleccione una materia</option>
              {materias.map((materia) => (
                <option key={materia.id} value={materia.id}>
                  {materia.nombre}
                </option>
              ))}
            </select>
          </div>
  
          {/* Calificación del alumno */}
          <div className="mb-6">
            <label htmlFor="calificacion_alumno" className="block text-cyan-700 font-medium mb-2">Calificación Alumno:</label>
            <input
              type="number"
              id="calificacion_alumno"
              name="calificacion_alumno"
              value={profesorMateria.calificacion_alumno}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
  
          {/* Experiencia */}
          <div className="mb-6">
            <label htmlFor="experiencia" className="block text-cyan-700 font-medium mb-2">Experiencia:</label>
            <input
              type="text"
              id="experiencia"
              name="experiencia"
              value={profesorMateria.experiencia}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
  
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-[#0B4A75] hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              {id ? (
                <span className="flex items-center justify-center">
                  <PencilIcon className="h-5 w-5 mr-2" /> Actualizar
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <PlusIcon className="h-5 w-5 mr-2" /> Guardar
                </span>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}  