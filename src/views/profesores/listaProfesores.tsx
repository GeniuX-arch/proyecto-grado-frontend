import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { listarProfesores, eliminarProfesor } from '../../data/profesores.conexion';
import { Profesor } from '../../interfaces/interfaces';
import { useEffect, useState } from 'react';
import { host, hostImg } from '../../data/server'; // Asegúrate de tener la variable `host` para la URL de la API
import axios from 'axios';

export default function Profesores() {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [materias, setMaterias] = useState<any[]>([]); // Estado para almacenar materias

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

  // Función para obtener las materias que dicta un profesor
  const obtenerMaterias = async (profesorId: number) => {
    try {
      const response = await axios.get(`${host}/profesor_materia?profesor_id=${profesorId}`);
      setMaterias(response.data);
    } catch (error) {
      console.error('Error al obtener materias:', error);
    }
  };

  const filteredProfesores = profesores
    .filter(profe =>
      profe.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar alfabéticamente

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center pt-24 bg-cover bg-center bg-no-repeat pl-4 md:pl-16 lg:pl-52 pr-6">
        <div className="w-full max-w-screen-xl bg-gray-400 mb-5 flex flex-col lg:flex-row justify-between items-center bg-opacity-80 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-cyan-700 mb-4 lg:mb-0">Gestión de Profesores</h2>
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
                {/* Mostrar la imagen del profesor */}
                {profe.image_path ? (
                  <img
                    src={hostImg + profe.image_path} // Utiliza la URL de la imagen desde el objeto profesor
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
                
                {/* Botón para obtener las materias del profesor */}
                <button 
                  onClick={() => obtenerMaterias(profe.id)} 
                  className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Ver Materias
                </button>

                <section className="border rounded-md p-4 m-5 flex flex-col items-center w-2/3 bg-white shadow-lg">
                 
                  
                    {materias.map((materia) => (
                      <div key={materia.id} className="border rounded-md p-2 shadow-sm bg-gray-100">
                        <h3 className="font-semibold">{materia.nombre}</h3>
                        <p>Experiencia: {materia.experiencia}</p>
                        <p>Calificación Alumno: {materia.calificacion_alumno}</p>
                      </div>
                    ))}
                 
                </section>

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
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1H11zM5.607 14.825 4.77 4h6.461l-.837 10.825a1 1 0 0 1-.997.91h-6.23a1 1 0 0 1-.997-.91z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
