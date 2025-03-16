import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { listarProfesores, eliminarProfesor } from '../../data/profesores.conexion';
import { hostImg, host } from '../../data/server';

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

  const searchProfesores = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(host + '/profesores?name=true', {
        params: { nombre: query }
      });
      setProfesores(response.data.data);
    } catch (error) {
      console.error('Error al buscar profesores:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setPage(newPage);
      fetchProfesores(newPage);
    }
  }, [lastPage, fetchProfesores]);

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

  useEffect(() => {
    fetchProfesores(1);
  }, [fetchProfesores]);

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
      <div className="bg-white min-h-screen flex flex-col items-center pt-24 pl-4 md:pl-16 lg:pl-52 pr-6">
        {/* Header Section */}
        <div className="w-full max-w-screen-xl bg-[#BFD730] mb-5 flex flex-col lg:flex-row justify-between items-center backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-gray-700 mb-4 lg:mb-0">Gestión de Profesores</h2>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
            <Link to="/profesor/crear" className="bg-[#0B4A75] text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-900 transition-all duration-300">
              Crear Nuevo Profesor
            </Link>
          </div>
        </div>
  
        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isLoading}
            className="inline-flex items-center px-5 py-2.5 bg-gray-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors shadow-lg disabled:hover:bg-gray-700"
          >
            Anterior
          </button>
          <span className="text-white font-medium bg-gray-700/50 px-4 py-2 rounded-lg">
            Página {page} de {lastPage}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === lastPage || isLoading}
            className="inline-flex items-center px-5 py-2.5 bg-gray-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors shadow-lg disabled:hover:bg-gray-700"
          >
            Siguiente
          </button>
        </div>
  
        {/* Professors Grid */}
        <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-2 px-0">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-white text-xl font-medium">Cargando...</div>
            </div>
          ) : profesores.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-white text-xl font-medium">No se encontraron profesores</div>
            </div>
          ) : (
            profesores.map((profe) => (
              <div 
                key={profe.id}
                className="bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={profe.image_path ? hostImg + profe.image_path : "/perfil.png"}
                    alt={`Perfil de ${profe.nombre}`}
                    className="h-28 w-28 rounded-full border-4 border-green-900 mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-green-900 mb-2">{profe.nombre}</h3>
                  <p className="text-gray-800 mb-2">Cédula: {profe.cedula}</p>
                  <p className="text-gray-800 mb-4">Tipo de Contrato: {profe.tipo_contrato}</p>
  
                  <div className="flex gap-4 w-full mt-4">
                    <Link
                      to={`/profesor/perfil/${profe.id}`}
                      className="bg-[#0B4A75] text-white font-semibold px-5 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 w-full text-center"
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