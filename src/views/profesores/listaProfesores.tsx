import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { listarProfesores, eliminarProfesor } from '../../data/profesores.conexion';
import { hostImg,host } from '../../data/server';

// Define proper interfaces
interface Profesor {
  id: number;
  nombre: string;
  cedula: string;
  tipo_contrato: string;
  image_path: string | null;
}

interface PaginatedResponse {
  data: Profesor[];
  last_page: number;
}

export default function Profesores() {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch professors with pagination
  const fetchProfesores = useCallback(async (pageNum: number) => {
    try {
      setIsLoading(true);
      const response = await listarProfesores(pageNum);
      const { data, last_page }: PaginatedResponse = response;
      setProfesores(data);
      setLastPage(last_page);
    } catch (error) {
      console.error('Error al obtener la lista de profesores:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search professors
  const searchProfesores = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(host+'/profesores?name=true', {
        params: { nombre: query }
      });
      setProfesores(response.data.data);
    } catch (error) {
      console.error('Error al buscar profesores:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle pagination
  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setPage(newPage);
      fetchProfesores(newPage);
    }
  }, [lastPage, fetchProfesores]);

  // Handle search with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        searchProfesores(searchTerm);
      } else {
        fetchProfesores(1);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchProfesores, fetchProfesores]);

  // Initial load
  useEffect(() => {
    fetchProfesores(1);
  }, [fetchProfesores]);

  // Handle professor deletion
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de que deseas eliminar este profesor?')) {
      try {
        await eliminarProfesor(id);
        setProfesores(prev => prev.filter(profe => profe.id !== id));
      } catch (error) {
        console.error('Error al eliminar el profesor:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-cyan-700 min-h-screen flex flex-col items-center pt-24 bg-cover bg-center bg-no-repeat px-4 md:px-16 lg:px-52">
        {/* Header Section */}
        <div className="w-full max-w-screen-xl bg-gray-800 mb-5 flex flex-col lg:flex-row justify-between items-center p-6 rounded-lg shadow-lg backdrop-blur-lg">
          <h2 className="text-4xl font-bold text-white mb-4 lg:mb-0">Gestión de Profesores</h2>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 w-full lg:w-auto"
            />
            <Link 
              to="/profesor/crear" 
              className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 w-full lg:w-auto text-center"
            >
              Crear Nuevo Profesor
            </Link>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Anterior
          </button>
          <span className="text-white font-medium">
            Página {page} de {lastPage}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === lastPage || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Siguiente
          </button>
        </div>

        {/* Professors Grid */}
        <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-2">
          {isLoading ? (
            <div className="col-span-full text-center text-white text-xl">
              Cargando...
            </div>
          ) : profesores.length === 0 ? (
            <div className="col-span-full text-center text-white text-xl">
              No se encontraron profesores
            </div>
          ) : (
            profesores.map((profe) => (
              <div 
                key={profe.id}
                className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={profe.image_path ? hostImg + profe.image_path : "/perfil.png"}
                    alt={`Perfil de ${profe.nombre}`}
                    className="h-28 w-28 rounded-full border-4 border-green-600 mb-4 object-cover"
                  />
                  <h3 className="text-2xl font-semibold text-green-300 mb-2 text-center">
                    {profe.nombre}
                  </h3>
                  <p className="text-gray-400 mb-2">Cédula: {profe.cedula}</p>
                  <p className="text-gray-400 mb-4">
                    Tipo de Contrato: {profe.tipo_contrato}
                  </p>

                  <div className="flex gap-4 w-full mt-4">
                    <Link
                      to={`/profesor/perfil/${profe.id}`}
                      className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 w-full text-center"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(profe.id)}
                      className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 w-full text-center"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}