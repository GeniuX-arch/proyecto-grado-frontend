import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Navbar from '../../components/Navbar';
import { host } from '../../data/server';
import { Salon } from '../../interfaces/interfaces';

export default function VerSalones() {
  const [salones, setSalones] = useState<Salon[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSalones = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${host}/salones`);
      setSalones(response.data);
    } catch (error) {
      console.error('Error al cargar los salones:', error);
      setMensaje('Error al cargar los salones.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalones();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este salón?')) {
      try {
        await axios.delete(`${host}/salones/${id}`);
        setSalones(prevState => prevState.filter(salon => salon.id !== id));
        setMensaje('Salón eliminado exitosamente.');
      } catch (error) {
        console.error('Error al eliminar el salón:', error);
        setMensaje('Error al eliminar el salón.');
      }
    }
  };

  const filteredSalones = salones.filter(salon => 
    salon.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salon.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pl-4 md:pl-16 lg:pl-52 pr-6 pt-10">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-indigo-900">Visualizar Salones</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar salón..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <svg 
                    className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <Link 
                  to="/salones/crear" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Crear Salón
                </Link>
              </div>
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
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-900">Código</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-900">Tipo</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-indigo-900">Capacidad</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Acciones</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {filteredSalones.length > 0 ? (
                            filteredSalones.map((salon) => (
                              <motion.tr 
                                key={salon.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {salon.id}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {salon.codigo}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                    {salon.tipo}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {salon.capacidad_alumnos} estudiantes
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <Link
                                    to={`/salones/editar/${salon.id}`}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-150 ease-in-out"
                                  >
                                    <PencilIcon className="h-5 w-5 inline-block" aria-hidden="true" />
                                    <span className="sr-only">Editar</span>
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(salon.id)}
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
                                No hay salones disponibles
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