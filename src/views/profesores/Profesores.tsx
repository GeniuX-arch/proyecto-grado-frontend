import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { listarProfesores, eliminarProfesor } from '../../data/profesores.conexion';
import { Profesor } from '../../interfaces/interfaces';
import { useEffect, useState } from 'react';

export default function Profesores() {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lista: Profesor[] = await listarProfesores();
        setProfesores(lista);
      } catch (error) {
        console.error('Error al obtener la lista de profesores:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Esta seguro de que deseas eliminar este profesor?')) {
      try {
        await eliminarProfesor(id);
        setProfesores(prevState => prevState.filter(profe => profe.cedula !== id));
      } catch (error) {
        console.error('Error al eliminar el profesor:', error);
      }
    }
  };

  const filteredProfesores = profesores.filter(profe =>
    profe.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center pt-24 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url('https://c.wallhere.com/photos/64/fc/3840x2160_px_animals_artwork_Clear_Sky_Deer_digital_art_drawing_Firewatch-516653.jpg!d')`,
      }}>
        <div className="w-full max-w-screen-xl mb-8 flex flex-col lg:flex-row justify-between items-center bg-opacity-80 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-white mb-4 lg:mb-0">Gestión de Profesores</h2>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
            <Link to="/profesor/crear" className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300">
              Crear Nuevo Profesor
            </Link>
          </div>
        </div>

        <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {filteredProfesores.map((profe) => (
            <div className="bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6" key={profe.cedula}>
              <div className="flex flex-col items-center">
                <img
                  src="/perfil.png"
                  alt="Perfil"
                  className="h-28 w-28 rounded-full border-4 border-green-600 mb-4"
                />
                <h3 className="text-2xl font-semibold text-green-300 mb-2">{profe.nombre}</h3>
                <p className="text-gray-400 mb-2">Cédula: {profe.cedula}</p>
                <p className="text-gray-400 mb-4">Tipo de Contrato: {profe.tipo_contrato}</p>
                <div className="flex flex-col gap-2 w-full">
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {/* Suponiendo que tienes una lista de materias */}
                    <li className="bg-green-700 text-gray-200 px-3 py-1 rounded-full">Materia 1</li>
                    <li className="bg-green-700 text-gray-200 px-3 py-1 rounded-full">Materia 2</li>
                    <li className="bg-green-700 text-gray-200 px-3 py-1 rounded-full">Materia 3</li>
                  </ul>
                  <div className="flex gap-4 w-full">
                    <Link
                      to={`/profesor/editar/${profe.cedula}`}
                      className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 w-full text-center"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(profe.cedula)}
                      className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 w-full text-center"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
