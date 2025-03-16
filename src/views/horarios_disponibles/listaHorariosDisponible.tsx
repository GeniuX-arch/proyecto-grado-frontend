import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';

// Interfaces
interface Horario {
  id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  profesor_nombre?: string;
  profesor_id?: number;
}

interface Profesor {
  id: number;
  cedula: string;
  nombre: string;
}

export default function ListaHorariosDisponibles() {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filtroProfesor, setFiltroProfesor] = useState<number | null>(null);
  const [busquedaProfesor, setBusquedaProfesor] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responseHorarios = await axios.get<Horario[]>(`${host}/horarios_disponibles?name=true`);
        setHorarios(responseHorarios.data);
        
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setMensaje('Error al cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
  const fetchHorarios = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Horario[]>(
        `${host}/horarios_disponibles?profesor_nombre=${busquedaProfesor}&name=true`
      );
      
      setHorarios(response.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setMensaje("Error al cargar los datos");
    } finally {
      setIsLoading(false);
    }
  };

  fetchHorarios();
}, [busquedaProfesor]);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      try {
        await axios.delete(`${host}/horarios_disponibles/${id}`);
        setHorarios(prevState => prevState.filter(horario => horario.id !== id));
        setMensaje('Horario eliminado con éxito.');
      } catch (error) {
        console.error('Error al eliminar el horario:', error);
        setMensaje('Error al eliminar el horario.');
      }
    }
  };

  // Filtrar y buscar horarios


  return (
    <div className="min-h-screen bg-white pl-4 md:pl-16 lg:pl-52 pr-6 pt-10">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-indigo-900">Horarios Disponibles</h2>
              <Link 
                to="/horarios-disponibles/crear" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Crear Horario
              </Link>
            </div>

            <div className="mb-4">
              {/* Select para teacher */}
              {/*<label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por profesor:</label>
              <select 
                value={filtroProfesor || ''} 
                onChange={(e) => setFiltroProfesor(Number(e.target.value) || null)} 
                className="mb-4 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Todos los profesores</option>
                {profesores.map((profesor) => (
                  <option key={profesor.id} value={profesor.id}>{profesor.nombre}</option>
                ))}
              </select>*/}

              {/* Input para buscar por profesor */}
              <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por nombre del profesor:</label>
              <input 
                type="text" 
                value={busquedaProfesor} 
                onChange={(e) => setBusquedaProfesor(e.target.value)} 
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Buscar profesor..."
              />
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
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-900">Profesor</th>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-indigo-900 sm:pl-6">Día</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-900">Hora de Inicio</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-900">Hora de Fin</th>
                         
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Acciones</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {horarios.length > 0 ? (
                            horarios.map((horario) => (
                              <motion.tr 
                                key={horario.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{horario.profesor_nombre}</td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">{horario.dia}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{horario.hora_inicio}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{horario.hora_fin}</td>
                                
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <Link
                                    to={`/horarios-disponibles/editar/${horario.id}`}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-150 ease-in-out"
                                  >
                                    <PencilIcon className="h-5 w-5 inline-block" aria-hidden="true" />
                                    <span className="sr-only">Editar</span>
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(horario.id)}
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
                              <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                No hay horarios disponibles
                              </td>
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