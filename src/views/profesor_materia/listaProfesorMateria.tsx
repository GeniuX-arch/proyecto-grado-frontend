import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { ProfesorMateria } from '../../interfaces/interfaces';

export default function VisualizarProfesorMateria() {
  const [profesorMaterias, setProfesorMaterias] = useState<ProfesorMateria[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ProfesorMateria[]>(`${host}/profesor_materia`);
        setProfesorMaterias(response.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setMensaje('Error al cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta relación profesor-materia?')) {
      try {
        await axios.delete(`${host}/profesor_materia/${id}`);
        setProfesorMaterias(prevState => prevState.filter(pm => pm.id !== id));
        setMensaje('Relación eliminada con éxito.');
      } catch (error) {
        console.error('Error al eliminar la relación:', error);
        setMensaje('Error al eliminar la relación.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-blue-500 to-gray-200 pl-4 md:pl-16 lg:pl-52 pr-6 pt-10">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-indigo-900">Visualizar Profesor-Materia</h2>
              <Link 
                to="/profesormateria/crear" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Crear Profesor-Materia
              </Link>
            </div>

            <AnimatePresence>
              {mensaje && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className={`mb-4 p-4 text-sm rounded-md ${
                    mensaje.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}
                >
                  {mensaje}
                </motion.div>
              )}
            </AnimatePresence>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-indigo-50">
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-indigo-900 sm:pl-6">ID</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-900">Profesor</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-900">Materia</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-900">Experiencia</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-900">Calificación Alumno</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Acciones</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {profesorMaterias.length > 0 ? (
                            profesorMaterias.map((profesorMateria) => (
                              <motion.tr 
                                key={profesorMateria.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{profesorMateria.id}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{profesorMateria.profesor_id}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{profesorMateria.materia_id}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{profesorMateria.experiencia}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{profesorMateria.calificacion_alumno}</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <Link
                                    to={`/profesor-materia/editar/${profesorMateria.id}`}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-150 ease-in-out"
                                  >
                                    <PencilIcon className="h-5 w-5 inline-block" aria-hidden="true" />
                                    <span className="sr-only">Editar</span>
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(profesorMateria.id)}
                                    className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                                  >
                                    <TrashIcon className="h-5 w-5 inline-block" aria-hidden="true" />
                                    <span className="sr-only">Eliminar</span>
                                  </button>
                                </td>
                              </motion.tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No hay datos disponibles</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}