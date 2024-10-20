import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { listarProfesores, eliminarProfesor } from '../../data/profesores.conexion';
import { Profesor } from '../../interfaces/interfaces';
import { useEffect, useState } from 'react';
import { hostImg } from '../../data/server';


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
    if (window.confirm('¿Está seguro de que deseas eliminar este profesor?')) {
      try {
        await eliminarProfesor(id);
        setProfesores(prevState => prevState.filter(profe => profe.id !== id));
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
      <div  className="min-h-screen flex flex-col items-center pt-24 bg-cover bg-center bg-no-repeat pl-4 md:pl-16 lg:pl-52 pr-6"
 style={{
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
                {/* Aquí se muestra la imagen del profesor */}
                {profe.image_path ? (
                  <img
                    src={hostImg+profe.image_path} // Utiliza la URL de la imagen desde el objeto profesor
                    alt="Perfil"
                    className="h-28 w-28 rounded-full border-4 border-green-600 mb-4"
                  />
                ) : (
                  <img
                    src="/perfil.png" // Imagen de perfil por defecto
                    alt="Perfil"
                    className="h-28 w-28 rounded-full border-4 border-green-600 mb-4"
                  />
                )}
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
                      to={`/profesor/perfil/${profe.id}`}
                      className="bg-blue-600 text-white flex flex-row gap-2 items-center justify-center font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 w-full text-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(profe.id)}
                      className="bg-red-600 text-white font-semibold px-5 flex flex-row gap-2 items-center justify-center py-2 rounded-lg hover:bg-red-700 transition-all duration-300 w-full text-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
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
